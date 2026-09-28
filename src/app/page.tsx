import Link from "next/link"
import { HomeHeroChart } from "@/components/home-hero-chart"
import { StudyRow } from "@/components/study-row"
import { Button } from "@/components/ui/button"
import {
  identity,
  leadershipRoles,
  metrics,
  studies,
  teachingRoles,
  technicalRoles,
} from "@/lib/content"

const current = [...technicalRoles, ...teachingRoles, ...leadershipRoles].filter(
  (role) => role.current,
)

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
      <section className="grid items-end gap-10 py-12 md:grid-cols-12 md:py-20">
        <div className="md:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
            01 — {identity.place} · Hong Kong
          </p>
          <h1 className="mt-4 font-heading text-[clamp(2.8rem,6.6vw,5.6rem)] leading-[0.9] font-medium tracking-tight">
            Hi, I’m{" "}
            <span className="italic text-primary">Hedy.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I’m studying operations research and engineering at Cornell, and
            I’ve been admitted early to the master’s in financial engineering.
            The pages below are the work I would walk a recruiter through:
            pricing, exam schedules, fleets, retrieval, and the interfaces
            around them.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 px-5">
              <Link href="/work">Open a case study</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-5">
              <Link href="/experience">Read the record</Link>
            </Button>
          </div>
        </div>
        <div className="md:col-span-5">
          <HomeHeroChart />
        </div>
      </section>

      <section aria-label="Reported results" className="grid grid-cols-2 border-y border-foreground/15 md:grid-cols-5">
        {metrics.map((metric) => (
          <Link
            key={metric.value}
            href={metric.href}
            className="border-foreground/15 px-3 py-5 transition-colors hover:bg-primary/5 md:border-l md:first:border-l-0"
          >
            <p className="font-heading text-3xl italic text-primary md:text-4xl">
              {metric.value}
            </p>
            <p className="mt-2 text-xs leading-snug text-muted-foreground">
              {metric.label}
            </p>
          </Link>
        ))}
      </section>

      <section id="studies" className="scroll-mt-20 py-14 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
              02 — Case studies
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight md:text-5xl">
              Five models you can move.
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/work">All studies</Link>
          </Button>
        </div>
        <div className="border-b border-foreground/15">
          {studies.map((study) => (
            <StudyRow key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section id="now" className="scroll-mt-20 grid gap-8 border-t border-foreground/15 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
            03 — Now
          </p>
          <h2 className="mt-2 font-heading text-4xl tracking-tight">
            What is still in motion.
          </h2>
        </div>
        <ul className="md:col-span-8">
          {current.map((role) => (
            <li
              key={role.id}
              className="grid gap-1 border-b border-foreground/10 py-4 md:grid-cols-5"
            >
              <p className="text-sm md:col-span-3">{role.title}</p>
              <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase md:col-span-2 md:text-right">
                {role.org}
              </p>
            </li>
          ))}
          <li className="pt-4">
            <Button asChild variant="outline">
              <Link href="/experience">Full experience</Link>
            </Button>
          </li>
        </ul>
      </section>
    </div>
  )
}
