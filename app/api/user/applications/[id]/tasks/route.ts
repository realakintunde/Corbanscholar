import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

// Get tasks for an application
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const applicationId = params.id

    // Verify the application belongs to the user
    const appCheck = await db.query("SELECT id FROM applications WHERE id = $1 AND user_id = $2", [
      applicationId,
      user.id,
    ])

    if (appCheck.rows.length === 0) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    const result = await db.query("SELECT * FROM application_tasks WHERE application_id = $1 ORDER BY due_date ASC", [
      applicationId,
    ])

    return NextResponse.json({ tasks: result.rows })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Create a new task
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const applicationId = params.id
    const { title, description, dueDate, completed } = await request.json()

    if (!title) {
      return NextResponse.json({ message: "Task title is required" }, { status: 400 })
    }

    // Verify the application belongs to the user
    const appCheck = await db.query("SELECT id FROM applications WHERE id = $1 AND user_id = $2", [
      applicationId,
      user.id,
    ])

    if (appCheck.rows.length === 0) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    // Create task
    const result = await db.query(
      `INSERT INTO application_tasks (application_id, title, description, due_date, completed)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, description, due_date, completed`,
      [applicationId, title, description || null, dueDate || null, completed || false],
    )

    return NextResponse.json({
      message: "Task created successfully",
      task: result.rows[0],
    })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
