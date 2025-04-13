import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

// Update a document
export async function PUT(request: Request, { params }: { params: { id: string; documentId: string } }) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const applicationId = params.id
    const documentId = params.documentId
    const { name, filePath, uploaded } = await request.json()

    // Check if application exists and belongs to user
    const applicationCheck = await db.query(
      `SELECT a.id 
       FROM applications a
       JOIN application_documents d ON d.application_id = a.id
       WHERE a.id = $1 AND a.user_id = $2 AND d.id = $3`,
      [applicationId, user.id, documentId],
    )

    if (applicationCheck.length === 0) {
      return NextResponse.json({ message: "Document not found or access denied" }, { status: 404 })
    }

    // Update document
    let query = "UPDATE application_documents SET updated_at = NOW()"
    const queryParams = []
    let paramIndex = 1

    if (name !== undefined) {
      query += `, name = $${paramIndex}`
      queryParams.push(name)
      paramIndex++
    }

    if (filePath !== undefined) {
      query += `, file_path = $${paramIndex}`
      queryParams.push(filePath)
      paramIndex++
    }

    if (uploaded !== undefined) {
      query += `, uploaded = $${paramIndex}`
      queryParams.push(uploaded)
      paramIndex++
    }

    queryParams.push(documentId)
    query += ` WHERE id = $${paramIndex} RETURNING id, name, file_path, uploaded, updated_at`

    const result = await db.query(query, queryParams)

    return NextResponse.json({
      message: "Document updated successfully",
      document: result[0],
    })
  } catch (error) {
    console.error("Error updating document:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Delete a document
export async function DELETE(request: Request, { params }: { params: { id: string; documentId: string } }) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const applicationId = params.id
    const documentId = params.documentId

    // Check if application exists and belongs to user
    const applicationCheck = await db.query(
      `SELECT a.id 
       FROM applications a
       JOIN application_documents d ON d.application_id = a.id
       WHERE a.id = $1 AND a.user_id = $2 AND d.id = $3`,
      [applicationId, user.id, documentId],
    )

    if (applicationCheck.length === 0) {
      return NextResponse.json({ message: "Document not found or access denied" }, { status: 404 })
    }

    // Delete document
    await db.query("DELETE FROM application_documents WHERE id = $1", [documentId])

    return NextResponse.json({ message: "Document deleted successfully" })
  } catch (error) {
    console.error("Error deleting document:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
