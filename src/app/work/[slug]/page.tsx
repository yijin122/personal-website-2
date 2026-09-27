import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { StudyPreview } from "@/components/previews/study-preview"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getStudy, studies } from "@/lib/content"

export const dynamicParams = false

export function generateStaticParams() {
  return studies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getStudy(slug)
  if (!study) return { title: "Study not found" }
  return { title: study.title, description: study.summary }
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getStudy(slug)
  if (!study) notFound()

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <Button asChild variant="ghost" className="-ml-2 mb-8">
        <Link href="/work">
          <ArrowLeft />
          All studies
        </Link>
      </Button>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="text-sm text-muted-foreground">Study {study.index}</p>
          <h1 className="mt-3 font-heading text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.05] font-normal tracking-tight">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {study.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {study.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-sm font-mono">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="md:col-span-4 md:pt-8">
          <p className="font-heading text-4xl font-normal">{study.metric.value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{study.metric.label}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {study.place}
            <br />
            {study.date}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <StudyPreview slug={study.slug} />
      </div>
      <ol className="mt-12 border-t border-foreground/15">
        {study.points.map((point, index) => (
          <li
            key={point.heading}
            className="grid gap-3 border-b border-foreground/15 py-6 md:grid-cols-12"
          >
            <p className="text-sm text-burgundy md:col-span-3">
              0{index + 1} — {point.heading}
            </p>
            <p className="text-base leading-relaxed md:col-span-9">{point.body}</p>
          </li>
        ))}
      </ol>
    </article>
  )
}
