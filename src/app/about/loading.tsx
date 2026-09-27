import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-4 h-16 w-3/4" />
      <Skeleton className="mt-8 h-40 w-full" />
    </div>
  )
}
