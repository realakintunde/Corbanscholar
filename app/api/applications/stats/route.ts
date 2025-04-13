import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

export async function GET() {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Get application counts by status
    const statusCounts = await db.query(
      `SELECT 
        st.id, 
        st.name, 
        COUNT(a.id) as count
       FROM application_statuses st
       LEFT JOIN applications a ON a.status_id = st.id AND a.user_id = $1
       GROUP BY st.id, st.name
       ORDER BY st.id`,
      [user.id],
    )

    // Get upcoming deadlines
    const upcomingDeadlines = await db.query(
      `SELECT 
        a.id as application_id,
        s.id as scholarship_id,
        s.title,
        s.deadline,
        st.name as status
       FROM applications a
       JOIN scholarships s ON a.scholarship_id = s.id
       JOIN application_statuses st ON a.status_id = st.id
       WHERE a.user_id = $1 AND s.deadline >= CURRENT_DATE
       ORDER BY s.deadline
       LIMIT 5`,
      [user.id],
    )

    // Get upcoming tasks
    const upcomingTasks = await db.query(
      `SELECT 
        t.id,
        t.title,
        t.due_date,
        t.completed,
        a.id as application_id,
        s.title as scholarship_title
       FROM application_tasks t
       JOIN applications a ON t.application_id = a.id
       JOIN scholarships s ON a.scholarship_id = s.id
       WHERE a.user_id = $1 AND t.completed = false AND t.due_date >= CURRENT_DATE
       ORDER BY t.due_date
       LIMIT 5`,
      [user.id],
    )

    // Get document completion stats
    const documentStats = await db.query(
      `SELECT 
        COUNT(d.id) as total_documents,
        SUM(CASE WHEN d.uploaded = true THEN 1 ELSE 0 END) as uploaded_documents
       FROM application_documents d
       JOIN applications a ON d.application_id = a.id
       WHERE a.user_id = $1`,
      [user.id],
    )

    return NextResponse.json({
      statusCounts,
      upcomingDeadlines,
      upcomingTasks,
      documentStats: documentStats[0],
    })
  } catch (error) {
    console.error("Error fetching application stats:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
