"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { PredictionStandard } from "prediction"
import { Calculator, Play } from "lucide-react"
import { useCalculation } from "@/contexts/calculation-context"

export function AppSidebar() {
  const { onCalculate, isCalculating } = useCalculation()
  const [uclCalculated, setUclCalculated] = useState(false)
  const [earlyLife, setEarlyLife] = useState(false)
  const [confidenceLevel, setConfidenceLevel] = useState("95")
  const [method, setMethod] = useState<'METHOD_I' | 'METHOD_II' | 'METHOD_III'>('METHOD_I')
  const [predictionStandard, setPredictionStandard] = useState<PredictionStandard>(
    PredictionStandard.TELCORDIA_SR_332
  )

  const handleCalculate = () => {
    if (onCalculate) {
      onCalculate({
        uclCalculated,
        earlyLife,
        predictionStandard,
        method,
        confidenceLevel: parseFloat(confidenceLevel) / 100 // Convert percentage to decimal
      })
    }
  }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Calculate Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center justify-between w-full">
                    <Label htmlFor="ucl-calculated" className="cursor-pointer">
                      UCL Calculated
                    </Label>
                    <Switch
                      id="ucl-calculated"
                      checked={uclCalculated}
                      onCheckedChange={setUclCalculated}
                    />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {uclCalculated && (
                <SidebarMenuItem>
                  <div className="px-3 py-2">
                    <Label htmlFor="confidence-level" className="text-sm font-medium mb-2 block">
                      Confidence Level (%)
                    </Label>
                    <Input
                      id="confidence-level"
                      type="number"
                      min="50"
                      max="99"
                      step="1"
                      value={confidenceLevel}
                      onChange={(e) => setConfidenceLevel(e.target.value)}
                      className="w-full"
                      placeholder="95"
                    />
                  </div>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center justify-between w-full">
                    <Label htmlFor="early-life" className="cursor-pointer">
                      Early-Life
                    </Label>
                    <Switch
                      id="early-life"
                      checked={earlyLife}
                      onCheckedChange={setEarlyLife}
                    />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="px-3 py-2">
                  <Label htmlFor="calculation-method" className="text-sm font-medium mb-2 block">
                    Calculation Method
                  </Label>
                  <Select
                    value={method}
                    onValueChange={(value) => setMethod(value as 'METHOD_I' | 'METHOD_II' | 'METHOD_III')}
                  >
                    <SelectTrigger id="calculation-method" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="METHOD_I">
                        Method I
                      </SelectItem>
                      <SelectItem value="METHOD_II">
                        Method II
                      </SelectItem>
                      <SelectItem value="METHOD_III">
                        Method III
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="px-3 py-2">
                  <Label htmlFor="prediction-standard" className="text-sm font-medium mb-2 block">
                    Prediction Standard
                  </Label>
                  <Select
                    value={predictionStandard}
                    onValueChange={(value) => setPredictionStandard(value as PredictionStandard)}
                  >
                    <SelectTrigger id="prediction-standard" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PredictionStandard.TELCORDIA_SR_332}>
                        TELCORDIA SR-332 Issue4
                      </SelectItem>
                      <SelectItem value={PredictionStandard.SIEMENS_SN29500}>
                        SIEMENS SN29500
                      </SelectItem>
                      <SelectItem value={PredictionStandard.MIL_STD_217F}>
                        Military Standard 217F
                      </SelectItem>
                      <SelectItem value={PredictionStandard.NSWC_10}>
                        NSWC-10
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="px-3 py-2">
                  <Button 
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full"
                    size="sm"
                  >
                    {isCalculating ? (
                      <>
                        <Play className="mr-2 h-4 w-4 animate-spin" />
                        계산 중...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        신뢰성 계산
                      </>
                    )}
                  </Button>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}