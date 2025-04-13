import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "All Scholarship Guides | Resources | Scholarship Finder",
  description: "Comprehensive guides to help you navigate the scholarship application process",
}

export default function AllGuidesPage() {
  const guides = [
    {
      title: "Scholarship Application Process",
      description: "A step-by-step guide to applying for international scholarships",
      image: "/application-process-hero.jpg",
      link: "/resources/guides/application-process",
    },
    {
      title: "Getting Strong Recommendation Letters",
      description: "How to secure compelling letters of recommendation",
      image: "/thoughtful-recommendation.png",
      link: "/resources/guides/recommendation-letters",
    },
    {
      title: "Writing Winning Scholarship Essays",
      description: "Techniques for crafting compelling personal statements",
      image: "/shining-path-essay.png",
      link: "/resources/guides/scholarship-essays",
    },
    {
      title: "Scholarship Interview Preparation",
      description: "How to prepare for and ace your scholarship interviews",
      image: "/focused-student-typing.png",
      link: "/resources/guides/interview-preparation",
    },
    {
      title: "Financial Planning for International Students",
      description: "Managing finances while studying abroad",
      image: "/campus-walkway.png",
      link: "/resources/guides/financial-planning",
      comingSoon: true,
    },
    {
      title: "Visa Application Guide",
      description: "Navigating the student visa application process",
      image: "/university-courtyard-life.png",
      link: "/resources/guides/visa-application",
      comingSoon: true,
    },
  ]

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

      <h1 className="mb-6 text-3xl font-bold tracking-tight">All Scholarship Guides</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Comprehensive resources to help you navigate every step of the scholarship application process
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Card key={guide.title} className={guide.comingSoon ? "opacity-70" : ""}>
            <CardHeader className="p-0">
              <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
                {guide.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 pb-0">
                <CardTitle className="mt-2">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-muted-foreground">
                {guide.comingSoon
                  ? "This guide is currently being developed and will be available soon."
                  : "A comprehensive guide to help you navigate this aspect of the scholarship application process."}
              </p>
            </CardContent>
            <CardFooter className="p-4">
              {guide.comingSoon ? (
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              ) : (
                <Link href={guide.link} className="w-full">
                  <Button className="w-full">Read Guide</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
