import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await auth()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query params for filtering
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "month" // 'day', 'week', 'month', 'year'

    // Calculate the date range based on the period
    let dateRange
    const now = new Date()

    switch (period) {
      case "day":
        dateRange = new Date(now.setDate(now.getDate() - 1))
        break
      case "week":
        dateRange = new Date(now.setDate(now.getDate() - 7))
        break
      case "year":
        dateRange = new Date(now.setFullYear(now.getFullYear() - 1))
        break
      case "month":
      default:
        dateRange = new Date(now.setMonth(now.getMonth() - 1))
    }

    // Get analytics data
    const [
      totalCount,
      essayTypesResult,
      averageWordCountResult,
      averageGenerationTimeResult,
      dailyGenerationResult,
      feedbackAverageResult,
    ] = await Promise.all([
      // Total number of essays generated
      db.query("SELECT COUNT(*) as total FROM essay_analytics WHERE created_at > $1", [dateRange]),

      // Distribution by essay type
      db.query(
        `
        SELECT essay_type, COUNT(*) as count
        FROM essay_analytics
        WHERE created_at > $1
        GROUP BY essay_type
        ORDER BY count DESC
      `,
        [dateRange],
      ),

      // Average word count
      db.query(
        `
        SELECT AVG(word_count) as average
        FROM essay_analytics
        WHERE created_at > $1
      `,
        [dateRange],
      ),

      // Average generation time
      db.query(
        `
        SELECT AVG(generation_time) as average
        FROM essay_analytics
        WHERE created_at > $1
      `,
        [dateRange],
      ),

      // Daily generation count
      db.query(
        `
        SELECT 
          DATE_TRUNC('day', created_at) as day,
          COUNT(*) as count
        FROM essay_analytics
        WHERE created_at > $1
        GROUP BY day
        ORDER BY day
      `,
        [dateRange],
      ),

      // Average feedback rating
      db.query(
        `
        SELECT AVG(ef.rating) as average
        FROM essay_feedback ef
        JOIN essay_analytics ea ON ef.essay_id = ea.id
        WHERE ea.created_at > $1
      `,
        [dateRange],
      ),
    ])

    const analytics = {
      totalEssaysGenerated: Number(totalCount.rows[0].total),
      essayTypeDistribution: essayTypesResult.rows,
      averageWordCount: Math.round(Number(averageWordCountResult.rows[0].average) || 0),
      averageGenerationTime: Number(averageGenerationTimeResult.rows[0].average).toFixed(2) || 0,
      dailyGenerationCounts: dailyGenerationResult.rows.map((row) => ({
        day: row.day,
        count: Number(row.count),
      })),
      averageFeedbackRating: Number(feedbackAverageResult.rows[0]?.average || 0).toFixed(1),
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch essay analytics data" }, { status: 500 })
  }
}
