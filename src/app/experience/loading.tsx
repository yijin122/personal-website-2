import { Skeleton } from "@/components/ui/skeleton"

export default function ExperienceLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-4 h-14 w-2/3" />
      <div className="mt-10 space-y-8">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  )
}
