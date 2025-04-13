import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

export async function POST() {
  try {
    const sessionId = cookies().get("session_id")?.value

    if (sessionId) {
      // Delete session from database
      await db.query("DELETE FROM sessions WHERE id = $1", [sessionId])

      // Clear cookie
      cookies().delete("session_id")
    }

    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
