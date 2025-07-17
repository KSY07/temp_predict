"use client"

import { createContext, useContext, ReactNode } from 'react'
import { PredictionStandard } from 'prediction'

export interface CalculationOptions {
  uclCalculated: boolean
  earlyLife: boolean
  predictionStandard: PredictionStandard
  confidenceLevel?: number
  method?: 'METHOD_I' | 'METHOD_II' | 'METHOD_III'
}

export interface CalculationContextType {
  onCalculate?: (options: CalculationOptions) => void
  isCalculating: boolean
}

const CalculationContext = createContext<CalculationContextType>({
  isCalculating: false
})

export const useCalculation = () => useContext(CalculationContext)

export function CalculationProvider({ children, value }: { children: ReactNode, value: CalculationContextType }) {
  return (
    <CalculationContext.Provider value={value}>
      {children}
    </CalculationContext.Provider>
  )
}