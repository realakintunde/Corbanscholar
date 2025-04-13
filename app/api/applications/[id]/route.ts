import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

// Get a specific application
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const applicationId = params.id

    // Get application details
    const applicationResult = await db.query(
      `SELECT 
        a.id, 
        a.scholarship_id, 
        a.status_id, 
        a.notes, 
        a.created_at, 
        a.updated_at,
        s.title as scholarship_title,
        s.university as university_name,
        s.deadline as scholarship_deadline,
        s.description as scholarship_description,
        s.amount as scholarship_amount,
        s.level as scholarship_level,
        s.field as scholarship_field,
        st.name as status_name
      FROM applications a
      JOIN scholarships s ON a.scholarship_id = s.id
      JOIN application_statuses st ON a.status_id = st.id
      WHERE a.id = $1 AND a.user_id = $2`,
      [applicationId, user.id],
    )

    if (applicationResult.length === 0) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    const application = applicationResult[0]

    // Get documents
    const documentsResult = await db.query(
      `SELECT id, name, file_path, uploaded, created_at, updated_at
       FROM application_documents
       WHERE application_id = $1
       ORDER BY name`,
      [applicationId],
    )

    // Get tasks
    const tasksResult = await db.query(
      `SELECT id, title, description, due_date, completed, created_at, updated_at
       FROM application_tasks
       WHERE application_id = $1
       ORDER BY due_date, title`,
      [applicationId],
    )

    return NextResponse.json({
      application,
      documents: documentsResult,
      tasks: tasksResult,
    })
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Update an application
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const applicationId = params.id
    const { statusId, notes } = await request.json()

    // Check if application exists and belongs to user
    const applicationCheck = await db.query("SELECT id FROM applications WHERE id = $1 AND user_id = $2", [
      applicationId,
      user.id,
    ])

    if (applicationCheck.length === 0) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    // Update application
    let query = "UPDATE applications SET updated_at = NOW()"
    const paramsArr = []
    let paramIndex = 1

    if (statusId !== undefined) {
      query += `, status_id = $${paramIndex}`
      paramsArr.push(statusId)
      paramIndex++
    }

    if (notes !== undefined) {
      query += `, notes = $${paramIndex}`
      paramsArr.push(notes)
      paramIndex++
    }

    paramsArr.push(applicationId)
    query += ` WHERE id = $${paramIndex} RETURNING id, status_id, notes, updated_at`

    const result = await db.query(query, paramsArr)

    return NextResponse.json({
      message: "Application updated successfully",
      application: result[0],
    })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Delete an application
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

    // Delete related records first (documents and tasks)
    await db.query("DELETE FROM application_documents WHERE application_id = $1", [applicationId])
    await db.query("DELETE FROM application_tasks WHERE application_id = $1", [applicationId])

    // Delete application
    await db.query("DELETE FROM applications WHERE id = $1", [applicationId])

    return NextResponse.json({ message: "Application deleted successfully" })
  } catch (error) {
    console.error("Error deleting application:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
