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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SystemTreeNode } from "@/types/prediction-tree"

const formSchema = z.object({
  alias: z.string().min(2, {
    message: "System name must be at least 2 characters.",
  }).max(50, {
    message: "System name must not exceed 50 characters.",
  })
})

interface EditSystemModalProps {
  open: boolean
  onClose: () => void
  system: SystemTreeNode | null
  onUpdateSystem: (systemId: string, alias: string) => void
}

export function EditSystemModal({ 
  open, 
  onClose, 
  system, 
  onUpdateSystem 
}: EditSystemModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alias: ""
    }
  })

  // Update form when system changes
  useEffect(() => {
    if (system) {
      form.setValue("alias", system.alias)
    }
  }, [system, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!system) return

    setIsLoading(true)
    try {
      // Call the parent callback to update the system
      onUpdateSystem(system.id, values.alias)
      
      // Close modal
      onClose()
    } catch (error) {
      console.error("Error updating system:", error)
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
          <DialogTitle>시스템 편집</DialogTitle>
          <DialogDescription>
            "{system?.alias}" 시스템을 편집합니다.
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
                      placeholder="Enter system name (e.g., Industrial Control System)"
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
                {isLoading ? "Updating..." : "Update System"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}