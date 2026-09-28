import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

const sPath =
  "M8.6 10.2C8.2 6.2 18.4 5.2 22.4 8.6C25.2 11.2 22.6 13.6 18.2 14.6C13.2 15.8 8.4 17.2 9.2 21.4C10.2 26.2 20.6 27.4 23.8 23.6"

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
            d={sPath}
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
