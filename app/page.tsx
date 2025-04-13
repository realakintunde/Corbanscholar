import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ScholarshipDiscovery from "@/components/scholarship-discovery"
import FeaturedScholarships from "@/components/featured-scholarships"
import PopularDestinations from "@/components/popular-destinations"

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
                Find Your Perfect International Scholarship
              </h1>
              <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover thousands of scholarships for international students. Your journey to global education starts
                here.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/search" passHref>
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                    Search Scholarships
                  </Button>
                </Link>
                <Link href="/resources" passHref>
                  <Button variant="outline" size="lg">
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <Image
                src="/path-to-opportunity.png"
                alt="International students celebrating graduation"
                width={550}
                height={400}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Discovery Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-blue-900">
            Find Scholarships That Match Your Profile
          </h2>
          <Suspense
            fallback={
              <div className="h-[300px] flex items-center justify-center">Loading scholarship discovery...</div>
            }
          >
            <ScholarshipDiscovery />
          </Suspense>
        </div>
      </section>

      {/* Featured Scholarships Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-blue-900">Featured Scholarships</h2>
          <Suspense
            fallback={
              <div className="h-[400px] flex items-center justify-center">Loading featured scholarships...</div>
            }
          >
            <FeaturedScholarships />
          </Suspense>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-blue-900">Popular Study Destinations</h2>
          <PopularDestinations />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            Ready to Start Your International Education Journey?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Create an account to save your favorite scholarships, track applications, and get personalized
            recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" passHref>
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                Create Free Account
              </Button>
            </Link>
            <Link href="/search" passHref>
              <Button variant="outline" size="lg">
                Browse Scholarships
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
