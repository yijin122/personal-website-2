"use client"

import { useState } from "react"
import { DrawingFrame } from "@/components/drawing-frame"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const zones = [
  {
    id: "front",
    label: "Front of store",
    note: "Front-of-store placement of clothing could increase revenue impact. That is the recommendation in the notes.",
  },
  {
    id: "mid",
    label: "Mid-aisle",
    note: "Placement is in the model. The notes single out front-of-store clothing and do not rank this zone.",
  },
  {
    id: "back",
    label: "Back of store",
    note: "Placement is in the model. The notes single out front-of-store clothing and do not rank this zone.",
  },
] as const

type ZoneId = (typeof zones)[number]["id"]

export function RetailPreview() {
  const [zone, setZone] = useState<ZoneId>("front")
  const [interaction, setInteraction] = useState<"main" | "interaction">("interaction")
  const current = zones.find((item) => item.id === zone) ?? zones[0]

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <DrawingFrame label="Store plan" className="lg:col-span-7">
        <div className="grid gap-2 px-4 pt-4 pb-4">
          {zones.map((item) => {
            const selected = zone === item.id
            const hot = item.id === "front" && interaction === "interaction"
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setZone(item.id)}
                aria-pressed={selected}
                className={`flex h-16 items-center justify-between border px-4 text-left transition-colors ${
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-foreground/15 hover:border-foreground/40"
                }`}
              >
                <span className="text-sm">{item.label}</span>
                {hot ? (
                  <span className="font-heading text-lg italic text-primary">
                    clothing
                  </span>
                ) : (
                  <span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                    placement
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </DrawingFrame>
      <DrawingFrame label="Revenue model" className="lg:col-span-5">
        <div className="space-y-4 px-4 pt-4 pb-4">
          <Tabs
            value={interaction}
            onValueChange={(value) =>
              setInteraction(value as "main" | "interaction")
            }
          >
            <TabsList>
              <TabsTrigger value="main">Main effects</TabsTrigger>
              <TabsTrigger value="interaction">Interaction</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="font-mono text-sm leading-relaxed">
            revenue ~ portfolio + placement
            {interaction === "interaction" ? (
              <>
                {" + "}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="text-primary underline decoration-primary/40 underline-offset-4">
                      category × placement
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Interaction terms were engineered to uncover sales drivers.
                    The published example is Category × Placement.
                  </TooltipContent>
                </Tooltip>
              </>
            ) : null}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {current.note}
          </p>
          <div className="flex flex-wrap gap-2">
            {zones.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={zone === item.id ? "default" : "outline"}
                onClick={() => setZone(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </DrawingFrame>
    </div>
  )
}
