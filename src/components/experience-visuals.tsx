import { Badge } from "@/components/ui/badge"
import { DrawingFrame } from "@/components/drawing-frame"

export function ConflictBars() {
  return (
    <DrawingFrame label="High-conflict pairings" className="mt-6">
      <div className="space-y-5 px-4 pt-2 pb-5">
        <Bar label="Indexed before the new schedules" width="100%" />
        <Bar
          label="After 50+ optimization runs, −15%"
          width="85%"
          accent
        />
        <p className="text-sm text-muted-foreground">
          560+ exams and 20,000+ students per semester. The bars are the
          reported 15% reduction, not a semester-by-semester series.
        </p>
      </div>
    </DrawingFrame>
  )
}

function Bar({
  label,
  width,
  accent = false,
}: {
  label: string
  width: string
  accent?: boolean
}) {
  return (
    <div>
      <p className="mb-1 text-xs text-muted-foreground">{label}</p>
      <div className="h-[2px] bg-muted">
        <div
          className={`h-full ${accent ? "bg-burgundy" : "bg-foreground/55"}`}
          style={{ width }}
        />
      </div>
    </div>
  )
}

export function RegistrarSketch() {
  return (
    <DrawingFrame label="Registrar UI" className="mt-4">
      <div className="space-y-3 px-4 pt-2 pb-5">
        <p className="text-sm text-muted-foreground">
          The interface built for the registrar covers four moves. This is the
          function list, not a live dataset.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Filter", "Metric bounds", "Pin", "Export"].map((item) => (
            <Badge key={item} variant="outline" className="rounded-sm font-mono">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </DrawingFrame>
  )
}

export function RagNote() {
  return (
    <DrawingFrame label="Retrieval benchmark" className="mt-6">
      <div className="space-y-3 px-4 pt-2 pb-5">
        <p className="font-heading text-4xl font-normal">100,000+</p>
        <p className="text-sm text-muted-foreground">
          Query evaluations on a full-stack RAG pipeline: preprocessing,
          embeddings, and real-time retrieval.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-sm font-mono">
            Qwen3
          </Badge>
          <Badge variant="outline" className="rounded-sm font-mono">
            FlagReranker
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Both rerankers were fine-tuned and compared for top-k precision. The
          notes do not publish a single accuracy score, so none is drawn here.
        </p>
      </div>
    </DrawingFrame>
  )
}
