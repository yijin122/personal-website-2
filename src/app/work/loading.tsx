import { Skeleton } from "@/components/ui/skeleton"

export default function WorkLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-4 h-16 w-2/3" />
      <Skeleton className="mt-8 h-10 w-full max-w-sm" />
      <div className="mt-10 space-y-6">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
    </div>
  )
}
