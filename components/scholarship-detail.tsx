"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, GraduationCap, DollarSign, FileText, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ScholarshipSource {
  name: string
  website?: string
  logo_url?: string
}

interface Scholarship {
  id: number
  title: string
  description?: string
  amount?: string
  deadline?: string
  university?: string
  country?: string
  field_of_study?: string
  field?: string
  academic_level?: string
  level?: string
  eligibility?: string | string[]
  benefits?: string | string[]
  requirements?: string
  source_name?: string
  source_website?: string
  source_logo?: string
  link?: string
  website?: string
}

export default function ScholarshipDetail({ scholarship }: { scholarship: Scholarship }) {
  const router = useRouter()
  const [hasError, setHasError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if scholarship has required fields
    if (!scholarship || !scholarship.title) {
      console.error("Invalid scholarship data:", scholarship)
      setHasError(true)
    }

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [scholarship])

  if (hasError) {
    return (
      <div className="container py-4 md:py-8">
        <div className="mb-4 md:mb-6">
          <Link href="/search" className="text-sm text-muted-foreground hover:underline mb-2 inline-flex items-center">
            ← Back to search results
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">Scholarship Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-4 md:p-6">
            <p className="mb-4">Sorry, we couldn't load this scholarship. It may not exist or there was an error.</p>
            <Button onClick={() => router.push("/search")}>Back to Search</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Format deadline date if it exists
  const formattedDeadline = scholarship.deadline
    ? new Date(scholarship.deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified"

  // Calculate days remaining if deadline exists
  const daysRemaining = scholarship.deadline
    ? Math.max(0, Math.ceil((new Date(scholarship.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null

  // Get the application link, with fallbacks
  const applicationLink = scholarship.link || scholarship.website || "#"

  // Format eligibility as array
  const eligibilityArray = Array.isArray(scholarship.eligibility)
    ? scholarship.eligibility
    : typeof scholarship.eligibility === "string"
      ? [scholarship.eligibility]
      : []

  return (
    <div className="container py-4 md:py-8">
      <div className="mb-4 md:mb-6">
        <Link href="/search" className="text-sm text-muted-foreground hover:underline mb-2 inline-flex items-center">
          ← Back to search results
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold mt-2">{scholarship.title}</h1>
      </div>

      {/* Mobile Apply Button - Fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-30">
        <Button asChild className="w-full" size="lg">
          <a
            href={applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Apply Now <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 pb-20 md:pb-0">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Main scholarship details */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-xl md:text-2xl">Scholarship Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 space-y-4 md:space-y-6">
              {/* Description */}
              {scholarship.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-line text-sm md:text-base">
                    {scholarship.description}
                  </p>
                </div>
              )}

              {/* Key details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Amount */}
                <div className="flex items-start gap-2">
                  <div className="bg-muted p-2 rounded-md">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Scholarship Amount</p>
                    <p className="font-medium text-sm md:text-base">{scholarship.amount || "Not specified"}</p>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-start gap-2">
                  <div className="bg-muted p-2 rounded-md">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Application Deadline</p>
                    <p className="font-medium text-sm md:text-base">{formattedDeadline}</p>
                    {daysRemaining !== null && (
                      <p className={`text-xs ${daysRemaining <= 30 ? "text-red-500" : "text-muted-foreground"}`}>
                        {daysRemaining === 0
                          ? "Due today!"
                          : daysRemaining > 0
                            ? `${daysRemaining} days remaining`
                            : "Deadline passed"}
                      </p>
                    )}
                  </div>
                </div>

                {/* University */}
                {scholarship.university && (
                  <div className="flex items-start gap-2">
                    <div className="bg-muted p-2 rounded-md">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">University/Institution</p>
                      <p className="font-medium text-sm md:text-base">{scholarship.university}</p>
                    </div>
                  </div>
                )}

                {/* Country */}
                {scholarship.country && (
                  <div className="flex items-start gap-2">
                    <div className="bg-muted p-2 rounded-md">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Country</p>
                      <p className="font-medium text-sm md:text-base">{scholarship.country}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {(scholarship.field_of_study || scholarship.field) && (
                  <Badge variant="outline">{scholarship.field_of_study || scholarship.field}</Badge>
                )}
                {(scholarship.academic_level || scholarship.level) && (
                  <Badge variant="outline">{scholarship.academic_level || scholarship.level}</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Eligibility */}
          {eligibilityArray.length > 0 && (
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Eligibility Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="whitespace-pre-line">
                  {Array.isArray(eligibilityArray) ? (
                    <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                      {eligibilityArray.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    eligibilityArray
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Requirements */}
          {scholarship.requirements && (
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Application Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="whitespace-pre-line text-sm md:text-base">{scholarship.requirements}</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Desktop only */}
        <div className="hidden lg:block space-y-4 md:space-y-6">
          {/* Apply button */}
          <Card>
            <CardContent className="pt-6">
              <Button asChild className="w-full" size="lg">
                <a
                  href={applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Apply Now <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                You will be redirected to the official application page
              </p>
            </CardContent>
          </Card>

          {/* Source information */}
          {scholarship.source_name && (
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-xl">Scholarship Source</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="flex items-center gap-3 mb-3">
                  {scholarship.source_logo ? (
                    <div className="h-10 w-10 relative">
                      <Image
                        src={scholarship.source_logo || "/placeholder.svg"}
                        alt={scholarship.source_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{scholarship.source_name}</p>
                    {scholarship.source_website && (
                      <a
                        href={scholarship.source_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Visit website
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Share options */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-xl">Share This Scholarship</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(scholarship.title)}&url=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.href : "",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.href : "",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(`Scholarship: ${scholarship.title}`)}&body=${encodeURIComponent(
                      `Check out this scholarship: ${typeof window !== "undefined" ? window.location.href : ""}`,
                    )}`}
                  >
                    Email
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
