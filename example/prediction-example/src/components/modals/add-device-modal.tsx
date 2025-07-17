"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { TelcordiaDevice, TelcordiaQualityFactor, TelcordiaCategory, SpecificationBase, TelcordiaCategories } from "prediction"
import { UnitTreeNode } from "@/types/prediction-tree"
import { predictionService } from "@/lib/prediction-service"
import { CategoryTreeSelector } from "@/components/category-tree-selector"
import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Helper function to get Korean name and description for specifications
const getSpecificationKoreanInfo = (spec: SpecificationBase) => {
  // Common specification translations
  const translations: Record<string, { koreanName: string; koreanDescription: string }> = {
    'temperature': {
      koreanName: '온도',
      koreanDescription: '장치가 동작하는 환경 온도 (°C)'
    },
    'voltage': {
      koreanName: '전압',
      koreanDescription: '장치에 인가되는 동작 전압 (V)'
    },
    'power': {
      koreanName: '전력',
      koreanDescription: '장치가 소비하는 전력 (W)'
    },
    'current': {
      koreanName: '전류',
      koreanDescription: '장치에 흐르는 동작 전류 (A)'
    },
    'frequency': {
      koreanName: '주파수',
      koreanDescription: '장치의 동작 주파수 (Hz)'
    },
    'resistance': {
      koreanName: '저항',
      koreanDescription: '저항값 (Ω)'
    },
    'capacitance': {
      koreanName: '커패시턴스',
      koreanDescription: '커패시터의 용량 (F)'
    },
    'inductance': {
      koreanName: '인덕턴스',
      koreanDescription: '인덕터의 인덕턴스 (H)'
    },
    'quantity': {
      koreanName: '수량',
      koreanDescription: '동일한 장치의 개수'
    },
    'stress_ratio': {
      koreanName: '스트레스 비율',
      koreanDescription: '정격 대비 실제 사용 스트레스 비율 (0-1)'
    },
    'quality_factor': {
      koreanName: '품질 인수',
      koreanDescription: '장치의 품질 등급을 나타내는 인수'
    },
    'environment_factor': {
      koreanName: '환경 인수',
      koreanDescription: '동작 환경에 따른 보정 인수'
    }
  }
  
  // Try to find translation by key first, then by name
  const translation = translations[spec.key] || translations[(spec as any).engName?.toLowerCase()] || translations[spec.name.toLowerCase()] || {
    koreanName: spec.name,
    koreanDescription: spec.description || '설명이 없습니다.'
  }
  
  return translation
}

// Helper function to find category by ID in the tree
const findCategoryById = (categoryId: string, categories: TelcordiaCategory[]): TelcordiaCategory | null => {
  for (const cat of categories) {
    if (cat.id === categoryId) {
      return cat
    }
    if (cat.subCategories && cat.subCategories.length > 0) {
      const found = findCategoryById(categoryId, cat.subCategories)
      if (found) return found
    }
  }
  return null
}

// Quality factor options
const qualityFactorOptions = [
  { value: TelcordiaQualityFactor.LEVEL_0.toString(), label: "Level 0 (6.0)" },
  { value: TelcordiaQualityFactor.LEVEL_1.toString(), label: "Level 1 (3.0)" },
  { value: TelcordiaQualityFactor.LEVEL_2.toString(), label: "Level 2 (1.0)" },
  { value: TelcordiaQualityFactor.LEVEL_3.toString(), label: "Level 3 (0.8)" }
]

// Helper function to get specifications from category (parent first, then own)
const getSpecifications = (category: TelcordiaCategory): SpecificationBase[] => {
  // If category doesn't have specificationList, look for parent's specificationList
  if (!category.specificationList || category.specificationList.length === 0) {
    // Try to find parent category by looking through TelcordiaCategories tree
    const findParentWithSpecs = (categories: TelcordiaCategory[]): SpecificationBase[] => {
      for (const cat of categories) {
        if (cat.subCategories && cat.subCategories.some(sub => sub.id === category.id)) {
          // Found parent category, return its specificationList if it exists
          return cat.specificationList || []
        }
        if (cat.subCategories && cat.subCategories.length > 0) {
          const found = findParentWithSpecs(cat.subCategories)
          if (found.length > 0) return found
        }
      }
      return []
    }
    
    const parentSpecs = findParentWithSpecs(TelcordiaCategories)
    return parentSpecs.length > 0 ? parentSpecs : (category.specificationList || [])
  }
  
  return category.specificationList || []
}

// Function to create dynamic form schema based on selected category
const createFormSchema = (category: TelcordiaCategory | null) => {
  const baseSchema = {
    alias: z.string().min(2, {
      message: "Device name must be at least 2 characters.",
    }).max(50, {
      message: "Device name must not exceed 50 characters.",
    }),
    categoryId: z.string().min(1, "Please select a device category."),
    quantity: z.string().min(1, "Quantity is required")
  }

  if (!category) {
    return z.object(baseSchema)
  }

  const specifications = getSpecifications(category)
  const dynamicFields: Record<string, any> = {}

  for (const spec of specifications) {
    switch (spec.type) {
      case 'scalar':
        dynamicFields[spec.key] = z.string().min(1, `${spec.name} is required`)
        break
      case 'flag':
        dynamicFields[spec.key] = z.boolean()
        break
      case 'options':
        dynamicFields[spec.key] = z.string().min(1, `Please select ${spec.name}`)
        break
      default:
        dynamicFields[spec.key] = z.string().min(1, `${spec.name} is required`)
    }
  }

  return z.object({ ...baseSchema, ...dynamicFields })
}

interface AddDeviceModalProps {
  open: boolean
  onClose: () => void
  parentUnit: UnitTreeNode | null
  onAddDevice: (device: TelcordiaDevice, parentUnitId: string) => void
}

export function AddDeviceModal({ 
  open, 
  onClose, 
  parentUnit, 
  onAddDevice 
}: AddDeviceModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<TelcordiaCategory | null>(null)
  const [dynamicFormSchema, setDynamicFormSchema] = useState(() => createFormSchema(null))

  const form = useForm<any>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: {
      alias: "",
      categoryId: "",
      quantity: "1"
    }
  })

  // Update form schema when category changes
  useEffect(() => {
    if (selectedCategory) {
      const newSchema = createFormSchema(selectedCategory)
      setDynamicFormSchema(newSchema)
      
      // Update form with new default values
      const specifications = getSpecifications(selectedCategory)
      const currentValues = form.getValues()
      const newDefaults: Record<string, any> = {
        alias: currentValues.alias || "",
        categoryId: currentValues.categoryId || "",
        quantity: currentValues.quantity || "1"
      }
      
      for (const spec of specifications) {
        // Check if field already has a value to avoid controlled/uncontrolled switch
        const existingValue = currentValues[spec.key]
        
        switch (spec.type) {
          case 'scalar':
            newDefaults[spec.key] = existingValue !== undefined ? existingValue : (spec.initialValue?.toString() || "0")
            break
          case 'flag':
            newDefaults[spec.key] = existingValue !== undefined ? existingValue : (spec.initialValue || false)
            break
          case 'options':
            newDefaults[spec.key] = existingValue !== undefined ? existingValue : (spec.initialValue?.toString() || (spec.options?.[0]?.value?.toString() || ""))
            break
          default:
            newDefaults[spec.key] = existingValue !== undefined ? existingValue : (spec.initialValue?.toString() || "")
        }
      }
      
      // Reset form with new defaults
      form.reset(newDefaults)
    }
  }, [selectedCategory, form])

  // Handle category selection
  const handleCategorySelect = (category: TelcordiaCategory) => {
    setSelectedCategory(category)
    form.setValue('categoryId', category.id)
  }

  const onSubmit = async (values: any) => {
    if (!parentUnit || !selectedCategory) return

    setIsLoading(true)
    try {
      // Prepare specifications from form values
      const specifications: Record<string, any> = {}
      const specs = getSpecifications(selectedCategory)
      
      for (const spec of specs) {
        const value = values[spec.key]
        
        switch (spec.type) {
          case 'scalar':
            specifications[spec.key] = typeof value === 'string' ? parseFloat(value) : value
            break
          case 'flag':
            specifications[spec.key] = Boolean(value)
            break
          case 'options':
            specifications[spec.key] = value
            break
          default:
            specifications[spec.key] = value
        }
      }
      
      // Add quantity
      specifications.quantity = parseInt(values.quantity)

      // Validate specifications
      const validationErrors = predictionService.validateDeviceSpecs(
        selectedCategory,
        specifications
      )
      
      if (validationErrors.length > 0) {
        console.warn("Specification validation warnings:", validationErrors)
        // You can show warnings to user here
      }

      // Create new TelcordiaDevice directly for UI (not in prediction context)
      // The prediction context will be rebuilt during calculation
      const deviceId = `dev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newDevice = new TelcordiaDevice(deviceId, selectedCategory)
      newDevice.alias = values.alias
      newDevice.specifications = specifications

      // Call the parent callback to add the device
      onAddDevice(newDevice, parentUnit.id)
      
      // Reset form and close modal
      form.reset()
      onClose()
    } catch (error) {
      console.error("Error creating device:", error)
      // You can add toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    form.reset()
    setSelectedCategory(null)
    onClose()
  }

  // Helper function to render specification field based on type
  const renderSpecificationField = (spec: SpecificationBase) => {
    const koreanInfo = getSpecificationKoreanInfo(spec)
    
    switch (spec.type) {
      case 'scalar':
        return (
          <FormField
            key={spec.key}
            control={form.control}
            name={spec.key}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <span>{koreanInfo.koreanName}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-semibold">{(spec as any).engName || spec.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{koreanInfo.koreanDescription}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder={spec.initialValue?.toString() || "0"}
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className="flex-1"
                    />
                    {(spec as any).unit && (
                      <span className="text-sm text-muted-foreground font-mono min-w-fit">
                        {(spec as any).unit}
                      </span>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      
      case 'flag':
        return (
          <FormField
            key={spec.key}
            control={form.control}
            name={spec.key}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base flex items-center gap-2">
                    <span>{koreanInfo.koreanName}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="max-w-xs">
                            <p className="font-semibold">{(spec as any).engName || spec.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">{koreanInfo.koreanDescription}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )
      
      case 'options':
        return (
          <FormField
            key={spec.key}
            control={form.control}
            name={spec.key}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <span>{koreanInfo.koreanName}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-semibold">{(spec as any).engName || spec.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{koreanInfo.koreanDescription}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${spec.name}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {spec.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      
      default:
        return (
          <FormField
            key={spec.key}
            control={form.control}
            name={spec.key}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <span>{koreanInfo.koreanName}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-semibold">{(spec as any).engName || spec.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{koreanInfo.koreanDescription}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={spec.initialValue?.toString() || ""}
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className="flex-1"
                    />
                    {(spec as any).unit && (
                      <span className="text-sm text-muted-foreground font-mono min-w-fit">
                        {(spec as any).unit}
                      </span>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>
            Add a new device to the unit "{parentUnit?.alias}". 
            Configure the device properties and specifications.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter device name (e.g., Filter Capacitor C1)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Category</FormLabel>
                  <FormControl>
                    <CategoryTreeSelector
                      categories={TelcordiaCategories}
                      selectedCategoryId={field.value}
                      onCategorySelect={handleCategorySelect}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dynamic specification fields */}
            {selectedCategory && (
              <div className="space-y-4">
                {getSpecifications(selectedCategory).map((spec) => (
                  <div key={spec.key}>
                    {renderSpecificationField(spec)}
                  </div>
                ))}
              </div>
            )}

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Device"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}