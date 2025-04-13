import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ScholarshipNotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold">Scholarship Not Found</h1>
      <p className="mb-8 text-lg text-gray-600">
        The scholarship you're looking for doesn't exist or has been removed.
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button className="bg-sky-600 hover:bg-sky-700" asChild>
          <Link href="/search">Browse Scholarships</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
