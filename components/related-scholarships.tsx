"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Scholarship } from "@/lib/db"

export default function RelatedScholarships({
  currentScholarshipId,
  country,
  level,
}: {
  currentScholarshipId: number
  country: string
  level: string
}) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelatedScholarships = async () => {
      try {
        // Fetch scholarships from the same country and academic level
        const response = await fetch(
          `/api/scholarships?country=${encodeURIComponent(country)}&level=${encodeURIComponent(level)}&limit=3`,
        )
        if (!response.ok) {
          throw new Error("Failed to fetch related scholarships")
        }
        const data = await response.json()
        // Filter out the current scholarship
        const filteredScholarships = data.scholarships.filter(
          (scholarship: Scholarship) => scholarship.id !== currentScholarshipId,
        )
        setScholarships(filteredScholarships.slice(0, 3))
      } catch (err) {
        setError("Failed to load related scholarships.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedScholarships()
  }, [currentScholarshipId, country, level])

  if (error) {
    return null // Don't show error for related scholarships section
  }

  if (scholarships.length === 0 && !isLoading) {
    return null // Don't show the section if there are no related scholarships
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))
        : scholarships.map((scholarship) => (
            <Card key={scholarship.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{scholarship.title}</CardTitle>
                <div className="text-sm text-gray-500">{scholarship.university}</div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Amount:</span>
                    <span className="text-sm">{scholarship.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Deadline:</span>
                    <span className="text-sm">
                      {new Date(scholarship.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{scholarship.level}</Badge>
                    <Badge variant="outline">{scholarship.field}</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/scholarship/${scholarship.id}`}
                  className="w-full rounded-md bg-sky-600 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-sky-700"
                >
                  View Details
                </Link>
              </CardFooter>
            </Card>
          ))}
    </div>
  )
}
