"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { TreeNode, TreeNodeType, SystemTreeNode, UnitTreeNode, DeviceTreeNode } from "@/types/prediction-tree"
import { ChevronDown, ChevronRight, Folder, FolderOpen, Settings, Cpu, Monitor, Plus, Edit, MoreHorizontal, Info, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface TreeNodeProps {
  node: TreeNode
  level: number
  onToggleExpand: (nodeId: string) => void
  onToggleSelect: (nodeId: string, multiSelect?: boolean) => void
  onOpenAddUnitModal?: (system: SystemTreeNode) => void
  onOpenAddDeviceModal?: (unit: UnitTreeNode) => void
  onOpenEditSystemModal?: (system: SystemTreeNode) => void
  onOpenEditUnitModal?: (unit: UnitTreeNode) => void
  onOpenEditDeviceModal?: (device: DeviceTreeNode) => void
  className?: string
}

const getNodeIcon = (type: TreeNodeType, expanded: boolean) => {
  switch (type) {
    case 'system':
      return expanded ? <FolderOpen className="h-4 w-4 text-blue-600" /> : <Folder className="h-4 w-4 text-blue-600" />
    case 'unit':
      return <Cpu className="h-4 w-4 text-green-600" />
    case 'device':
      return <Monitor className="h-4 w-4 text-orange-600" />
  }
}

const getNodeTypeLabel = (type: TreeNodeType) => {
  switch (type) {
    case 'system':
      return '시스템'
    case 'unit':
      return '유닛'
    case 'device':
      return '장치'
  }
}

export function PredictionTreeNode({ 
  node, 
  level, 
  onToggleExpand, 
  onToggleSelect,
  onOpenAddUnitModal,
  onOpenAddDeviceModal,
  onOpenEditSystemModal,
  onOpenEditUnitModal,
  onOpenEditDeviceModal,
  className 
}: TreeNodeProps) {
  const [showNoteModal, setShowNoteModal] = useState(false)
  const hasChildren = 'children' in node && node.children.length > 0
  const indent = level * 20

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleSelect(node.id, e.ctrlKey || e.metaKey)
  }

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasChildren) {
      onToggleExpand(node.id)
    }
  }

  const handleAddUnit = () => {
    if (node.type === 'system' && onOpenAddUnitModal) {
      onOpenAddUnitModal(node as SystemTreeNode)
    }
  }

  const handleAddDevice = () => {
    if (node.type === 'unit' && onOpenAddDeviceModal) {
      onOpenAddDeviceModal(node as UnitTreeNode)
    }
  }

  const handleEditSystem = () => {
    if (node.type === 'system' && onOpenEditSystemModal) {
      onOpenEditSystemModal(node as SystemTreeNode)
    }
  }

  const handleEditUnit = () => {
    if (node.type === 'unit' && onOpenEditUnitModal) {
      onOpenEditUnitModal(node as UnitTreeNode)
    }
  }

  const handleEditDevice = () => {
    if (node.type === 'device' && onOpenEditDeviceModal) {
      onOpenEditDeviceModal(node as DeviceTreeNode)
    }
  }

  const handleShowNote = () => {
    setShowNoteModal(true)
  }

  const renderContextMenu = () => {
    if (node.type === 'system') {
      return (
        <ContextMenuContent>
          <ContextMenuItem onClick={handleEditSystem}>
            <Edit className="mr-2 h-4 w-4" />
            시스템 편집
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleAddUnit}>
            <Plus className="mr-2 h-4 w-4" />
            유닛 추가
          </ContextMenuItem>
          {node.reliability?.note && (
            <>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={handleShowNote}>
                <FileText className="mr-2 h-4 w-4" />
                Note 확인
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      )
    }
    
    if (node.type === 'unit') {
      return (
        <ContextMenuContent>
          <ContextMenuItem onClick={handleEditUnit}>
            <Edit className="mr-2 h-4 w-4" />
            유닛 편집
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleAddDevice}>
            <Plus className="mr-2 h-4 w-4" />
            장치 추가
          </ContextMenuItem>
          {node.reliability?.note && (
            <>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={handleShowNote}>
                <FileText className="mr-2 h-4 w-4" />
                Note 확인
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      )
    }
    
    if (node.type === 'device') {
      return (
        <ContextMenuContent>
          <ContextMenuItem onClick={handleEditDevice}>
            <Edit className="mr-2 h-4 w-4" />
            장치 편집
          </ContextMenuItem>
          {node.reliability?.note && (
            <>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={handleShowNote}>
                <FileText className="mr-2 h-4 w-4" />
                Note 확인
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      )
    }
    
    return null
  }

  const nodeContent = (
    <div className={cn("select-none", className)}>
      <Collapsible open={node.expanded}>
        <div 
          className={cn(
            "flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors min-h-[2.5rem]",
            node.selected && "bg-blue-50 border border-blue-200"
          )}
          style={{ paddingLeft: `${8 + indent}px` }}
          onClick={handleSelect}
        >
          {/* Expand/Collapse Button */}
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 shrink-0"
              onClick={handleExpand}
              disabled={!hasChildren}
            >
              {hasChildren ? (
                node.expanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )
              ) : (
                <div className="h-3 w-3" />
              )}
            </Button>
          </CollapsibleTrigger>

          {/* Node Icon */}
          {getNodeIcon(node.type, node.expanded)}

          {/* Node Label */}
          <span className="flex-1 text-sm font-medium truncate">
            {node.alias}
          </span>

          {/* Node Type Badge */}
          <Badge variant="outline" className="text-xs shrink-0">
            {getNodeTypeLabel(node.type)}
          </Badge>

          {/* Reliability Metrics */}
          {node.reliability && (node.reliability.failureRate || node.reliability.mtbf) && (
            <div className="flex gap-1 text-xs shrink-0 ml-2">
              {node.reliability.failureRate && (
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-200 font-mono">
                  λ: {node.reliability.failureRate.toExponential(2)}
                  {node.reliability.standardDeviation && (
                    <span className="ml-1 text-blue-600">
                      (σ: {node.reliability.standardDeviation.toExponential(2)})
                    </span>
                  )}
                </span>
              )}
              {node.reliability.mtbf && (
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-200 font-mono">
                  MTBF: {node.reliability.mtbf.toLocaleString()}h
                </span>
              )}
              {node.reliability.availability && (
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded-md border border-red-200 font-mono">
                  A: {(node.reliability.availability * 100).toFixed(4)}%
                </span>
              )}
            </div>
          )}
        </div>

        {/* Children */}
        {hasChildren && (
          <CollapsibleContent className="space-y-0">
            {'children' in node && node.children.map((child) => (
              <PredictionTreeNode
                key={child.id}
                node={child}
                level={level + 1}
                onToggleExpand={onToggleExpand}
                onToggleSelect={onToggleSelect}
                onOpenAddUnitModal={onOpenAddUnitModal}
                onOpenAddDeviceModal={onOpenAddDeviceModal}
                onOpenEditSystemModal={onOpenEditSystemModal}
                onOpenEditUnitModal={onOpenEditUnitModal}
                onOpenEditDeviceModal={onOpenEditDeviceModal}
              />
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  )

  // Show context menu for all node types
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          {nodeContent}
        </ContextMenuTrigger>
        {renderContextMenu()}
      </ContextMenu>

      {/* Note Modal */}
      <Dialog open={showNoteModal} onOpenChange={setShowNoteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              계산 노트
            </DialogTitle>
            <DialogDescription>
              {node.alias} ({getNodeTypeLabel(node.type)})
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="bg-gray-50 rounded-md p-3">
              <h4 className="text-sm font-medium mb-2">계산 노트:</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {node.reliability?.note || '노트가 없습니다.'}
              </p>
            </div>
            {node.reliability && (node.reliability.failureRate || node.reliability.mtbf) && (
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                {node.reliability.failureRate && (
                  <div>
                    <span className="font-medium">고장률 (λ):</span>
                    <div className="font-mono text-blue-600">
                      {node.reliability.failureRate.toExponential(2)} /h
                    </div>
                  </div>
                )}
                {node.reliability.mtbf && (
                  <div>
                    <span className="font-medium">MTBF:</span>
                    <div className="font-mono text-green-600">
                      {node.reliability.mtbf.toLocaleString()} h
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}