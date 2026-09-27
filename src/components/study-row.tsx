import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Study } from "@/lib/content"
import { StudyGlyph } from "@/components/study-glyph"
import { Badge } from "@/components/ui/badge"

export function StudyRow({ study }: { study: Study }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group grid grid-cols-1 items-end gap-8 border-t border-border py-10 md:grid-cols-12 md:py-14"
    >
      <div className="md:col-span-1">
        <p className="text-xs text-muted-foreground">{study.index}</p>
      </div>
      <div className="md:col-span-6">
        <h3 className="font-heading text-3xl leading-tight font-normal tracking-tight transition-colors duration-200 group-hover:text-burgundy">
          {study.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {study.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-sm font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="md:col-span-3">
        <p className="font-heading text-3xl font-normal">{study.metric.value}</p>
        <p className="mt-2 max-w-[16rem] text-sm text-muted-foreground">
          {study.metric.label}
        </p>
        <p className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 group-hover:text-burgundy">
          Open study
          <ArrowUpRight className="size-4" />
        </p>
      </div>
      <div className="md:col-span-2">
        <StudyGlyph slug={study.slug} />
        <p className="mt-2 text-xs text-muted-foreground">{study.date}</p>
      </div>
    </Link>
  )
}
