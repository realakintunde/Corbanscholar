"use client"

import { CardFooter } from "@/components/ui/card"

import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RelatedScholarships from "@/components/related-scholarships"
import { ErrorBoundary } from "@/components/error-boundary"

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
  eligibility: string[]
  benefits: string[]
  applicationProcess: string[]
  website: string
  featured: boolean
  viewCount?: number
  image?: string
}

interface ScholarshipDetailProps {
  scholarship: Scholarship
}

export default function ScholarshipDetail({ scholarship }: ScholarshipDetailProps) {
  const deadline = scholarship.deadline
    ? new Date(scholarship.deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Ongoing"

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex justify-between">
        <Button asChild variant="outline">
          <Link href="/search" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
            Back to Search
          </Link>
        </Button>
        <Button asChild>
          <a href={scholarship.website} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{scholarship.title}</CardTitle>
              <CardDescription>
                {scholarship.university}, {scholarship.country}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-64 w-full overflow-hidden rounded-md">
                <Image
                  src={scholarship.image || "/placeholder.svg"}
                  alt={scholarship.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Amount:</span>
                  <span>{scholarship.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Deadline:</span>
                  <span>{deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Level:</span>
                  <span>{scholarship.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Field:</span>
                  <span>{scholarship.field}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Overview</h3>
                <p>{scholarship.description}</p>
              </div>

              {scholarship.eligibility && scholarship.eligibility.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Eligibility</h3>
                  <ul className="list-disc pl-5">
                    {scholarship.eligibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {scholarship.benefits && scholarship.benefits.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Benefits</h3>
                  <ul className="list-disc pl-5">
                    {scholarship.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {scholarship.applicationProcess && scholarship.applicationProcess.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Application Process</h3>
                  <ul className="list-decimal pl-5">
                    {scholarship.applicationProcess.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a
                  href={scholarship.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Visit Official Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Related Scholarships</CardTitle>
              <CardDescription>Explore similar opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorBoundary>
                <RelatedScholarships
                  currentScholarshipId={scholarship.id}
                  country={scholarship.country}
                  level={scholarship.level}
                />
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
