import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

// Get all documents for an application
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const applicationId = params.id

    // Check if application exists and belongs to user
    const applicationCheck = await db.query("SELECT id FROM applications WHERE id = $1 AND user_id = $2", [
      applicationId,
      user.id,
    ])

    if (applicationCheck.length === 0) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    // Get documents
    const documents = await db.query(
      `SELECT id, name, file_path, uploaded, created_at, updated_at
       FROM application_documents
       WHERE application_id = $1
       ORDER BY name`,
      [applicationId],
    )

    return NextResponse.json({ documents })
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Add a new document to an application
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const applicationId = params.id
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ message: "Document name is required" }, { status: 400 })
    }

    // Check if application exists and belongs to user
    const applicationCheck = await db.query("SELECT id FROM applications WHERE id = $1 AND user_id = $2", [
      applicationId,
      user.id,
    ])

    if (applicationCheck.length === 0) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    // Create document
    const result = await db.query(
      `INSERT INTO application_documents 
        (application_id, name, uploaded, created_at, updated_at) 
       VALUES ($1, $2, false, NOW(), NOW()) 
       RETURNING id, name, uploaded, created_at, updated_at`,
      [applicationId, name],
    )

    return NextResponse.json(
      {
        message: "Document added successfully",
        document: result[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding document:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
