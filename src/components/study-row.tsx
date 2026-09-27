import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Study } from "@/lib/content"
import { StudyGlyph } from "@/components/study-glyph"
import { Badge } from "@/components/ui/badge"

export function StudyRow({ study }: { study: Study }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group grid grid-cols-1 items-end gap-6 border-t border-foreground/15 py-8 md:grid-cols-12 md:py-10"
    >
      <div className="md:col-span-1">
        <p className="font-mono text-xs text-primary">{study.index}</p>
      </div>
      <div className="md:col-span-6">
        <h3 className="font-heading text-3xl leading-[0.95] tracking-tight transition-colors group-hover:text-primary md:text-4xl">
          {study.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {study.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-sm font-mono">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="md:col-span-3">
        <p className="font-heading text-4xl italic text-primary">
          {study.metric.value}
        </p>
        <p className="mt-1 max-w-[16rem] text-xs text-muted-foreground">
          {study.metric.label}
        </p>
        <p className="mt-3 inline-flex items-center gap-1 text-sm">
          Open study
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
      <div className="md:col-span-2">
        <StudyGlyph slug={study.slug} />
        <p className="mt-2 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
          {study.date}
        </p>
      </div>
    </Link>
  )
}
