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
  onNewProject?: () => void
  onOpenProject?: () => void
  onSaveProject?: () => void
  onImportExcel?: () => void
  onSettings?: () => void
  selectedCount?: number
}

export function LayoutWrapper({ 
  children, 
  onCalculate, 
  isCalculating, 
  onExportExcel, 
  onNewProject,
  onOpenProject,
  onSaveProject,
  onImportExcel,
  onSettings,
  selectedCount = 0 
}: LayoutWrapperProps) {
  return (
    <CalculationProvider value={{ onCalculate, isCalculating }}>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex overflow-hidden">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <MenuBar 
                onExportExcel={onExportExcel}
                onNewProject={onNewProject}
                onOpenProject={onOpenProject}
                onSaveProject={onSaveProject}
                onImportExcel={onImportExcel}
                onSettings={onSettings}
                selectedCount={selectedCount}
              />
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