"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Scholarship } from "@/lib/db"

// Import the fallback data function
import { getFallbackScholarships } from "@/lib/db"

export default function FeaturedScholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setIsLoading(true)
        console.log("Fetching featured scholarships...")
        const response = await fetch("/api/scholarships?featured=true&limit=4")

        if (!response.ok) {
          throw new Error(`Failed to fetch scholarships: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Received data:", data)

        if (!data || !data.scholarships) {
          console.error("Invalid response format:", data)
          throw new Error("Invalid response format from API")
        }

        setScholarships(data.scholarships)
      } catch (err) {
        console.error("Error fetching scholarships:", err)
        // Use fallback data instead of showing an error
        console.log("Using fallback scholarship data")
        setScholarships(getFallbackScholarships())
        // Don't set error so the UI will still show something
        // setError("Failed to load scholarships. Please try again later.");
      } finally {
        setIsLoading(false)
      }
    }

    fetchScholarships()
  }, [])

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-800">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
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
                    <span className="text-sm font-medium">Country:</span>
                    <span className="text-sm">{scholarship.country}</span>
                  </div>
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
