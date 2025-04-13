import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <Skeleton className="h-12 w-3/4 max-w-md mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl" />
      </div>

      <Skeleton className="w-full h-64 md:h-80 mb-12 rounded-xl" />

      <div className="mb-8">
        <Skeleton className="h-10 w-full mb-8" />

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
          </div>

          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>

      <Skeleton className="h-40 w-full rounded-lg" />
    </div>
  )
}
