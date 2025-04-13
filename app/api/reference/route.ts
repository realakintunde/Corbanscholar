import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get("type")

    if (!type) {
      return NextResponse.json({ message: "Type parameter is required" }, { status: 400 })
    }

    let table: string
    switch (type) {
      case "countries":
        table = "countries"
        break
      case "fields":
        table = "fields"
        break
      case "levels":
        table = "scholarship_levels"
        break
      case "application_statuses":
        table = "application_statuses"
        break
      default:
        return NextResponse.json({ message: "Invalid reference type" }, { status: 400 })
    }

    const result = await db.query(`SELECT * FROM ${table} ORDER BY name ASC`)

    return NextResponse.json({ items: result.rows })
  } catch (error) {
    console.error("Error fetching reference data:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
