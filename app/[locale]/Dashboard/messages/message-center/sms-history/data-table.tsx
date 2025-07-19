"use client"

import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableToolbar } from "./table-toolbar"
import { TablePagination } from "./table-pagination"
import { ArrowUpDown } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { arDZ, enUS, fr } from "date-fns/locale"
import type { Locale } from "date-fns"

// Define the new SMSMessage type
type SMSMessage = {
  id: string
  phoneNumber: string
  smsStatus: string
  content: string
  createdAt: Date
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends SMSMessage, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const lng = useLocale()
  const t = useTranslations("messages.table")
  const localeMap: Record<string, Locale> = {
    ar: arDZ,
    en: enUS,
    fr: fr,
  }

  const locale = localeMap[lng] || enUS

  const translatedColumns = React.useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        header:
          typeof column.header === "function"
            ? (props: any) => column.header({ ...props, t })
            : t(column.header as string),
        cell:
          typeof column.cell === "function"
            ? (props: any) => column.cell({ ...props, t, locale: locale })
            : column.cell,
      })),
    [columns, t, locale],
  )

  const table = useReactTable({
    data,
    columns: translatedColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    // Smart search: global filter will search across all columns
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId)
      if (typeof value === "string" || typeof value === "number") {
        return String(value).toLowerCase().includes(String(filterValue).toLowerCase())
      }
      // For Date objects, convert to string for searching
      if (value instanceof Date) {
        return value.toLocaleDateString(lng).toLowerCase().includes(String(filterValue).toLowerCase())
      }
      return false
    },
  })

  return (
    <div className="space-y-4">
      <TableToolbar table={table} setGlobalFilter={setGlobalFilter} globalFilter={globalFilter} />

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort() ? "flex items-center gap-1 cursor-pointer select-none" : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && <ArrowUpDown className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`hover:bg-muted/50 ${row.getIsSelected() ? "bg-muted/20" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {t("no-results") || "No results found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination table={table} />
    </div>
  )
}
