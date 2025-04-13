import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    const result = await db.query(
      `SELECT 
        u.id, 
        u.name, 
        c.name as country, 
        u.website,
        COUNT(s.id) as scholarship_count
      FROM universities u
      LEFT JOIN countries c ON u.country_id = c.id
      LEFT JOIN scholarships s ON s.university_id = u.id
      WHERE u.id = $1
      GROUP BY u.id, c.name`,
      [id],
    )

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: "University not found" }, { status: 404 })
    }

    return NextResponse.json({ university: result.rows[0] })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch university" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { name, countryId, website } = body

    const result = await db.query(
      `UPDATE universities 
       SET name = $1, country_id = $2, website = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING id`,
      [name, countryId, website, id],
    )

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json({ error: "University not found" }, { status: 404 })
    }

    return NextResponse.json({ id: result.rows[0].id })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to update university" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Check if university has associated scholarships
    const checkResult = await db.query(`SELECT COUNT(*) as count FROM scholarships WHERE university_id = $1`, [id])

    const scholarshipCount = Number.parseInt(checkResult.rows[0].count)
    if (scholarshipCount > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete university with associated scholarships",
        },
        { status: 400 },
      )
    }

    const result = await db.query(`DELETE FROM universities WHERE id = $1`, [id])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "University not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to delete university" }, { status: 500 })
  }
}
