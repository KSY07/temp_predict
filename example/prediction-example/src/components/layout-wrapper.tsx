"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { CalculationProvider, CalculationOptions } from "@/contexts/calculation-context"
import { MenuBar } from "@/components/menu-bar"

interface LayoutWrapperProps {
  children: React.ReactNode
  onCalculate: (options: CalculationOptions) => void
  isCalculating: boolean
  onExportExcel?: () => void
  selectedCount?: number
}

export function LayoutWrapper({ children, onCalculate, isCalculating, onExportExcel, selectedCount = 0 }: LayoutWrapperProps) {
  return (
    <CalculationProvider value={{ onCalculate, isCalculating }}>
      <div className="flex flex-col h-screen">
        <MenuBar 
          onExportExcel={onExportExcel}
          selectedCount={selectedCount}
        />
        <div className="flex-1 flex overflow-hidden">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-12 shrink-0 items-center gap-2 border-b">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                </div>
              </header>
              <main className="flex-1 overflow-hidden">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </CalculationProvider>
  )
}