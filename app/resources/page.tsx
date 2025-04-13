import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Globe, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Resources",
  description: "Useful resources for scholarship applications.",
}

export default function ResourcesPage() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Resources</h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Helpful resources to guide you through the scholarship application process.
          </p>
        </div>
      </section>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Scholarship Essay Guide</CardTitle>
              <CardDescription>Learn how to write a compelling scholarship essay.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Step-by-step guide to crafting an essay that stands out.</p>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
              <Link href="/resources/essay-guide" className="flex items-center text-sm font-medium">
                Read the Guide
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>CV and Resume Tips</CardTitle>
              <CardDescription>Tips for creating a standout CV or resume.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Expert advice on formatting, content, and keywords.</p>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
              <Link href="/resources/cv-resume-tips" className="flex items-center text-sm font-medium">
                View Tips
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Interview Preparation</CardTitle>
              <CardDescription>Prepare for your scholarship interview with confidence.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Common questions, tips, and strategies for success.</p>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
              <Link href="/resources/interview-prep" className="flex items-center text-sm font-medium">
                Get Prepared
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Application Templates</CardTitle>
              <CardDescription>Download free templates for your scholarship applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Access professionally designed templates for CVs, motivation letters, and research proposals.</p>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
              <Link href="/resources/templates" className="flex items-center text-sm font-medium">
                Browse Templates
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Link href="/resources/visa" className="group">
            <Card className="h-full transition-all hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Visa Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  Comprehensive guides to student visas for international scholarships, including requirements and
                  application processes.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Link href="/resources/faq" className="group">
            <Card className="h-full transition-all hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  Find answers to common questions about scholarships, eligibility, application processes, and using our
                  platform.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </>
  )
}
