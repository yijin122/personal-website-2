import type { Metadata } from "next"
import { StudySearch } from "@/components/study-search"

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Visual case studies in ride-hailing pricing, retail placement, ambulance posting, volunteer allocation, and intelligent scissors.",
}

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="max-w-3xl font-heading text-5xl font-normal tracking-tight md:text-6xl">
        Case studies
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Each study keeps the result that was written down, and a figure you can
        drag. Numbers that were not in the notes are marked illustrative.
      </p>
      <div className="mt-10">
        <StudySearch />
      </div>
    </div>
  )
}
