"use client"
import type { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"

interface TableToolbarProps<TData> {
  table: Table<TData>
}

export function TableToolbar<TData>({ table }: TableToolbarProps<TData>) {
  const t = useTranslations("messages.table")
  const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter !== ""

  // Helper function to get unique values from table data
  const getUniqueValues = (columnId: string): string[] => {
    const uniqueValues = new Set<string>()

    table.getCoreRowModel().rows.forEach((row) => {
      const value = row.getValue(columnId)
      if (value !== undefined && value !== null) {
        uniqueValues.add(value as string)
      }
    })

    return Array.from(uniqueValues)
  }

  // Get unique status values from the lastStatus column
  const statusValues = getUniqueValues("lastStatus")

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("search-placeholder") || "Search messages..."}
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="pl-9 bg-background/50"
        />
        {table.getState().globalFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.setGlobalFilter("")}
            className="absolute right-0 top-0 h-full px-2 py-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t("clear-search") || "Clear search"}</span>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 self-end">
        {/* Status Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-background/50 border-white/10 hover:bg-white/5">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {t("filter") || "Filter"}
              {table.getState().columnFilters.length > 0 && (
                <span className="ml-2 rounded-full bg-primary w-6 h-6 flex items-center justify-center text-xs">
                  {table.getState().columnFilters.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>{t("status") || "Status"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statusValues.map((status) => {
              const isSelected = table
                .getState()
                .columnFilters.some((filter) => filter.id === "lastStatus" && filter.value === status)

              return (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={isSelected}
                  onCheckedChange={() => {
                    if (isSelected) {
                      table.getColumn("lastStatus")?.setFilterValue(undefined)
                    } else {
                      table.getColumn("lastStatus")?.setFilterValue(status)
                    }
                  }}
                  className="capitalize"
                >
                  {t(`statusLabels.${status}`) || status}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              table.resetColumnFilters()
              table.setGlobalFilter("")
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

