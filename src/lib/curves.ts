/** Schematic curves anchored to figures in the source notes. */

export const BASELINE_HOURLY = 214_000
export const OPTIMUM_HOURLY = 364_000

export type PricingMode = "smooth" | "two-tier"

/** Surge intensity s is 0–1. Only the endpoints $214k and $364k are reported. */
export function hourlyRevenue(s: number, mode: PricingMode): number {
  const clamped = Math.min(1, Math.max(0, s))
  if (mode === "two-tier") {
    if (clamped < 0.2) return BASELINE_HOURLY
    if (clamped < 0.56) return OPTIMUM_HOURLY
    const t = (clamped - 0.56) / 0.44
    return OPTIMUM_HOURLY - (OPTIMUM_HOURLY - 168_000) * t
  }
  const peakAt = 0.4
  if (clamped <= peakAt) {
    const t = clamped / peakAt
    return (
      BASELINE_HOURLY +
      (OPTIMUM_HOURLY - BASELINE_HOURLY) * (1 - Math.pow(1 - t, 1.35))
    )
  }
  const t = (clamped - peakAt) / (1 - peakAt)
  return OPTIMUM_HOURLY - (OPTIMUM_HOURLY - 168_000) * Math.pow(t, 1.08)
}

export function revenueReading(
  s: number,
  mode: PricingMode,
): "baseline" | "optimum" | "illustrative" {
  if (s < 0.045) return "baseline"
  if (mode === "two-tier" && s >= 0.2 && s < 0.56) return "optimum"
  if (mode === "smooth" && Math.abs(s - 0.4) < 0.03) return "optimum"
  return "illustrative"
}

/**
 * Relative fleet size, where 100 is the minimum fleet that hits 90%
 * under the baseline policy. Tiered dispatch shifts that point by ~12%.
 */
export function responseCompliance(fleet: number, tiered: boolean): number {
  const effective = fleet + (tiered ? 12 : 0)
  if (effective >= 100) {
    return Math.min(97, 90 + 7 * (1 - Math.exp(-(effective - 100) / 22)))
  }
  return Math.max(58, 90 - 32 * (1 - Math.exp(-(100 - effective) / 20)))
}

export function complianceReading(
  fleet: number,
  tiered: boolean,
): "reported" | "illustrative" {
  if (!tiered && fleet === 100) return "reported"
  if (tiered && fleet === 88) return "reported"
  return "illustrative"
}

/** Relative survival index. The reported result is a citywide +8%, not this curve. */
export function survivalIndex(minutes: number, reallocated: boolean): number {
  const base = 100 * Math.exp(-(minutes - 2) / 5.5)
  return reallocated ? base * 1.08 : base
}

export function formatDollars(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function linePath(
  values: number[],
  xAt: (index: number) => number,
  yAt: (value: number) => number,
): string {
  return values
    .map((value, index) => {
      const command = index === 0 ? "M" : "L"
      return `${command}${xAt(index).toFixed(2)} ${yAt(value).toFixed(2)}`
    })
    .join(" ")
}
