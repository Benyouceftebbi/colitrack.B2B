"use client"

import type * as React from "react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  onSelect: (date: DateRange | undefined) => void
}

export function DateRangePicker({ date, onSelect, className }: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={onSelect}
        numberOfMonths={2}
        className="rounded-md border"
      />
    </div>
  )
}

