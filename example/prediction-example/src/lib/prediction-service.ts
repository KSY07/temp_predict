import { 
  TelcordiaPredictionCtx, 
  TelcordiaSystem, 
  TelcordiaUnit, 
  TelcordiaDevice,
  TelcordiaCalculator,
  TelcordiaCategories,
  TelcordiaCategory,
  TelcordiaQualityFactor,
  TelcordiaEnvironmentFactor,
  PredictionStandard,
  IPredictionResult
} from 'prediction'

export interface PredictionCalculationOptions {
  method: 'METHOD_I' | 'METHOD_II' | 'METHOD_III'
  appliedUCL: boolean
  confidenceLevel: number
  earlyLife: boolean
}

export interface PredictionCalculationResult {
  system: IPredictionResult | null
  units: Map<string, IPredictionResult>
  devices: Map<string, IPredictionResult>
  errors: string[]
  warnings: string[]
}

export class PredictionService {
  private ctx: TelcordiaPredictionCtx
  private calculator: TelcordiaCalculator

  constructor() {
    this.ctx = new TelcordiaPredictionCtx()
    this.calculator = new TelcordiaCalculator()
    this.calculator.setCtx(this.ctx)
  }

  /**
   * Get all available Telcordia categories
   */
  getCategories(): TelcordiaCategory[] {
    return TelcordiaCategories
  }

  /**
   * Get category by name
   */
  getCategoryByName(name: string): TelcordiaCategory | null {
    return TelcordiaCategories.find(cat => cat.name === name) || null
  }

  /**
   * Configure calculation options
   */
  setCalculationOptions(options: PredictionCalculationOptions): void {
    this.ctx.setMethod(options.method)
    this.ctx.appliedUCL = options.appliedUCL
    this.ctx.confidenceLevel = options.confidenceLevel
    
    // Early-life calculations would require additional configuration
    // This is a placeholder for now
    if (options.earlyLife) {
      console.warn('Early-life calculations not yet implemented')
    }
  }

  /**
   * Create a new device in the prediction context
   */
  createDevice(
    alias: string,
    category: TelcordiaCategory,
    specifications: Record<string, any>,
    unitId: string
  ): TelcordiaDevice {
    console.log(unitId);
    const device = this.ctx.createDevice(category, unitId);
    device.alias = alias
    device.specifications = specifications
    return device
  }

  /**
   * Create a new unit in the prediction context
   */
  createUnit(
    alias: string,
    environmentFactor: TelcordiaEnvironmentFactor,
    systemId: string
  ): TelcordiaUnit {
    console.log(systemId);
    const unit = this.ctx.createUnit(systemId);
    unit.alias = alias
    unit.environmentFactor = environmentFactor
    return unit
  }

  /**
   * Create a new system in the prediction context
   */
  createSystem(
    alias: string
  ): TelcordiaSystem {
    const system = this.ctx.createSystem()
    system.alias = alias
    return system
  }

  /**
   * Calculate reliability for a specific device
   */
  async calculateDevice(device: TelcordiaDevice): Promise<IPredictionResult> {
    try {
      const result = await this.calculator.calcDevice(device)
      return result
    } catch (error) {
      throw new Error(`Device calculation failed: ${error}`)
    }
  }

  /**
   * Calculate reliability for a specific unit
   */
  async calculateUnit(unit: TelcordiaUnit): Promise<IPredictionResult> {
    try {
      const result = await this.calculator.calcUnit(unit)
      return result
    } catch (error) {
      throw new Error(`Unit calculation failed: ${error}`)
    }
  }

  /**
   * Calculate reliability for a specific system
   */
  async calculateSystem(system: TelcordiaSystem): Promise<IPredictionResult> {
    try {
      const result = await this.calculator.calcSystem(system)
      return result
    } catch (error) {
      throw new Error(`System calculation failed: ${error}`)
    }
  }

  /**
   * Perform complete calculation for all components using Calculator.calc()
   */
  async calculateAll(): Promise<PredictionCalculationResult> {
    const result: PredictionCalculationResult = {
      system: null,
      units: new Map(),
      devices: new Map(),
      errors: [],
      warnings: []
    }

    try {
      // Get all systems, units, and devices from the context
      const systems = this.ctx.systemList || []
      const units = this.ctx.unitList || []
      const devices = this.ctx.deviceList || []

      if (devices.length === 0) {
        result.warnings.push('No devices found in prediction context')
        return result
      }

      // Use Calculator.calc() to perform the main calculation
      try {
        const calculationResult = await this.calculator.calc()
        
        // Extract device results from the calculation
        for (const device of devices) {
          try {
            // Calculate individual device to get its result
            const deviceResult = await this.calculator.calcDevice(device)
            result.devices.set(device.id, deviceResult)
          } catch (error) {
            result.errors.push(`Device ${device.alias}: ${error}`)
          }
        }

        // Extract unit results
        for (const unit of units) {
          try {
            const unitResult = await this.calculator.calcUnit(unit)
            console.log(unitResult);
            result.units.set(unit.id, unitResult)
          } catch (error) {
            result.errors.push(`Unit ${unit.alias}: ${error}`)
          }
        }

        // Extract system results
        if (systems.length > 0) {
          try {
            const systemResult = await this.calculator.calcSystem(systems[0]);
            console.log(systemResult);
            result.system = systemResult
          } catch (error) {
            result.errors.push(`System calculation: ${error}`)
          }
        }

        // If main calculation returned a result, use it as the primary result
        if (calculationResult) {
          result.system = calculationResult
        }

      } catch (error) {
        result.errors.push(`Calculator.calc() failed: ${error}`)
      }

    } catch (error) {
      result.errors.push(`Calculation failed: ${error}`)
    }

    return result
  }

  /**
   * Validate device specifications
   */
  validateDeviceSpecs(category: TelcordiaCategory, specs: Record<string, any>): string[] {
    const errors: string[] = []
    
    if (!category.specificationList) return errors

    for (const spec of category.specificationList) {
      const value = specs[spec.key]
      
      if (value === undefined || value === null) {
        errors.push(`${spec.key} is required`)
        continue
      }

      // Type validation (if min/max properties exist)
      if (typeof value === 'number') {
        const specWithBounds = spec as any
        if (specWithBounds.minValue !== undefined && value < specWithBounds.minValue) {
          errors.push(`${spec.key} must be at least ${specWithBounds.minValue}`)
        }
        if (specWithBounds.maxValue !== undefined && value > specWithBounds.maxValue) {
          errors.push(`${spec.key} must be at most ${specWithBounds.maxValue}`)
        }
      }
    }

    return errors
  }

  /**
   * Get recommended specifications for a category
   */
  getRecommendedSpecs(category: TelcordiaCategory): Record<string, any> {
    const specs: Record<string, any> = {}
    
    if (category.specificationList) {
      for (const spec of category.specificationList) {
        specs[spec.key] = spec.initialValue
      }
    }

    return specs
  }

  /**
   * Get the current prediction context
   */
  getCtx(): TelcordiaPredictionCtx {
    return this.ctx
  }

  /**
   * Clear all data from the prediction context
   */
  clear(): void {
    this.ctx = new TelcordiaPredictionCtx()
    this.calculator = new TelcordiaCalculator()
    this.calculator.setCtx(this.ctx)
  }
}

// Singleton instance
export const predictionService = new PredictionService()