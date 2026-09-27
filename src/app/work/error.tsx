"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WorkError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8" role="alert">
      <h1 className="font-heading text-4xl tracking-tight">
        The study list could not be drawn.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Retry the page. If it keeps failing, the home page still opens.
      </p>
      <div className="mt-6 flex gap-3">
        <Button type="button" onClick={() => retry()}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
