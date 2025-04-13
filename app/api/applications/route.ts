import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

// Get all applications for the current user
export async function GET(request: Request) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const searchParams = new URL(request.url).searchParams
    const statusId = searchParams.get("status")
    const scholarshipId = searchParams.get("scholarship")

    let query = `
      SELECT 
        a.id, 
        a.scholarship_id, 
        a.status_id, 
        a.notes, 
        a.created_at, 
        a.updated_at,
        s.title as scholarship_title,
        s.university as university_name,
        s.deadline as scholarship_deadline,
        st.name as status_name,
        (SELECT COUNT(*) FROM application_tasks WHERE application_id = a.id) as total_tasks,
        (SELECT COUNT(*) FROM application_tasks WHERE application_id = a.id AND completed = true) as completed_tasks,
        (SELECT COUNT(*) FROM application_documents WHERE application_id = a.id) as total_documents,
        (SELECT COUNT(*) FROM application_documents WHERE application_id = a.id AND uploaded = true) as uploaded_documents
      FROM applications a
      JOIN scholarships s ON a.scholarship_id = s.id
      JOIN application_statuses st ON a.status_id = st.id
      WHERE a.user_id = $1
    `

    const params = [user.id]
    let paramIndex = 2

    if (statusId) {
      query += ` AND a.status_id = $${paramIndex}`
      params.push(statusId)
      paramIndex++
    }

    if (scholarshipId) {
      query += ` AND a.scholarship_id = $${paramIndex}`
      params.push(scholarshipId)
      paramIndex++
    }

    query += " ORDER BY a.updated_at DESC"

    const result = await db.query(query, params)

    return NextResponse.json({ applications: result })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Create a new application
export async function POST(request: Request) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const { scholarshipId, statusId = 1, notes = "" } = await request.json()

    if (!scholarshipId) {
      return NextResponse.json({ message: "Scholarship ID is required" }, { status: 400 })
    }

    // Check if scholarship exists
    const scholarshipCheck = await db.query("SELECT id FROM scholarships WHERE id = $1", [scholarshipId])
    if (scholarshipCheck.length === 0) {
      return NextResponse.json({ message: "Scholarship not found" }, { status: 404 })
    }

    // Check if application already exists for this scholarship
    const existingApp = await db.query("SELECT id FROM applications WHERE user_id = $1 AND scholarship_id = $2", [
      user.id,
      scholarshipId,
    ])

    if (existingApp.length > 0) {
      return NextResponse.json(
        { message: "You already have an application for this scholarship", applicationId: existingApp[0].id },
        { status: 409 },
      )
    }

    // Create application
    const result = await db.query(
      `INSERT INTO applications 
        (user_id, scholarship_id, status_id, notes, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, NOW(), NOW()) 
       RETURNING id`,
      [user.id, scholarshipId, statusId, notes],
    )

    const applicationId = result[0].id

    // Get scholarship details to determine required documents
    const scholarshipDetails = await db.query("SELECT required_documents FROM scholarships WHERE id = $1", [
      scholarshipId,
    ])

    // If scholarship has required documents, create document entries
    if (scholarshipDetails.length > 0 && scholarshipDetails[0].required_documents) {
      const requiredDocs = scholarshipDetails[0].required_documents

      if (Array.isArray(requiredDocs) && requiredDocs.length > 0) {
        const docValues = requiredDocs
          .map((doc: string) => {
            return `($1, '${doc}', false, NOW(), NOW())`
          })
          .join(", ")

        await db.query(
          `INSERT INTO application_documents 
            (application_id, name, uploaded, created_at, updated_at) 
           VALUES ${docValues}`,
          [applicationId],
        )
      }
    }

    return NextResponse.json(
      {
        message: "Application created successfully",
        applicationId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
