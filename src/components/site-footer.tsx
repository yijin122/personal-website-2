import Image from "next/image"
import Link from "next/link"
import { identity, nav } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-foreground/15">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <Link href="/" aria-label={identity.handle} className="inline-flex">
            <Image src="/icon" alt="" width={28} height={28} className="size-7" />
          </Link>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Contact Me:{" "}
            <a
              href="mailto:songyijin1214@gmail.com"
              className="underline decoration-foreground/30 underline-offset-4 hover:text-primary"
            >
              songyijin1214@gmail.com
            </a>
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
