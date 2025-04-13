import { notFound } from "next/navigation"
import { getScholarship, getFallbackScholarship } from "@/lib/db"
import type { Metadata } from "next"
import ScholarshipDetail from "@/components/scholarship-detail"

// Define dynamic metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return {
      title: "Scholarship Not Found",
    }
  }

  try {
    const scholarship = await getScholarship(id)

    if (!scholarship) {
      return {
        title: "Scholarship Not Found",
      }
    }

    return {
      title: `${scholarship.title} | International Scholarship Finder`,
      description:
        scholarship.description?.substring(0, 160) ||
        "View scholarship details, eligibility, and application information.",
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Scholarship Details",
      description: "View scholarship details, eligibility, and application information.",
    }
  }
}

export default async function ScholarshipPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    notFound()
  }

  try {
    // Try to get the scholarship from the database
    const scholarship = await getScholarship(id)

    if (!scholarship) {
      // If no scholarship is found, try to get a fallback
      const fallbackScholarship = getFallbackScholarship(id)

      if (!fallbackScholarship) {
        notFound()
      }

      return <ScholarshipDetail scholarship={fallbackScholarship} />
    }

    return <ScholarshipDetail scholarship={scholarship} />
  } catch (error) {
    console.error(`Error fetching scholarship with ID ${id}:`, error)

    // If there's an error, try to get a fallback
    const fallbackScholarship = getFallbackScholarship(id)

    if (!fallbackScholarship) {
      notFound()
    }

    return <ScholarshipDetail scholarship={fallbackScholarship} />
  }
}
