"use client"

import { useMemo, useState } from "react"
import {
  complianceReading,
  linePath,
  responseCompliance,
} from "@/lib/curves"
import { DrawingFrame } from "@/components/drawing-frame"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MIN = 70
const MAX = 120

export function FdnyPreview() {
  const [tiered, setTiered] = useState(false)
  const [fleet, setFleet] = useState(100)
  const compliance = responseCompliance(fleet, tiered)
  const reading = complianceReading(fleet, tiered)

  const path = useMemo(() => {
    const values = Array.from({ length: MAX - MIN + 1 }, (_, index) =>
      responseCompliance(MIN + index, tiered),
    )
    return linePath(
      values,
      (index) => 36 + (index / (MAX - MIN)) * 290,
      (value) => 168 - ((value - 50) / 55) * 140,
    )
  }, [tiered])

  const x = 36 + ((fleet - MIN) / (MAX - MIN)) * 290
  const y = 168 - ((compliance - 50) / 55) * 140

  return (
    <DrawingFrame label="Weekday evenings · 7PM–12AM">
      <div className="px-4 pt-3">
        <Tabs
          value={tiered ? "tiered" : "baseline"}
          onValueChange={(value) => setTiered(value === "tiered")}
        >
          <TabsList>
            <TabsTrigger value="baseline">Baseline policy</TabsTrigger>
            <TabsTrigger value="tiered">Tiered dispatch</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <svg viewBox="0 0 360 200" className="h-auto w-full" role="img" aria-label="Response compliance against relative fleet size">
        <line x1="36" x2="326" y1={168 - ((90 - 50) / 55) * 140} y2={168 - ((90 - 50) / 55) * 140} className="stroke-foreground/30" strokeDasharray="4 3" />
        <text x="40" y="46" className="fill-muted-foreground text-[10px]">
          90% within 9 min
        </text>
        <path d={path} fill="none" className="stroke-burgundy" strokeWidth="1.5" />
        <circle cx={x} cy={y} r="3.5" className="fill-burgundy" />
      </svg>
      <div className="space-y-3 px-4 pb-4">
        <Slider
          value={[fleet]}
          min={MIN}
          max={MAX}
          step={1}
          onValueChange={(value) => setFleet(value[0] ?? 100)}
          aria-label="Relative fleet size"
        />
        <p className="font-heading text-3xl tracking-tight tabular-nums" aria-live="polite">
          {compliance.toFixed(0)}%
          <span className="ml-3 font-sans text-xs tracking-normal text-muted-foreground uppercase">
            {reading === "reported" ? "Matches the study" : "Illustrative"} · fleet index {fleet}
          </span>
        </p>
        <p className="max-w-prose text-sm text-muted-foreground">
          {tiered
            ? "Tiered dispatch holds the 90% threshold with about 12% fewer ambulances. Fleet index 88 under that policy is the reported point. Absolute unit counts and posting addresses are not in the notes, so this axis is relative."
            : "Index 100 is the smallest baseline fleet that reaches 90% of evening calls within 9 minutes. Other points sketch the tradeoff; they are not a published table."}
        </p>
      </div>
    </DrawingFrame>
  )
}
