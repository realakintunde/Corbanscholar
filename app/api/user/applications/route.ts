import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

// Get user's applications
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const result = await db.query(
      `SELECT a.*, s.title as scholarship_title, s.university, s.country, s.deadline, 
              ast.name as status_name
       FROM applications a
       INNER JOIN scholarships s ON a.scholarship_id = s.id
       INNER JOIN application_statuses ast ON a.status_id = ast.id
       WHERE a.user_id = $1
       ORDER BY a.created_at DESC`,
      [user.id],
    )

    // Get tasks for each application
    const applications = await Promise.all(
      result.rows.map(async (app) => {
        const tasksResult = await db.query(
          "SELECT * FROM application_tasks WHERE application_id = $1 ORDER BY due_date ASC",
          [app.id],
        )

        const documentsResult = await db.query("SELECT * FROM application_documents WHERE application_id = $1", [
          app.id,
        ])

        return {
          ...app,
          tasks: tasksResult.rows,
          documents: documentsResult.rows,
        }
      }),
    )

    return NextResponse.json({ applications })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Create a new application
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { scholarshipId, statusId, notes } = await request.json()

    if (!scholarshipId || !statusId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if scholarship exists
    const scholarshipCheck = await db.query("SELECT id FROM scholarships WHERE id = $1", [scholarshipId])
    if (scholarshipCheck.rows.length === 0) {
      return NextResponse.json({ message: "Scholarship not found" }, { status: 404 })
    }

    // Create application
    const result = await db.query(
      `INSERT INTO applications (user_id, scholarship_id, status_id, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [user.id, scholarshipId, statusId, notes || null],
    )

    return NextResponse.json({
      message: "Application created successfully",
      applicationId: result.rows[0].id,
    })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
