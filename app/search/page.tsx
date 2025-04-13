import { Suspense } from "react"
import ScholarshipSearch from "@/components/scholarship-search/index"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Search Scholarships",
  description: "Find international scholarships that match your profile and academic goals.",
}

export default function SearchPage() {
  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Scholarships</h1>
        <p className="text-muted-foreground">
          Find international scholarships that match your profile and academic goals.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Skeleton className="h-[600px] w-full" />
              </div>
              <div className="md:col-span-2">
                <div className="space-y-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-40 w-full" />
                    ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ScholarshipSearch />
      </Suspense>
    </div>
  )
}
