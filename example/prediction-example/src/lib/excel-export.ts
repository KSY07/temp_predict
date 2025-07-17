import * as XLSX from 'xlsx'
import { TreeNode, SystemTreeNode, UnitTreeNode, DeviceTreeNode } from '@/types/prediction-tree'

interface ExcelRow {
  level: number
  type: string
  name: string
  failureRate?: string
  standardDeviation?: string
  mtbf?: string
  availability?: string
  note?: string
}

function getNodeTypeLabel(type: 'system' | 'unit' | 'device'): string {
  switch (type) {
    case 'system':
      return '시스템'
    case 'unit':
      return '유닛'
    case 'device':
      return '장치'
  }
}

function flattenTreeNodes(
  nodes: TreeNode[], 
  selectedNodes: Set<string>, 
  level: number = 0,
  parentSelected: boolean = false
): ExcelRow[] {
  const rows: ExcelRow[] = []

  for (const node of nodes) {
    const isSelected = selectedNodes.has(node.id)
    const shouldInclude = isSelected || parentSelected
    
    if (shouldInclude) {
      const row: ExcelRow = {
        level,
        type: getNodeTypeLabel(node.type),
        name: node.alias,
        failureRate: node.reliability?.failureRate 
          ? node.reliability.failureRate.toExponential(4)
          : '-',
        standardDeviation: node.reliability?.standardDeviation 
          ? node.reliability.standardDeviation.toExponential(4)
          : '-',
        mtbf: node.reliability?.mtbf 
          ? `${node.reliability.mtbf.toLocaleString()} h`
          : '-',
        availability: node.reliability?.availability 
          ? `${(node.reliability.availability * 100).toFixed(4)}%`
          : '-',
        note: node.reliability?.note || '-'
      }
      rows.push(row)
    }

    // Recursively process children
    // If parent is selected, include all children regardless of their selection
    if ('children' in node && node.children.length > 0) {
      const childRows = flattenTreeNodes(
        node.children as TreeNode[], 
        selectedNodes, 
        level + 1,
        shouldInclude || isSelected
      )
      rows.push(...childRows)
    }
  }

  return rows
}

export function exportToExcel(
  systems: SystemTreeNode[], 
  selectedNodes: Set<string>,
  filename: string = 'reliability_export.xlsx'
) {
  // Flatten the tree structure
  const rows = flattenTreeNodes(systems, selectedNodes)

  if (rows.length === 0) {
    console.warn('No nodes selected for export')
    return
  }

  // Create worksheet data with headers
  const wsData = [
    ['레벨', '유형', '이름', '고장률 (λ)', '표준편차 (σ)', 'MTBF', '가용성', '노트'],
  ]

  // Add data rows with hierarchical structure
  rows.forEach(row => {
    let levelIndicator = ''
    if (row.level === 1) {
      levelIndicator = '├─ '
    } else if (row.level === 2) {
      levelIndicator = '│  └─ '
    }
    
    wsData.push([
      `L${row.level}`,
      row.type,
      levelIndicator + row.name,
      row.failureRate,
      row.standardDeviation,
      row.mtbf,
      row.availability,
      row.note
    ])
  })

  // Create workbook
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(wsData)

  // Set column widths
  const colWidths = [
    { wch: 6 },  // Level
    { wch: 10 }, // Type
    { wch: 40 }, // Name (with indentation)
    { wch: 15 }, // Failure Rate
    { wch: 15 }, // Standard Deviation
    { wch: 15 }, // MTBF
    { wch: 12 }, // Availability
    { wch: 50 }, // Note
  ]
  ws['!cols'] = colWidths

  // Add conditional formatting for hierarchy levels
  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:H1')
  for (let rowNum = 1; rowNum <= range.e.r; rowNum++) {
    const levelCell = ws[XLSX.utils.encode_cell({ r: rowNum, c: 0 })]
    if (levelCell && levelCell.v) {
      const level = parseInt(levelCell.v.toString().replace('L', ''))
      // You can add more styling here if needed
    }
  }

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, '신뢰성 데이터')

  // Create summary sheet
  const summaryData = [
    ['내보내기 정보'],
    [''],
    ['총 항목 수:', rows.length.toString()],
    ['시스템 수:', rows.filter(r => r.type === '시스템').length.toString()],
    ['유닛 수:', rows.filter(r => r.type === '유닛').length.toString()],
    ['장치 수:', rows.filter(r => r.type === '장치').length.toString()],
    [''],
    ['선택된 노드:', Array.from(selectedNodes).length.toString()],
    ['계층 구조:', '시스템 선택 시 하위 모든 항목 포함'],
    [''],
    ['내보내기 일시:', new Date().toLocaleString('ko-KR')],
  ]

  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData)
  summaryWs['!cols'] = [{ wch: 20 }, { wch: 30 }]
  
  XLSX.utils.book_append_sheet(wb, summaryWs, '요약')

  // Write file
  XLSX.writeFile(wb, filename)
}

export function exportAllToExcel(
  systems: SystemTreeNode[], 
  filename: string = 'reliability_export_all.xlsx'
) {
  // Create a set with all node IDs
  const allNodeIds = new Set<string>()
  
  function collectAllIds(nodes: TreeNode[]) {
    nodes.forEach(node => {
      allNodeIds.add(node.id)
      if ('children' in node) {
        collectAllIds(node.children as TreeNode[])
      }
    })
  }
  
  collectAllIds(systems)
  exportToExcel(systems, allNodeIds, filename)
}