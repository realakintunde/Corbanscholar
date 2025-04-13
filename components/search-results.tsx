"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SearchFilters from "./search-filters"

interface Scholarship {
  id: number
  title: string
  description?: string
  amount?: string
  deadline?: string
  university?: string
  country?: string
  field_of_study?: string
  academic_level?: string
}

interface SearchResultsProps {
  scholarships: Scholarship[]
  loading?: boolean
  totalCount?: number
  onLoadMore?: () => void
  hasMore?: boolean
  initialCountry?: string
  initialField?: string
  initialLevel?: string
  initialAmount?: string
  initialSource?: string
}

export default function SearchResults({
  scholarships,
  loading = false,
  totalCount = 0,
  onLoadMore,
  hasMore = false,
  initialCountry = "",
  initialField = "",
  initialLevel = "",
  initialAmount = "",
  initialSource = "",
}: SearchResultsProps) {
  const [filtersVisible, setFiltersVisible] = useState(false)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          {totalCount > 0 ? `${totalCount} scholarships found` : "No scholarships found"}
        </p>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] sm:w-[350px] overflow-y-auto">
            <div className="py-4">
              <h2 className="text-lg font-semibold mb-4">Search Filters</h2>
              <SearchFilters
                initialCountry={initialCountry}
                initialField={initialField}
                initialLevel={initialLevel}
                initialAmount={initialAmount}
                initialSource={initialSource}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block md:col-span-1">
        <div className="sticky top-20">
          <SearchFilters
            initialCountry={initialCountry}
            initialField={initialField}
            initialLevel={initialLevel}
            initialAmount={initialAmount}
            initialSource={initialSource}
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="md:col-span-3">
        {loading ? (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
              ))}
          </div>
        ) : scholarships.length > 0 ? (
          <div className="space-y-4">
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">{scholarship.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {scholarship.country && <Badge variant="outline">{scholarship.country}</Badge>}
                      {scholarship.field_of_study && <Badge variant="outline">{scholarship.field_of_study}</Badge>}
                      {scholarship.academic_level && <Badge variant="outline">{scholarship.academic_level}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {scholarship.description || "No description available"}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="text-sm font-medium">{scholarship.amount || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Deadline</p>
                        <p className="text-sm font-medium">
                          {scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button asChild size="sm">
                        <Link href={`/scholarship/${scholarship.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No scholarships found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search filters to find more results</p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-6 text-center">
            <Button onClick={onLoadMore} disabled={loading} variant="outline" className="w-full">
              {loading ? "Loading..." : "Load More Scholarships"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
