import Link from "next/link"
import { identity, nav } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-foreground/15">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <p className="font-heading text-2xl italic">{identity.handle}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {identity.school}. {identity.degree}, GPA {identity.gpa},{" "}
            {identity.undergradExpected.toLowerCase()}. {identity.mfe},{" "}
            {identity.mfeExpected.toLowerCase()}.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:col-span-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <p className="font-mono text-[11px] leading-relaxed tracking-wide text-muted-foreground uppercase md:col-span-3">
          Work, projects, teaching, and leadership as documented. Ithaca, Hong
          Kong, and remote.
        </p>
      </div>
    </footer>
  )
}
