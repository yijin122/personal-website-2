"use client"

import { FdnyPreview } from "@/components/previews/fdny-preview"
import { OhcaPreview } from "@/components/previews/ohca-preview"
import { PreviewBoundary } from "@/components/previews/preview-boundary"
import { RetailPreview } from "@/components/previews/retail-preview"
import { RideHailPreview } from "@/components/previews/ride-hail-preview"
import { ScissorsPreview } from "@/components/previews/scissors-preview"

export function StudyPreview({ slug }: { slug: string }) {
  return (
    <PreviewBoundary>
      {slug === "ride-hailing" ? <RideHailPreview /> : null}
      {slug === "retail-signal" ? <RetailPreview /> : null}
      {slug === "fdny-ambulance" ? <FdnyPreview /> : null}
      {slug === "ohca-survival" ? <OhcaPreview /> : null}
      {slug === "intelligent-scissors" ? <ScissorsPreview /> : null}
    </PreviewBoundary>
  )
}
