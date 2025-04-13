"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"

export function NewApplicationDialog({
  scholarships,
  statuses,
  onSubmit,
  buttonText = "Track New Application",
  className = "",
}: {
  scholarships: any[]
  statuses: any[]
  onSubmit: (data: any) => Promise<boolean>
  buttonText?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    scholarshipId: "",
    statusId: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await onSubmit(formData)

    if (success) {
      setOpen(false)
      setFormData({
        scholarshipId: "",
        statusId: "",
        notes: "",
      })
    }

    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <Plus className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Track New Scholarship Application</DialogTitle>
          <DialogDescription>Add a scholarship application to track its progress and deadlines.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="scholarship" className="text-right">
                Scholarship
              </label>
              <div className="col-span-3">
                <Select
                  value={formData.scholarshipId}
                  onValueChange={(value) => setFormData({ ...formData, scholarshipId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a scholarship" />
                  </SelectTrigger>
                  <SelectContent>
                    {scholarships.map((scholarship) => (
                      <SelectItem key={scholarship.id} value={scholarship.id.toString()}>
                        {scholarship.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <div className="col-span-3">
                <Select
                  value={formData.statusId}
                  onValueChange={(value) => setFormData({ ...formData, statusId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="notes" className="text-right">
                Notes
              </label>
              <Textarea
                id="notes"
                className="col-span-3"
                placeholder="Add any notes about your application"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Application"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
