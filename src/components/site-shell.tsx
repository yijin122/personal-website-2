import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="blob absolute -top-28 -right-24 h-[34rem] w-[34rem] bg-primary/15" />
        <div className="blob absolute -bottom-40 -left-28 h-[28rem] w-[28rem] bg-primary/10 [animation-delay:-9s]" />
      </div>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
