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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TelcordiaSystem } from "prediction"

const formSchema = z.object({
  alias: z.string().min(2, {
    message: "System name must be at least 2 characters.",
  }).max(50, {
    message: "System name must not exceed 50 characters.",
  }),
})

interface AddSystemModalProps {
  open: boolean
  onClose: () => void
  onAddSystem: (system: TelcordiaSystem) => void
}

export function AddSystemModal({ 
  open, 
  onClose, 
  onAddSystem 
}: AddSystemModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alias: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      // Generate unique ID for the system
      const systemId = `system-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      // Create new TelcordiaSystem instance
      const newSystem = new TelcordiaSystem(systemId)
      newSystem.alias = values.alias

      // Call the parent callback to add the system
      onAddSystem(newSystem)
      
      // Reset form and close modal
      form.reset()
      onClose()
    } catch (error) {
      console.error("Error creating system:", error)
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
          <DialogTitle>시스템 추가</DialogTitle>
          <DialogDescription>
            현재 프로젝트에 새로운 시스템을 추가합니다.
            시스템은 장치를 포함한 유닛들을 포함합니다.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>시스템 명</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter system name (e.g., Main Power System)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    시스템의 이름 입니다.
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
                {isLoading ? "Creating..." : "Create System"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}