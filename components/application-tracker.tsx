"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { ApplicationList } from "@/components/application-list"
import { ApplicationStats as ApplicationStatsComponent } from "@/components/application-stats"
import { NewApplicationDialog } from "@/components/new-application-dialog"

export type ApplicationStatus = "planning" | "in-progress" | "submitted" | "accepted" | "rejected"

export type Application = {
  id: number
  scholarship_id: number
  scholarship_title: string
  university: string
  country: string
  deadline: string
  status_id: number
  status_name: ApplicationStatus
  notes: string
  created_at: string
  updated_at: string
  tasks: ApplicationTask[]
  documents: ApplicationDocument[]
}

export type ApplicationTask = {
  id: number
  application_id: number
  title: string
  description: string | null
  due_date: string | null
  completed: boolean
  created_at: string
  updated_at: string
}

export type ApplicationDocument = {
  id: number
  application_id: number
  name: string
  description: string | null
  uploaded: boolean
  file_path: string | null
  created_at: string
  updated_at: string
}

export type ApplicationStats = {
  total: number
  by_status: {
    [key: string]: number
  }
  upcoming_deadlines: {
    id: number
    scholarship_title: string
    deadline: string
    days_remaining: number
  }[]
  documents_needed: number
  documents_uploaded: number
}

export default function ApplicationTracker() {
  const [applications, setApplications] = useState<Application[]>([])
  const [stats, setStats] = useState<ApplicationStats | null>(null)
  const [scholarships, setScholarships] = useState<any[]>([])
  const [statuses, setStatuses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  // Get the active tab from URL or default to "all"
  const tabParam = searchParams.get("status") as ApplicationStatus | "all" | null
  const [activeTab, setActiveTab] = useState<ApplicationStatus | "all">(tabParam || "all")

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value as ApplicationStatus | "all")
    const params = new URLSearchParams(searchParams)
    if (value === "all") {
      params.delete("status")
    } else {
      params.set("status", value)
    }
    router.push(`/dashboard?tab=applications&${params.toString()}`)
  }

  // Load applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return

      try {
        setLoading(true)
        const response = await fetch(`/api/applications${activeTab !== "all" ? `?status=${activeTab}` : ""}`)

        if (!response.ok) {
          throw new Error("Failed to fetch applications")
        }

        const data = await response.json()
        setApplications(data.applications || [])
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Failed to load your applications",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    // Fetch application statistics
    const fetchStats = async () => {
      if (!user) return

      try {
        const response = await fetch("/api/applications/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Error fetching application stats:", error)
      }
    }

    // Fetch scholarships for the dropdown
    const fetchScholarships = async () => {
      try {
        const response = await fetch("/api/scholarships?limit=50")
        if (response.ok) {
          const data = await response.json()
          setScholarships(data.scholarships || [])
        }
      } catch (error) {
        console.error("Error fetching scholarships:", error)
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

    fetchApplications()
    fetchStats()
    fetchScholarships()
    fetchStatuses()
  }, [user, toast, activeTab])

  // Add a new application
  const addApplication = async (formData: any) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create application")
      }

      // Refresh applications and stats
      const updatedResponse = await fetch(`/api/applications${activeTab !== "all" ? `?status=${activeTab}` : ""}`)
      const data = await updatedResponse.json()
      setApplications(data.applications || [])

      const statsResponse = await fetch("/api/applications/stats")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      toast({
        title: "Success",
        description: "Application created successfully",
      })

      return true
    } catch (error) {
      console.error("Error creating application:", error)
      toast({
        title: "Error",
        description: "Failed to create application",
        variant: "destructive",
      })
      return false
    }
  }

  // Delete an application
  const deleteApplication = async (id: number) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete application")
      }

      // Remove from local state
      setApplications(applications.filter((app) => app.id !== id))

      // Refresh stats
      const statsResponse = await fetch("/api/applications/stats")
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      toast({
        title: "Success",
        description: "Application deleted successfully",
      })

      return true
    } catch (error) {
      console.error("Error deleting application:", error)
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      })
      return false
    }
  }

  if (loading && !applications.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Application Tracker</h2>
        <NewApplicationDialog scholarships={scholarships} statuses={statuses} onSubmit={addApplication} />
      </div>

      {stats && <ApplicationStatsComponent stats={stats} />}

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All
            {stats && (
              <Badge variant="outline" className="ml-2">
                {stats.total}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="planning">
            Planning
            {stats && stats.by_status.planning && (
              <Badge variant="outline" className="ml-2">
                {stats.by_status.planning}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress
            {stats && stats.by_status["in-progress"] && (
              <Badge variant="outline" className="ml-2">
                {stats.by_status["in-progress"]}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="submitted">
            Submitted
            {stats && stats.by_status.submitted && (
              <Badge variant="outline" className="ml-2">
                {stats.by_status.submitted}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted
            {stats && stats.by_status.accepted && (
              <Badge variant="outline" className="ml-2">
                {stats.by_status.accepted}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            {stats && stats.by_status.rejected && (
              <Badge variant="outline" className="ml-2">
                {stats.by_status.rejected}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <ApplicationList
            applications={applications}
            onDelete={deleteApplication}
            emptyState={
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">No applications found</h3>
                <p className="text-muted-foreground">
                  {activeTab === "all"
                    ? "You haven't added any scholarship applications to track yet."
                    : `You don't have any applications with status "${activeTab}".`}
                </p>
                <NewApplicationDialog
                  scholarships={scholarships}
                  statuses={statuses}
                  onSubmit={addApplication}
                  buttonText="Track New Application"
                  className="mt-4"
                />
              </div>
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
