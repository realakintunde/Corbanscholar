import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getUserFromSession } from "@/lib/auth-utils"

export async function GET() {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const result = await db.query("SELECT id, name FROM application_statuses ORDER BY id")

    return NextResponse.json({ statuses: result })
  } catch (error) {
    console.error("Error fetching application statuses:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
