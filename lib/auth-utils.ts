import { cookies } from "next/headers"
import { db } from "@/lib/db"

export type User = {
  id: string
  name: string
  email: string
  role: string
  profileImage?: string
}

export async function getUserFromSession(): Promise<User | null> {
  try {
    const sessionId = cookies().get("session_id")?.value

    if (!sessionId) {
      return null
    }

    // Find session
    const sessions = await db.query(
      "SELECT s.*, u.id as user_id, u.name, u.email, u.role, u.profile_image FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = $1 AND s.expires_at > NOW()",
      [sessionId],
    )

    if (sessions.length === 0) {
      cookies().delete("session_id")
      return null
    }

    const session = sessions[0]

    return {
      id: session.user_id,
      name: session.name,
      email: session.email,
      role: session.role,
      profileImage: session.profile_image,
    }
  } catch (error) {
    console.error("Error getting user from session:", error)
    return null
  }
}

export async function auth() {
  return getUserFromSession()
}
