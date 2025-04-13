import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Download, Calendar, CheckCircle2, Clock, FileText, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "Scholarship Application Process | Resources | Scholarship Finder",
  description: "A comprehensive guide to the scholarship application process for international students",
}

export default function ApplicationProcessPage() {
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

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Scholarship Application Process</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              A comprehensive guide to help you navigate the scholarship application journey from start to finish
            </p>
          </div>

          <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 md:h-96">
            <Image
              src="/application-process-hero.jpg"
              alt="Student working on scholarship applications"
              fill
              className="object-cover"
              priority
            />
          </div>

          <Alert>
            <AlertTitle className="flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Time-Sensitive Information
            </AlertTitle>
            <AlertDescription>
              Most prestigious scholarships have application deadlines 9-12 months before the program start date. Start
              your preparation early to maximize your chances of success.
            </AlertDescription>
          </Alert>

          <div className="prose prose-slate max-w-none">
            <h2>Overview of the Scholarship Application Process</h2>
            <p>
              Applying for international scholarships can be complex, but breaking it down into manageable steps makes
              the process more approachable. This guide walks you through each stage of the application journey, from
              research to acceptance.
            </p>
          </div>

          {/* Application Timeline */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Scholarship Application Timeline</h2>
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-border"></div>

                <div className="relative mb-8 pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <h3 className="text-lg font-medium">12-18 months before: Research & Planning</h3>
                  <p className="mt-1 text-muted-foreground">
                    Research scholarship opportunities, eligibility requirements, and application deadlines. Create a
                    scholarship calendar and begin preparing your academic credentials.
                  </p>
                </div>

                <div className="relative mb-8 pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <h3 className="text-lg font-medium">9-12 months before: Standardized Tests</h3>
                  <p className="mt-1 text-muted-foreground">
                    Register for and take required standardized tests (TOEFL, IELTS, GRE, GMAT). Allow time for retakes
                    if necessary to achieve competitive scores.
                  </p>
                </div>

                <div className="relative mb-8 pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <h3 className="text-lg font-medium">6-9 months before: Recommendation Letters</h3>
                  <p className="mt-1 text-muted-foreground">
                    Identify and approach potential recommenders. Provide them with your CV, academic achievements, and
                    specific information about the scholarships you're applying for.
                  </p>
                </div>

                <div className="relative mb-8 pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    4
                  </div>
                  <h3 className="text-lg font-medium">3-6 months before: Essays & Personal Statements</h3>
                  <p className="mt-1 text-muted-foreground">
                    Draft, revise, and finalize your essays and personal statements. Seek feedback from mentors,
                    professors, or professional editors.
                  </p>
                </div>

                <div className="relative mb-8 pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    5
                  </div>
                  <h3 className="text-lg font-medium">2-3 months before: Application Submission</h3>
                  <p className="mt-1 text-muted-foreground">
                    Complete and submit scholarship applications. Double-check all requirements and ensure all
                    supporting documents are properly submitted.
                  </p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    6
                  </div>
                  <h3 className="text-lg font-medium">After Submission: Follow-up & Interviews</h3>
                  <p className="mt-1 text-muted-foreground">
                    Prepare for potential interviews. Follow up on your applications if appropriate. Respond promptly to
                    any requests for additional information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Guide */}
          <Tabs defaultValue="research" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="prepare">Preparation</TabsTrigger>
              <TabsTrigger value="apply">Application</TabsTrigger>
              <TabsTrigger value="followup">Follow-up</TabsTrigger>
            </TabsList>

            <TabsContent value="research" className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">1. Research Phase</h3>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Identify Suitable Scholarships</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Use our scholarship search tool to find opportunities matching your profile</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Research scholarship providers (governments, universities, foundations, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Check eligibility criteria carefully (nationality, academic background, etc.)</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Understand Requirements</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Create a document listing all required materials for each scholarship</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Note application deadlines and create a timeline working backward</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Research past scholarship recipients to understand what selectors value</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prepare" className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">2. Preparation Phase</h3>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Academic Credentials</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Obtain official transcripts and degree certificates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Arrange for translation of documents if required</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Prepare for and take standardized tests (TOEFL, IELTS, GRE, GMAT)</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Personal Documents</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Update your CV/resume to highlight relevant achievements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Draft personal statement/motivation letter templates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Secure strong recommendation letters from academic/professional references</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="apply" className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">3. Application Phase</h3>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Completing Applications</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Tailor your personal statement for each scholarship</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Answer all questions completely and honestly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Have someone proofread your application before submission</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Submission Process</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Submit applications well before deadlines</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Keep copies of all submitted materials</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Request confirmation of receipt when possible</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="followup" className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">4. Follow-up Phase</h3>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium">Interview Preparation</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Research common scholarship interview questions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Practice with mock interviews</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Prepare questions to ask the selection committee</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-md border p-4">
                  <h4 className="font-medium">After Decision</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>If successful: Complete acceptance procedures promptly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>If unsuccessful: Request feedback when possible</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      <span>Thank recommenders and update them on outcomes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Common Mistakes */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">Common Application Mistakes to Avoid</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Missing deadlines</AccordionTrigger>
                <AccordionContent>
                  Late applications are typically rejected without review. Create a calendar with all deadlines and set
                  reminders at least 2 weeks before each deadline to ensure you have time to address any last-minute
                  issues.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Generic essays and personal statements</AccordionTrigger>
                <AccordionContent>
                  Scholarship committees can easily spot generic essays. Tailor each application to address the specific
                  values and goals of the scholarship provider. Research their mission and demonstrate how you align
                  with their objectives.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Neglecting eligibility requirements</AccordionTrigger>
                <AccordionContent>
                  Carefully review all eligibility criteria before applying. Applying for scholarships where you don't
                  meet the basic requirements wastes your time and the reviewers'. Focus your efforts on opportunities
                  where you meet all criteria.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Poor recommendation choices</AccordionTrigger>
                <AccordionContent>
                  Choose recommenders who know you well and can speak specifically about your achievements and
                  potential. A generic letter from a high-profile person is less valuable than a detailed letter from
                  someone who has directly supervised your work.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Grammatical errors and typos</AccordionTrigger>
                <AccordionContent>
                  Errors suggest carelessness and lack of attention to detail. Have multiple people proofread your
                  application materials, and consider using grammar-checking tools as an additional layer of review.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Success Stories */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Success Stories</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Maria from Brazil</CardTitle>
                  <CardDescription>Fulbright Scholarship Recipient</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "I started preparing 18 months in advance, focusing on building a strong research proposal and
                    improving my English. The key was connecting my research interests to Brazil's development needs."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ahmed from Egypt</CardTitle>
                  <CardDescription>Chevening Scholarship Recipient</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    "I applied three times before succeeding. Each rejection taught me something valuable. I focused on
                    demonstrating leadership potential and a clear plan to contribute to Egypt after my studies."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
              <CardDescription>Complete these key application steps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Research Phase</span>
                  <span className="text-xs text-muted-foreground">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Document Preparation</span>
                  <span className="text-xs text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Essay Writing</span>
                  <span className="text-xs text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Recommendation Letters</span>
                  <span className="text-xs text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Application Submission</span>
                  <span className="text-xs text-muted-foreground">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Link href="/dashboard" className="w-full">
                  Create Application Tracker
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Downloadable Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Downloadable Resources</CardTitle>
              <CardDescription>Helpful tools for your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Application Checklist</p>
                    <p className="text-xs text-muted-foreground">PDF, 245KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Application Timeline Template</p>
                    <p className="text-xs text-muted-foreground">Excel, 132KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Recommendation Request Template</p>
                    <p className="text-xs text-muted-foreground">Word, 78KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Expert Advice */}
          <Card>
            <CardHeader>
              <CardTitle>Need Expert Advice?</CardTitle>
              <CardDescription>Get personalized guidance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Our scholarship advisors can review your application materials and provide personalized feedback to
                improve your chances of success.
              </p>
              <div className="rounded-md bg-muted p-3">
                <h4 className="font-medium">Services include:</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    <span>Essay review and feedback</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    <span>Mock interviews</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    <span>Application strategy sessions</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Contact an Advisor
              </Button>
            </CardFooter>
          </Card>

          {/* Related Guides */}
          <Card>
            <CardHeader>
              <CardTitle>Related Guides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                href="/resources/guides/recommendation-letters"
                className="block rounded-md border p-3 hover:bg-accent"
              >
                <p className="font-medium">Getting Strong Recommendation Letters</p>
                <p className="text-sm text-muted-foreground">How to secure compelling letters of recommendation</p>
              </Link>
              <Link href="/resources/guides/scholarship-essays" className="block rounded-md border p-3 hover:bg-accent">
                <p className="font-medium">Writing Winning Scholarship Essays</p>
                <p className="text-sm text-muted-foreground">Techniques for crafting compelling personal statements</p>
              </Link>
              <Link
                href="/resources/guides/interview-preparation"
                className="block rounded-md border p-3 hover:bg-accent"
              >
                <p className="font-medium">Scholarship Interview Preparation</p>
                <p className="text-sm text-muted-foreground">How to ace your scholarship interview</p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
