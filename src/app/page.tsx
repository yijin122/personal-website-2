import Link from "next/link"
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
      <section className="max-w-2xl py-24 md:py-36">
        <p className="text-sm text-muted-foreground">
          {identity.school.replace(", College of Engineering", "")} ·{" "}
          {identity.place}
        </p>
        <h1 className="mt-6 font-heading text-[clamp(3.1rem,7vw,5.5rem)] leading-[1.05] font-normal tracking-tight">
          Hi, I’m Hedy.
        </h1>
        <div className="mt-8 h-px w-12 bg-burgundy" />
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          I’m studying operations research and engineering at Cornell, and I’ve
          been admitted early to the master’s in financial engineering. The
          pages below are the work I would walk a recruiter through: pricing,
          exam schedules, fleets, retrieval, and the interfaces around them.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Button asChild variant="link" className="h-auto px-0 text-base">
            <Link href="#studies">Selected work</Link>
          </Button>
          <Button
            asChild
            variant="link"
            className="h-auto px-0 text-base text-muted-foreground"
          >
            <Link href="/experience">Experience</Link>
          </Button>
        </div>
      </section>

      <section
        aria-label="Reported results"
        className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-5"
      >
        {metrics.map((metric) => (
          <Link
            key={metric.value}
            href={metric.href}
            className="border-b border-border px-1 py-8 transition-colors duration-200 hover:text-burgundy sm:px-4 lg:border-b-0 lg:border-l lg:first:border-l-0"
          >
            <p className="font-heading text-3xl font-normal">{metric.value}</p>
            <p className="mt-3 text-sm leading-snug text-muted-foreground">
              {metric.label}
            </p>
          </Link>
        ))}
      </section>

      <section id="studies" className="scroll-mt-24 py-20 md:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-4xl font-normal tracking-tight">
              Selected work
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Five studies. Each figure can be moved; numbers that were not in
              the notes are marked illustrative.
            </p>
          </div>
          <Button asChild variant="link" className="hidden h-auto px-0 sm:inline-flex">
            <Link href="/work">All studies</Link>
          </Button>
        </div>
        <div className="border-b border-border">
          {studies.map((study) => (
            <StudyRow key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section
        id="now"
        className="scroll-mt-24 grid gap-10 border-t border-border py-20 md:grid-cols-12 md:py-28"
      >
        <div className="md:col-span-4">
          <h2 className="font-heading text-4xl font-normal tracking-tight">
            At the moment
          </h2>
        </div>
        <ul className="md:col-span-8">
          {current.map((role) => (
            <li
              key={role.id}
              className="grid gap-1 border-b border-border py-5 md:grid-cols-5"
            >
              <p className="text-sm md:col-span-3">{role.title}</p>
              <p className="text-sm text-muted-foreground md:col-span-2 md:text-right">
                {role.org}
              </p>
            </li>
          ))}
          <li className="pt-6">
            <Button asChild variant="outline">
              <Link href="/experience">Full experience</Link>
            </Button>
          </li>
        </ul>
      </section>
    </div>
  )
}
