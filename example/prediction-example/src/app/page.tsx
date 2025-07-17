"use client"

import { useState } from "react"
import { PredictionTree } from "@/components/prediction-tree"
import { sampleSystems } from "@/data/sample-prediction-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SystemTreeNode } from "@/types/prediction-tree"
import { predictionService, PredictionCalculationOptions } from "@/lib/prediction-service"
import { PredictionStandard, TelcordiaCategories } from "prediction"
import { CalculationOptions } from "@/contexts/calculation-context"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { LoadingOverlay } from "@/components/loading-overlay"
import { exportToExcel } from "@/lib/excel-export"

export default function Home() {
  const [systems, setSystems] = useState<SystemTreeNode[]>(sampleSystems)
  const [isCalculating, setIsCalculating] = useState(false)
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set())

  const handleSelectionChange = (selectedNodes: Set<string>) => {
    console.log("Selected nodes:", Array.from(selectedNodes))
    setSelectedNodes(selectedNodes)
  }

  const handleSystemsChange = (updatedSystems: SystemTreeNode[]) => {
    setSystems(updatedSystems)
  }

  const handleExportExcel = () => {
    if (selectedNodes.size === 0) {
      alert('내보낼 항목을 선택해주세요.')
      return
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const filename = `reliability_export_${timestamp}.xlsx`
    
    exportToExcel(systems, selectedNodes, filename)
  }

  const handleCalculate = async (options: CalculationOptions) => {
    console.log("🚀 계산 시작:", options)
    setIsCalculating(true)
    try {
      // Clear previous context
      predictionService.clear()
      console.log("✅ Prediction service cleared")

      // Set calculation options
      const calculationOptions: PredictionCalculationOptions = {
        method: options.method || 'METHOD_I', // Use selected method or default to METHOD_I
        appliedUCL: options.uclCalculated,
        confidenceLevel: options.confidenceLevel || 0.95, // Use provided confidence level or default to 0.95
        earlyLife: options.earlyLife
      }

      predictionService.setCalculationOptions(calculationOptions)
      console.log("✅ 계산 옵션 설정:", calculationOptions)

      // Rebuild the prediction context with current tree data
      console.log("🔄 Prediction context 재구성 시작...")
      await rebuildPredictionContext(systems)
      console.log("✅ Prediction context 재구성 완료")

      // Check context state
      const ctx = predictionService.getCtx()
      console.log("📊 Context 상태:", {
        systems: ctx.systemList?.length || 0,
        units: ctx.unitList?.length || 0,
        devices: ctx.deviceList?.length || 0
      })

      // Perform calculations
      console.log("⚡ 계산 실행 중...")
      const results = await predictionService.calculateAll()
      console.log("✅ 계산 실행 완료:", results)

      // Update tree with calculation results
      const updatedSystems = updateTreeWithResults(systems, results)
      setSystems(updatedSystems)

      if (results.errors.length > 0) {
        console.error("❌ 계산 중 오류 발생:", results.errors)
      }

      if (results.warnings.length > 0) {
        console.warn("⚠️ 계산 중 경고:", results.warnings)
      }

      console.log("🎉 계산 완료:", results)
    } catch (error) {
      console.error("💥 계산 실패:", error)
    } finally {
      setIsCalculating(false)
      console.log("🏁 계산 프로세스 종료")
    }
  }

  const rebuildPredictionContext = async (systems: SystemTreeNode[]) => {
    console.log("🏗️ 시스템 수:", systems.length)
    
    // Test category existence first
    const testCategories = [
      "SR332-CAPACITOR-FIXED-CERAMIC"
    ]
    
    // Helper function to find category by ID
    const findCategoryById = (categoryId: string) => {
      const searchCategory = (categories: typeof TelcordiaCategories): any => {
        for (const cat of categories) {
          if (cat.id === categoryId) {
            return cat
          }
          if (cat.subCategories && cat.subCategories.length > 0) {
            const found = searchCategory(cat.subCategories)
            if (found) return found
          }
        }
        return null
      }
      return searchCategory(TelcordiaCategories)
    }
    
    console.log("🔍 카테고리 존재 여부 확인:")
    for (const categoryId of testCategories) {
      try {
        const category = findCategoryById(categoryId)
        console.log(`${category ? "✅" : "❌"} ${categoryId}: ${category ? "존재" : "없음"}`)
        if (category) {
          console.log(`   - 이름: ${category.name}`)
          console.log(`   - 사양 개수: ${category.specificationList?.length || 0}`)
        }
      } catch (error) {
        console.log(`❌ ${categoryId}: 오류 - ${error}`)
      }
    }
    
    for (const system of systems) {
      // Create system in prediction context
      console.log("📋 시스템 생성:", system.alias)
      const predictionSystem = predictionService.createSystem(system.alias)

      console.log("📦 유닛 수:", system.children.length)
      for (const unit of system.children) {
        // Create unit in prediction context
        console.log("🔧 유닛 생성:", unit.alias)
        const predictionUnit = predictionService.createUnit(
          unit.alias,
          unit.data.environmentFactor || 1,
          system.id,
        )

        console.log("⚙️ 장치 수:", unit.children.length)
        for (const device of unit.children) {
          // Create device in prediction context
          if (device.data.category) {
            console.log("🛠️ 장치 생성:", device.alias, "카테고리:", device.data.category.id)
            try {
              const predictionDevice = predictionService.createDevice(
                device.alias,
                device.data.category,
                device.data.specifications || {},
                unit.id,
              )
              console.log("✅ 장치 생성 완료:", device.alias)
            } catch (error) {
              console.error("❌ 장치 생성 실패:", device.alias, error)
              console.log(predictionService.getCtx());
            }
          } else {
            console.warn("⚠️ 카테고리가 없는 장치:", device.alias)
          }
        }
      }
    }
  }

  const updateTreeWithResults = (
    systems: SystemTreeNode[],
    results: any
  ): SystemTreeNode[] => {
    console.log("📊 계산 결과 업데이트:", {
      systemResult: results.system,
      unitResults: results.units?.size || 0,
      deviceResults: results.devices?.size || 0,
      errors: results.errors,
      warnings: results.warnings
    })

    // Create index maps based on alias to match calculation results
    const deviceResultsByAlias = new Map()
    const unitResultsByAlias = new Map()
    
    // Get the context to access device and unit lists
    const ctx = predictionService.getCtx()
    if (!ctx) {
      console.error("❌ No context available for result mapping")
      return systems
    }
    
    // Since ctx generates new IDs, we need to match by alias
    if (results.devices) {
      for (const [deviceId, deviceResult] of results.devices) {
        const device = ctx.deviceList.find(d => d.id === deviceId)
        if (device) {
          deviceResultsByAlias.set(device.alias, {
            ...deviceResult,
            std: deviceResult.std,
            note: deviceResult.details?.notes?.join('\n') || ""
          })
          console.log(`✅ Device mapped: ${device.alias} -> λ=${deviceResult.failureRate}`)
        } else {
          console.warn(`⚠️ Device not found for ID: ${deviceId}`)
        }
      }
    }

    if (results.units) {
      for (const [unitId, unitResult] of results.units) {
        const unit = ctx.unitList.find(u => u.id === unitId)
        if (unit) {
          unitResultsByAlias.set(unit.alias, {
            ...unitResult,
            std: unitResult.std,
            note: unitResult.details?.notes?.join('\n') || ""
          })
          console.log(`✅ Unit mapped: ${unit.alias} -> λ=${unitResult.failureRate}`)
        } else {
          console.warn(`⚠️ Unit not found for ID: ${unitId}`)
        }
      }
    }

    return systems.map(system => {
      const systemResult = results.system
      
      const updatedUnits = system.children.map(unit => {
        const unitResult = unitResultsByAlias.get(unit.alias)
        
        const updatedDevices = unit.children.map(device => {
          const deviceResult = deviceResultsByAlias.get(device.alias)
          
          console.log(`🔧 Device ${device.alias}:`, {
            hasResult: !!deviceResult,
            failureRate: deviceResult?.failureRate,
            std: deviceResult?.std,
            fullDetails: deviceResult?.details,
            note: deviceResult?.note
          })
          
          return {
            ...device,
            reliability: deviceResult ? {
              failureRate: deviceResult.failureRate,
              standardDeviation: deviceResult.std,
              mtbf: deviceResult.failureRate ? 1 / deviceResult.failureRate * 1000000 : undefined,
              availability: deviceResult.failureRate ? 1 - (deviceResult.failureRate * 8760 / 1000000) : undefined,
              note: deviceResult?.details?.notes?.join('\n')
            } : device.reliability
          }
        })

        console.log(`📦 Unit ${unit.alias}:`, {
          hasResult: !!unitResult,
          failureRate: unitResult?.failureRate,
          std: unitResult?.std,
          fullDetails: unitResult?.details,
          note: unitResult?.details?.notes?.join('\n')
        })

        return {
          ...unit,
          children: updatedDevices,
          reliability: unitResult ? {
            failureRate: unitResult.failureRate,
            standardDeviation: unitResult.std,
            mtbf: unitResult.failureRate ? 1 / unitResult.failureRate * 1000000 : undefined,
            availability: unitResult.failureRate ? 1 - (unitResult.failureRate * 8760 / 1000000) : undefined,
            note: unitResult.details?.notes?.join('\n')
          } : unit.reliability
        }
      })

      console.log(`🏗️ System ${system.alias}:`, {
        hasResult: !!systemResult,
        failureRate: systemResult?.failureRate,
        std: systemResult?.std,
        fullDetails: systemResult?.details,
        note: systemResult?.details?.notes?.join('\n')
      })

      return {
        ...system,
        children: updatedUnits,
        reliability: systemResult ? {
          failureRate: systemResult.failureRate,
          standardDeviation: systemResult.std,
          mtbf: systemResult.failureRate ? 1 / systemResult.failureRate * 1000000 : undefined,
          availability: systemResult.failureRate ? 1 - (systemResult.failureRate * 8760 / 1000000) : undefined,
          note: systemResult.details?.notes?.join('\n') || ""
        } : system.reliability
      }
    })
  }

  return (
    <LayoutWrapper 
      onCalculate={handleCalculate} 
      isCalculating={isCalculating}
      onExportExcel={handleExportExcel}
      selectedCount={selectedNodes.size}
    >
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">RAMS Prediction System Example</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>프로젝트 구조</CardTitle>
              <CardDescription>
                ※ 현재 Telcordia-SR332만 구현된 상태입니다. Early-Life 구현 안됨.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-5rem)]">
              <PredictionTree
                systems={systems}
                onSelectionChange={handleSelectionChange}
                onSystemsChange={handleSystemsChange}
                className="h-full"
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <LoadingOverlay isVisible={isCalculating} message="신뢰성 계산 중..." />
    </LayoutWrapper>
  )
}
