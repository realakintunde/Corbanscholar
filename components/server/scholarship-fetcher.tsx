import { getScholarships } from "@/lib/db-utils"

export async function fetchScholarships(options: {
  query?: string
  country?: string
  field?: string
  level?: string
  limit?: number
  offset?: number
  featured?: boolean
  recommended?: boolean
}) {
  return getScholarships(options)
}
