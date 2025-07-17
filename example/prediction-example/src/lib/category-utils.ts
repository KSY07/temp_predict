import { TelcordiaCategory, TelcordiaCategories } from 'prediction'

/**
 * Find a category by ID with its full path information
 */
export function findCategoryByIdWithPath(categoryId: string): { 
  category: TelcordiaCategory; 
  path: string[]; 
  fullPath: string 
} | null {
  const searchWithPath = (
    categories: TelcordiaCategory[], 
    currentPath: string[] = []
  ): { category: TelcordiaCategory; path: string[]; fullPath: string } | null => {
    for (const cat of categories) {
      const newPath = [...currentPath, cat.name]
      
      if (cat.id === categoryId) {
        return {
          category: cat,
          path: newPath,
          fullPath: newPath.join(' > ')
        }
      }
      
      if (cat.subCategories && cat.subCategories.length > 0) {
        const found = searchWithPath(cat.subCategories, newPath)
        if (found) return found
      }
    }
    return null
  }
  
  return searchWithPath(TelcordiaCategories)
}

/**
 * Find the parent category of a specific category
 */
export function findCategoryParent(categoryId: string): TelcordiaCategory | null {
  const searchParent = (categories: TelcordiaCategory[]): TelcordiaCategory | null => {
    for (const cat of categories) {
      // Check if this category contains the target as a direct child
      if (cat.subCategories && cat.subCategories.some(sub => sub.id === categoryId)) {
        return cat
      }
      
      // Recursively search in subcategories
      if (cat.subCategories && cat.subCategories.length > 0) {
        const found = searchParent(cat.subCategories)
        if (found) return found
      }
    }
    return null
  }
  
  return searchParent(TelcordiaCategories)
}

/**
 * Get the full path array from root to a specific category
 */
export function getCategoryPath(category: TelcordiaCategory): string[] {
  const result = findCategoryByIdWithPath(category.id)
  return result ? result.path : [category.name]
}

/**
 * Get formatted full path string for a category
 */
export function getCategoryFullPath(category: TelcordiaCategory, separator: string = ' > '): string {
  const result = findCategoryByIdWithPath(category.id)
  return result ? result.fullPath : category.name
}

/**
 * Enhanced findCategoryById that also returns path information
 */
export function findCategoryById(categoryId: string): TelcordiaCategory | null {
  const result = findCategoryByIdWithPath(categoryId)
  return result ? result.category : null
}

/**
 * Get all ancestor categories of a specific category (from root to parent)
 */
export function getCategoryAncestors(categoryId: string): TelcordiaCategory[] {
  const result = findCategoryByIdWithPath(categoryId)
  if (!result) return []
  
  const ancestors: TelcordiaCategory[] = []
  let currentPath = []
  
  for (const pathName of result.path.slice(0, -1)) { // Exclude the category itself
    currentPath.push(pathName)
    const ancestorResult = findCategoryByPath(currentPath)
    if (ancestorResult) {
      ancestors.push(ancestorResult)
    }
  }
  
  return ancestors
}

/**
 * Find a category by its path array
 */
function findCategoryByPath(path: string[]): TelcordiaCategory | null {
  let current = TelcordiaCategories
  
  for (let i = 0; i < path.length; i++) {
    const found = current.find(cat => cat.name === path[i])
    if (!found) return null
    
    if (i === path.length - 1) {
      return found // This is the target category
    }
    
    current = found.subCategories || []
  }
  
  return null
}