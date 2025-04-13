import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, HelpCircle, MessageCircle, Mail } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Scholarship Finder",
  description: "Find answers to common questions about scholarships and using our platform.",
}

export default function FAQPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about scholarships and using our platform
          </p>
        </div>

        <div className="relative mx-auto max-w-2xl">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search for answers..."
            className="w-full rounded-full border bg-background px-12 py-3 text-sm"
          />
          <Button size="sm" className="absolute right-1 top-1 rounded-full">
            Search
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
            <TabsTrigger value="international">International</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Questions</CardTitle>
                <CardDescription>Basic information about scholarships and financial aid</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is a scholarship?</AccordionTrigger>
                    <AccordionContent>
                      A scholarship is a financial award provided to students to further their education. Unlike student
                      loans, scholarships do not need to be repaid. They are typically awarded based on various
                      criteria, which reflect the values and purposes of the donor or founder of the award.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How are scholarships different from grants?</AccordionTrigger>
                    <AccordionContent>
                      While both scholarships and grants provide free money for college, scholarships are typically
                      merit-based (academic, athletic, artistic achievement) while grants are usually need-based
                      (financial need). However, there can be overlap between the two categories.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>When should I start applying for scholarships?</AccordionTrigger>
                    <AccordionContent>
                      It's best to start researching and applying for scholarships as early as possible, ideally 12-18
                      months before you need the funding. Many scholarships have deadlines in the fall or winter for
                      funding that will be awarded for the following academic year.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Are scholarships taxable?</AccordionTrigger>
                    <AccordionContent>
                      In many countries, scholarship money used for tuition, fees, books, and required equipment is
                      generally tax-free. However, funds used for room, board, and other expenses might be taxable. We
                      recommend consulting with a tax professional for specific advice regarding your situation.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How many scholarships should I apply for?</AccordionTrigger>
                    <AccordionContent>
                      Apply for as many scholarships as you qualify for and can reasonably complete quality applications
                      for. Scholarship applications can be time-consuming, so focus on those that best match your
                      profile and have higher award amounts or better chances of success.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eligibility" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Questions</CardTitle>
                <CardDescription>Information about qualifying for scholarships</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What GPA do I need to qualify for scholarships?</AccordionTrigger>
                    <AccordionContent>
                      GPA requirements vary widely depending on the scholarship. Some prestigious academic scholarships
                      might require a 3.5 or higher, while others may have lower requirements or no GPA requirement at
                      all. Our platform allows you to filter scholarships based on minimum GPA requirements.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can international students apply for scholarships?</AccordionTrigger>
                    <AccordionContent>
                      Yes, many scholarships are available to international students. However, eligibility varies by
                      scholarship. Some are specifically designed for international students, while others may be
                      limited to citizens or permanent residents of specific countries. Use our platform's filters to
                      find scholarships available to international students.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Are there age restrictions for scholarships?</AccordionTrigger>
                    <AccordionContent>
                      Some scholarships do have age restrictions, but many don't. There are scholarships specifically
                      designed for mature students, returning students, and career-changers. Our search filters can help
                      you find scholarships without age restrictions or those specifically for your age group.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Do I need to be enrolled in school to apply for scholarships?</AccordionTrigger>
                    <AccordionContent>
                      Not always. While many scholarships require current enrollment or acceptance to an educational
                      institution, others allow you to apply before being accepted. Some scholarships are even designed
                      for students planning to enroll in the future. Check the specific requirements for each
                      scholarship.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Can I get scholarships for online or part-time programs?</AccordionTrigger>
                    <AccordionContent>
                      Yes, there are scholarships available for online and part-time programs, though they may be more
                      limited than those for traditional full-time programs. Some scholarships specifically target
                      distance learners or working professionals pursuing further education.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="application" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
                <CardDescription>Questions about applying for scholarships</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      What documents do I typically need for scholarship applications?
                    </AccordionTrigger>
                    <AccordionContent>
                      Common required documents include: transcripts, standardized test scores, personal statement or
                      essay, letters of recommendation, resume/CV, proof of eligibility (citizenship, residency, etc.),
                      and financial information (for need-based scholarships). Our application tracker helps you
                      organize these documents for each scholarship.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I write a strong scholarship essay?</AccordionTrigger>
                    <AccordionContent>
                      A strong scholarship essay should be authentic, specific, and address the prompt directly. Share
                      personal experiences that demonstrate your character and achievements. Proofread carefully and
                      follow all formatting guidelines. Check out our{" "}
                      <Link href="/resources/templates/ai-essay-writer" className="text-primary underline">
                        AI Essay Writer
                      </Link>{" "}
                      and{" "}
                      <Link href="/resources/guides/scholarship-essays" className="text-primary underline">
                        Essay Guide
                      </Link>{" "}
                      for more help.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I request letters of recommendation?</AccordionTrigger>
                    <AccordionContent>
                      Ask people who know you well and can speak to your strengths relevant to the scholarship. Request
                      letters at least 3-4 weeks in advance, provide information about the scholarship and your
                      achievements, and follow up with a thank-you note. See our{" "}
                      <Link href="/resources/guides/recommendation-letters" className="text-primary underline">
                        Recommendation Letters Guide
                      </Link>{" "}
                      for detailed advice.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Is it okay to reuse essays for multiple scholarship applications?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can reuse core ideas and experiences, but always tailor each essay to address the specific
                      scholarship's prompt and values. Generic essays are easy to spot and less likely to succeed. Our
                      AI Essay Writer can help you customize essays for different applications while maintaining your
                      authentic voice.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What should I do if I miss a scholarship deadline?</AccordionTrigger>
                    <AccordionContent>
                      Unfortunately, most scholarships strictly enforce their deadlines. If you miss one, look for
                      scholarships with later deadlines or those that offer multiple application cycles throughout the
                      year. Use our platform's deadline tracking feature to avoid missing future opportunities.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platform" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Questions</CardTitle>
                <CardDescription>Help with using our scholarship finder platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create an account?</AccordionTrigger>
                    <AccordionContent>
                      Click the "Register" button in the top right corner of the homepage. Fill out the registration
                      form with your email address and create a password. Verify your email address by clicking the link
                      sent to your inbox, and then complete your profile to get personalized scholarship
                      recommendations.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is the scholarship finder platform free to use?</AccordionTrigger>
                    <AccordionContent>
                      Yes, our basic scholarship search and application tracking features are completely free. We may
                      offer premium features for advanced users, but our core mission is to make scholarship information
                      accessible to all students regardless of financial means.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I track my scholarship applications?</AccordionTrigger>
                    <AccordionContent>
                      After logging in, navigate to your Dashboard and select the "Applications" tab. Here you can add
                      new applications, track their status, set reminders for deadlines, and upload required documents.
                      The system will automatically send you notifications about upcoming deadlines.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How accurate is the scholarship information on your platform?</AccordionTrigger>
                    <AccordionContent>
                      We strive to maintain the most accurate and up-to-date scholarship information possible. Our data
                      comes directly from scholarship providers and is regularly verified and updated. However, we
                      always recommend checking the official scholarship website for the most current information before
                      applying.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Can I save scholarships to apply for later?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can save scholarships to your favorites by clicking the heart icon on any scholarship
                      listing. Access your saved scholarships anytime from your Dashboard under the "Favorites" tab. You
                      can also set reminders for application deadlines for your saved scholarships.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="international" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>International Scholarships</CardTitle>
                <CardDescription>Questions about studying abroad and international opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      What additional requirements exist for international scholarships?
                    </AccordionTrigger>
                    <AccordionContent>
                      International scholarships often require proof of language proficiency (like TOEFL or IELTS
                      scores), visa eligibility, passport information, and sometimes country-specific documentation.
                      Some may also require credential evaluation for foreign transcripts. Check our{" "}
                      <Link href="/resources/visa" className="text-primary underline">
                        Visa Resources
                      </Link>{" "}
                      page for more information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I find scholarships for studying abroad?</AccordionTrigger>
                    <AccordionContent>
                      Use our search filters to select "International" or specific countries you're interested in. You
                      can also filter by scholarships specifically designed for international students. Additionally,
                      check with universities in your target country, as many offer institution-specific scholarships
                      for international applicants.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Do I need a student visa before applying for international scholarships?
                    </AccordionTrigger>
                    <AccordionContent>
                      Generally, you apply for scholarships first, then for your student visa after receiving an
                      acceptance letter from the educational institution. However, some scholarship programs may require
                      proof of visa eligibility during the application process. Visit our{" "}
                      <Link href="/resources/visa" className="text-primary underline">
                        Visa Resources
                      </Link>{" "}
                      page for country-specific information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Are there scholarships that cover travel expenses for international students?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, some comprehensive scholarships cover travel expenses in addition to tuition and living
                      costs. These are typically highly competitive. Use our advanced search filters to find
                      scholarships that specifically mention travel or relocation allowances in their benefits.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      How do I get my foreign credentials evaluated for international scholarships?
                    </AccordionTrigger>
                    <AccordionContent>
                      Many countries have official credential evaluation services that can assess your academic
                      qualifications according to their educational standards. Common services include WES (World
                      Education Services), ECE (Educational Credential Evaluators), and ICAS (International Credential
                      Assessment Service). The specific service you should use depends on the requirements of the
                      scholarship and institution.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 rounded-lg bg-muted p-6">
          <h2 className="text-2xl font-bold">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            Can't find the answer you're looking for? Please reach out to our support team.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Help Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Browse our detailed help articles and tutorials</p>
                <Button variant="outline" className="mt-4 w-full">
                  Visit Help Center
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Chat with our support team (Mon-Fri, 9am-5pm)</p>
                <Button variant="outline" className="mt-4 w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Get help via email, we usually respond within 24 hours</p>
                <Button variant="outline" className="mt-4 w-full">
                  Email Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
