import type { Metadata } from "next"
import { StudySearch } from "@/components/study-search"

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Visual case studies in ride-hailing pricing, retail placement, ambulance posting, volunteer allocation, and intelligent scissors.",
}

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
        Work
      </p>
      <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.92] tracking-tight">
        Case studies, not cards.
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
