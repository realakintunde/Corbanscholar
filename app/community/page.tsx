import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CommunityTabs } from "@/components/community-tabs"

export const metadata: Metadata = {
  title: "Community | Scholarship Finder",
  description: "Connect with other scholarship applicants and recipients",
}

export default function CommunityPage({
  searchParams,
}: {
  searchParams: { tab?: string }
}) {
  // Get the tab from URL parameters or default to "discussions"
  const defaultTab =
    searchParams.tab && ["discussions", "success-stories", "mentors", "events"].includes(searchParams.tab)
      ? searchParams.tab
      : "discussions"

  return (
    <main className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Scholarship Community</h1>

      <CommunityTabs defaultTab={defaultTab}>
        <TabsContent value="discussions" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent Discussions</h2>
              <p className="text-muted-foreground">Join conversations with fellow scholarship seekers</p>
            </div>
            <Button>Start New Discussion</Button>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/diverse-group-city.png" alt="@user1" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Tips for Fulbright interview preparation?</CardTitle>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Posted by Jane Doe</span>
                        <span>•</span>
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <Badge>Fulbright</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">
                  I've been shortlisted for a Fulbright interview next month and I'm looking for advice on how to
                  prepare. Has anyone gone through this process recently? What kind of questions should I expect? Any
                  tips for making a good impression?
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    24 replies
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    1.2k views
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  View Discussion
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/diverse-group-city.png" alt="@user2" />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">How to balance multiple scholarship applications?</CardTitle>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Posted by Michael Smith</span>
                        <span>•</span>
                        <span>5 days ago</span>
                      </div>
                    </div>
                  </div>
                  <Badge>General</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">
                  I'm currently applying for 5 different scholarships, each with different requirements and deadlines.
                  How do you manage your time effectively when applying for multiple scholarships? Any tips for keeping
                  track of everything?
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    18 replies
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    876 views
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  View Discussion
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/diverse-group-city.png" alt="@user3" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">IELTS vs TOEFL for scholarship applications?</CardTitle>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Posted by Aisha Khan</span>
                        <span>•</span>
                        <span>1 week ago</span>
                      </div>
                    </div>
                  </div>
                  <Badge>Language Tests</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">
                  I'm planning to apply for scholarships in both the US and UK. Should I take the IELTS or TOEFL? Do
                  some scholarships prefer one over the other? Is it worth taking both tests?
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    32 replies
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    1.5k views
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  View Discussion
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">View All Discussions</Button>
          </div>
        </TabsContent>

        <TabsContent value="success-stories" className="space-y-6">
          <h2 className="text-xl font-semibold">Success Stories</h2>
          <p className="text-muted-foreground">Read about the experiences of successful scholarship recipients</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image src="/placeholder.svg?key=y1ncw" alt="Success Story" fill className="object-cover" />
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/diverse-group-city.png" alt="@user4" />
                    <AvatarFallback>RP</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">From Mumbai to MIT: My Fulbright Journey</CardTitle>
                    <CardDescription>By Rahul Patel</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-4 text-muted-foreground">
                  When I first considered applying for the Fulbright scholarship, I never imagined I would actually get
                  it. Coming from a middle-class family in Mumbai, studying at MIT seemed like an impossible dream...
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read Full Story
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image src="/placeholder.svg?key=ko9bk" alt="Success Story" fill className="object-cover" />
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/diverse-group-city.png" alt="@user5" />
                    <AvatarFallback>SO</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">How I Won the Chevening Scholarship on My Third Try</CardTitle>
                    <CardDescription>By Sarah Okonkwo</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-4 text-muted-foreground">
                  Persistence was the key to my success. After being rejected twice, I completely revamped my approach
                  for my third Chevening application. Here's what I learned and how I finally succeeded...
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read Full Story
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image src="/placeholder.svg?key=zwy64" alt="Success Story" fill className="object-cover" />
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/diverse-group-city.png" alt="@user6" />
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">My DAAD Scholarship Experience in Germany</CardTitle>
                    <CardDescription>By Luis Mendoza</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-4 text-muted-foreground">
                  Moving from Colombia to study engineering in Germany was a huge cultural adjustment. The DAAD
                  scholarship not only funded my studies but also provided invaluable support for integration...
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read Full Story
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">View All Success Stories</Button>
          </div>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Find a Mentor</h2>
              <p className="text-muted-foreground">
                Connect with scholarship alumni who can guide you through the process
              </p>
            </div>
            <Button>Become a Mentor</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/diverse-group-city.png" alt="@mentor1" />
                    <AvatarFallback>JW</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Dr. James Wilson</CardTitle>
                    <CardDescription>Fulbright Scholar 2018</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Field of Study:</span>
                    <span className="ml-2 text-sm text-muted-foreground">Computer Science</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">University:</span>
                    <span className="ml-2 text-sm text-muted-foreground">Stanford University</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Expertise:</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      Research proposals, interviews, US applications
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    "I help students craft compelling research proposals and prepare for scholarship interviews. Having
                    been through the process myself, I know what selection committees are looking for."
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Contact Mentor
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/diverse-group-city.png" alt="@mentor2" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Aisha Sharma</CardTitle>
                    <CardDescription>Chevening Scholar 2020</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Field of Study:</span>
                    <span className="ml-2 text-sm text-muted-foreground">Public Health</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">University:</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      London School of Hygiene & Tropical Medicine
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Expertise:</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      Personal statements, UK applications, networking
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    "I specialize in helping students write compelling personal statements and navigate the UK
                    university application process. I'm passionate about global health and supporting future leaders in
                    the field."
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Contact Mentor
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/diverse-group-city.png" alt="@mentor3" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Ricardo Kim</CardTitle>
                    <CardDescription>DAAD Scholar 2019</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Field of Study:</span>
                    <span className="ml-2 text-sm text-muted-foreground">Mechanical Engineering</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">University:</span>
                    <span className="ml-2 text-sm text-muted-foreground">RWTH Aachen University</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Expertise:</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      German applications, research opportunities, STEM fields
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    "I guide students through the German university system and help them find research opportunities in
                    STEM fields. I can also provide insights into the DAAD scholarship application process."
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Contact Mentor
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">View All Mentors</Button>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <p className="text-muted-foreground">
            Join workshops, webinars, and Q&A sessions to learn more about scholarships
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Fulbright Scholarship Webinar</CardTitle>
                <CardDescription>Learn about the Fulbright application process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Date:</span>
                    <span className="ml-2 text-sm text-muted-foreground">October 26, 2023</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Time:</span>
                    <span className="ml-2 text-sm text-muted-foreground">7:00 PM - 8:30 PM EST</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Speaker:</span>
                    <span className="ml-2 text-sm text-muted-foreground">Dr. Emily Carter, Fulbright Alumni</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Join us for an informative webinar on the Fulbright Scholarship program. Dr. Carter will share her
                    experiences and provide tips for crafting a successful application.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chevening Scholarship Workshop</CardTitle>
                <CardDescription>Get personalized feedback on your Chevening essays</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Date:</span>
                    <span className="ml-2 text-sm text-muted-foreground">November 10, 2023</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Time:</span>
                    <span className="ml-2 text-sm text-muted-foreground">10:00 AM - 12:00 PM GMT</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Facilitator:</span>
                    <span className="ml-2 text-sm text-muted-foreground">Sarah Johnson, Chevening Alumni</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Attend our interactive workshop to receive personalized feedback on your Chevening scholarship
                    essays. Sarah Johnson will guide you through the key elements of a successful application.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DAAD Scholarship Q&A Session</CardTitle>
                <CardDescription>Ask your questions about studying in Germany</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Date:</span>
                    <span className="ml-2 text-sm text-muted-foreground">December 5, 2023</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Time:</span>
                    <span className="ml-2 text-sm text-muted-foreground">6:00 PM - 7:30 PM CET</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Panelists:</span>
                    <span className="ml-2 text-sm text-muted-foreground">DAAD Scholarship Recipients</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Join our Q&A session with current DAAD scholarship recipients to get answers to your questions about
                    studying in Germany. Learn about the application process, university life, and more.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline">View All Events</Button>
          </div>
        </TabsContent>
      </CommunityTabs>
    </main>
  )
}
