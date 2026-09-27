"use client"

import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

type Props = { children: ReactNode }
type State = { error: Error | null }

export class PreviewBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="border border-dashed border-primary/50 px-6 py-10" role="alert">
          <p className="font-heading text-2xl tracking-tight">
            This preview failed to draw.
          </p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            The case notes below are still intact. Retry the figure, or reload
            the study.
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => this.setState({ error: null })}
          >
            Try the preview again
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
