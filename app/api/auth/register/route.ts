import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers"
import * as crypto from "crypto"

// Helper function to hash passwords without bcrypt
function hashPassword(password: string): string {
  // This is a simplified hashing for deployment purposes
  // In production, you should use a proper password hashing library
  return crypto.createHash("sha256").update(password).digest("hex")
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email])
    if (existingUser.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    // Hash password using our simplified method for deployment
    const hashedPassword = hashPassword(password)

    // Create user
    const result = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, "user"],
    )

    const user = result[0]

    // Create session
    const sessionId = uuidv4()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

    await db.query("INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)", [
      sessionId,
      user.id,
      expiresAt,
    ])

    // Set session cookie
    cookies().set({
      name: "session_id",
      value: sessionId,
      httpOnly: true,
      path: "/",
      expires: expiresAt,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
