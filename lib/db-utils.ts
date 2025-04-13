import { getFallbackScholarships, type Scholarship } from "./db"
import { neon } from "@neondatabase/serverless"

// Server-side only utility functions for database operations
export async function getScholarships(options: {
  query?: string
  country?: string
  field?: string
  level?: string
  limit?: number
  offset?: number
  featured?: boolean
  recommended?: boolean
  amount?: string
  sortBy?: string
  source?: string // Added source parameter
}): Promise<{ scholarships: Scholarship[]; total: number; isRecommended?: boolean; _fallback?: boolean }> {
  try {
    const {
      query,
      country,
      field,
      level,
      limit = 50,
      offset = 0,
      featured,
      recommended,
      amount,
      sortBy = "deadline",
      source, // Added source parameter
    } = options

    // If we're in a client component, return fallback data
    if (typeof window !== "undefined") {
      console.warn("Attempting to fetch scholarships from client-side. Using fallback data.")
      const fallbackData = getFallbackScholarships()
      return {
        scholarships: featured ? fallbackData.filter((s) => s.featured).slice(0, limit) : fallbackData.slice(0, limit),
        total: fallbackData.length,
        _fallback: true,
      }
    }

    // Create SQL client
    const sql = neon(process.env.DATABASE_URL!)

    // Build the count query first to get total results
    let countQueryText = `
      SELECT COUNT(*) as total
      FROM scholarships s
      LEFT JOIN universities u ON s.university_id = u.id
      LEFT JOIN countries c ON s.country_id = c.id
      LEFT JOIN academic_levels l ON s.level_id = l.id
      LEFT JOIN fields_of_study f ON s.field_id = f.id
      LEFT JOIN scholarship_sources src ON s.source_id = src.id
      WHERE 1=1
    `

    // Build the main query
    let queryText = `
      SELECT 
        s.id, 
        s.title, 
        u.name as university, 
        c.name as country, 
        s.amount, 
        s.deadline, 
        l.name as level, 
        f.name as field, 
        s.description, 
        s.eligibility, 
        s.benefits, 
        s.application_process, 
        s.website, 
        s.featured,
        COALESCE(s.view_count, 0) as view_count,
        src.name as source_name,
        src.logo_url as source_logo
      FROM 
        scholarships s
        LEFT JOIN universities u ON s.university_id = u.id
        LEFT JOIN countries c ON s.country_id = c.id
        LEFT JOIN academic_levels l ON s.level_id = l.id
        LEFT JOIN fields_of_study f ON s.field_id = f.id
        LEFT JOIN scholarship_sources src ON s.source_id = src.id
      WHERE 1=1
    `

    const queryParams: any[] = []
    const countParams: any[] = []
    let paramIndex = 1

    // Add filters - using ILIKE for case-insensitive partial matching
    if (query) {
      const searchCondition = ` AND (
        s.title ILIKE $${paramIndex} OR 
        s.description ILIKE $${paramIndex} OR
        u.name ILIKE $${paramIndex} OR
        c.name ILIKE $${paramIndex} OR
        f.name ILIKE $${paramIndex} OR
        src.name ILIKE $${paramIndex}
      )`
      queryText += searchCondition
      countQueryText += searchCondition

      const searchTerm = `%${query}%`
      queryParams.push(searchTerm)
      countParams.push(searchTerm)
      paramIndex++
    }

    if (country) {
      // Split by comma to support multiple countries
      const countries = country.split(",")
      if (countries.length > 0) {
        const placeholders = countries.map((_, i) => `$${paramIndex + i}`).join(", ")
        const countryCondition = ` AND c.name ILIKE ANY (ARRAY[${placeholders}])`

        queryText += countryCondition
        countQueryText += countryCondition

        countries.forEach((c) => {
          queryParams.push(`%${c}%`)
          countParams.push(`%${c}%`)
        })

        paramIndex += countries.length
      }
    }

    if (field) {
      // Split by comma to support multiple fields
      const fields = field.split(",")
      if (fields.length > 0) {
        const placeholders = fields.map((_, i) => `$${paramIndex + i}`).join(", ")
        const fieldCondition = ` AND f.name ILIKE ANY (ARRAY[${placeholders}])`

        queryText += fieldCondition
        const countCondition = fieldCondition
        countQueryText += countCondition

        fields.forEach((f) => {
          queryParams.push(`%${f}%`)
          countParams.push(`%${f}%`)
        })

        paramIndex += fields.length
      }
    }

    if (level) {
      // Split by comma to support multiple levels
      const levels = level.split(",")
      if (levels.length > 0) {
        const placeholders = levels.map((_, i) => `$${paramIndex + i}`).join(", ")
        const levelCondition = ` AND l.name ILIKE ANY (ARRAY[${placeholders}])`

        queryText += levelCondition
        countQueryText += levelCondition

        levels.forEach((l) => {
          queryParams.push(`%${l}%`)
          countParams.push(`%${l}%`)
        })

        paramIndex += levels.length
      }
    }

    // Add source filter
    if (source) {
      // Split by comma to support multiple sources
      const sources = source.split(",")
      if (sources.length > 0) {
        const placeholders = sources.map((_, i) => `$${paramIndex + i}`).join(", ")
        const sourceCondition = ` AND src.name ILIKE ANY (ARRAY[${placeholders}])`

        queryText += sourceCondition
        countQueryText += sourceCondition

        sources.forEach((s) => {
          queryParams.push(`%${s}%`)
          countParams.push(`%${s}%`)
        })

        paramIndex += sources.length
      }
    }

    // Add amount filter
    if (amount) {
      let amountCondition = ""

      switch (amount) {
        case "under5000":
          amountCondition = ` AND (
            (s.amount ~ '^\\$?[0-9,.]+' AND CAST(REPLACE(REPLACE(s.amount, '$', ''), ',', '') AS NUMERIC) < 5000) OR
            s.amount ILIKE '%under%5000%' OR
            s.amount ILIKE '%less than%5000%'
          )`
          break
        case "5000-10000":
          amountCondition = ` AND (
            (s.amount ~ '^\\$?[0-9,.]+' AND CAST(REPLACE(REPLACE(s.amount, '$', ''), ',', '') AS NUMERIC) >= 5000 AND
            CAST(REPLACE(REPLACE(s.amount, '$', ''), ',', '') AS NUMERIC) <= 10000)
          )`
          break
        case "10000-20000":
          amountCondition = ` AND (
            (s.amount ~ '^\\$?[0-9,.]+' AND CAST(REPLACE(REPLACE(s.amount, '$', ''), ',', '') AS NUMERIC) > 10000 AND
            CAST(REPLACE(REPLACE(s.amount, '$', ''), ',', '') AS NUMERIC) <= 20000)
          )`
          break
        case "over20000":
          amountCondition = ` AND (
            (s.amount ~ '^\\$?[0-9,.]+' AND CAST(REPLACE(REPLACE(s.amount, '$', ''), ',', '') AS NUMERIC) > 20000) OR
            s.amount ILIKE '%over%20000%' OR
            s.amount ILIKE '%more than%20000%'
          )`
          break
        case "fullTuition":
          amountCondition = ` AND (
            s.amount ILIKE '%full%tuition%' OR
            s.amount ILIKE '%100%tuition%' OR
            s.amount ILIKE '%complete%tuition%'
          )`
          break
      }

      if (amountCondition) {
        queryText += amountCondition
        countQueryText += amountCondition
      }
    }

    if (featured) {
      queryText += ` AND s.featured = true`
      countQueryText += ` AND s.featured = true`
    }

    // Get total count first
    const countResult = await sql(countQueryText, countParams)
    const total = Number.parseInt(countResult?.rows?.[0]?.total || "0", 10)

    // Add sorting
    switch (sortBy) {
      case "deadline":
        queryText += ` ORDER BY s.deadline ASC NULLS LAST, s.featured DESC`
        break
      case "amount":
        // Try to sort numerically when possible
        queryText += ` ORDER BY 
          CASE WHEN s.amount ~ '^\\$?[0-9,.]+' 
          THEN CAST(REPLACE(REPLACE(s.amount, '$', ''), ',', '') AS NUMERIC) 
          ELSE 0 END DESC, 
          s.featured DESC`
        break
      case "popularity":
        queryText += ` ORDER BY s.view_count DESC, s.featured DESC`
        break
      case "source":
        queryText += ` ORDER BY src.name ASC, s.featured DESC`
        break
      case "relevance":
      default:
        queryText += ` ORDER BY s.featured DESC, s.deadline ASC NULLS LAST`
    }

    // Add limit and offset
    queryText += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    queryParams.push(limit, offset)

    console.log("Executing query:", queryText, queryParams)

    // Execute the query
    const result = await sql(queryText, queryParams)

    if (!result || !result.rows || result.rows.length === 0) {
      console.log("No scholarships found, returning fallback data")
      // If no results, try to return recommended scholarships or fallback data
      if (recommended) {
        // For recommended, we could implement a more sophisticated algorithm
        // For now, just return featured scholarships
        const featuredResult = await sql(
          `
          SELECT 
            s.id, 
            s.title, 
            u.name as university, 
            c.name as country, 
            s.amount, 
            s.deadline, 
            l.name as level, 
            f.name as field, 
            s.description, 
            s.eligibility, 
            s.benefits, 
            s.application_process, 
            s.website, 
            s.featured,
            COALESCE(s.view_count, 0) as view_count,
            src.name as source_name,
            src.logo_url as source_logo
          FROM 
            scholarships s
            LEFT JOIN universities u ON s.university_id = u.id
            LEFT JOIN countries c ON s.country_id = c.id
            LEFT JOIN academic_levels l ON s.level_id = l.id
            LEFT JOIN fields_of_study f ON s.field_id = f.id
            LEFT JOIN scholarship_sources src ON s.source_id = src.id
          WHERE s.featured = true
          ORDER BY s.deadline ASC
          LIMIT $1
        `,
          [limit],
        )

        if (featuredResult && featuredResult.rows && featuredResult.rows.length > 0) {
          return {
            scholarships: featuredResult.rows,
            total: featuredResult.rows.length,
            isRecommended: true,
          }
        }
      }

      // If still no results, use fallback data
      const fallbackData = getFallbackScholarships()
      return {
        scholarships: featured ? fallbackData.filter((s) => s.featured).slice(0, limit) : fallbackData.slice(0, limit),
        total: fallbackData.length,
        _fallback: true,
      }
    }

    console.log(`Found ${result.rows.length} scholarships out of ${total} total`)

    // Process the results
    const scholarships = result.rows.map((row) => ({
      ...row,
      eligibility: typeof row.eligibility === "string" ? JSON.parse(row.eligibility) : row.eligibility,
      benefits: typeof row.benefits === "string" ? JSON.parse(row.benefits) : row.benefits,
      application_process:
        typeof row.application_process === "string" ? JSON.parse(row.application_process) : row.application_process,
    }))

    return { scholarships, total }
  } catch (error) {
    console.error("Error fetching scholarships:", error)

    // Return fallback data in case of error
    const fallbackData = getFallbackScholarships()
    return {
      scholarships: featured ? fallbackData.filter((s) => s.featured).slice(0, limit) : fallbackData.slice(0, limit),
      total: fallbackData.length,
      _fallback: true,
    }
  }
}

// Add more database utility functions as needed
