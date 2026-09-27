export function StudyGlyph({ slug }: { slug: string }) {
  return (
    <svg
      viewBox="0 0 160 96"
      className="h-16 w-full text-foreground/80 transition-colors duration-200 group-hover:text-burgundy"
      aria-hidden
    >
      {slug === "ride-hailing" ? <Ride /> : null}
      {slug === "retail-signal" ? <Retail /> : null}
      {slug === "fdny-ambulance" ? <Fleet /> : null}
      {slug === "ohca-survival" ? <Field /> : null}
      {slug === "intelligent-scissors" ? <Edge /> : null}
    </svg>
  )
}

function Ride() {
  return (
    <>
      <path
        d="M8 78 C 30 78, 36 20, 70 28 S 120 70, 152 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="70" cy="28" r="3" fill="currentColor" />
      <circle cx="18" cy="74" r="2" fill="currentColor" />
    </>
  )
}

function Retail() {
  return (
    <>
      <rect x="18" y="14" width="124" height="68" fill="none" stroke="currentColor" />
      <line x1="18" y1="36" x2="142" y2="36" stroke="currentColor" />
      <line x1="18" y1="58" x2="142" y2="58" stroke="currentColor" />
      <rect x="28" y="20" width="28" height="10" fill="currentColor" opacity="0.85" />
    </>
  )
}

function Fleet() {
  return (
    <>
      <path
        d="M12 80 C 40 80, 48 30, 80 30 S 130 20, 148 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line x1="12" y1="46" x2="148" y2="46" stroke="currentColor" strokeDasharray="3 3" />
    </>
  )
}

function Field() {
  const dots = [
    [20, 30],
    [36, 58],
    [48, 24],
    [70, 48],
    [88, 28],
    [104, 62],
    [122, 36],
    [140, 54],
    [58, 70],
    [96, 72],
  ]
  return (
    <>
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="currentColor" />
      ))}
    </>
  )
}

function Edge() {
  return (
    <>
      <path
        d="M30 70 C 40 20, 90 16, 100 48 C 108 72, 70 84, 48 62"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="30" cy="70" r="3" fill="currentColor" />
      <circle cx="100" cy="48" r="3" fill="currentColor" />
      <path
        d="M30 70 C 46 40, 78 36, 100 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="3 2"
      />
    </>
  )
}
