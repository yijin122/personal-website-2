"use client"

import { useMemo, useState } from "react"
import { studies, studyTags } from "@/lib/content"
import { StudyRow } from "@/components/study-row"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function StudySearch() {
  const [query, setQuery] = useState("")
  const [tags, setTags] = useState<string[]>([])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return studies.filter((study) => {
      const tagOk = tags.length === 0 || study.tags.some((tag) => tags.includes(tag))
      if (!tagOk) return false
      if (!needle) return true
      const haystack = [
        study.title,
        study.summary,
        study.place,
        study.tags.join(" "),
        ...study.points.map((point) => point.body),
      ]
        .join(" ")
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [query, tags])

  function toggle(tag: string) {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="sr-only" htmlFor="study-search">
          Search case studies
        </label>
        <Input
          id="study-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Lyft, ambulance, clothing, scissors"
          className="h-10 md:max-w-sm"
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by method">
          {studyTags.map((tag) => {
            const on = tags.includes(tag)
            return (
              <Button
                key={tag}
                type="button"
                size="sm"
                variant={on ? "default" : "outline"}
                aria-pressed={on}
                onClick={() => toggle(tag)}
              >
                {tag}
              </Button>
            )
          })}
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        {filtered.length} {filtered.length === 1 ? "study" : "studies"}
      </p>
      {filtered.length === 0 ? (
        <div className="mt-8 border border-dashed border-foreground/25 px-6 py-12">
          <p className="font-heading text-3xl tracking-tight">
            No study matches that cut.
          </p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            The set is five projects. Try queueing, ambulance, clothing, or
            scissors.
          </p>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => {
              setQuery("")
              setTags([])
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="mt-6 border-b border-foreground/15">
          {filtered.map((study) => (
            <StudyRow key={study.slug} study={study} />
          ))}
        </div>
      )}
    </div>
  )
}
