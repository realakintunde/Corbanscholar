import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let sqlQuery = `
      SELECT 
        u.id, 
        u.name, 
        c.name as country, 
        u.website,
        COUNT(s.id) as scholarship_count
      FROM universities u
      LEFT JOIN countries c ON u.country_id = c.id
      LEFT JOIN scholarships s ON s.university_id = u.id
      WHERE 1=1
    `

    const params: any[] = []
    let paramIndex = 1

    if (query) {
      sqlQuery += ` AND (
        u.name ILIKE $${paramIndex} 
        OR c.name ILIKE $${paramIndex}
      )`
      params.push(`%${query}%`)
      paramIndex++
    }

    sqlQuery += ` GROUP BY u.id, c.name
                  ORDER BY u.name ASC 
                  LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(limit, offset)

    const result = await db.query(sqlQuery, params)

    return NextResponse.json({ universities: result.rows })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, countryId, website } = body

    const result = await db.query(
      `INSERT INTO universities (name, country_id, website)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [name, countryId, website],
    )

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to create university" }, { status: 500 })
  }
}
