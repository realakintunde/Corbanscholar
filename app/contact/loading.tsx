import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section Skeleton */}
      <div className="mb-12 text-center">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Form Skeleton */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-primary h-2 w-full"></div>
            <div className="p-6 pt-8">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Skeleton */}
        <div className="space-y-6">
          <div className="border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                <div className="flex">
                  <Skeleton className="h-5 w-5 mr-3" />
                  <div className="w-full">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-40 mt-1" />
                    <Skeleton className="h-3 w-32 mt-1" />
                  </div>
                </div>
                <div className="flex">
                  <Skeleton className="h-5 w-5 mr-3" />
                  <div className="w-full">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-40 mt-1" />
                    <Skeleton className="h-3 w-32 mt-1" />
                  </div>
                </div>
                <div className="flex">
                  <Skeleton className="h-5 w-5 mr-3" />
                  <div className="w-full">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-40 mt-1" />
                    <Skeleton className="h-3 w-32 mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-6 w-36 mb-4" />
              <div className="flex mb-4">
                <Skeleton className="h-5 w-5 mr-3" />
                <div>
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-40 mt-1" />
                  <Skeleton className="h-4 w-40 mt-1" />
                </div>
              </div>
              <Skeleton className="h-48 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources Skeleton */}
      <div className="mb-16">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="border rounded-lg p-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="border rounded-md p-4 mt-2">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Skeleton */}
      <div>
        <Skeleton className="h-8 w-36 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
