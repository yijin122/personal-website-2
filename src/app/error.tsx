"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
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
    <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-24 md:px-8" role="alert">
      <p className="text-sm text-burgundy">Error</p>
      <h1 className="mt-3 font-heading text-5xl font-normal tracking-tight">
        This page failed to render.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The studies are still on the site. Retry this view, or return home.
      </p>
      <div className="mt-8">
        <Button type="button" onClick={() => retry()}>
          Try again
        </Button>
      </div>
    </div>
  )
}
