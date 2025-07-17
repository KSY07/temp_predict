"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { TreeState, TreeActions, SystemTreeNode, UnitTreeNode, DeviceTreeNode } from "@/types/prediction-tree"
import { PredictionTreeNode } from "./prediction-tree-node"
import { AddUnitModal } from "./modals/add-unit-modal"
import { AddDeviceModal } from "./modals/add-device-modal"
import { AddSystemModal } from "./modals/add-system-modal"
import { EditSystemModal } from "./modals/edit-system-modal"
import { EditUnitModal } from "./modals/edit-unit-modal"
import { EditDeviceModal } from "./modals/edit-device-modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Expand, Minimize, CheckSquare, Square } from "lucide-react"
import { cn } from "@/lib/utils"
import { TelcordiaUnit, TelcordiaDevice, TelcordiaSystem } from "prediction"

interface PredictionTreeProps {
  systems: SystemTreeNode[]
  className?: string
  onSelectionChange?: (selectedNodes: Set<string>) => void
  onSystemsChange?: (systems: SystemTreeNode[]) => void
}

export function PredictionTree({ 
  systems, 
  className,
  onSelectionChange,
  onSystemsChange 
}: PredictionTreeProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set())
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  
  // Modal states
  const [addSystemModalOpen, setAddSystemModalOpen] = useState(false)
  const [addUnitModalOpen, setAddUnitModalOpen] = useState(false)
  const [addDeviceModalOpen, setAddDeviceModalOpen] = useState(false)
  const [editSystemModalOpen, setEditSystemModalOpen] = useState(false)
  const [editUnitModalOpen, setEditUnitModalOpen] = useState(false)
  const [editDeviceModalOpen, setEditDeviceModalOpen] = useState(false)
  const [selectedSystemForUnit, setSelectedSystemForUnit] = useState<SystemTreeNode | null>(null)
  const [selectedUnitForDevice, setSelectedUnitForDevice] = useState<UnitTreeNode | null>(null)
  const [selectedSystemForEdit, setSelectedSystemForEdit] = useState<SystemTreeNode | null>(null)
  const [selectedUnitForEdit, setSelectedUnitForEdit] = useState<UnitTreeNode | null>(null)
  const [selectedDeviceForEdit, setSelectedDeviceForEdit] = useState<DeviceTreeNode | null>(null)

  // Filter nodes based on search term
  const filteredSystems = useMemo(() => {
    if (!searchTerm.trim()) return systems

    const filterNode = (node: SystemTreeNode | UnitTreeNode | DeviceTreeNode): boolean => {
      const matchesSearch = node.alias.toLowerCase().includes(searchTerm.toLowerCase())
      
      if ('children' in node && node.children.length > 0) {
        const hasMatchingChildren = node.children.some(child => filterNode(child as any))
        return matchesSearch || hasMatchingChildren
      }
      
      return matchesSearch
    }

    return systems.filter(system => filterNode(system))
  }, [systems, searchTerm])

  // Tree actions
  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }, [])

  const toggleSelect = useCallback((nodeId: string, multiSelect = false) => {
    setSelectedNodes(prev => {
      const newSet: Set<string> = multiSelect ? new Set(prev) : new Set<string>()
      
      if (prev.has(nodeId) && multiSelect) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      
      return newSet
    })
  }, [])

  const expandAll = useCallback(() => {
    const allNodeIds = new Set<string>()
    
    const collectNodeIds = (node: SystemTreeNode | UnitTreeNode | DeviceTreeNode) => {
      allNodeIds.add(node.id)
      if ('children' in node && node.children.length > 0) {
        node.children.forEach(child => collectNodeIds(child as any))
      }
    }
    
    systems.forEach(collectNodeIds)
    setExpandedNodes(allNodeIds)
  }, [systems])

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set())
  }, [])

  const selectAll = useCallback(() => {
    const allNodeIds = new Set<string>()
    
    const collectNodeIds = (node: SystemTreeNode | UnitTreeNode | DeviceTreeNode) => {
      allNodeIds.add(node.id)
      if ('children' in node && node.children.length > 0) {
        node.children.forEach(child => collectNodeIds(child as any))
      }
    }
    
    filteredSystems.forEach(collectNodeIds)
    setSelectedNodes(allNodeIds)
  }, [filteredSystems])

  const clearSelection = useCallback(() => {
    setSelectedNodes(new Set())
  }, [])

  // Effect to notify parent of selection changes
  useEffect(() => {
    onSelectionChange?.(selectedNodes)
  }, [selectedNodes, onSelectionChange])

  // Modal handlers
  const handleOpenAddSystemModal = useCallback(() => {
    setAddSystemModalOpen(true)
  }, [])

  const handleOpenAddUnitModal = useCallback((system: SystemTreeNode) => {
    setSelectedSystemForUnit(system)
    setAddUnitModalOpen(true)
  }, [])

  const handleOpenAddDeviceModal = useCallback((unit: UnitTreeNode) => {
    setSelectedUnitForDevice(unit)
    setAddDeviceModalOpen(true)
  }, [])

  const handleCloseAddSystemModal = useCallback(() => {
    setAddSystemModalOpen(false)
  }, [])

  const handleCloseAddUnitModal = useCallback(() => {
    setAddUnitModalOpen(false)
    setSelectedSystemForUnit(null)
  }, [])

  const handleCloseAddDeviceModal = useCallback(() => {
    setAddDeviceModalOpen(false)
    setSelectedUnitForDevice(null)
  }, [])

  // Edit modal handlers
  const handleOpenEditSystemModal = useCallback((system: SystemTreeNode) => {
    setSelectedSystemForEdit(system)
    setEditSystemModalOpen(true)
  }, [])

  const handleOpenEditUnitModal = useCallback((unit: UnitTreeNode) => {
    setSelectedUnitForEdit(unit)
    setEditUnitModalOpen(true)
  }, [])

  const handleOpenEditDeviceModal = useCallback((device: DeviceTreeNode) => {
    setSelectedDeviceForEdit(device)
    setEditDeviceModalOpen(true)
  }, [])

  const handleCloseEditSystemModal = useCallback(() => {
    setEditSystemModalOpen(false)
    setSelectedSystemForEdit(null)
  }, [])

  const handleCloseEditUnitModal = useCallback(() => {
    setEditUnitModalOpen(false)
    setSelectedUnitForEdit(null)
  }, [])

  const handleCloseEditDeviceModal = useCallback(() => {
    setEditDeviceModalOpen(false)
    setSelectedDeviceForEdit(null)
  }, [])

  // Node addition handlers
  const handleAddSystem = useCallback((system: TelcordiaSystem) => {
    const newSystemNode: SystemTreeNode = {
      id: system.id,
      alias: system.alias,
      type: 'system',
      expanded: false,
      selected: false,
      data: system,
      children: []
    }

    const updatedSystems = [...systems, newSystemNode]
    onSystemsChange?.(updatedSystems)
  }, [systems, onSystemsChange])

  const handleAddUnit = useCallback((unit: TelcordiaUnit, parentSystemId: string) => {
    const newUnitNode: UnitTreeNode = {
      id: unit.id,
      alias: unit.alias,
      type: 'unit',
      expanded: false,
      selected: false,
      data: unit,
      children: [],
      parent: null as any // Will be set below
    }

    const updatedSystems = systems.map(system => {
      if (system.id === parentSystemId) {
        const updatedSystem = {
          ...system,
          children: [...system.children, newUnitNode]
        }
        newUnitNode.parent = updatedSystem
        return updatedSystem
      }
      return system
    })

    onSystemsChange?.(updatedSystems)
  }, [systems, onSystemsChange])

  const handleAddDevice = useCallback((device: TelcordiaDevice, parentUnitId: string) => {
    const newDeviceNode: DeviceTreeNode = {
      id: device.id,
      alias: device.alias,
      type: 'device',
      expanded: false,
      selected: false,
      data: device,
      children: [] as never[],
      parent: null as any // Will be set below
    }

    const updatedSystems = systems.map(system => {
      const updatedUnits = system.children.map(unit => {
        if (unit.id === parentUnitId) {
          const updatedUnit = {
            ...unit,
            children: [...unit.children, newDeviceNode]
          }
          newDeviceNode.parent = updatedUnit
          return updatedUnit
        }
        return unit
      })

      return {
        ...system,
        children: updatedUnits
      }
    })

    onSystemsChange?.(updatedSystems)
  }, [systems, onSystemsChange])

  // Node update handlers
  const handleUpdateSystem = useCallback((systemId: string, alias: string) => {
    const updatedSystems = systems.map(system => {
      if (system.id === systemId) {
        system.data.alias = alias
        return {
          ...system,
          alias: alias
        }
      }
      return system
    })

    onSystemsChange?.(updatedSystems)
  }, [systems, onSystemsChange])

  const handleUpdateUnit = useCallback((unitId: string, alias: string, environmentFactor: number) => {
    const updatedSystems = systems.map(system => {
      const updatedUnits = system.children.map(unit => {
        if (unit.id === unitId) {
          unit.data.alias = alias
          unit.data.environmentFactor = environmentFactor
          return {
            ...unit,
            alias: alias
          }
        }
        return unit
      })

      return {
        ...system,
        children: updatedUnits
      }
    })

    onSystemsChange?.(updatedSystems)
  }, [systems, onSystemsChange])

  const handleUpdateDevice = useCallback((deviceId: string, alias: string, specifications: Record<string, any>) => {
    const updatedSystems = systems.map(system => {
      const updatedUnits = system.children.map(unit => {
        const updatedDevices = unit.children.map(device => {
          if (device.id === deviceId) {
            device.data.alias = alias
            device.data.specifications = specifications
            return {
              ...device,
              alias: alias
            }
          }
          return device
        })

        return {
          ...unit,
          children: updatedDevices
        }
      })

      return {
        ...system,
        children: updatedUnits
      }
    })

    onSystemsChange?.(updatedSystems)
  }, [systems, onSystemsChange])

  // Node deletion handlers
  const handleDeleteSystem = useCallback((systemId: string) => {
    const updatedSystems = systems.filter(system => system.id !== systemId)
    onSystemsChange?.(updatedSystems)
    
    // Remove from selected nodes if it was selected
    setSelectedNodes(prev => {
      const newSet = new Set(prev)
      const collectNodeIds = (node: SystemTreeNode | UnitTreeNode | DeviceTreeNode) => {
        newSet.delete(node.id)
        if ('children' in node && node.children.length > 0) {
          node.children.forEach(child => collectNodeIds(child as any))
        }
      }
      
      const systemToDelete = systems.find(s => s.id === systemId)
      if (systemToDelete) {
        collectNodeIds(systemToDelete)
      }
      
      return newSet
    })
  }, [systems, onSystemsChange])

  const handleDeleteUnit = useCallback((unitId: string) => {
    const updatedSystems = systems.map(system => {
      const updatedUnits = system.children.filter(unit => unit.id !== unitId)
      return {
        ...system,
        children: updatedUnits
      }
    })

    onSystemsChange?.(updatedSystems)
    
    // Remove from selected nodes if it was selected
    setSelectedNodes(prev => {
      const newSet = new Set(prev)
      const collectNodeIds = (node: UnitTreeNode | DeviceTreeNode) => {
        newSet.delete(node.id)
        if ('children' in node && node.children.length > 0) {
          node.children.forEach(child => collectNodeIds(child as any))
        }
      }
      
      systems.forEach(system => {
        const unitToDelete = system.children.find(u => u.id === unitId)
        if (unitToDelete) {
          collectNodeIds(unitToDelete)
        }
      })
      
      return newSet
    })
  }, [systems, onSystemsChange])

  const handleDeleteDevice = useCallback((deviceId: string) => {
    const updatedSystems = systems.map(system => {
      const updatedUnits = system.children.map(unit => {
        const updatedDevices = unit.children.filter(device => device.id !== deviceId)
        return {
          ...unit,
          children: updatedDevices
        }
      })

      return {
        ...system,
        children: updatedUnits
      }
    })

    onSystemsChange?.(updatedSystems)
    
    // Remove from selected nodes if it was selected
    setSelectedNodes(prev => {
      const newSet = new Set(prev)
      newSet.delete(deviceId)
      return newSet
    })
  }, [systems, onSystemsChange])

  // Update node states based on current selections and expansions
  const enhancedSystems = useMemo(() => {
    const updateNodeState = (node: any): any => {
      const isSelected = selectedNodes.has(node.id)
      const isExpanded = expandedNodes.has(node.id)
      
      const updatedNode = {
        ...node,
        selected: isSelected,
        expanded: isExpanded
      }
      
      if ('children' in node && node.children.length > 0) {
        updatedNode.children = node.children.map(updateNodeState)
      }
      
      return updatedNode
    }
    
    return filteredSystems.map(updateNodeState)
  }, [filteredSystems, selectedNodes, expandedNodes])

  // Right-click handler for empty space
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    
    // Check if the click was on empty space (not on a tree node)
    const target = e.target as HTMLElement
    const isEmptySpace = target.closest('[data-tree-node]') === null
    
    if (isEmptySpace) {
      handleOpenAddSystemModal()
    }
  }, [handleOpenAddSystemModal])

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header with Search and Actions */}
      <div className="space-y-4 p-4 border-b">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="시스템, 유닛, 장치 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            <Expand className="h-4 w-4 mr-2" />
            모두 펼치기
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            <Minimize className="h-4 w-4 mr-2" />
            모두 접기
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm" onClick={selectAll}>
            <CheckSquare className="h-4 w-4 mr-2" />
            모두 선택
          </Button>
          <Button variant="outline" size="sm" onClick={clearSelection}>
            <Square className="h-4 w-4 mr-2" />
            선택 해제
          </Button>
        </div>

        {/* Selection Summary */}
        {selectedNodes.size > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">
              {selectedNodes.size}개 선택됨
            </Badge>
          </div>
        )}
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-auto p-2" onContextMenu={handleContextMenu}>
        {enhancedSystems.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            {searchTerm ? '일치하는 항목이 없습니다' : '시스템이 없습니다'}
          </div>
        ) : (
          <div className="space-y-1">
            {enhancedSystems.map((system) => (
              <div key={system.id} data-tree-node>
                <PredictionTreeNode
                  node={system}
                  level={0}
                  onToggleExpand={toggleExpand}
                  onToggleSelect={toggleSelect}
                  onOpenAddUnitModal={handleOpenAddUnitModal}
                  onOpenAddDeviceModal={handleOpenAddDeviceModal}
                  onOpenEditSystemModal={handleOpenEditSystemModal}
                  onOpenEditUnitModal={handleOpenEditUnitModal}
                  onOpenEditDeviceModal={handleOpenEditDeviceModal}
                  onDeleteSystem={handleDeleteSystem}
                  onDeleteUnit={handleDeleteUnit}
                  onDeleteDevice={handleDeleteDevice}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddSystemModal
        open={addSystemModalOpen}
        onClose={handleCloseAddSystemModal}
        onAddSystem={handleAddSystem}
      />

      <AddUnitModal
        open={addUnitModalOpen}
        onClose={handleCloseAddUnitModal}
        parentSystem={selectedSystemForUnit}
        onAddUnit={handleAddUnit}
      />

      <AddDeviceModal
        open={addDeviceModalOpen}
        onClose={handleCloseAddDeviceModal}
        parentUnit={selectedUnitForDevice}
        onAddDevice={handleAddDevice}
      />

      <EditSystemModal
        open={editSystemModalOpen}
        onClose={handleCloseEditSystemModal}
        system={selectedSystemForEdit}
        onUpdateSystem={handleUpdateSystem}
      />

      <EditUnitModal
        open={editUnitModalOpen}
        onClose={handleCloseEditUnitModal}
        unit={selectedUnitForEdit}
        onUpdateUnit={handleUpdateUnit}
      />

      <EditDeviceModal
        open={editDeviceModalOpen}
        onClose={handleCloseEditDeviceModal}
        device={selectedDeviceForEdit}
        onUpdateDevice={handleUpdateDevice}
      />
    </div>
  )
}