"use client"

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#f3efe6",
          color: "#1c1915",
          fontFamily: "Georgia, serif",
          padding: "4rem 1.5rem",
        }}
      >
        <p style={{ letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>
          Error
        </p>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 500 }}>The site failed to render.</h1>
        <p style={{ maxWidth: 420 }}>{error.message}</p>
        <button
          type="button"
          onClick={() => retry()}
          style={{
            marginTop: 24,
            background: "#d63b28",
            color: "#f3efe6",
            border: 0,
            padding: "0.7rem 1rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
