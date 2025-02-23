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
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useShop } from "@/app/context/ShopContext"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { useTranslations } from "next-intl"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const t = useTranslations("messages.table")

  const translatedColumns = React.useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        header:
          typeof column.header === "function"
            ? (props: any) => column.header({ ...props, t })
            : t(column.header as string), // Translate static headers
        cell: 
          typeof column.cell === "function"
            ? (props: any) => column.cell({ ...props, t })
            : column.cell,
      })),
    [columns, t]
  );

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [reminderMessage, setReminderMessage] = React.useState("")
  const [selectedRecipient, setSelectedRecipient] = React.useState<string | null>(null)
  const [selectedTrackingId, setSelectedTrackingId] = React.useState<string | null>(null)
  const { shopData, setShopData } = useShop()

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
  })

  const handleSendReminder = (recipient: string, trackingId: string) => {
    setSelectedRecipient(recipient)
    setSelectedTrackingId(trackingId)
    setIsModalOpen(true)
  }

  const handleSubmitReminder = async (senderId: string, smsToken: string) => {
    if (!reminderMessage.trim()) {
      toast({
        title: t("error"),
        description: t("enter-message"),
        variant: "destructive",
      })
      return
    }

    if (!selectedRecipient || !selectedTrackingId) {
      toast({
        title: t("error"),
        description: t("select-recipient-tracking"),
        variant: "destructive",
      })
      return
    }

    try {
      const sendReminderSMS = httpsCallable(functions, "sendReminderSMS")

      const response = await sendReminderSMS({
        phoneNumber: selectedRecipient,
        sms: reminderMessage,
        senderId,
        smsToken,
        trackingId: selectedTrackingId,
      })

      if (response.data?.status === "success") {
        setShopData((prev) => ({
          ...prev,
          tokens: response.data.newTokens,
          smsReminder: [...(prev.smsReminder || []), response.data.id],
        }))

        toast({
          title: t("reminder-sent"),
          description: t("reminder-sent-description"),
        })

        setIsModalOpen(false)
        setReminderMessage("")
        setSelectedRecipient(null)
      } else {
        toast({
          title: t("failed-to-send"),
          description: response.data?.error || t("unknown-error"),
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending SMS:", error)
      toast({
        title: t("error-sending-sms"),
        description: t("try-again-later"),
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <TableToolbar table={table} />

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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "sendReminder" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendReminder(row.getValue("phoneNumber"), row.getValue("trackingId"))}
                        >
                          {t("send-reminder")}
                        </Button>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {t("no-results")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination table={table} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("send-reminder")}</DialogTitle>
            <DialogDescription>{t("reminder-description")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reminder" className="text-right">
                {t("message")}
              </Label>
              <Input
                id="reminder"
                className="col-span-3"
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={() => handleSubmitReminder(shopData.senderId, shopData.smsToken)}>
              {t("send-reminder")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}