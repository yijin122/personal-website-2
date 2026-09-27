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
    <figure className={cn("relative border border-border bg-card", className)}>
      {label ? (
        <figcaption className="px-4 pt-4 text-xs text-muted-foreground">
          {label}
        </figcaption>
      ) : null}
      {children}
    </figure>
  )
}
