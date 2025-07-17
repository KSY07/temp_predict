"use client"

import { useState } from "react"
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
import { TelcordiaUnit } from "prediction"
import { SystemTreeNode } from "@/types/prediction-tree"

// Environment factor options
const environmentOptions = [
  { value: "1", label: "Ground Fixed Controlled", factor: 1 },
  { value: "1.2", label: "Ground Fixed Uncontrolled Limited", factor: 1.2 },
  { value: "1.5", label: "Ground Fixed Uncontrolled Moderate", factor: 1.5 },
  { value: "2", label: "Ground Mobile", factor: 2 },
  { value: "3", label: "Airborne Commercial", factor: 3 },
  { value: "0", label: "Space Based Commercial", factor: 0 }
]

const formSchema = z.object({
  alias: z.string().min(2, {
    message: "Unit name must be at least 2 characters.",
  }).max(50, {
    message: "Unit name must not exceed 50 characters.",
  }),
  environmentFactor: z.string().min(1, "Please select an environment factor.")
})

interface AddUnitModalProps {
  open: boolean
  onClose: () => void
  parentSystem: SystemTreeNode | null
  onAddUnit: (unit: TelcordiaUnit, parentSystemId: string) => void
}

export function AddUnitModal({ 
  open, 
  onClose, 
  parentSystem, 
  onAddUnit 
}: AddUnitModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alias: "",
      environmentFactor: "1"
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!parentSystem) return

    setIsLoading(true)
    try {
      // Generate unique ID for the unit
      const unitId = `unit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      // Create new TelcordiaUnit instance
      const newUnit = new TelcordiaUnit(unitId)
      newUnit.alias = values.alias
      newUnit.environmentFactor = parseFloat(values.environmentFactor)

      // Call the parent callback to add the unit
      onAddUnit(newUnit, parentSystem.id)
      
      // Reset form and close modal
      form.reset()
      onClose()
    } catch (error) {
      console.error("Error creating unit:", error)
      // You can add toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>유닛 생성</DialogTitle>
          <DialogDescription>
            "{parentSystem?.alias}" 시스템에 새로운 유닛을 추가합니다.
            유닛 이름과 환경 인수를 설정해야 합니다.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>유닛 명</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter unit name (e.g., Power Supply Unit)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    유닛의 이름
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="environmentFactor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>환경 인수</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment factor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {environmentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} ({option.factor})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    신뢰성 계산에 필요한 환경 인수 입니다.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Unit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}