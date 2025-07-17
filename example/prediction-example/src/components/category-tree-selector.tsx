"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TelcordiaCategory } from "prediction"
import { cn } from "@/lib/utils"

interface CategoryTreeSelectorProps {
  categories: TelcordiaCategory[]
  selectedCategoryId?: string
  onCategorySelect: (category: TelcordiaCategory) => void
  className?: string
}

interface CategoryNodeProps {
  category: TelcordiaCategory
  level: number
  selectedCategoryId?: string
  onCategorySelect: (category: TelcordiaCategory) => void
  expandedNodes: Set<string>
  onToggleExpand: (categoryId: string) => void
}

function CategoryNode({
  category,
  level,
  selectedCategoryId,
  onCategorySelect,
  expandedNodes,
  onToggleExpand
}: CategoryNodeProps) {
  const isExpanded = expandedNodes.has(category.id)
  const hasSubCategories = category.subCategories && category.subCategories.length > 0
  const isLeaf = !hasSubCategories
  const isSelected = selectedCategoryId === category.id

  const handleClick = () => {
    if (hasSubCategories) {
      onToggleExpand(category.id)
    } else {
      // Only leaf categories can be selected
      onCategorySelect(category)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-muted/50",
          isSelected && "bg-primary/10 text-primary",
          isLeaf && "hover:bg-primary/5"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {hasSubCategories ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )
        ) : (
          <div className="h-4 w-4" />
        )}
        
        <span className={cn(
          "flex-1 text-sm",
          isLeaf && "font-medium",
          !isLeaf && "text-muted-foreground"
        )}>
          {category.name}
        </span>
        
        {isLeaf && (
          <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
            사용가능
          </span>
        )}
      </div>
      
      {hasSubCategories && isExpanded && (
        <div>
          {category.subCategories!.map((subCategory) => (
            <CategoryNode
              key={subCategory.id}
              category={subCategory}
              level={level + 1}
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={onCategorySelect}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CategoryTreeSelector({
  categories,
  selectedCategoryId,
  onCategorySelect,
  className
}: CategoryTreeSelectorProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  const handleToggleExpand = (categoryId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedNodes(newExpanded)
  }

  const handleExpandAll = () => {
    const allNodeIds = new Set<string>()
    
    const collectNodeIds = (cats: TelcordiaCategory[]) => {
      cats.forEach(cat => {
        if (cat.subCategories && cat.subCategories.length > 0) {
          allNodeIds.add(cat.id)
          collectNodeIds(cat.subCategories)
        }
      })
    }
    
    collectNodeIds(categories)
    setExpandedNodes(allNodeIds)
  }

  const handleCollapseAll = () => {
    setExpandedNodes(new Set())
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2 mb-2">
        <Button variant="outline" size="sm" onClick={handleExpandAll}>
          모두 펼치기
        </Button>
        <Button variant="outline" size="sm" onClick={handleCollapseAll}>
          모두 접기
        </Button>
      </div>
      
      <ScrollArea className="h-[300px] w-full rounded-md border p-2">
        <div className="space-y-1">
          {categories.map((category) => (
            <CategoryNode
              key={category.id}
              category={category}
              level={0}
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={onCategorySelect}
              expandedNodes={expandedNodes}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}