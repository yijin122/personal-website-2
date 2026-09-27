import Link from "next/link"
import { identity, nav } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <p className="font-heading text-xl">{identity.handle}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
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
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-burgundy"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground md:col-span-3">
          Work, projects, teaching, and leadership as documented. Ithaca, Hong
          Kong, and remote.
        </p>
      </div>
    </footer>
  )
}
