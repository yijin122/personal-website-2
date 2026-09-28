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
        <a
          href="https://www.linkedin.com/in/hedy-song-88ba7a2a7/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex w-fit text-foreground transition-colors hover:text-primary md:col-span-3"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-5 fill-current"
          >
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
