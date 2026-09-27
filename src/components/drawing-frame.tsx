import { cn } from "cn"

export function DrawingFrame({
  children,
  className,
  label,
}: {
  children: React.ReactNode
  className?: string
  label?: string
}) {
  return (
    <figure
      className={cn(
        "relative border border-foreground/20 bg-card/70",
        className,
      )}
    >
      <span className="absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-primary" />
      <span className="absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-primary" />
      <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-primary" />
      <span className="absolute -right-px -bottom-px h-3 w-3 border-r-2 border-b-2 border-primary" />
      {label ? (
        <figcaption className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          {label}
        </figcaption>
      ) : null}
      {children}
    </figure>
  )
}
