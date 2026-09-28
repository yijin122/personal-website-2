import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { coursework, identity, skillGroups } from "@/lib/content"

export const metadata: Metadata = {
  title: "About",
  description:
    "Cornell ORIE and an early-admit MFE: coursework, skills, and the overlap of models, interfaces, and a comedy company.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
        About
      </p>
      <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.92] tracking-tight">
        A grid for the decision.
        <br />
        <span className="italic text-primary">A curve for the rest.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        The record overlaps: exam schedules and a registrar UI, a retrieval
        pipeline, surge pricing, ambulance posting, volunteer allocation, image
        segmentation, a company site, and comedy production for a company of 30.
      </p>

      <section className="mt-14 grid gap-8 border-t border-foreground/15 py-10 md:grid-cols-12">
        <h2 className="font-heading text-3xl tracking-tight md:col-span-4">
          Education
        </h2>
        <div className="space-y-8 md:col-span-8">
          <div>
            <p className="font-heading text-2xl">{identity.mfe}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Cornell University, {identity.place}. {identity.mfeExpected}.
            </p>
          </div>
          <div>
            <p className="font-heading text-2xl">{identity.degree}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {identity.school}. GPA {identity.gpa}. {identity.undergradExpected}.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
              Selected coursework
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {coursework.map((course) => (
                <li key={course}>
                  <Badge variant="outline" className="rounded-sm">
                    {course}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-t border-foreground/15 py-10 md:grid-cols-12">
        <h2 className="font-heading text-3xl tracking-tight md:col-span-4">
          Notation
        </h2>
        <div className="md:col-span-8">
          <p className="font-heading text-3xl leading-snug tracking-tight md:text-4xl">
            λ<sub className="text-xl">n</sub> π<sub className="text-xl">n</sub> = μ
            <sub className="text-xl">n+1</sub> π<sub className="text-xl">n+1</sub>
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Balance for a birth–death process. The ride-hailing study is one:
            state-dependent arrivals, a spatial Poisson for cancellation, and a
            shifted gamma for price.
          </p>
          <p className="mt-6 font-mono text-sm">
            revenue ~ portfolio + placement + category × placement
          </p>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            The retail study. The interaction is the part the notes ask a
            reader to remember.
          </p>
        </div>
      </section>

      <section className="grid gap-8 border-t border-foreground/15 py-10 md:grid-cols-12">
        <h2 className="font-heading text-3xl tracking-tight md:col-span-4">
          Skills
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:col-span-8">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
                {group.label}
              </p>
              <ul className="mt-2 space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-foreground/15 pt-8">
        <Button asChild>
          <Link href="/work">See the studies</Link>
        </Button>
      </div>
    </div>
  )
}
