import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

export async function GET() {
  try {
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

    // Get user favorites
    const favorites = await db.query(
      `SELECT uf.id, uf.created_at, s.id as scholarship_id, s.title, s.university, s.country, s.amount, s.deadline, s.level, s.field
       FROM user_favorites uf
       JOIN scholarships s ON uf.scholarship_id = s.id
       WHERE uf.user_id = $1
       ORDER BY uf.created_at DESC`,
      [userId],
    )

    return NextResponse.json({ favorites })
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
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
    const { scholarshipId } = await request.json()

    if (!scholarshipId) {
      return NextResponse.json({ message: "Scholarship ID is required" }, { status: 400 })
    }

    // Check if scholarship exists
    const scholarships = await db.query("SELECT * FROM scholarships WHERE id = $1", [scholarshipId])
    if (scholarships.length === 0) {
      return NextResponse.json({ message: "Scholarship not found" }, { status: 404 })
    }

    // Check if already favorited
    const existingFavorites = await db.query(
      "SELECT * FROM user_favorites WHERE user_id = $1 AND scholarship_id = $2",
      [userId, scholarshipId],
    )

    if (existingFavorites.length > 0) {
      return NextResponse.json({ message: "Scholarship already favorited" }, { status: 409 })
    }

    // Add to favorites
    await db.query("INSERT INTO user_favorites (user_id, scholarship_id) VALUES ($1, $2)", [userId, scholarshipId])

    return NextResponse.json({ message: "Scholarship added to favorites" })
  } catch (error) {
    console.error("Error adding favorite:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
