import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, Globe, Building } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | CorbanScholar",
  description: "Learn about our mission to make global education accessible to everyone.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Making Global Education Accessible to Everyone</h1>
            <p className="text-xl md:text-2xl mb-8">
              At CorbanScholar, we connect students to scholarship opportunities worldwide.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/search">Find Scholarships</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At CorbanScholar, powered by Corban Global Limited, our mission is simple: make global education
                accessible to everyone. We believe that financial constraints should never be a barrier to achieving
                your academic dreams.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                That's why we created a powerful platform that helps students from around the world discover
                scholarships, grants, and funding opportunities from universities, governments, and private
                organizations in the UK, US, Canada, Australia, Europe, and beyond.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're an undergraduate looking for tuition help, a master's student in search of international
                funding, or a PhD applicant exploring research grants – we've got you covered.
              </p>
            </div>
            <div className="md:w-1/2 relative h-80 md:h-96">
              <Image
                src="/mission-image.jpg"
                alt="Students collaborating in university library"
                fill
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100 text-blue-600">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Global Reach</h3>
              <p className="text-gray-600">Thousands of verified global scholarships from institutions worldwide.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 text-green-600">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Targeted Search</h3>
              <p className="text-gray-600">Search by country, course, level, or deadline to find the perfect match.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-100 text-purple-600">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Personalized Alerts</h3>
              <p className="text-gray-600">Never miss a deadline with our customized notification system.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600">
                <Building size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Get tips and guidance from the experienced Corban Global team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Scholarship?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us and take the first step toward a brighter, fully-funded future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/search">Search Scholarships</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
