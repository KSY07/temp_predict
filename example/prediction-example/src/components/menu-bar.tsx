"use client"

import { Button } from "@/components/ui/button"
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { FileDown, FileSpreadsheet, Save, FolderOpen, Settings } from "lucide-react"

interface MenuBarProps {
  onExportExcel?: () => void
  onSaveProject?: () => void
  onOpenProject?: () => void
  onSettings?: () => void
  selectedCount?: number
}

export function MenuBar({ 
  onExportExcel, 
  onSaveProject, 
  onOpenProject,
  onSettings,
  selectedCount = 0 
}: MenuBarProps) {
  return (
    <div className="border-b bg-background min-h-12 flex items-center">
      <Menubar className="rounded-none border-none h-10 w-full">
        <MenubarMenu>
          <MenubarTrigger>파일</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={onOpenProject}>
              <FolderOpen className="mr-2 h-4 w-4" />
              프로젝트 열기
              <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={onSaveProject}>
              <Save className="mr-2 h-4 w-4" />
              프로젝트 저장
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem 
              onClick={onExportExcel}
              disabled={selectedCount === 0}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel로 내보내기
              {selectedCount > 0 && (
                <span className="ml-auto text-xs text-muted-foreground">
                  ({selectedCount}개 선택됨)
                </span>
              )}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>편집</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              실행 취소
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              다시 실행
              <MenubarShortcut>⌘Y</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger>도구</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={onSettings}>
              <Settings className="mr-2 h-4 w-4" />
              설정
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <div className="ml-auto flex items-center px-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onExportExcel}
            disabled={selectedCount === 0}
            className="gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Excel 내보내기
            {selectedCount > 0 && (
              <span className="text-xs text-muted-foreground">
                ({selectedCount})
              </span>
            )}
          </Button>
        </div>
      </Menubar>
    </div>
  )
}