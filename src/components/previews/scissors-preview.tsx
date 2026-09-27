"use client"

import { useEffect, useRef, useState } from "react"
import { DrawingFrame } from "@/components/drawing-frame"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

type Field = {
  cols: number
  rows: number
  step: number
  width: number
  height: number
  grad: Float32Array
  maxGrad: number
  image: ImageData
}

const DIRS = [
  [1, 0, 1],
  [-1, 0, 1],
  [0, 1, 1],
  [0, -1, 1],
  [1, 1, Math.SQRT2],
  [1, -1, Math.SQRT2],
  [-1, 1, Math.SQRT2],
  [-1, -1, Math.SQRT2],
] as const

export function ScissorsPreview() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fieldRef = useRef<Field | null>(null)
  const seedsRef = useRef<number[]>([])
  const hoverRef = useRef<number | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [seedCount, setSeedCount] = useState(0)
  const [showCost, setShowCost] = useState(false)
  const showCostRef = useRef(false)

  useEffect(() => {
    showCostRef.current = showCost
    paint()
  }, [showCost])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let frame = 0

    const build = () => {
      const width = Math.max(280, Math.floor(wrap.clientWidth))
      const height = Math.max(240, Math.min(420, Math.round(width * 0.58)))
      const step = width > 720 ? 7 : 8
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (!ctx) {
        setError("This browser could not open a drawing surface.")
        return
      }
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      drawSubject(ctx, width, height)
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const cols = Math.floor(width / step)
      const rows = Math.floor(height / step)
      const grad = new Float32Array(cols * rows)
      let maxGrad = 1
      const lum = (px: number, py: number) => {
        const sx = Math.min(canvas.width - 1, Math.max(0, Math.round(px * ratio)))
        const sy = Math.min(canvas.height - 1, Math.max(0, Math.round(py * ratio)))
        const i = (sy * canvas.width + sx) * 4
        return image.data[i] * 0.299 + image.data[i + 1] * 0.587 + image.data[i + 2] * 0.114
      }
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const px = x * step + step / 2
          const py = y * step + step / 2
          const gx = lum(px + 1, py) - lum(px - 1, py)
          const gy = lum(px, py + 1) - lum(px, py - 1)
          const g = Math.hypot(gx, gy)
          grad[y * cols + x] = g
          if (g > maxGrad) maxGrad = g
        }
      }
      fieldRef.current = { cols, rows, step, width, height, grad, maxGrad, image }
      seedsRef.current = []
      hoverRef.current = null
      setSeedCount(0)
      setReady(true)
      setError(null)
      paint()
    }

    frame = window.requestAnimationFrame(build)
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(build)
    })
    observer.observe(wrap)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [])

  function paint() {
    const field = fieldRef.current
    const canvas = canvasRef.current
    if (!field || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const ratio = canvas.width / field.width
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    ctx.putImageData(field.image, 0, 0)
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    if (showCostRef.current) {
      ctx.globalAlpha = 0.45
      for (let y = 0; y < field.rows; y += 1) {
        for (let x = 0; x < field.cols; x += 1) {
          const t = field.grad[y * field.cols + x] / field.maxGrad
          ctx.fillStyle = `rgba(214, 59, 40, ${t})`
          ctx.fillRect(x * field.step, y * field.step, field.step, field.step)
        }
      }
      ctx.globalAlpha = 1
    }
    const seeds = seedsRef.current
    ctx.lineWidth = 2.25
    ctx.strokeStyle = "#d63b28"
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    for (let i = 0; i < seeds.length - 1; i += 1) {
      strokePath(ctx, field, shortest(field, seeds[i], seeds[i + 1]))
    }
    if (seeds.length && hoverRef.current != null && hoverRef.current !== seeds[seeds.length - 1]) {
      ctx.setLineDash([5, 4])
      strokePath(ctx, field, shortest(field, seeds[seeds.length - 1], hoverRef.current))
      ctx.setLineDash([])
    }
    for (const seed of seeds) {
      const p = nodePoint(field, seed)
      ctx.beginPath()
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#f4f0e6"
      ctx.fill()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = "#d63b28"
      ctx.stroke()
    }
  }

  function nodeFromEvent(event: React.PointerEvent<HTMLCanvasElement>) {
    const field = fieldRef.current
    const canvas = canvasRef.current
    if (!field || !canvas) return null
    const rect = canvas.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * field.width
    const y = ((event.clientY - rect.top) / rect.height) * field.height
    const col = Math.min(field.cols - 1, Math.max(0, Math.floor(x / field.step)))
    const row = Math.min(field.rows - 1, Math.max(0, Math.floor(y / field.step)))
    return row * field.cols + col
  }

  return (
    <DrawingFrame label="Browser sketch of the Java tool">
      <div ref={wrapRef} className="relative mt-6">
        {!ready && !error ? (
          <Skeleton className="h-72 w-full rounded-none md:h-96" />
        ) : null}
        {error ? (
          <div className="px-4 py-12" role="alert">
            <p className="font-heading text-2xl">The scissors could not start.</p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className={ready ? "block w-full cursor-crosshair touch-none" : "hidden"}
            onPointerMove={(event) => {
              hoverRef.current = nodeFromEvent(event)
              paint()
            }}
            onPointerLeave={() => {
              hoverRef.current = null
              paint()
            }}
            onPointerDown={(event) => {
              const node = nodeFromEvent(event)
              if (node == null) return
              const seeds = seedsRef.current
              if (seeds[seeds.length - 1] !== node) seeds.push(node)
              setSeedCount(seeds.length)
              paint()
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm text-muted-foreground">
          Click two points, one inside the form and one outside. The live path
          is Dijkstra on a grid whose links are cheap along strong edges.{" "}
          {seedCount === 0
            ? "No seeds yet."
            : `${seedCount} seed${seedCount === 1 ? "" : "s"}.`}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={showCost ? "default" : "outline"}
            size="sm"
            onClick={() => setShowCost((value) => !value)}
          >
            {showCost ? "Hide cost field" : "Show cost field"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const seeds = seedsRef.current
              seeds.pop()
              setSeedCount(seeds.length)
              paint()
            }}
          >
            Undo
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              seedsRef.current = []
              setSeedCount(0)
              paint()
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </DrawingFrame>
  )
}

function drawSubject(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = "#f3efe6"
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = "#1c1915"
  ctx.beginPath()
  ctx.moveTo(width * 0.28, height * 0.62)
  ctx.bezierCurveTo(
    width * 0.22,
    height * 0.28,
    width * 0.48,
    height * 0.12,
    width * 0.62,
    height * 0.34,
  )
  ctx.bezierCurveTo(
    width * 0.82,
    height * 0.22,
    width * 0.86,
    height * 0.58,
    width * 0.68,
    height * 0.72,
  )
  ctx.bezierCurveTo(
    width * 0.56,
    height * 0.9,
    width * 0.36,
    height * 0.86,
    width * 0.28,
    height * 0.62,
  )
  ctx.closePath()
  ctx.fill()
}

function nodePoint(field: Field, index: number) {
  const x = index % field.cols
  const y = Math.floor(index / field.cols)
  return { x: x * field.step + field.step / 2, y: y * field.step + field.step / 2 }
}

function strokePath(
  ctx: CanvasRenderingContext2D,
  field: Field,
  nodes: number[],
) {
  if (nodes.length < 2) return
  ctx.beginPath()
  nodes.forEach((node, index) => {
    const p = nodePoint(field, node)
    if (index === 0) ctx.moveTo(p.x, p.y)
    else ctx.lineTo(p.x, p.y)
  })
  ctx.stroke()
}

function shortest(field: Field, start: number, goal: number): number[] {
  if (start === goal) return [start]
  const { cols, rows, grad, maxGrad } = field
  const count = cols * rows
  const dist = new Float64Array(count)
  dist.fill(Number.POSITIVE_INFINITY)
  const prev = new Int32Array(count)
  prev.fill(-1)
  dist[start] = 0
  const heap: { d: number; i: number }[] = [{ d: 0, i: start }]

  while (heap.length) {
    const current = pop(heap)
    if (!current || current.d !== dist[current.i]) continue
    if (current.i === goal) break
    const x = current.i % cols
    const y = Math.floor(current.i / cols)
    for (const [dx, dy, length] of DIRS) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
      const next = ny * cols + nx
      const g = Math.max(grad[current.i], grad[next]) / maxGrad
      const stepCost = length * (0.035 + (1 - g) * 1.35)
      const nextDist = current.d + stepCost
      if (nextDist < dist[next]) {
        dist[next] = nextDist
        prev[next] = current.i
        push(heap, { d: nextDist, i: next })
      }
    }
  }

  const path: number[] = []
  let cursor = goal
  if (prev[goal] === -1) return [start, goal]
  while (cursor !== -1) {
    path.push(cursor)
    if (cursor === start) break
    cursor = prev[cursor]
  }
  path.reverse()
  return path
}

function push(heap: { d: number; i: number }[], item: { d: number; i: number }) {
  heap.push(item)
  let i = heap.length - 1
  while (i > 0) {
    const parent = (i - 1) >> 1
    if (heap[parent].d <= heap[i].d) break
    ;[heap[parent], heap[i]] = [heap[i], heap[parent]]
    i = parent
  }
}

function pop(heap: { d: number; i: number }[]) {
  if (!heap.length) return undefined
  const top = heap[0]
  const last = heap.pop()
  if (!last || heap.length === 0) return top
  heap[0] = last
  let i = 0
  for (;;) {
    const left = i * 2 + 1
    const right = left + 1
    let smallest = i
    if (left < heap.length && heap[left].d < heap[smallest].d) smallest = left
    if (right < heap.length && heap[right].d < heap[smallest].d) smallest = right
    if (smallest === i) break
    ;[heap[smallest], heap[i]] = [heap[i], heap[smallest]]
    i = smallest
  }
  return top
}
