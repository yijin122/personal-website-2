import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-24 md:px-8">
      <p className="text-sm text-burgundy">404</p>
      <h1 className="mt-3 font-heading text-5xl font-normal tracking-tight md:text-6xl">
        This page is not in the index.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The studies, the roles, and the degree are still where they were.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/work">Case studies</Link>
        </Button>
      </div>
    </div>
  )
}
