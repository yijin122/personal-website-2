import { ImageResponse } from "next/og"
import { markPath } from "@/components/mark"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f3efe6",
          display: "flex",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path
            d={markPath}
            fill="none"
            stroke="#d63b28"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  )
}
