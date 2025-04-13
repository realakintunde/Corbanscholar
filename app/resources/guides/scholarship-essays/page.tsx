import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Writing Winning Scholarship Essays | Resources | Scholarship Finder",
  description: "Techniques for crafting compelling personal statements and essays for scholarship applications",
}

export default function ScholarshipEssaysPage() {
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

      <h1 className="text-3xl font-bold tracking-tight">Writing Winning Scholarship Essays</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Techniques for crafting compelling personal statements and essays for scholarship applications
      </p>

      <div className="mt-8">
        <p>
          This guide is coming soon. Please check back later for comprehensive advice on writing effective scholarship
          essays.
        </p>
      </div>
    </main>
  )
}
