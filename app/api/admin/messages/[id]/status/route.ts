import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const messageId = Number.parseInt(params.id)

    if (isNaN(messageId)) {
      return NextResponse.json({ error: "Invalid message ID" }, { status: 400 })
    }

    const { status } = await request.json()

    if (!status || !["unread", "in-progress", "resolved"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 })
    }

    // Update the message status in the database
    await db.query(`UPDATE contact_messages SET status = $1 WHERE id = $2`, [status, messageId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating message status:", error)
    return NextResponse.json({ error: "Failed to update message status" }, { status: 500 })
  }
}
