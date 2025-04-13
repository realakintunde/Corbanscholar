"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, FileText, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { ApplicationDocument } from "@/components/application-tracker"

export function DocumentList({
  applicationId,
  initialDocuments = [],
}: {
  applicationId: number
  initialDocuments: ApplicationDocument[]
}) {
  const [documents, setDocuments] = useState<ApplicationDocument[]>(initialDocuments)
  const [newDocument, setNewDocument] = useState({
    name: "",
    description: "",
    uploaded: false,
  })
  const [isAddingDocument, setIsAddingDocument] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Add a new document
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newDocument.name.trim()) {
      toast({
        title: "Error",
        description: "Document name is required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/applications/${applicationId}/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newDocument.name,
          description: newDocument.description || null,
          uploaded: newDocument.uploaded,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add document")
      }

      const data = await response.json()
      setDocuments([...documents, data.document])
      setNewDocument({
        name: "",
        description: "",
        uploaded: false,
      })
      setIsAddingDocument(false)

      toast({
        title: "Success",
        description: "Document added successfully",
      })
    } catch (error) {
      console.error("Error adding document:", error)
      toast({
        title: "Error",
        description: "Failed to add document",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Toggle document uploaded status
  const toggleDocumentStatus = async (documentId: number, uploaded: boolean) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/documents/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploaded: !uploaded,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update document")
      }

      setDocuments(documents.map((doc) => (doc.id === documentId ? { ...doc, uploaded: !uploaded } : doc)))
    } catch (error) {
      console.error("Error updating document:", error)
      toast({
        title: "Error",
        description: "Failed to update document status",
        variant: "destructive",
      })
    }
  }

  // Delete a document
  const deleteDocument = async (documentId: number) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/documents/${documentId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete document")
      }

      setDocuments(documents.filter((doc) => doc.id !== documentId))

      toast({
        title: "Success",
        description: "Document deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting document:", error)
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Required Documents</CardTitle>
        {!isAddingDocument && (
          <Button size="sm" onClick={() => setIsAddingDocument(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Document
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isAddingDocument && (
          <form onSubmit={handleAddDocument} className="mb-6 space-y-4 rounded-lg border p-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Document Name
              </label>
              <Input
                id="name"
                value={newDocument.name}
                onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                placeholder="e.g., Transcript, CV, Recommendation Letter"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description (Optional)
              </label>
              <Textarea
                id="description"
                value={newDocument.description}
                onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                placeholder="Enter any additional details about this document"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="uploaded"
                checked={newDocument.uploaded}
                onCheckedChange={(checked) => setNewDocument({ ...newDocument, uploaded: checked })}
              />
              <Label htmlFor="uploaded">Already uploaded/prepared</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={() => setIsAddingDocument(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Document"
                )}
              </Button>
            </div>
          </form>
        )}

        {documents.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>No documents added yet</p>
            {!isAddingDocument && (
              <Button variant="outline" className="mt-2" onClick={() => setIsAddingDocument(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Document
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-start justify-between rounded-lg border p-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      document.uploaded ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600",
                    )}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{document.name}</p>
                    {document.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{document.description}</p>
                    )}
                    <div className="mt-2 flex items-center">
                      <Switch
                        id={`doc-${document.id}`}
                        checked={document.uploaded}
                        onCheckedChange={() => toggleDocumentStatus(document.id, document.uploaded)}
                        className="mr-2"
                      />
                      <Label htmlFor={`doc-${document.id}`} className="text-xs">
                        {document.uploaded ? "Uploaded/Prepared" : "Not yet uploaded"}
                      </Label>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteDocument(document.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
