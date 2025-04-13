import { neon } from "@neondatabase/serverless"

// Initialize the database connection with error handling
let db: ReturnType<typeof neon>

try {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set")
    // Provide a fallback for development or when DB is unavailable
    db = {
      query: async () => {
        console.warn("Using mock database - real database connection not available")
        return []
      },
    } as ReturnType<typeof neon>
  } else {
    db = neon(process.env.DATABASE_URL)
    console.log("Database connection initialized successfully")
  }
} catch (error) {
  console.error("Failed to initialize database connection:", error)
  // Provide a fallback implementation
  db = {
    query: async () => {
      console.warn("Using mock database due to connection error")
      return []
    },
  } as ReturnType<typeof neon>
}

export { db }

// Update the Scholarship type to include source information
export type Scholarship = {
  id: number
  title: string
  university: string
  country: string
  amount: string
  deadline: string
  level: string
  field: string
  description: string
  eligibility: string[]
  benefits: string[]
  applicationProcess: string[]
  website: string
  featured: boolean
  viewCount?: number
  url?: string
  source_name?: string
  source_logo?: string
  link?: string // Added to ensure compatibility with existing code
}

// Helper function to get fallback scholarships when database is unavailable
export function getFallbackScholarships() {
  return [
    {
      id: 1,
      title: "Fulbright Foreign Student Program",
      description:
        "The Fulbright Foreign Student Program enables graduate students, young professionals, and artists from abroad to study and conduct research in the United States.",
      amount: "$20,000 - Full Funding",
      deadline: "2023-12-01",
      university: "Various U.S. Universities",
      country: "United States",
      field_of_study: "All Fields",
      academic_level: "Graduate",
      link: "https://foreign.fulbrightonline.org/",
      website: "https://foreign.fulbrightonline.org/",
    },
    {
      id: 2,
      title: "Chevening Scholarships",
      description: "Chevening is the UK government's international awards program aimed at developing global leaders.",
      amount: "Full Funding",
      deadline: "2023-11-02",
      university: "UK Universities",
      country: "United Kingdom",
      field_of_study: "All Fields",
      academic_level: "Masters",
      link: "https://www.chevening.org/",
      website: "https://www.chevening.org/",
    },
    {
      id: 3,
      title: "DAAD Scholarships",
      description:
        "The German Academic Exchange Service (DAAD) offers scholarships for international students to study in Germany.",
      amount: "€850 monthly + benefits",
      deadline: "2023-10-15",
      university: "German Universities",
      country: "Germany",
      field_of_study: "Various",
      academic_level: "Undergraduate, Graduate, PhD",
      link: "https://www.daad.de/en/",
      website: "https://www.daad.de/en/",
    },
  ]
}

// Helper function to get a single fallback scholarship
export function getFallbackScholarship(id: number) {
  const scholarships = getFallbackScholarships()
  const scholarship = scholarships.find((s) => s.id === Number(id))

  if (scholarship) {
    // Ensure the scholarship has a link property, defaulting to website if needed
    if (!scholarship.link && scholarship.website) {
      scholarship.link = scholarship.website
    }
    return scholarship
  }

  return null
}

// Function to safely get a scholarship by ID
export async function getScholarship(id: number) {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not set, using fallback scholarship")
      return getFallbackScholarship(id)
    }

    const result = await db.query(`SELECT * FROM scholarships WHERE id = $1`, [id])

    if (result && result.length > 0) {
      const scholarship = result[0]
      // Ensure the scholarship has a link property, defaulting to website if needed
      if (!scholarship.link && scholarship.website) {
        scholarship.link = scholarship.website
      }
      return scholarship
    }

    return getFallbackScholarship(id)
  } catch (error) {
    console.error(`Error fetching scholarship with ID ${id}:`, error)
    return getFallbackScholarship(id)
  }
}
