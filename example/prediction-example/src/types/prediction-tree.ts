import { TelcordiaSystem, TelcordiaUnit, TelcordiaDevice, TelcordiaCategory } from 'prediction'

export type TreeNodeType = 'system' | 'unit' | 'device'

export interface TreeNodeData {
  id: string
  alias: string
  type: TreeNodeType
  expanded: boolean
  selected: boolean
  reliability?: {
    failureRate?: number
    standardDeviation?: number
    mtbf?: number
    availability?: number
    note?: string
  }
}

export interface SystemTreeNode extends TreeNodeData {
  type: 'system'
  data: TelcordiaSystem
  children: UnitTreeNode[]
}

export interface UnitTreeNode extends TreeNodeData {
  type: 'unit'
  data: TelcordiaUnit
  children: DeviceTreeNode[]
  parent: SystemTreeNode
}

export interface DeviceTreeNode extends TreeNodeData {
  type: 'device'
  data: TelcordiaDevice
  children: never[]
  parent: UnitTreeNode
}

export type TreeNode = SystemTreeNode | UnitTreeNode | DeviceTreeNode

export interface TreeState {
  nodes: SystemTreeNode[]
  selectedNodes: Set<string>
  expandedNodes: Set<string>
}

export interface TreeActions {
  toggleExpand: (nodeId: string) => void
  toggleSelect: (nodeId: string, multiSelect?: boolean) => void
  expandAll: () => void
  collapseAll: () => void
  selectAll: () => void
  clearSelection: () => void
}