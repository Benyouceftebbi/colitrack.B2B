"use client"
import type { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

interface TableToolbarProps<TData> {
  table: Table<TData>
  setGlobalFilter: (value: string) => void
  globalFilter: string
}

export function TableToolbar<TData>({ table, setGlobalFilter, globalFilter }: TableToolbarProps<TData>) {
  const t = useTranslations("messages.table")
  const isFiltered = table.getState().globalFilter !== ""

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("search-sms-placeholder") || "Search SMS messages..."}
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9 bg-background/50"
        />
        {globalFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setGlobalFilter("")}
            className="absolute right-0 top-0 h-full px-2 py-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t("clear-search") || "Clear search"}</span>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 self-end">
        {/* Clear Filters (only global filter now) */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setGlobalFilter("")
            }}
            className="h-8 px-2 lg:px-3"
          >
            {t("reset") || "Reset"}
          </Button>
        )}
      </div>
    </div>
  )
}
