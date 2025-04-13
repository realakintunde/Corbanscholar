import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const scholarshipId = params.id
    const sessionId = cookies().get("session_id")?.value

    if (!sessionId) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Find session and user
    const sessions = await db.query(
      "SELECT s.*, u.id as user_id FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = $1 AND s.expires_at > NOW()",
      [sessionId],
    )

    if (sessions.length === 0) {
      cookies().delete("session_id")
      return NextResponse.json({ message: "Session expired" }, { status: 401 })
    }

    const userId = sessions[0].user_id

    // Delete favorite
    await db.query("DELETE FROM user_favorites WHERE user_id = $1 AND scholarship_id = $2", [userId, scholarshipId])

    return NextResponse.json({ message: "Scholarship removed from favorites" })
  } catch (error) {
    console.error("Error removing favorite:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
