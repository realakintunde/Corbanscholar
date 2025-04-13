"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Clock, AlertCircle, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

async function updateMessageStatus(messageId: number, status: string) {
  try {
    const response = await fetch(`/api/admin/messages/${messageId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      throw new Error("Failed to update message status")
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating message status:", error)
    throw error
  }
}

export function MessageActions({
  messageId,
  currentStatus,
}: {
  messageId: number
  currentStatus: string
}) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (status: string) => {
    if (status === currentStatus) return

    setIsUpdating(true)
    try {
      await updateMessageStatus(messageId, status)
      toast({
        title: "Status updated",
        description: `Message status changed to ${status}`,
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isUpdating}>
          <span className="sr-only">Actions</span>
          {isUpdating ? "Updating..." : "Change Status"}
          <MoreHorizontal className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleStatusChange("unread")}
          disabled={currentStatus === "unread"}
          className="flex items-center"
        >
          <Clock className="mr-2 h-4 w-4" />
          Mark as Unread
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange("in-progress")}
          disabled={currentStatus === "in-progress"}
          className="flex items-center"
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          Mark as In Progress
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange("resolved")}
          disabled={currentStatus === "resolved"}
          className="flex items-center"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark as Resolved
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
