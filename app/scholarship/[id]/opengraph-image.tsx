import { ImageResponse } from "next/og"
import { db } from "@/lib/db"

export const runtime = "edge"
export const alt = "Scholarship Details"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params }: { params: { id: string } }) {
  try {
    // Fetch scholarship data
    const { rows } = await db.query(
      `
      SELECT 
        s.title, 
        u.name as university, 
        c.name as country, 
        s.amount, 
        s.deadline
      FROM scholarships s
      LEFT JOIN universities u ON s.university_id = u.id
      LEFT JOIN countries c ON s.country_id = c.id
      WHERE s.id = $1
    `,
      [params.id],
    )

    if (rows.length === 0) {
      return new ImageResponse(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#f8fafc",
            color: "#0f172a",
            padding: "40px",
          }}
        >
          <h1 style={{ fontSize: "60px", fontWeight: "bold", marginBottom: "20px" }}>Scholarship Not Found</h1>
          <p style={{ fontSize: "30px" }}>International Scholarship Finder</p>
        </div>,
        { ...size },
      )
    }

    const scholarship = rows[0]
    const deadline = new Date(scholarship.deadline).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#f0f9ff",
          color: "#0c4a6e",
          padding: "40px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <span style={{ fontSize: "24px", marginLeft: "10px", fontWeight: "bold" }}>Scholarship Finder</span>
        </div>

        <h1 style={{ fontSize: "60px", fontWeight: "bold", marginBottom: "20px", maxWidth: "900px" }}>
          {scholarship.title}
        </h1>

        <div style={{ display: "flex", fontSize: "30px", marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>University:</span>
          <span>{scholarship.university}</span>
        </div>

        <div style={{ display: "flex", fontSize: "30px", marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>Country:</span>
          <span>{scholarship.country}</span>
        </div>

        <div style={{ display: "flex", fontSize: "30px", marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>Amount:</span>
          <span>{scholarship.amount}</span>
        </div>

        <div style={{ display: "flex", fontSize: "30px", marginBottom: "10px" }}>
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>Deadline:</span>
          <span>{deadline}</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            fontSize: "24px",
            color: "#0369a1",
          }}
        >
          Find your perfect scholarship at scholarshipfinder.com
        </div>
      </div>,
      { ...size },
    )
  } catch (error) {
    console.error("Error generating OpenGraph image:", error)
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#f8fafc",
          color: "#0f172a",
          padding: "40px",
        }}
      >
        <h1 style={{ fontSize: "60px", fontWeight: "bold", marginBottom: "20px" }}>International Scholarship Finder</h1>
        <p style={{ fontSize: "30px" }}>Discover scholarships worldwide</p>
      </div>,
      { ...size },
    )
  }
}
