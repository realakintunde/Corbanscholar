import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

// Get all tasks for an application
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

    // Get tasks
    const tasks = await db.query(
      `SELECT id, title, description, due_date, completed, created_at, updated_at
       FROM application_tasks
       WHERE application_id = $1
       ORDER BY due_date, title`,
      [applicationId],
    )

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Add a new task to an application
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const applicationId = params.id
    const { title, description = "", dueDate = null } = await request.json()

    if (!title) {
      return NextResponse.json({ message: "Task title is required" }, { status: 400 })
    }

    // Check if application exists and belongs to user
    const applicationCheck = await db.query("SELECT id FROM applications WHERE id = $1 AND user_id = $2", [
      applicationId,
      user.id,
    ])

    if (applicationCheck.length === 0) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 })
    }

    // Create task
    const result = await db.query(
      `INSERT INTO application_tasks 
        (application_id, title, description, due_date, completed, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, false, NOW(), NOW()) 
       RETURNING id, title, description, due_date, completed, created_at, updated_at`,
      [applicationId, title, description, dueDate],
    )

    return NextResponse.json(
      {
        message: "Task added successfully",
        task: result[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding task:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
