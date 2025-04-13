"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getSavedDrafts, deleteSavedDraft } from "../actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Edit, Trash2, ChevronLeft, AlertCircle } from "lucide-react"

export default function SavedDraftsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [drafts, setDrafts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; draftId: number | null }>({
    open: false,
    draftId: null,
  })
  const [deleting, setDeleting] = useState(false)

  // Mock user ID - in a real application, this would come from authentication
  const userId = "user-123"

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const result = await getSavedDrafts(userId)
        if (result.success) {
          setDrafts(result.drafts)
        } else {
          setError(result.error || "Failed to load saved drafts")
          toast({
            title: "Error loading drafts",
            description: result.error || "There was a problem loading your saved drafts.",
            variant: "destructive",
          })
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again later.")
        toast({
          title: "Error loading drafts",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDrafts()
  }, [toast])

  const handleDelete = async () => {
    if (!deleteDialog.draftId) return

    setDeleting(true)
    try {
      const result = await deleteSavedDraft(deleteDialog.draftId, userId)

      if (result.success) {
        setDrafts(drafts.filter((draft) => draft.id !== deleteDialog.draftId))
        toast({
          title: "Draft deleted",
          description: "Your essay draft has been deleted.",
        })
      } else {
        toast({
          title: "Error deleting draft",
          description: result.error || "There was a problem deleting your draft.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error deleting draft",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
      setDeleteDialog({ open: false, draftId: null })
    }
  }

  const handleEdit = (draftId: number) => {
    router.push(`/resources/templates/ai-essay-writer?draft=${draftId}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const goBack = () => {
    router.push("/resources/templates/ai-essay-writer")
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" onClick={goBack} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Essay Writer
      </Button>

      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Saved Essay Drafts</h1>
        <p className="text-lg text-muted-foreground">View and manage your saved essay drafts.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Essay Drafts</CardTitle>
          <CardDescription>Access and edit your previously saved essay drafts.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin mr-2" />
              <p>Loading your drafts...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : drafts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <p>You don't have any saved essay drafts yet.</p>
              <Button className="mt-4" onClick={goBack} variant="outline">
                Create Your First Draft
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Word Count</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft) => (
                  <TableRow key={draft.id}>
                    <TableCell className="font-medium">{draft.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {draft.essay_type
                          ?.split("-")
                          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{draft.word_count} words</TableCell>
                    <TableCell>{formatDate(draft.updated_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(draft.id)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteDialog({ open: true, draftId: draft.id })}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => !deleting && setDeleteDialog({ ...deleteDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Essay Draft</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this draft? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, draftId: null })}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
