import type { WhatsAppAnalytics, WhatsAppMessage, WhatsAppTimeseriesPoint } from "../types"

const pct = (num: number, den: number) => (den > 0 ? Math.round((num / den) * 1000) / 10 : 0)

/**
 * Meta reports statuses cumulatively — a read message was also delivered and sent.
 * Our documents keep only the *latest* status, so a "read" row must still count
 * toward delivered when we compute rates. `sent`/`delivered`/`read` below are the
 * bucket counts (mutually exclusive); the rates re-add the implied ones.
 */
export function computeAnalytics(messages: WhatsAppMessage[]): WhatsAppAnalytics {
  const outbound = messages.filter((m) => m.direction !== "inbound")

  const queued = outbound.filter((m) => m.status === "queued").length
  const sent = outbound.filter((m) => m.status === "sent").length
  const delivered = outbound.filter((m) => m.status === "delivered").length
  const read = outbound.filter((m) => m.status === "read").length
  const failed = outbound.filter((m) => m.status === "failed").length

  // Everything that actually left our side.
  const dispatched = sent + delivered + read + failed
  const reachedDevice = delivered + read

  return {
    total: outbound.length,
    queued,
    sent,
    delivered,
    read,
    failed,
    undelivered: sent + failed,
    deliveryRate: pct(reachedDevice, dispatched),
    readRate: pct(read, reachedDevice),
    failureRate: pct(failed, dispatched),
  }
}

const dayKey = (d: Date) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.toISOString().slice(0, 10)
}

/** Daily buckets across the given range, zero-filled so the chart has no gaps. */
export function buildTimeseries(
  messages: WhatsAppMessage[],
  from?: Date,
  to?: Date,
): WhatsAppTimeseriesPoint[] {
  const outbound = messages.filter((m) => m.direction !== "inbound" && m.createdAt)
  if (!outbound.length && !(from && to)) return []

  const stamps = outbound.map((m) => (m.createdAt as Date).getTime())
  const start = from ? new Date(from) : new Date(Math.min(...stamps))
  const end = to ? new Date(to) : new Date(Math.max(...stamps))
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  const buckets = new Map<string, WhatsAppTimeseriesPoint>()
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = dayKey(d)
    buckets.set(key, { date: key, sent: 0, delivered: 0, read: 0, failed: 0 })
  }

  for (const m of outbound) {
    const key = dayKey(m.createdAt as Date)
    const bucket = buckets.get(key)
    if (!bucket) continue
    // Cumulative funnel: a read message also counts as sent + delivered.
    if (m.status === "failed") {
      bucket.failed += 1
      bucket.sent += 1
      continue
    }
    if (m.status === "queued") continue
    bucket.sent += 1
    if (m.status === "delivered" || m.status === "read") bucket.delivered += 1
    if (m.status === "read") bucket.read += 1
  }

  return Array.from(buckets.values()).sort((a, b) => a.date.localeCompare(b.date))
}

/** Top templates by volume, with their own delivery/read rates. */
export function templateBreakdown(messages: WhatsAppMessage[], limit = 6) {
  const map = new Map<string, { name: string; total: number; delivered: number; read: number; failed: number }>()

  for (const m of messages) {
    if (m.direction === "inbound") continue
    const name = m.templateName || "(no template)"
    const row = map.get(name) || { name, total: 0, delivered: 0, read: 0, failed: 0 }
    row.total += 1
    if (m.status === "delivered" || m.status === "read") row.delivered += 1
    if (m.status === "read") row.read += 1
    if (m.status === "failed") row.failed += 1
    map.set(name, row)
  }

  return Array.from(map.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
    .map((r) => ({
      ...r,
      deliveryRate: pct(r.delivered, r.total),
      readRate: pct(r.read, r.delivered),
    }))
}

/** Groups failures by Meta error code so the user can see *why* sends bounce. */
export function failureBreakdown(messages: WhatsAppMessage[]) {
  const map = new Map<number, { code: number; title: string; count: number }>()
  for (const m of messages) {
    if (m.status !== "failed") continue
    const code = m.error?.code ?? 0
    const row = map.get(code) || { code, title: m.error?.title || m.error?.message || "Unknown error", count: 0 }
    row.count += 1
    map.set(code, row)
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count)
}
