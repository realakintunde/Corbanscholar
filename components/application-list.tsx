"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, XCircle, AlertCircle, MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Application, ApplicationStatus } from "@/components/application-tracker"

export function ApplicationList({
  applications,
  onDelete,
  emptyState,
}: {
  applications: Application[]
  onDelete: (id: number) => Promise<boolean>
  emptyState: React.ReactNode
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [applicationToDelete, setApplicationToDelete] = useState<number | null>(null)

  // Calculate application progress
  const calculateProgress = (application: Application) => {
    if (application.tasks.length === 0) return 0
    const completedTasks = application.tasks.filter((task) => task.completed).length
    return Math.round((completedTasks / application.tasks.length) * 100)
  }

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

  // Handle delete confirmation
  const handleDeleteClick = (id: number) => {
    setApplicationToDelete(id)
    setDeleteDialogOpen(true)
  }

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (applicationToDelete) {
      await onDelete(applicationToDelete)
    }
    setDeleteDialogOpen(false)
    setApplicationToDelete(null)
  }

  if (applications.length === 0) {
    return emptyState
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(application.status_name)} text-white`}>
                  <span className="flex items-center">
                    {getStatusIcon(application.status_name)}
                    <span className="ml-1 capitalize">{application.status_name}</span>
                  </span>
                </Badge>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-muted-foreground">
                    {application.deadline
                      ? `Due: ${new Date(application.deadline).toLocaleDateString()}`
                      : "No deadline"}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/applications/${application.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/applications/${application.id}/edit`}>Edit Application</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDeleteClick(application.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardTitle className="mt-2 line-clamp-2 text-lg">{application.scholarship_title}</CardTitle>
              <CardDescription>{application.university}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{calculateProgress(application)}%</span>
                  </div>
                  <Progress value={calculateProgress(application)} />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">Tasks</h4>
                  {application.tasks.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No tasks added yet</p>
                  ) : (
                    <ul className="space-y-1">
                      {application.tasks.slice(0, 3).map((task) => (
                        <li key={task.id} className="flex items-center text-sm">
                          <input type="checkbox" className="mr-2" checked={task.completed} readOnly />
                          <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                            {task.title}
                          </span>
                        </li>
                      ))}
                      {application.tasks.length > 3 && (
                        <li className="text-sm text-muted-foreground">+{application.tasks.length - 3} more tasks</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/dashboard/applications/${application.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this application and all associated tasks and documents. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
