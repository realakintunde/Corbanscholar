"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, BookOpen, Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FavoriteButton from "@/components/favorite-button"
import { useRouter, useSearchParams } from "next/navigation"

interface Scholarship {
  id: number
  title: string
  university: string
  country: string
  amount: string
  deadline: string
  level: string
  field: string
  description: string
  featured: boolean
  view_count?: number
  source_name?: string
  source_logo?: string
}

interface SearchResultsProps {
  initialQuery?: string
  initialCountry?: string
  initialField?: string
  initialLevel?: string
  initialAmount?: string
  initialSource?: string // Added source parameter
}

export default function SearchResults({
  initialQuery = "",
  initialCountry = "",
  initialField = "",
  initialLevel = "",
  initialAmount = "",
  initialSource = "", // Added source parameter
}: SearchResultsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "deadline")
  const limit = 20

  const fetchScholarships = async (reset = false) => {
    try {
      setLoading(true)
      setError(null)

      const currentPage = reset ? 1 : page
      const offset = (currentPage - 1) * limit

      // Build query parameters
      const params = new URLSearchParams(searchParams.toString())
      params.set("limit", limit.toString())
      params.set("offset", offset.toString())
      params.set("sortBy", sortBy)

      const response = await fetch(`/api/scholarships?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Error fetching scholarships: ${response.status}`)
      }

      const data = await response.json()

      if (reset) {
        setScholarships(data.scholarships)
      } else {
        setScholarships((prev) => [...prev, ...data.scholarships])
      }

      setTotal(data.total || data.scholarships.length)
      setHasMore(data.scholarships.length === limit && currentPage * limit < data.total)

      if (reset) {
        setPage(1)
      } else {
        setPage(currentPage + 1)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching scholarships")
      console.error("Error fetching scholarships:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchScholarships(true)
  }, [initialQuery, initialCountry, initialField, initialLevel, initialAmount, initialSource, searchParams, sortBy])

  const formatDate = (dateString: string) => {
    if (!dateString) return "Ongoing"
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)

    // Update URL with sort parameter
    const params = new URLSearchParams(searchParams.toString())
    params.set("sortBy", value)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Search Results</h2>
          <div className="text-sm text-muted-foreground">
            Showing {scholarships.length} of {total} scholarships
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
              <SelectItem value="amount">Amount (Highest)</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="source">Source</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => fetchScholarships(true)}>
            Try Again
          </Button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id} className="overflow-hidden">
            {scholarship.featured && (
              <div className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 text-center">
                Featured Scholarship
              </div>
            )}
            <CardHeader>
              {/* Display source logo and name if available */}
              {scholarship.source_name && (
                <div className="flex items-center gap-2 mb-2">
                  {scholarship.source_logo ? (
                    <div className="h-6 w-6 relative">
                      <Image
                        src={scholarship.source_logo || "/placeholder.svg"}
                        alt={scholarship.source_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      {scholarship.source_name}
                    </Badge>
                  )}
                </div>
              )}
              <CardTitle className="line-clamp-2">
                <Link href={`/scholarship/${scholarship.id}`} className="hover:underline">
                  {scholarship.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {scholarship.university || "Multiple Institutions"}, {scholarship.country || "International"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="line-clamp-3 text-sm text-muted-foreground">{scholarship.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {scholarship.amount || "Varies"}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(scholarship.deadline)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {scholarship.level || "Multiple Levels"}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline" size="sm">
                <Link href={`/scholarship/${scholarship.id}`}>View Details</Link>
              </Button>
              <div className="flex gap-2">
                {scholarship.website && (
                  <Button asChild variant="ghost" size="icon" className="h-9 w-9">
                    <a
                      href={scholarship.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit official website"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                <FavoriteButton scholarshipId={scholarship.id} />
              </div>
            </CardFooter>
          </Card>
        ))}

        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={`skeleton-${i}`} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </CardFooter>
            </Card>
          ))}
      </div>

      {!loading && hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={() => fetchScholarships()} variant="outline">
            Load More ({scholarships.length} of {total})
          </Button>
        </div>
      )}

      {!loading && scholarships.length === 0 && !error && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No scholarships found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search filters or browse our featured scholarships.
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Browse Featured</Link>
          </Button>
        </div>
      )}

      {!loading && scholarships.length > 0 && !hasMore && (
        <div className="text-center py-6 text-sm text-muted-foreground">
          You've reached the end of the results. Showing {scholarships.length} of {total} scholarships.
        </div>
      )}
    </div>
  )
}
