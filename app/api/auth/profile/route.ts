import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

export async function PUT(request: Request) {
  try {
    const sessionId = cookies().get("session_id")?.value

    if (!sessionId) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Find session
    const sessions = await db.query(
      "SELECT s.*, u.id as user_id FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = $1 AND s.expires_at > NOW()",
      [sessionId],
    )

    if (sessions.length === 0) {
      cookies().delete("session_id")
      return NextResponse.json({ message: "Session expired" }, { status: 401 })
    }

    const userId = sessions[0].user_id
    const { name, email } = await request.json()

    // Validate input
    if (!name && !email) {
      return NextResponse.json({ message: "No data to update" }, { status: 400 })
    }

    // Check if email is already taken
    if (email) {
      const existingUser = await db.query("SELECT * FROM users WHERE email = $1 AND id != $2", [email, userId])
      if (existingUser.length > 0) {
        return NextResponse.json({ message: "Email already in use" }, { status: 409 })
      }
    }

    // Update user
    let query = "UPDATE users SET updated_at = NOW()"
    const params = []

    if (name) {
      params.push(name)
      query += `, name = $${params.length}`
    }

    if (email) {
      params.push(email)
      query += `, email = $${params.length}`
    }

    params.push(userId)
    query += ` WHERE id = $${params.length} RETURNING id, name, email, role, profile_image`

    const result = await db.query(query, params)
    const updatedUser = result[0]

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profile_image,
      },
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
