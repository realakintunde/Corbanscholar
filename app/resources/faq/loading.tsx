import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <Skeleton className="mx-auto h-10 w-3/4 max-w-md" />
          <Skeleton className="mx-auto mt-4 h-6 w-2/3 max-w-sm" />
        </div>

        <Skeleton className="mx-auto h-12 w-full max-w-2xl rounded-full" />

        <div className="w-full">
          <Skeleton className="h-12 w-full rounded-lg" />

          <div className="mt-6">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>

        <div className="mt-12 rounded-lg">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
