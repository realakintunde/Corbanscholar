import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, Globe, HelpCircle, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Student Visa Resources | International Scholarship Finder",
  description:
    "Comprehensive guide to student visas for international scholarships, including requirements, application processes, and country-specific information.",
}

export default function VisaResourcesPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Student Visa Resources</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Everything you need to know about obtaining student visas for your international scholarship journey
        </p>
      </div>

      <div className="relative w-full h-64 md:h-80 mb-12 rounded-xl overflow-hidden">
        <Image
          src="/visa-resources-hero.jpg"
          alt="International student visa documents and passport"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent flex items-center">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white drop-shadow-md mb-2">Navigate Visa Requirements</h2>
            <p className="text-white/90 max-w-md drop-shadow-md">
              Your comprehensive guide to understanding and successfully applying for student visas worldwide
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full mb-12">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="application">Application Process</TabsTrigger>
          <TabsTrigger value="countries">Country Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  What is a Student Visa?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A student visa is an official document or endorsement added to your passport that gives you permission
                  to enter a specific country for the purpose of studying at an accredited institution. Most countries
                  require international students to obtain a student visa before they can begin their studies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Why You Need a Student Visa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Student visas are legally required for international students in most countries. They provide:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Legal permission to study in the host country</li>
                  <li>Ability to access student services and healthcare</li>
                  <li>Potential work rights during your studies</li>
                  <li>Foundation for post-study work opportunities</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Planning Your Visa Application</CardTitle>
              <CardDescription>Key considerations before you begin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Research Early</h3>
                  <p className="text-sm text-muted-foreground">
                    Begin researching visa requirements at least 6 months before your intended start date
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Country Specifics</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand that requirements vary significantly between countries
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Seek Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact your university's international office for specific advice
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Visa Requirements</CardTitle>
              <CardDescription>Documents and conditions typically required for student visas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Acceptance Letter</h3>
                  <p className="text-sm text-muted-foreground">
                    An official acceptance letter from an accredited educational institution in the host country
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Proof of Financial Resources</h3>
                  <p className="text-sm text-muted-foreground">
                    Evidence that you have sufficient funds to cover tuition fees, living expenses, and return
                    transportation
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Health Insurance</h3>
                  <p className="text-sm text-muted-foreground">
                    Many countries require proof of health insurance coverage for the duration of your stay
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Language Proficiency</h3>
                  <p className="text-sm text-muted-foreground">
                    Proof of proficiency in the language of instruction (e.g., TOEFL, IELTS for English)
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Valid Passport</h3>
                  <p className="text-sm text-muted-foreground">
                    A passport valid for at least 6 months beyond your intended period of stay
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Requirements</CardTitle>
              <CardDescription>Understanding the financial aspects of visa applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Proof of Funds</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Most countries require evidence that you can support yourself financially during your studies.
                      This typically includes:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Bank statements (usually for the past 3-6 months)</li>
                      <li>Scholarship award letters</li>
                      <li>Sponsorship letters with supporting financial documents</li>
                      <li>Education loans documentation</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Tuition Fee Requirements</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Some countries require proof that you've already paid your first year's tuition, while others only
                      require proof that you have access to these funds. Check the specific requirements for your
                      destination country.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Living Expenses</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      You'll need to demonstrate that you have enough funds to cover living expenses. The required
                      amount varies by country and even by city, ranging from $10,000 to $25,000 USD per year.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visa Application Timeline</CardTitle>
              <CardDescription>Recommended timeline for a smooth visa application process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 h-full w-0.5 bg-border"></div>

                <div className="relative pl-10 pb-8">
                  <div className="absolute left-0 rounded-full bg-primary w-8 h-8 flex items-center justify-center text-white font-medium">
                    1
                  </div>
                  <h3 className="font-medium text-lg mb-2">6-12 Months Before</h3>
                  <p className="text-muted-foreground">
                    Research visa requirements for your target countries and prepare necessary documents
                  </p>
                </div>

                <div className="relative pl-10 pb-8">
                  <div className="absolute left-0 rounded-full bg-primary w-8 h-8 flex items-center justify-center text-white font-medium">
                    2
                  </div>
                  <h3 className="font-medium text-lg mb-2">3-6 Months Before</h3>
                  <p className="text-muted-foreground">
                    Secure university acceptance and begin gathering required financial documentation
                  </p>
                </div>

                <div className="relative pl-10 pb-8">
                  <div className="absolute left-0 rounded-full bg-primary w-8 h-8 flex items-center justify-center text-white font-medium">
                    3
                  </div>
                  <h3 className="font-medium text-lg mb-2">2-3 Months Before</h3>
                  <p className="text-muted-foreground">
                    Schedule and attend visa interview (if required) and submit your visa application
                  </p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 rounded-full bg-primary w-8 h-8 flex items-center justify-center text-white font-medium">
                    4
                  </div>
                  <h3 className="font-medium text-lg mb-2">1-2 Months Before</h3>
                  <p className="text-muted-foreground">Follow up on your application status and prepare for travel</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visa Interview Tips</CardTitle>
              <CardDescription>How to prepare for your visa interview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Be Prepared</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Bring all required documents in an organized folder</li>
                    <li>Review your application thoroughly before the interview</li>
                    <li>Be ready to explain your study plans and career goals</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Demonstrate Ties to Home Country</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Bring evidence of reasons to return to your home country</li>
                    <li>Family connections, property, job offers after graduation</li>
                    <li>Clear plans for using your education back home</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Communication</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Answer questions directly and concisely</li>
                    <li>Be honest and consistent with your application</li>
                    <li>Speak clearly and maintain eye contact</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Professional Appearance</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Dress professionally for your interview</li>
                    <li>Arrive early to avoid unnecessary stress</li>
                    <li>Turn off your phone before entering</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="countries" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Image
                    src="/american-pride.png"
                    alt="USA Flag"
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  United States
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  F-1 visa for academic students and M-1 visa for vocational students. Requires Form I-20 from your
                  school, SEVIS fee payment, and often an interview.
                </p>
                <Link href="/resources/visa/usa" passHref>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Image src="/union-jack-flying.png" alt="UK Flag" width={24} height={24} className="rounded-sm" />
                  United Kingdom
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Student visa (formerly Tier 4) requires a Confirmation of Acceptance for Studies (CAS) from your
                  institution and proof of financial means.
                </p>
                <Link href="/resources/visa/uk" passHref>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Image
                    src="/canadian-maple-leaf.png"
                    alt="Canada Flag"
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  Canada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Study permit required for courses longer than 6 months. Includes biometrics and possibly a medical
                  exam. Can include work authorization.
                </p>
                <Link href="/resources/visa/canada" passHref>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Image
                    src="/australian-national-flag.png"
                    alt="Australia Flag"
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  Australia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Student visa (subclass 500) requires Confirmation of Enrollment (CoE), health insurance (OSHC), and
                  financial capacity proof.
                </p>
                <Link href="/resources/visa/australia" passHref>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Image
                    src="/german-tricolor.png"
                    alt="Germany Flag"
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  Germany
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  National visa (D visa) for students requires university admission, proof of financial resources, and
                  health insurance.
                </p>
                <Link href="/resources/visa/germany" passHref>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Image
                    src="/placeholder.svg?height=24&width=24&query=france flag"
                    alt="France Flag"
                    width={24}
                    height={24}
                    className="rounded-sm"
                  />
                  France
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Long-stay student visa requires acceptance letter, proof of accommodation, and financial guarantees.
                  Campus France registration may be required.
                </p>
                <Link href="/resources/visa/france" passHref>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/resources/visa/all-countries" passHref>
              <Button>View All Country Guides</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Need Help With Your Visa Application?</h2>
        <p className="mb-6">
          Our team of experts can provide personalized guidance for your specific situation and destination country.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/resources/visa/consultation" passHref>
            <Button>Schedule a Consultation</Button>
          </Link>
          <Link href="/resources/visa/checklist-generator" passHref>
            <Button variant="outline">Generate Custom Checklist</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
