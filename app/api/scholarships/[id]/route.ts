import { type NextRequest, NextResponse } from "next/server"
import { db, getFallbackScholarships } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  console.log(`API: Fetching scholarship with ID: ${params.id}`)

  // Set content type header to ensure we're returning JSON
  const headers = {
    "Content-Type": "application/json",
  }

  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      console.error(`Invalid scholarship ID: ${params.id}`)
      return NextResponse.json({ error: "Invalid scholarship ID" }, { status: 400, headers })
    }

    // Get the scholarship details
    console.log("Executing database query for scholarship details")
    let scholarshipDataFromDb = null
    try {
      const result = await db.query(
        `
        SELECT 
          s.id, 
          s.title, 
          u.name as university, 
          c.name as country, 
          s.amount, 
          s.deadline, 
          sl.name as level, 
          f.name as field, 
          s.description, 
          s.eligibility, 
          s.benefits, 
          s.application_process, 
          s.website, 
          s.featured,
          COALESCE(sv.view_count, 0) as view_count
        FROM scholarships s
        LEFT JOIN universities u ON s.university_id = u.id
        LEFT JOIN countries c ON s.country_id = c.id
        LEFT JOIN scholarship_levels sl ON s.level_id = sl.id
        LEFT JOIN fields f ON s.field_id = f.id
        LEFT JOIN scholarship_views sv ON s.id = sv.scholarship_id
        WHERE s.id = $1
      `,
        [id],
      )

      console.log(`Query result rows: ${result?.rows?.length || 0}`)

      if (result?.rows && result.rows.length > 0) {
        scholarshipDataFromDb = result.rows[0]
        console.log(`Found scholarship: ${scholarshipDataFromDb?.title || "Unknown title"}`)
      } else {
        console.log("No scholarship found in database, checking fallback data")
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
    }

    let fallbackScholarship = null
    if (!scholarshipDataFromDb) {
      try {
        console.log("Using fallback scholarship data for ID:", id)
        const fallbackScholarships = getFallbackScholarships()
        fallbackScholarship = fallbackScholarships.find((s) => s.id === id)

        if (fallbackScholarship) {
          console.log("Found scholarship in fallback data")
        } else {
          console.log("Scholarship not found in fallback data either")
          return NextResponse.json({ error: "Scholarship not found" }, { status: 404, headers })
        }
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError)
        return NextResponse.json({ error: "Scholarship not found" }, { status: 404, headers })
      }
    }

    try {
      // Try to increment the view count, but don't fail if it doesn't work
      console.log("Updating view count")
      await db.query(
        `
          INSERT INTO scholarship_views (scholarship_id, view_count, last_viewed_at)
          VALUES ($1, 1, NOW())
          ON CONFLICT (scholarship_id)
          DO UPDATE SET 
            view_count = scholarship_views.view_count + 1,
            last_viewed_at = NOW()
        `,
        [id],
      )
      console.log("View count updated successfully")
    } catch (viewError) {
      console.error("Failed to update view count:", viewError)
      // Continue execution, this is not critical
    }

    let scholarship
    if (scholarshipDataFromDb) {
      scholarship = scholarshipDataFromDb
    } else if (fallbackScholarship) {
      scholarship = fallbackScholarship
    } else {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404, headers })
    }

    // Transform the data to match our expected format
    const scholarshipData = {
      id: scholarship.id,
      title: scholarship.title || "Untitled Scholarship",
      university: scholarship.university || "Unknown University",
      country: scholarship.country || "Unknown Country",
      amount: scholarship.amount || "Varies",
      deadline: scholarship.deadline || new Date().toISOString(),
      level: scholarship.level || "All Levels",
      field: scholarship.field || "All Fields",
      description: scholarship.description || "No description available",
      eligibility: Array.isArray(scholarship.eligibility) ? scholarship.eligibility : [],
      benefits: Array.isArray(scholarship.benefits) ? scholarship.benefits : [],
      applicationProcess: Array.isArray(scholarship.application_process) ? scholarship.application_process : [],
      website: scholarship.website || "#",
      featured: scholarship.featured || false,
      viewCount: (scholarship.view_count || 0) + 1, // Include the view we just added
      image: `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(scholarship.title || "Scholarship")} scholarship program`,
    }

    console.log("Returning scholarship data")
    if (fallbackScholarship) {
      return NextResponse.json(
        {
          scholarship: {
            ...scholarshipData,
            image: `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(scholarship.title)} scholarship program`,
          },
          _fallback: true,
        },
        { headers },
      )
    }
    return NextResponse.json({ scholarship: scholarshipData }, { headers })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch scholarship",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500, headers },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const headers = {
    "Content-Type": "application/json",
  }

  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    // Extract the data from the request body
    const {
      title,
      universityId,
      countryId,
      amount,
      deadline,
      levelId,
      fieldId,
      description,
      eligibility,
      benefits,
      applicationProcess,
      website,
      featured,
    } = body

    // Build the update query dynamically based on the provided fields
    let updateQuery = "UPDATE scholarships SET updated_at = NOW()"
    const queryParams: any[] = []
    let paramIndex = 1

    if (title !== undefined) {
      updateQuery += `, title = $${paramIndex}`
      queryParams.push(title)
      paramIndex++
    }

    if (universityId !== undefined) {
      updateQuery += `, university_id = $${paramIndex}`
      queryParams.push(universityId)
      paramIndex++
    }

    if (countryId !== undefined) {
      updateQuery += `, country_id = $${paramIndex}`
      queryParams.push(countryId)
      paramIndex++
    }

    if (amount !== undefined) {
      updateQuery += `, amount = $${paramIndex}`
      queryParams.push(amount)
      paramIndex++
    }

    if (deadline !== undefined) {
      updateQuery += `, deadline = $${paramIndex}`
      queryParams.push(deadline)
      paramIndex++
    }

    if (levelId !== undefined) {
      updateQuery += `, level_id = $${paramIndex}`
      queryParams.push(levelId)
      paramIndex++
    }

    if (fieldId !== undefined) {
      updateQuery += `, field_id = $${paramIndex}`
      queryParams.push(fieldId)
      paramIndex++
    }

    if (description !== undefined) {
      updateQuery += `, description = $${paramIndex}`
      queryParams.push(description)
      paramIndex++
    }

    if (eligibility !== undefined) {
      updateQuery += `, eligibility = $${paramIndex}`
      queryParams.push(JSON.stringify(eligibility))
      paramIndex++
    }

    if (benefits !== undefined) {
      updateQuery += `, benefits = $${paramIndex}`
      queryParams.push(JSON.stringify(benefits))
      paramIndex++
    }

    if (applicationProcess !== undefined) {
      updateQuery += `, application_process = $${paramIndex}`
      queryParams.push(JSON.stringify(applicationProcess))
      paramIndex++
    }

    if (website !== undefined) {
      updateQuery += `, website = $${paramIndex}`
      queryParams.push(website)
      paramIndex++
    }

    if (featured !== undefined) {
      updateQuery += `, featured = $${paramIndex}`
      queryParams.push(featured)
      paramIndex++
    }

    // Add the WHERE clause and execute the query
    updateQuery += ` WHERE id = $${paramIndex} RETURNING id`
    queryParams.push(id)

    const result = await db.query(updateQuery, queryParams)

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404, headers })
    }

    return NextResponse.json({ id: result.rows[0].id }, { headers })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to update scholarship" }, { status: 500, headers })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const headers = {
    "Content-Type": "application/json",
  }

  try {
    const id = Number.parseInt(params.id)

    // Delete the scholarship
    const result = await db.query("DELETE FROM scholarships WHERE id = $1", [id])

    if (!result.rowCount || result.rowCount === 0) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404, headers })
    }

    return NextResponse.json({ success: true }, { headers })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to delete scholarship" }, { status: 500, headers })
  }
}
