"use client"

import { useMemo, useState } from "react"
import {
  BASELINE_HOURLY,
  OPTIMUM_HOURLY,
  formatDollars,
  hourlyRevenue,
  linePath,
  revenueReading,
  type PricingMode,
} from "@/lib/curves"
import { DrawingFrame } from "@/components/drawing-frame"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SAMPLES = 72

export function RideHailPreview() {
  const [mode, setMode] = useState<PricingMode>("smooth")
  const [surge, setSurge] = useState(40)

  const s = surge / 100
  const revenue = hourlyRevenue(s, mode)
  const reading = revenueReading(s, mode)

  const path = useMemo(() => {
    const values = Array.from({ length: SAMPLES }, (_, index) =>
      hourlyRevenue(index / (SAMPLES - 1), mode),
    )
    return linePath(
      values,
      (index) => 36 + (index / (SAMPLES - 1)) * 300,
      (value) => yOf(value),
    )
  }, [mode])

  const cursorX = 36 + s * 300
  const cursorY = yOf(revenue)
  const litStates = Math.round(s * 4)

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <DrawingFrame label="Dynamic pricing" className="lg:col-span-8">
        <div className="px-4 pt-8">
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as PricingMode)}
          >
            <TabsList>
              <TabsTrigger value="smooth">Smooth</TabsTrigger>
              <TabsTrigger value="two-tier">Two-tier</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <svg viewBox="0 0 360 200" className="h-auto w-full" role="img" aria-label="Revenue against surge intensity">
          <path d={path} fill="none" className="stroke-primary" strokeWidth="2" />
          <line
            x1={cursorX}
            x2={cursorX}
            y1="20"
            y2="168"
            className="stroke-foreground/30"
          />
          <circle cx={cursorX} cy={cursorY} r="4" className="fill-primary" />
          <text x="36" y="188" className="fill-muted-foreground text-[10px]">
            low surge
          </text>
          <text x="250" y="188" className="fill-muted-foreground text-[10px]">
            aggressive surge
          </text>
        </svg>
        <div className="space-y-3 px-4 pb-4">
          <Slider
            value={[surge]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setSurge(value[0] ?? 0)}
            aria-label="Surge intensity"
          />
          <p className="font-heading text-3xl tracking-tight tabular-nums" aria-live="polite">
            {formatDollars(revenue)}
            <span className="ml-3 font-sans text-xs tracking-normal text-muted-foreground uppercase">
              {reading === "baseline"
                ? "Reported baseline"
                : reading === "optimum"
                  ? "Reported optimum"
                  : "Illustrative"}
            </span>
          </p>
          <p className="max-w-prose text-sm text-muted-foreground">
            {reading === "illustrative" && s > 0.45
              ? "Aggressive surge pricing reduces demand more than it increases per-ride margin."
              : "Two-tier and smooth strategies were both optimized. The curve is anchored at the reported hourly revenues of $214,000 and $364,000."}
          </p>
        </div>
      </DrawingFrame>
      <DrawingFrame label="Birth–death" className="lg:col-span-4">
        <div className="flex h-full flex-col justify-between px-4 pt-10 pb-4">
          <svg viewBox="0 0 220 120" className="h-auto w-full" aria-hidden>
            {[0, 1, 2, 3, 4].map((state) => {
              const x = 18 + state * 46
              const on = state <= litStates
              return (
                <g key={state}>
                  {state < 4 ? (
                    <g className="text-foreground/50">
                      <line x1={x + 16} y1="38" x2={x + 34} y2="38" stroke="currentColor" />
                      <line x1={x + 34} y1="58" x2={x + 16} y2="58" stroke="currentColor" />
                      <text x={x + 18} y="32" className="fill-current text-[8px]">
                        λ
                      </text>
                      <text x={x + 18} y="74" className="fill-current text-[8px]">
                        μ
                      </text>
                    </g>
                  ) : null}
                  <circle
                    cx={x}
                    cy="48"
                    r="12"
                    className={on ? "fill-primary" : "fill-transparent"}
                    stroke="currentColor"
                  />
                  <text
                    x={x}
                    y="51"
                    textAnchor="middle"
                    className={on ? "fill-primary-foreground text-[10px]" : "fill-foreground text-[10px]"}
                  >
                    {state}
                  </text>
                </g>
              )
            })}
          </svg>
          <p className="text-sm text-muted-foreground">
            State is the busy fleet. Arrivals and cancellations depend on that
            state; price sensitivity is a shifted gamma. Reported move:{" "}
            {formatDollars(BASELINE_HOURLY)} to {formatDollars(OPTIMUM_HOURLY)}.
          </p>
        </div>
      </DrawingFrame>
    </div>
  )
}

function yOf(value: number) {
  return 168 - ((value - 140_000) / 270_000) * 140
}
