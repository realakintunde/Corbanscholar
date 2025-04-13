"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface Scholarship {
  id: number
  title: string
  description?: string
  amount?: string
  deadline?: string
  university?: string
  country?: string
  country_name?: string // Added for potential different column name
  field_of_study?: string
  field?: string // Added for potential different column name
  academic_level?: string
  level?: string // Added for potential different column name
  eligibility?: string
  link?: string
  url?: string // Added for potential different column name
  website?: string // Added for potential different column name
}

export default function ScholarshipSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("query") || "")
  const [country, setCountry] = useState(searchParams.get("country") || "")
  const [fieldOfStudy, setFieldOfStudy] = useState(searchParams.get("field") || "")
  const [academicLevel, setAcademicLevel] = useState(searchParams.get("level") || "")
  const [amountFilter, setAmountFilter] = useState(searchParams.get("amount") || "")
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "deadline")

  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Countries list
  const countries = [
    "All Countries",
    "USA",
    "UK",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "Netherlands",
    "Sweden",
    "Switzerland",
    "Singapore",
    "South Korea",
    "New Zealand",
    "Ireland",
    "Spain",
    "Italy",
  ]

  // Fields of study
  const fields = [
    "All Fields",
    "Business",
    "Computer Science",
    "Engineering",
    "Medicine",
    "Law",
    "Arts",
    "Humanities",
    "Social Sciences",
    "Natural Sciences",
    "Education",
    "Agriculture",
    "Architecture",
    "Mathematics",
    "Physics",
  ]

  // Academic levels
  const levels = [
    "All Levels",
    "Undergraduate",
    "Masters",
    "PhD",
    "Postdoctoral",
    "Research",
    "Professional",
    "Vocational",
    "High School",
  ]

  // Amount filters
  const amounts = [
    "All Amounts",
    "Full Tuition",
    "Over $50,000",
    "$20,000 - $50,000",
    "$10,000 - $20,000",
    "$5,000 - $10,000",
    "Under $5,000",
  ]

  // Sort options
  const sortOptions = [
    { value: "deadline", label: "Deadline (Soonest)" },
    { value: "amount_desc", label: "Amount (Highest)" },
    { value: "amount_asc", label: "Amount (Lowest)" },
    { value: "relevance", label: "Relevance" },
  ]

  const fetchScholarships = async (resetResults = false) => {
    try {
      setLoading(true)
      setError(null)
      const currentPage = resetResults ? 1 : page

      const params = new URLSearchParams()
      if (query) params.set("query", query)
      if (country && country !== "All Countries") params.set("country", country)
      if (fieldOfStudy && fieldOfStudy !== "All Fields") params.set("field", fieldOfStudy)
      if (academicLevel && academicLevel !== "All Levels") params.set("level", academicLevel)
      if (amountFilter && amountFilter !== "All Amounts") params.set("amount", amountFilter)
      params.set("sort", sortBy)
      params.set("page", currentPage.toString())

      const response = await fetch(`/api/scholarships?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // Add null checks to handle undefined data.scholarships
      if (resetResults) {
        setScholarships(data.scholarships || [])
        setPage(1)
      } else {
        setScholarships([...scholarships, ...(data.scholarships || [])])
      }

      setTotalCount(data.total || 0)
      setHasMore(
        data.scholarships &&
          data.scholarships.length > 0 &&
          scholarships.length + (data.scholarships?.length || 0) < (data.total || 0),
      )
    } catch (error) {
      console.error("Error fetching scholarships:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch scholarships")
      // Set empty array if there's an error
      if (resetResults) {
        setScholarships([])
      }
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)

    if (query) params.set("query", query)
    else params.delete("query")

    if (country && country !== "All Countries") params.set("country", country)
    else params.delete("country")

    if (fieldOfStudy && fieldOfStudy !== "All Fields") params.set("field", fieldOfStudy)
    else params.delete("field")

    if (academicLevel && academicLevel !== "All Levels") params.set("level", academicLevel)
    else params.delete("level")

    if (amountFilter && amountFilter !== "All Amounts") params.set("amount", amountFilter)
    else params.delete("amount")

    params.set("sort", sortBy)

    router.push(`/search?${params.toString()}`)
    fetchScholarships(true)
  }

  const loadMore = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    fetchScholarships(true)
  }, [])

  useEffect(() => {
    if (page > 1) {
      fetchScholarships()
    }
  }, [page])

  const clearFilters = () => {
    setQuery("")
    setCountry("")
    setFieldOfStudy("")
    setAcademicLevel("")
    setAmountFilter("")
    setSortBy("deadline")
    router.push("/search")
    fetchScholarships(true)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (query) count++
    if (country && country !== "All Countries") count++
    if (fieldOfStudy && fieldOfStudy !== "All Fields") count++
    if (academicLevel && academicLevel !== "All Levels") count++
    if (amountFilter && amountFilter !== "All Amounts") count++
    return count
  }

  // Helper function to get the correct field value regardless of column name
  const getFieldValue = (scholarship: Scholarship, field: string, alternateFields: string[]) => {
    if (scholarship[field as keyof Scholarship]) {
      return scholarship[field as keyof Scholarship]
    }

    for (const altField of alternateFields) {
      if (scholarship[altField as keyof Scholarship]) {
        return scholarship[altField as keyof Scholarship]
      }
    }

    return "Not specified"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Filters sidebar */}
      <div className="md:col-span-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              {getActiveFiltersCount() > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* Search input */}
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="flex space-x-2">
                  <Input
                    id="search"
                    placeholder="Search scholarships..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch}>Search</Button>
                </div>
              </div>

              {/* Country filter */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Field of study filter */}
              <div className="space-y-2">
                <Label htmlFor="field">Field of Study</Label>
                <Select value={fieldOfStudy} onValueChange={setFieldOfStudy}>
                  <SelectTrigger id="field">
                    <SelectValue placeholder="All Fields" />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Academic level filter */}
              <div className="space-y-2">
                <Label htmlFor="level">Academic Level</Label>
                <Select value={academicLevel} onValueChange={setAcademicLevel}>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount filter */}
              <div className="space-y-2">
                <Label htmlFor="amount">Scholarship Amount</Label>
                <Select value={amountFilter} onValueChange={setAmountFilter}>
                  <SelectTrigger id="amount">
                    <SelectValue placeholder="All Amounts" />
                  </SelectTrigger>
                  <SelectContent>
                    {amounts.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={handleSearch}>
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results area */}
      <div className="md:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <div>
            {totalCount > 0 ? (
              <p className="text-muted-foreground">
                Showing {scholarships.length} of {totalCount} scholarships
              </p>
            ) : (
              <p className="text-muted-foreground">No scholarships found</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="sort" className="hidden sm:inline">
              Sort by:
            </Label>
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value)
                setTimeout(() => handleSearch(), 0)
              }}
            >
              <SelectTrigger id="sort" className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {query && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {query}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => {
                    setQuery("")
                    handleSearch()
                  }}
                >
                  ×
                </Button>
              </Badge>
            )}

            {country && country !== "All Countries" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Country: {country}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => {
                    setCountry("")
                    handleSearch()
                  }}
                >
                  ×
                </Button>
              </Badge>
            )}

            {fieldOfStudy && fieldOfStudy !== "All Fields" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Field: {fieldOfStudy}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => {
                    setFieldOfStudy("")
                    handleSearch()
                  }}
                >
                  ×
                </Button>
              </Badge>
            )}

            {academicLevel && academicLevel !== "All Levels" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Level: {academicLevel}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => {
                    setAcademicLevel("")
                    handleSearch()
                  }}
                >
                  ×
                </Button>
              </Badge>
            )}

            {amountFilter && amountFilter !== "All Amounts" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Amount: {amountFilter}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => {
                    setAmountFilter("")
                    handleSearch()
                  }}
                >
                  ×
                </Button>
              </Badge>
            )}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-4">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Scholarship results */}
        {loading && page === 1 ? (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
          </div>
        ) : scholarships.length > 0 ? (
          <div className="space-y-4">
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{scholarship.title}</h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {(scholarship.country || scholarship.country_name) && (
                      <Badge variant="outline">{getFieldValue(scholarship, "country", ["country_name"])}</Badge>
                    )}
                    {(scholarship.field_of_study || scholarship.field) && (
                      <Badge variant="outline">{getFieldValue(scholarship, "field_of_study", ["field"])}</Badge>
                    )}
                    {(scholarship.academic_level || scholarship.level) && (
                      <Badge variant="outline">{getFieldValue(scholarship, "academic_level", ["level"])}</Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {scholarship.description || "No description available"}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">{scholarship.amount || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-medium">
                        {scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">University</p>
                      <p className="font-medium">{scholarship.university || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button asChild>
                      <Link href={`/scholarship/${scholarship.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No scholarships found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search filters to find more results</p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}

        {/* Load more button */}
        {hasMore && (
          <div className="mt-6 text-center">
            <Button onClick={loadMore} disabled={loading} variant="outline" className="w-full md:w-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Loading..." : "Load More Scholarships"}
            </Button>
          </div>
        )}

        {/* End of results message */}
        {!hasMore && scholarships.length > 0 && (
          <p className="text-center text-muted-foreground mt-6">
            {`You've reached the end of the results (${scholarships.length} of ${totalCount} scholarships)`}
          </p>
        )}
      </div>
    </div>
  )
}
