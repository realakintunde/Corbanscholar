"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import type { Application } from "@/components/application-tracker"

export default function EditApplicationPage({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState<Application | null>(null)
  const [statuses, setStatuses] = useState<any[]>([])
  const [formData, setFormData] = useState({
    statusId: "",
    notes: "",
  })
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/applications/${params.id}`)

        if (!response.ok) {
          if (response.status === 404) {
            toast({
              title: "Not found",
              description: "This application could not be found",
              variant: "destructive",
            })
            router.push("/dashboard?tab=applications")
            return
          }
          throw new Error("Failed to fetch application")
        }

        const data = await response.json()
        setApplication(data.application)
        setFormData({
          statusId: data.application.status_id.toString(),
          notes: data.application.notes || "",
        })
      } catch (error) {
        console.error("Error fetching application:", error)
        toast({
          title: "Error",
          description: "Failed to load application details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    // Fetch application statuses
    const fetchStatuses = async () => {
      try {
        const response = await fetch("/api/applications/statuses")
        if (response.ok) {
          const data = await response.json()
          setStatuses(data.statuses || [])
        }
      } catch (error) {
        console.error("Error fetching statuses:", error)
      }
    }

    fetchApplication()
    fetchStatuses()
  }, [params.id, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/applications/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statusId: formData.statusId,
          notes: formData.notes,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update application")
      }

      toast({
        title: "Success",
        description: "Application updated successfully",
      })

      router.push(`/dashboard/applications/${params.id}`)
    } catch (error) {
      console.error("Error updating application:", error)
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold">Application not found</h2>
        <p className="text-muted-foreground">The application you're looking for doesn't exist or was deleted.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard?tab=applications">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/applications/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Application
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Application</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">{application.scholarship_title}</h3>
              <p className="text-muted-foreground">
                {application.university}, {application.country}
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Application Status
              </label>
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

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any notes about your application"
                rows={5}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
