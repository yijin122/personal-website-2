"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { identity, nav, studies } from "@/lib/content"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"

function active(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="font-heading text-xl italic tracking-tight"
        >
          {identity.handle}
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                active(pathname, item.href) && "text-primary",
              )}
              aria-current={active(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <IndexDialog />
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl italic">
                  {identity.handle}
                </SheetTitle>
                <SheetDescription>
                  Operations research, retrieval, and the pictures those models
                  make.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="border-b border-foreground/10 py-3 font-heading text-3xl tracking-tight"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function IndexDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Index
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl italic">
            Index
          </DialogTitle>
          <DialogDescription>
            Five case studies, then the record of roles, teaching, and the
            degree.
          </DialogDescription>
        </DialogHeader>
        <ul className="max-h-[50vh] space-y-1 overflow-auto">
          {studies.map((study) => (
            <li key={study.slug}>
              <DialogClose asChild>
                <Link
                  href={`/work/${study.slug}`}
                  className="flex items-baseline justify-between gap-4 border-b border-foreground/10 py-2 hover:text-primary"
                >
                  <span>
                    <span className="mr-3 font-mono text-[11px] text-primary">
                      {study.index}
                    </span>
                    {study.title}
                  </span>
                  <span className="font-heading italic text-primary">
                    {study.metric.value}
                  </span>
                </Link>
              </DialogClose>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button asChild variant="secondary" size="sm">
              <Link href="/experience">Experience</Link>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button asChild variant="secondary" size="sm">
              <Link href="/about">About</Link>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
