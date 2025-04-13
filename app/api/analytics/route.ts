import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get analytics data
    const [scholarshipCountResult, viewsResult, topScholarshipsResult, countryDistributionResult] = await Promise.all([
      // Total number of scholarships
      db.query("SELECT COUNT(*) as total FROM scholarships"),

      // Total views
      db.query("SELECT SUM(view_count) as total FROM scholarship_views"),

      // Top 5 most viewed scholarships
      db.query(`
        SELECT 
          s.id, 
          s.title, 
          u.name as university, 
          c.name as country, 
          sv.view_count
        FROM scholarships s
        JOIN scholarship_views sv ON s.id = sv.scholarship_id
        LEFT JOIN universities u ON s.university_id = u.id
        LEFT JOIN countries c ON s.country_id = c.id
        ORDER BY sv.view_count DESC
        LIMIT 5
      `),

      // Scholarship distribution by country
      db.query(`
        SELECT 
          c.name as country, 
          COUNT(*) as count
        FROM scholarships s
        JOIN countries c ON s.country_id = c.id
        GROUP BY c.name
        ORDER BY count DESC
        LIMIT 10
      `),
    ])

    const analytics = {
      totalScholarships: Number.parseInt(scholarshipCountResult.rows[0].total),
      totalViews: Number.parseInt(viewsResult.rows[0].total) || 0,
      topScholarships: topScholarshipsResult.rows,
      countryDistribution: countryDistributionResult.rows,
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 })
  }
}
