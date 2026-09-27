"use client"

import { useMemo } from "react"
import { hourlyRevenue, linePath } from "@/lib/curves"
import { DrawingFrame } from "@/components/drawing-frame"

export function HomeHeroChart() {
  const path = useMemo(() => {
    const values = Array.from({ length: 64 }, (_, index) =>
      hourlyRevenue(index / 63, "smooth"),
    )
    return linePath(
      values,
      (index) => 28 + (index / 63) * 300,
      (value) => 168 - ((value - 150_000) / 250_000) * 130,
    )
  }, [])

  return (
    <DrawingFrame label="Lyft · hourly revenue" className="overflow-hidden">
      <svg viewBox="0 0 360 210" className="mt-6 h-auto w-full" role="img" aria-label="Schematic revenue curve rising from 214 thousand dollars to a peak of 364 thousand, then falling.">
        <path
          d="M250 18 C 290 30, 330 80, 300 140 C 280 180, 210 150, 230 100 C 246 60, 210 40, 250 18"
          className="fill-primary/15"
        />
        <path
          d={path}
          className="chart-draw fill-none stroke-primary"
          strokeWidth="2"
        />
        <circle cx="28" cy="134.7" r="3.5" className="fill-foreground" />
        <circle cx="148" cy="56.7" r="4" className="fill-primary" />
        <text x="36" y="128" className="fill-foreground font-mono text-[10px]">
          $214k
        </text>
        <text x="158" y="48" className="fill-primary font-mono text-[10px]">
          $364k
        </text>
        <text x="28" y="196" className="fill-muted-foreground font-mono text-[9px]">
          surge →
        </text>
      </svg>
      <p className="px-4 pb-4 font-mono text-[10px] leading-relaxed tracking-wide text-muted-foreground uppercase">
        Reported endpoints only. The bend after the peak is the study insight:
        aggressive surge cuts demand harder than it lifts margin.
      </p>
    </DrawingFrame>
  )
}
