import Image from "next/image"
import Link from "next/link"
import { homeAssignments } from "@/lib/content"

const frameFocus: Record<string, string> = {
  computime: "object-left",
  rag: "object-center",
  scheduling: "object-right",
}

export function HomeAssignments() {
  return (
    <section id="assignments" aria-label="Assignments" className="scroll-mt-20 py-14 md:py-20">
      <div className="mb-8 max-w-xl">
        <p className="font-mono text-[11px] tracking-[0.18em] text-primary">
          02 - Work Experiences
        </p>
        <h2 className="mt-2 font-heading text-4xl tracking-tight md:text-5xl">
          Three desks.
        </h2>
      </div>
      <ol className="grid gap-12 md:grid-cols-3 md:gap-6">
        {homeAssignments.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="group flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden border border-foreground/15 bg-card">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={`object-cover ${frameFocus[item.id] ?? "object-center"}`}
                />
              </div>
              <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                {item.org}
              </p>
              <h3 className="mt-2 font-heading text-2xl leading-tight tracking-tight transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.line}
              </p>
              <p className="mt-4 border-t border-foreground/10 pt-3 font-heading text-lg leading-snug italic text-primary">
                {item.result}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
