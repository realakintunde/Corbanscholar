import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const sessionId = cookies().get("session_id")?.value

    if (!sessionId) {
      return NextResponse.json({ message: "No active session" }, { status: 401 })
    }

    // Update session expiry
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30 days from now

    const result = await db.query(
      "UPDATE sessions SET expires_at = $1 WHERE id = $2 AND expires_at > NOW() RETURNING *",
      [expiresAt, sessionId],
    )

    if (result.length === 0) {
      cookies().delete("session_id")
      return NextResponse.json({ message: "Session expired" }, { status: 401 })
    }

    // Refresh the cookie
    cookies().set({
      name: "session_id",
      value: sessionId,
      httpOnly: true,
      path: "/",
      expires: expiresAt,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return NextResponse.json({ message: "Session refreshed" })
  } catch (error) {
    console.error("Session refresh error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
