"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Calendar, CheckCircle, Clock, Edit, Loader2, XCircle, AlertCircle } from "lucide-react"
import type { Application, ApplicationStatus } from "@/components/application-tracker"
import { TaskList } from "@/components/task-list"
import { DocumentList } from "@/components/document-list"

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
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

    fetchApplication()
  }, [params.id, router, toast])

  // Get status badge color
  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "planning":
        return "bg-slate-500"
      case "in-progress":
        return "bg-amber-500"
      case "submitted":
        return "bg-sky-500"
      case "accepted":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-slate-500"
    }
  }

  // Get status icon
  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case "planning":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <AlertCircle className="h-4 w-4" />
      case "submitted":
        return <CheckCircle className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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
          <Link href="/dashboard?tab=applications">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/dashboard/applications/${params.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Application
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(application.status_name)} text-white`}>
                  <span className="flex items-center">
                    {getStatusIcon(application.status_name)}
                    <span className="ml-1 capitalize">{application.status_name}</span>
                  </span>
                </Badge>
                {application.deadline && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    Deadline: {new Date(application.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>
              <CardTitle className="mt-2 text-2xl">{application.scholarship_title}</CardTitle>
              <CardDescription className="text-base">
                {application.university}, {application.country}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.notes && (
                  <div>
                    <h3 className="mb-2 font-medium">Notes</h3>
                    <p className="text-sm text-muted-foreground">{application.notes}</p>
                  </div>
                )}
                <Separator />
                <div>
                  <h3 className="mb-2 font-medium">Application Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Created</span>
                      <span>{new Date(application.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated</span>
                      <span>{new Date(application.updated_at).toLocaleDateString()}</span>
                    </div>
                    {application.deadline && (
                      <div className="flex justify-between">
                        <span>Deadline</span>
                        <span>{new Date(application.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">University</h3>
                  <p className="text-muted-foreground">{application.university}</p>
                </div>
                <div>
                  <h3 className="font-medium">Country</h3>
                  <p className="text-muted-foreground">{application.country}</p>
                </div>
                <div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/scholarship/${application.scholarship_id}`}>View Scholarship Details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="mt-4">
          <TaskList applicationId={application.id} initialTasks={application.tasks} />
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <DocumentList applicationId={application.id} initialDocuments={application.documents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
