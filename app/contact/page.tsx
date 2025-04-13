import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, ExternalLink, MessageSquare, HelpCircle } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Contact Us | International Scholarship Finder",
  description:
    "Get in touch with our team for questions about scholarships, application assistance, or partnership opportunities.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions about scholarships or need assistance with your application? Our team is here to help you every
          step of the way.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="bg-primary h-2 w-full"></div>
            <CardContent className="p-6 pt-8">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <a href="mailto:info@corbanglobal.co.uk" className="text-primary hover:underline">
                      info@corbanglobal.co.uk
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">For general inquiries</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Partnerships</p>
                    <a href="mailto:info@corbanglobal.co.uk" className="text-primary hover:underline">
                      info@corbanglobal.co.uk
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">For universities and organizations</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <a href="tel:+447551278313" className="text-primary hover:underline">
                      +44 7551 278313
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am-5pm GMT</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">
                      We aim to respond to all inquiries within 24-48 hours during business days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Visit Our Office</h2>
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Main Office</p>
                  <p className="text-sm text-muted-foreground">
                    Stuart House, St. John's Street
                    <br />
                    Peterborough, PE1 5DD
                    <br />
                    United Kingdom
                  </p>
                </div>
              </div>
              <div className="relative h-48 w-full rounded-md overflow-hidden bg-muted">
                <Image src="/boston-office-map.png" alt="Office location map" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="secondary" size="sm" asChild>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq" className="flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Community
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Support Tickets
            </TabsTrigger>
          </TabsList>
          <TabsContent value="faq" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium">How do I apply for scholarships?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Visit our comprehensive guide on the application process.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2" asChild>
                    <Link href="/resources/guides/application-process">Read Application Guide</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium">What documents do I need for visa applications?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check our visa resources for country-specific requirements.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2" asChild>
                    <Link href="/resources/visa">View Visa Resources</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium">How can I track my application?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Log in to your dashboard to track all your scholarship applications.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2" asChild>
                    <Link href="/dashboard/applications">Go to Application Tracker</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium">Can I get help with my scholarship essay?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try our AI Essay Writer tool for personalized essay assistance.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2" asChild>
                    <Link href="/resources/templates/ai-essay-writer">Use AI Essay Writer</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/resources/faq">View All FAQs</Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="community" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-4">Join Our Community</h3>
            <p className="mb-4">
              Connect with other scholarship applicants, share experiences, and get advice from those who have
              successfully secured scholarships.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/community">Visit Community Forum</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/community?tab=success-stories">Read Success Stories</Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="support" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-4">Support Tickets</h3>
            <p className="mb-4">
              For complex issues or private concerns, you can create a support ticket for personalized assistance.
            </p>
            <Button asChild>
              <Link href="/dashboard/support">Create Support Ticket</Link>
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* Social Media */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Connect With Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="https://twitter.com/scholarshipfind"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
          >
            <svg className="h-8 w-8 mb-2 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            <span className="font-medium">Twitter</span>
            <span className="text-sm text-muted-foreground">@scholarshipfind</span>
          </a>
          <a
            href="https://www.facebook.com/scholarshipfinder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
          >
            <svg className="h-8 w-8 mb-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="font-medium">Facebook</span>
            <span className="text-sm text-muted-foreground">@scholarshipfinder</span>
          </a>
          <a
            href="https://www.instagram.com/scholarshipfinder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
          >
            <svg className="h-8 w-8 mb-2 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
            </svg>
            <span className="font-medium">Instagram</span>
            <span className="text-sm text-muted-foreground">@scholarshipfinder</span>
          </a>
          <a
            href="https://www.linkedin.com/company/scholarshipfinder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
          >
            <svg className="h-8 w-8 mb-2 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-medium">LinkedIn</span>
            <span className="text-sm text-muted-foreground">Scholarship Finder</span>
          </a>
        </div>
      </div>
    </div>
  )
}
