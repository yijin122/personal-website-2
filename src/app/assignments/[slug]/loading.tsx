import { Skeleton } from "@/components/ui/skeleton"

export default function AssignmentLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-16">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="mt-8 h-16 w-3/4" />
      <Skeleton className="mt-4 h-6 w-1/2" />
      <Skeleton className="mt-10 h-80 w-full" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  )
}
