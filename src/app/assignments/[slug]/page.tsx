import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  assignments,
  getAssignment,
  type AssignmentFigure,
} from "@/lib/assignments"

export const dynamicParams = false

export function generateStaticParams() {
  return assignments.map((assignment) => ({ slug: assignment.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const assignment = getAssignment(slug)
  if (!assignment) return { title: "Assignment not found" }
  return { title: assignment.title, description: assignment.summary }
}

export default async function AssignmentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const assignment = getAssignment(slug)
  if (!assignment) notFound()

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-16">
      <Button asChild variant="ghost" className="-ml-2 mb-8">
        <Link href="/#assignments">
          <ArrowLeft />
          Assignments
        </Link>
      </Button>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
            {assignment.role}
          </p>
          <h1 className="mt-3 font-heading text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.92] tracking-tight">
            {assignment.title}
          </h1>
          {assignment.posterTitle ? (
            <p className="mt-4 max-w-2xl font-heading text-2xl leading-snug italic text-primary md:text-3xl">
              {assignment.posterTitle}
            </p>
          ) : null}
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {assignment.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {assignment.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-sm font-mono">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="md:col-span-4 md:pt-8">
          <p className="font-heading text-5xl italic text-primary">
            {assignment.metric.value}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {assignment.metric.label}
          </p>
          <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-wide text-muted-foreground uppercase">
            {assignment.org}
            <br />
            {assignment.place}
            <br />
            {assignment.dates}
          </p>
        </div>
      </div>

      {assignment.beats ? (
        <ol className="mt-12 border-t border-foreground/15">
          {assignment.beats.map((beat, index) => (
            <li
              key={beat.heading}
              className="grid gap-6 border-b border-foreground/15 py-8 md:grid-cols-12"
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase md:col-span-3">
                0{index + 1} — {beat.heading}
              </p>
              <div className="space-y-6 md:col-span-9">
                {beat.body.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {beat.figures ? (
                  <div
                    className={
                      beat.figures.length > 1
                        ? "grid gap-4 md:grid-cols-2"
                        : "grid gap-4"
                    }
                  >
                    {beat.figures.map((figure) => (
                      <AssignmentFigureView
                        key={figure.src}
                        figure={figure}
                        wide={beat.figures!.length === 1 || figure.width / figure.height > 2.2}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <>
      <div className="mt-10 space-y-6">
        {assignment.figures.map((figure) => (
          <AssignmentFigureView key={figure.src} figure={figure} wide />
        ))}
      </div>

      {assignment.samples ? (
        <div className="mt-6 overflow-x-auto border border-foreground/15">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="border-b border-foreground/15 px-4 py-3 text-left font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              {assignment.samplesNote}
            </caption>
            <thead>
              <tr className="border-b border-foreground/15 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                <th className="px-4 py-3 font-medium">Sample</th>
                <th className="px-4 py-3 font-medium">Conflicts</th>
                <th className="px-4 py-3 font-medium">Evening–morning</th>
                <th className="px-4 py-3 font-medium">Other back-to-backs</th>
              </tr>
            </thead>
            <tbody>
              {assignment.samples.map((sample) => (
                <tr key={sample.name} className="border-b border-foreground/10 last:border-b-0">
                  <th className="px-4 py-3 text-left font-heading text-base font-medium">
                    {sample.name}
                  </th>
                  <td className="px-4 py-3 font-heading text-2xl italic text-primary">
                    {sample.conflicts}
                  </td>
                  <td className="px-4 py-3">{sample.eveningMorning}</td>
                  <td className="px-4 py-3">{sample.otherBackToBack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <ol className="mt-12 border-t border-foreground/15">
        {assignment.sections.map((section, index) => (
          <li
            key={section.heading}
            className="grid gap-3 border-b border-foreground/15 py-6 md:grid-cols-12"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase md:col-span-3">
              0{index + 1} — {section.heading}
            </p>
            <p className="text-base leading-relaxed md:col-span-9">{section.body}</p>
          </li>
        ))}
      </ol>
        </>
      )}
    </article>
  )
}

function AssignmentFigureView({
  figure,
  wide = false,
}: {
  figure: AssignmentFigure
  wide?: boolean
}) {
  return (
    <figure
      className={`border border-foreground/15 bg-card ${wide ? "md:col-span-2" : ""}`}
    >
      <Image
        src={figure.src}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        className="h-auto w-full"
      />
      <figcaption className="border-t border-foreground/15 px-4 py-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        {figure.caption}
      </figcaption>
    </figure>
  )
}
