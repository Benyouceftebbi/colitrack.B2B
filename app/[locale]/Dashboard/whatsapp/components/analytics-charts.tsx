"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts"
import { format, parseISO } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { buildTimeseries, failureBreakdown, templateBreakdown } from "../lib/analytics"
import { MESSAGE_ERROR_HINTS } from "../lib/constants"
import type { WhatsAppMessage } from "../types"

const funnelConfig = {
  sent: { label: "Sent", color: "hsl(217 91% 60%)" },
  delivered: { label: "Delivered", color: "hsl(160 84% 39%)" },
  read: { label: "Read", color: "hsl(142 71% 45%)" },
  failed: { label: "Failed", color: "hsl(0 84% 60%)" },
} satisfies ChartConfig

const STATUS_COLORS = {
  read: "hsl(142 71% 45%)",
  delivered: "hsl(160 84% 39%)",
  sent: "hsl(217 91% 60%)",
  failed: "hsl(0 84% 60%)",
  queued: "hsl(215 16% 65%)",
}

interface Props {
  messages: WhatsAppMessage[]
  from?: Date
  to?: Date
}

/** Daily sent / delivered / read / failed volume. */
export function DeliveryTrendChart({ messages, from, to }: Props) {
  const data = React.useMemo(() => buildTimeseries(messages, from, to), [messages, from, to])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Delivery over time</CardTitle>
        <CardDescription>
          Each message counts once per stage it reached — a read message also counts as sent and delivered.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyChart />
        ) : (
          <ChartContainer config={funnelConfig} className="h-[280px] w-full">
            <AreaChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
              <defs>
                {Object.entries(funnelConfig).map(([key, cfg]) => (
                  <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={cfg.color} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={cfg.color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
                tickFormatter={(v) => format(parseISO(v), "d MMM")}
              />
              <YAxis tickLine={false} axisLine={false} width={44} allowDecimals={false} />
              <ChartTooltip
                content={<ChartTooltipContent labelFormatter={(v) => format(parseISO(String(v)), "d MMMM yyyy")} />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              {(["sent", "delivered", "read", "failed"] as const).map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={funnelConfig[key].color}
                  fill={`url(#fill-${key})`}
                  strokeWidth={2}
                  stackId={undefined}
                />
              ))}
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

/** Where messages currently sit: read / delivered / stuck on sent / failed. */
export function StatusBreakdownChart({ messages }: { messages: WhatsAppMessage[] }) {
  const data = React.useMemo(() => {
    const counts: Record<string, number> = { read: 0, delivered: 0, sent: 0, failed: 0, queued: 0 }
    for (const m of messages) {
      if (m.direction === "inbound") continue
      if (counts[m.status] !== undefined) counts[m.status] += 1
    }
    return Object.entries(counts)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({
        name: name === "sent" ? "Sent, not delivered" : name[0].toUpperCase() + name.slice(1),
        key: name,
        value,
        fill: STATUS_COLORS[name as keyof typeof STATUS_COLORS],
      }))
  }, [messages])

  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Where your messages ended up</CardTitle>
        <CardDescription>Latest known state of every outgoing message in this period.</CardDescription>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <EmptyChart />
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ChartContainer config={{}} className="aspect-square h-[200px] w-[200px] shrink-0">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} strokeWidth={2}>
                  {data.map((entry) => (
                    <Cell key={entry.key} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>

            <div className="w-full space-y-2.5">
              {data.map((d) => (
                <div key={d.key} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: d.fill }} />
                  <span className="flex-1 truncate text-sm">{d.name}</span>
                  <span className="text-sm font-semibold tabular-nums">{d.value.toLocaleString()}</span>
                  <span className="w-12 text-right text-xs text-muted-foreground tabular-nums">
                    {Math.round((d.value / total) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/** Which templates carry the volume, and how well each one lands. */
export function TemplatePerformanceChart({ messages }: { messages: WhatsAppMessage[] }) {
  const data = React.useMemo(() => templateBreakdown(messages), [messages])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Top templates</CardTitle>
        <CardDescription>Volume and read rate for your most-used templates.</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <EmptyChart />
        ) : (
          <ChartContainer
            config={{
              delivered: { label: "Delivered", color: "hsl(160 84% 39%)" },
              read: { label: "Read", color: "hsl(142 71% 45%)" },
              failed: { label: "Failed", color: "hsl(0 84% 60%)" },
            }}
            className="h-[280px] w-full"
          >
            <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                width={120}
                tickFormatter={(v: string) => (v.length > 18 ? `${v.slice(0, 17)}…` : v)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="delivered" stackId="a" fill="hsl(160 84% 39%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="read" stackId="a" fill="hsl(142 71% 45%)" />
              <Bar dataKey="failed" stackId="a" fill="hsl(0 84% 60%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

/** Failures grouped by Meta error code, with a plain-language explanation. */
export function FailureReasons({ messages }: { messages: WhatsAppMessage[] }) {
  const rows = React.useMemo(() => failureBreakdown(messages), [messages])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Why messages failed</CardTitle>
        <CardDescription>Grouped by the error Meta returned.</CardDescription>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No failures in this period. Nothing to fix.
          </p>
        ) : (
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row.code} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{row.title}</p>
                    {MESSAGE_ERROR_HINTS[row.code] && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{MESSAGE_ERROR_HINTS[row.code]}</p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold tabular-nums">{row.count.toLocaleString()}</p>
                    {row.code > 0 && <p className="font-mono text-[10px] text-muted-foreground">#{row.code}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function EmptyChart() {
  return (
    <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
      <p className="text-sm text-muted-foreground">No messages in this period.</p>
    </div>
  )
}
