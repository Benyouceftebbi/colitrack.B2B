"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { arDZ, enUS, fr } from "date-fns/locale"
import { useLocale } from "next-intl"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

const LOCALES: Record<string, typeof enUS> = { en: enUS, fr, ar: arDZ }

const PRESETS = [
  { label: "Today", days: 0 },
  { label: "Last 7 days", days: 6 },
  { label: "Last 30 days", days: 29 },
  { label: "Last 90 days", days: 89 },
]

const startOfDay = (d: Date) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

interface DateRangeFilterProps {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
  className?: string
  align?: "start" | "center" | "end"
}

/** Start/end date picker built on the shadcn calendar, with quick presets. */
export function DateRangeFilter({ value, onChange, className, align = "end" }: DateRangeFilterProps) {
  const locale = LOCALES[useLocale()] ?? enUS
  const [open, setOpen] = React.useState(false)

  const applyPreset = (days: number) => {
    const to = startOfDay(new Date())
    const from = startOfDay(new Date())
    from.setDate(from.getDate() - days)
    onChange({ from, to })
    setOpen(false)
  }

  const label = value?.from
    ? value.to && value.to.getTime() !== value.from.getTime()
      ? `${format(value.from, "d MMM yyyy", { locale })} – ${format(value.to, "d MMM yyyy", { locale })}`
      : format(value.from, "d MMM yyyy", { locale })
    : "Pick a date range"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start gap-2 font-normal",
            !value?.from && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <div className="flex flex-col sm:flex-row">
          <div className="flex shrink-0 flex-row gap-1 p-2 sm:flex-col sm:border-r">
            {PRESETS.map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                size="sm"
                className="justify-start text-xs font-normal"
                onClick={() => applyPreset(preset.days)}
              >
                {preset.label}
              </Button>
            ))}
            <Separator className="my-1 hidden sm:block" />
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-xs font-normal text-muted-foreground"
              onClick={() => {
                onChange(undefined)
                setOpen(false)
              }}
            >
              All time
            </Button>
          </div>
          <Calendar
            autoFocus
            mode="range"
            locale={locale}
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            disabled={{ after: new Date() }}
            className="p-2"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
