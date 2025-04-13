import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const db = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query = searchParams.get("query") || ""
    const country = searchParams.get("country") || ""
    const field = searchParams.get("field") || ""
    const level = searchParams.get("level") || ""
    const amount = searchParams.get("amount") || ""
    const sort = searchParams.get("sort") || "deadline"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 10
    const offset = (page - 1) * limit

    // First, let's check the table structure to understand what columns we have
    try {
      const tableInfo = await db.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'scholarships'
      `)

      console.log(
        "Available columns in scholarships table:",
        tableInfo.map((col) => col.column_name),
      )
    } catch (error) {
      console.error("Error fetching table structure:", error)
    }

    // Build the base query with proper joins if needed
    let baseQuery = `
      SELECT s.* 
      FROM scholarships s
    `

    // Check if we need to join with a countries table
    try {
      const countryTableExists = await db.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'countries'
        ) as exists
      `)

      if (countryTableExists[0]?.exists) {
        baseQuery = `
          SELECT s.*, c.name as country_name 
          FROM scholarships s
          LEFT JOIN countries c ON s.country_id = c.id
        `
      }
    } catch (error) {
      console.error("Error checking for countries table:", error)
    }

    // Build the WHERE clause
    const conditions = []
    const params: any[] = []
    let paramIndex = 1

    // Search query
    if (query) {
      conditions.push(`(
        s.title ILIKE $${paramIndex} OR
        s.description ILIKE $${paramIndex}
      )`)
      params.push(`%${query}%`)
      paramIndex++
    }

    // Country filter - adapt based on schema
    if (country && country !== "All Countries") {
      // Try to determine if we're using country_id or direct country column
      try {
        const hasCountryId = await db.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_name = 'scholarships' AND column_name = 'country_id'
          ) as exists
        `)

        if (hasCountryId[0]?.exists) {
          // Using country_id with a join
          conditions.push(`c.name ILIKE $${paramIndex}`)
        } else {
          // Direct country column might exist with a different name
          conditions.push(`(
            s.country_name ILIKE $${paramIndex} OR 
            s.country ILIKE $${paramIndex}
          )`)
        }
        params.push(`%${country}%`)
        paramIndex++
      } catch (error) {
        console.error("Error checking country column:", error)
      }
    }

    // Field of study filter - adapt based on schema
    if (field && field !== "All Fields") {
      try {
        const hasFieldId = await db.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_name = 'scholarships' AND column_name = 'field_id'
          ) as exists
        `)

        if (hasFieldId[0]?.exists) {
          baseQuery = `
            ${baseQuery}
            LEFT JOIN fields f ON s.field_id = f.id
          `
          conditions.push(`f.name ILIKE $${paramIndex}`)
        } else {
          conditions.push(`(
            s.field_of_study ILIKE $${paramIndex} OR
            s.field ILIKE $${paramIndex}
          )`)
        }
        params.push(`%${field}%`)
        paramIndex++
      } catch (error) {
        console.error("Error checking field column:", error)
      }
    }

    // Academic level filter - adapt based on schema
    if (level && level !== "All Levels") {
      try {
        const hasLevelId = await db.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_name = 'scholarships' AND column_name = 'level_id'
          ) as exists
        `)

        if (hasLevelId[0]?.exists) {
          baseQuery = `
            ${baseQuery}
            LEFT JOIN scholarship_levels sl ON s.level_id = sl.id
          `
          conditions.push(`sl.name ILIKE $${paramIndex}`)
        } else {
          conditions.push(`(
            s.academic_level ILIKE $${paramIndex} OR
            s.level ILIKE $${paramIndex}
          )`)
        }
        params.push(`%${level}%`)
        paramIndex++
      } catch (error) {
        console.error("Error checking level column:", error)
      }
    }

    // Amount filter
    if (amount && amount !== "All Amounts") {
      if (amount === "Full Tuition") {
        conditions.push(`(s.amount ILIKE $${paramIndex} OR s.amount ILIKE $${paramIndex + 1})`)
        params.push("%full%", "%tuition%")
        paramIndex += 2
      } else if (amount === "Over $50,000") {
        conditions.push(`
          (
            (s.amount ~ $${paramIndex} AND CAST(REGEXP_REPLACE(s.amount, '[^0-9]', '', 'g') AS INTEGER) > 50000) OR
            s.amount ILIKE $${paramIndex + 1}
          )
        `)
        params.push("[0-9]", "%full%")
        paramIndex += 2
      } else if (amount === "$20,000 - $50,000") {
        conditions.push(`
          (s.amount ~ $${paramIndex} AND 
           CAST(REGEXP_REPLACE(s.amount, '[^0-9]', '', 'g') AS INTEGER) BETWEEN 20000 AND 50000)
        `)
        params.push("[0-9]")
        paramIndex++
      } else if (amount === "$10,000 - $20,000") {
        conditions.push(`
          (s.amount ~ $${paramIndex} AND 
           CAST(REGEXP_REPLACE(s.amount, '[^0-9]', '', 'g') AS INTEGER) BETWEEN 10000 AND 20000)
        `)
        params.push("[0-9]")
        paramIndex++
      } else if (amount === "$5,000 - $10,000") {
        conditions.push(`
          (s.amount ~ $${paramIndex} AND 
           CAST(REGEXP_REPLACE(s.amount, '[^0-9]', '', 'g') AS INTEGER) BETWEEN 5000 AND 10000)
        `)
        params.push("[0-9]")
        paramIndex++
      } else if (amount === "Under $5,000") {
        conditions.push(`
          (s.amount ~ $${paramIndex} AND 
           CAST(REGEXP_REPLACE(s.amount, '[^0-9]', '', 'g') AS INTEGER) < 5000)
        `)
        params.push("[0-9]")
        paramIndex++
      }
    }

    // Build the WHERE clause
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""

    // Build the ORDER BY clause
    let orderByClause = ""
    if (sort === "deadline") {
      orderByClause = "ORDER BY CASE WHEN s.deadline IS NULL THEN 1 ELSE 0 END, s.deadline ASC"
    } else if (sort === "amount_desc") {
      orderByClause =
        "ORDER BY CASE WHEN s.amount ~ '[0-9]' THEN CAST(REGEXP_REPLACE(s.amount, '[^0-9]', '', 'g') AS INTEGER) ELSE 0 END DESC"
    } else if (sort === "amount_asc") {
      orderByClause =
        "ORDER BY CASE WHEN s.amount ~ '[0-9]' THEN CAST(REGEXP_REPLACE(s.amount, '[^0-9]', '', 'g') AS INTEGER) ELSE 999999 END ASC"
    } else if (sort === "relevance" && query) {
      // If sorting by relevance and there's a search query
      orderByClause = `
        ORDER BY 
          CASE 
            WHEN s.title ILIKE $${paramIndex} THEN 3
            WHEN s.description ILIKE $${paramIndex} THEN 1
            ELSE 0
          END DESC
      `
      params.push(`%${query}%`)
      paramIndex++
    } else {
      // Default sort
      orderByClause = "ORDER BY s.id DESC"
    }

    // Count total results
    const countQuery = `
      SELECT COUNT(*) as total
      FROM (${baseQuery} ${whereClause}) as count_query
    `

    const countResult = await db.query(countQuery, params)
    const total = Number.parseInt(countResult[0]?.total || "0")

    // Get paginated results
    const scholarshipsQuery = `
      ${baseQuery}
      ${whereClause}
      ${orderByClause}
      LIMIT ${limit} OFFSET ${offset}
    `

    try {
      console.log("Executing query:", scholarshipsQuery)
      console.log("With params:", params)

      const scholarships = await db.query(scholarshipsQuery, params)

      // Let's log the first result to see its structure
      if (scholarships && scholarships.length > 0) {
        console.log("First scholarship result structure:", Object.keys(scholarships[0]))
      }

      return NextResponse.json({
        scholarships: scholarships || [],
        total,
        page,
        limit,
      })
    } catch (error) {
      console.error("Error executing scholarship query:", error)
      return NextResponse.json({
        scholarships: [],
        total: 0,
        page,
        limit,
      })
    }
  } catch (error) {
    console.error("Error fetching scholarships:", error)
    return NextResponse.json(
      {
        scholarships: [],
        total: 0,
        page: 1,
        limit: 10,
      },
      { status: 500 },
    )
  }
}
