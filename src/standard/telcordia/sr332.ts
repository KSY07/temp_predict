import { IPredictionSystem, IPredictionUnit } from '../../core/common';
import {
  ComponentClassification,
  ElectronicDevice,
  IPredictionCategory,
  IPredictionDevice,
  IPredictionResult,
  PredictionCtx,
  PredictionStandard,
} from "../../core/common";

export const BOLTZMANN_CONSTANT = 8.617e-5;

export enum TelcordiaMainCategories {
  CAPACITOR = 0,
  CONNECTOR = 1,
  DIODE = 2,
  INDUCTOR = 3,
  IC = 4,
  MICROWAVE = 5,
  OPTO_ELEC = 6,
  RELAY = 7,
  RESISTOR = 8,
  SWITCH = 9,
  THERMISTOR = 10,
  TRANSISTOR = 11,
  MISCELLANEOUS = 12,
  ROTATING = 13
}

export interface TelcordiaCategory extends IPredictionCategory {
  readonly mainCategory:TelcordiaMainCategories;
  readonly subCategories?: TelcordiaCategory[];
  readonly g_fr?: (args?:Record<string, any>) => number;
  readonly g_std?: (args?:Record<string, any>) => number;
  readonly tempCurve?: (args?:Record<string, any>) => TelcordiaTempStressCurves | number;
  readonly elecCurve?: (args?:Record<string, any>) => TelcordiaElectricalStressCurves | number;
};

export interface TelcordiaDefaultSpecifications {
    tRef: number;
    tOp: number;
    eRef: number;
    eOp: number;
    qFactor: TelcordiaQualityFactor;
}

export class TelcordiaDevice extends ElectronicDevice implements IPredictionDevice<TelcordiaCategory>  {
      readonly id: string;
      alias: string;
      category: TelcordiaCategory;
      specifications: Record<string, any>; // for Category Specification
      integratingLaboratoryData?: IntegratingLaboratoryData; // for Method - II
      integratingFieldData?: IntegratingFieldData; // for Method - III
      burnInTime?: number; // for Early-Life Factor, Method - II, Method- III

      constructor(id:string, category: TelcordiaCategory) {
        super(PredictionStandard.TELCORDIA_SR_332);
        this.id = id;
        this.alias = "";
        this.type = ComponentClassification.ELECTRONIC;
        this.category = category;
        this.specifications = {};
      }
}

export class TelcordiaUnit implements IPredictionUnit<TelcordiaCategory, TelcordiaDevice> {
      readonly id: string;
      alias: string;
      devices: TelcordiaDevice[];
      environmentFactor?: TelcordiaEnvironmentFactor;
      
      constructor(id: string) {
        this.id = id;
        this.alias = "";
        this.devices = [];
      }

      addDevice = (device:TelcordiaDevice): boolean => {
        if(this.devices.filter((d) => d.id === device.id).length > 0) {
          return false;
        }
        this.devices.push(device);
        return true;
      }

      removeDevice = (deviceId: string): boolean => {
        const initialLength = this.devices.length;
        this.devices = this.devices.filter(d => d.id !== deviceId);
        return this.devices.length < initialLength;
      }
}

export class TelcordiaSystem implements IPredictionSystem<TelcordiaCategory, TelcordiaDevice, TelcordiaUnit> {
  readonly id: string;
  alias: string;
  units: TelcordiaUnit[];

  constructor(id: string) {
    this.id = id;
    this.alias = "";
    this.units = [];
  }

  addUnit = (unit: TelcordiaUnit): boolean => {
    if(this.units.filter((u) => u.id === unit.id).length > 0) {
      return false;
    }
    this.units.push(unit);
    return true;
  }

  removeUnit = (unit: TelcordiaUnit): boolean => {
    const initialLength = this.units.length;
    this.units = this.units.filter(u => u.id !== unit.id);
    return this.units.length < initialLength;
  };
}

export class TelcordiaPredictionCtx extends PredictionCtx<TelcordiaCategory, TelcordiaDevice, TelcordiaUnit, TelcordiaSystem> {
  method?: TelcordiaCalculationMethods;
  appliedUCL: boolean = false;
  appliedEarlyLife: boolean = false;
  confidenceLevel?: number; // for UCL Calculation

  constructor() {
    super();
    this.method = "METHOD_I";
  }

  createDevice = (category:TelcordiaCategory, unitId: string) => {
    const device = new TelcordiaDevice(`dev-${this.iDeviceCount + 1}`, category);
    this.iDeviceCount++;
    this.deviceList.push(device);

    if(unitId !== undefined) {
      if(!this.getUnit(unitId)?.addDevice(device)) {
        this.deviceList.pop();
        this.iDeviceCount--;

        throw new Error("Id Error");
      };
    };
    
    return device;
  }

  createUnit = (systemId:string) => {
    const unit = new TelcordiaUnit(`unit-${this.iUnitCount + 1}`);
    this.iUnitCount++;
    this.unitList.push(unit);
    
    const found = this.systemList.find(system => system.id === systemId)
    
    if(found)
      found.units.push(unit);
    
    return unit;
  }

  createSystem = () => {
    const system = new TelcordiaSystem(`sys-${this.iSystemCount + 1}`);
    this.iSystemCount++;
    this.systemList.push(system);
    
    return system;
  }

  setMethod(method: TelcordiaCalculationMethods) {
    this.method = method;
  }
}

export type IntegratingLaboratoryData = {
  // See 3.2 Method II-D: Techiques Integrating Laboratory Data
  numberOfDeviceFailures?: number;

  numberOfDevicesOnTest?: number; // N_0
  actualTimeOnTest?: number; // in hours T_a
  laboratoryTestTemperatureFactor?: TelcordiaTempStressCurves; // A_L
  laboratoryTestQualityFactor?: TelcordiaQualityFactor; // π_Qi

  // Needed Burn-in
  burnInTemperatureFactor?: TelcordiaTempStressCurves; //A_b,d
  deviceBurnInTime?: number; // t_b,d
};

export type IntegratingFieldData = {
  totalOperatingHours?: number;
  fieldFailureCount?: number; // observed in the tracked system in time t
  fieldEnvironmentFactor?: TelcordiaEnvironmentFactor;
  fieldFailureRate?: number; // See 3.3.2 have different quality levels, or are used under different temperature and/or electrical stress conditions, then λ_BB_c / λ_BB_i
  adjustmentFactor?: number;
};

export enum TelcordiaTempStressCurves {
  "_1" = 0.05,
  "_2" = 0.1,
  "_3" = 0.15,
  "_4" = 0.22,
  "_5" = 0.28,
  "_6" = 0.35,
  "_7" = 0.4,
  "_8" = 0.45,
  "_9" = 0.56,
  "_10" = 0.7,
}
export enum TelcordiaElectricalStressCurves {
  "A" = 0.6,
  "B" = 0.9,
  "C" = 1.3,
  "D" = 1.9,
  "E" = 2.4,
  "F" = 2.9,
  "G" = 3.5,
  "H" = 4.1,
  "I" = 4.6,
  "J" = 5.9,
  "K" = 0.6,
}

export type TelcordiaDevicePackagingType = 'Hermetic' | 'Non-Hermetic' | 'Other';

export type TelcordiaCalculationMethods =
  | "METHOD_I"
  | "METHOD_II"
  | "METHOD_III";

export enum TelcordiaEnvironmentFactor {
  GROUND_FIXED_CONTROLLED = 1,
  GROUND_FIXED_UNCONTROLLED_LIMITED = 1.2,
  GROUND_FIXED_UNCONTROLLED_MODERATE = 1.5,
  GROUND_MOBILE = 2,
  AIRBONE_COMMERCIAL = 3,
  SPACE_BASED_COMMERCIAL = 0,
}

export enum TelcordiaQualityFactor {
  LEVEL_0 = 6,
  LEVEL_1 = 3,
  LEVEL_2 = 1,
  LEVEL_3 = 0.8,
}

export const calcTemperatureFactor = (
  tRef: number = 40,
  tOp: number,
  curve: TelcordiaTempStressCurves
) => {
  const tRefK = tRef + 273.15;
  const tOpK = tOp + 273.15;

  return Math.exp((curve / BOLTZMANN_CONSTANT) * (1 / tRefK - 1 / tOpK));
};

export const calcElecStressFactor = (
  eRef: number = 0.5,
  eOp: number,
  curve: TelcordiaElectricalStressCurves,
  curve2?: TelcordiaElectricalStressCurves
): number => {
  if (curve2 !== undefined) {
    return (
      calcElecStressFactor(eRef, eOp, curve) *
      calcElecStressFactor(eRef, eOp, curve2)
    );
  }
  return Math.exp(curve * (eOp - eRef));
};
