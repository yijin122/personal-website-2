"use client"

import { useMemo, useState } from "react"
import { linePath, survivalIndex } from "@/lib/curves"
import { DrawingFrame } from "@/components/drawing-frame"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const boroughs = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"]

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function dots(seed: number, clustered: boolean) {
  const rand = mulberry32(seed)
  return Array.from({ length: 70 }, () => {
    const u = rand()
    const v = rand()
    if (!clustered) return { x: 16 + u * 200, y: 16 + v * 120 }
    const centers = [
      [70, 50],
      [130, 70],
      [100, 100],
    ]
    const center = centers[Math.floor(rand() * centers.length)]
    return {
      x: center[0] + (u - 0.5) * 70,
      y: center[1] + (v - 0.5) * 46,
    }
  })
}

export function OhcaPreview() {
  const [minutes, setMinutes] = useState(4)
  const [reallocated, setReallocated] = useState(true)
  const index = survivalIndex(minutes, reallocated)

  const path = useMemo(() => {
    const values = Array.from({ length: 12 }, (_, step) =>
      survivalIndex(1 + step, reallocated),
    )
    return linePath(
      values,
      (step) => 28 + (step / 11) * 200,
      (value) => 150 - (value / 140) * 120,
    )
  }, [reallocated])

  const field = useMemo(() => dots(2026, reallocated), [reallocated])
  const x = 28 + ((minutes - 1) / 11) * 200
  const y = 150 - (index / 140) * 120

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <DrawingFrame label="Time to defibrillation" className="lg:col-span-7">
        <svg viewBox="0 0 250 180" className="mt-2 h-auto w-full" role="img" aria-label="Schematic survival index against minutes to defibrillation">
          <path d={path} fill="none" className="stroke-burgundy" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="3.5" className="fill-burgundy" />
        </svg>
        <div className="space-y-3 px-4 pb-4">
          <Slider
            value={[minutes]}
            min={1}
            max={12}
            step={1}
            onValueChange={(value) => setMinutes(value[0] ?? 4)}
            aria-label="Minutes to defibrillation"
          />
          <p className="font-heading text-3xl tracking-tight tabular-nums" aria-live="polite">
            {index.toFixed(0)}
            <span className="ml-3 font-sans text-xs tracking-normal text-muted-foreground uppercase">
              Relative index · {minutes} min · schematic
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Survival is modeled as a function of time-to-defibrillation. The
            index is a shape, not a published probability. The reported result
            is the citywide gain.
          </p>
        </div>
      </DrawingFrame>
      <DrawingFrame label="7,000 volunteers" className="lg:col-span-5">
        <div className="px-4 pt-3 pb-4">
          <svg viewBox="0 0 230 150" className="h-auto w-full" aria-hidden>
            {field.map((dot, i) => (
              <circle
                key={i}
                cx={dot.x}
                cy={dot.y}
                r="2.2"
                className="fill-primary"
              />
            ))}
          </svg>
          <p className="font-heading text-4xl font-normal">+8%</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Citywide expected survival under the proposed reallocation.
          </p>
          <Button
            className="mt-4"
            variant={reallocated ? "default" : "outline"}
            onClick={() => setReallocated((value) => !value)}
          >
            {reallocated ? "Showing reallocated field" : "Showing baseline field"}
          </Button>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
            {boroughs.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Volunteers are allocated across the boroughs. The notes report the
            citywide +8%, not a borough-by-borough split. The dot field is an
            illustrative spatial Poisson, not the fitted intensity.
          </p>
        </div>
      </DrawingFrame>
    </div>
  )
}
