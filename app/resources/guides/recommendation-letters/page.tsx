import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Getting Strong Recommendation Letters | Resources | Scholarship Finder",
  description: "How to secure compelling letters of recommendation for your scholarship applications",
}

export default function RecommendationLettersPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-6">
        <Link
          href="/resources"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Resources
        </Link>
      </div>

      <h1 className="text-3xl font-bold tracking-tight">Getting Strong Recommendation Letters</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        How to secure compelling letters of recommendation for your scholarship applications
      </p>

      <div className="mt-8">
        <p>
          This guide is coming soon. Please check back later for comprehensive advice on securing strong recommendation
          letters.
        </p>
      </div>
    </main>
  )
}
