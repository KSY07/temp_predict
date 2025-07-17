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
import { UnitTreeNode } from "@/types/prediction-tree"

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

interface EditUnitModalProps {
  open: boolean
  onClose: () => void
  unit: UnitTreeNode | null
  onUpdateUnit: (unitId: string, alias: string, environmentFactor: number) => void
}

export function EditUnitModal({ 
  open, 
  onClose, 
  unit, 
  onUpdateUnit 
}: EditUnitModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alias: "",
      environmentFactor: "1"
    }
  })

  // Update form when unit changes
  useEffect(() => {
    if (unit) {
      form.setValue("alias", unit.alias)
      form.setValue("environmentFactor", unit.data.environmentFactor?.toString() || "1")
    }
  }, [unit, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!unit) return

    setIsLoading(true)
    try {
      // Call the parent callback to update the unit
      onUpdateUnit(unit.id, values.alias, parseFloat(values.environmentFactor))
      
      // Close modal
      onClose()
    } catch (error) {
      console.error("Error updating unit:", error)
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
          <DialogTitle>유닛 편집</DialogTitle>
          <DialogDescription>
            "{unit?.parent?.alias}" 시스템의 "{unit?.alias}" 유닛을 편집합니다. 
            유닛 이름과 환경 인수를 수정할 수 있습니다.
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
                    유닛의 이름 입니다.
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                {isLoading ? "Updating..." : "Update Unit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}