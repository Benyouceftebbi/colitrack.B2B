"use client"

import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
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
import { ArrowUpDown, Send, Users } from "lucide-react"
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
import { useLocale, useTranslations } from "next-intl"
import { arDZ, enUS, fr } from "date-fns/locale" // Use correct locales
import { LoadingButton } from "@/components/ui/LoadingButton"
import type { Locale } from "date-fns"
import { Badge } from "@/components/ui/badge"

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
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [selectedRecipients, setSelectedRecipients] = React.useState<
    Array<{ phoneNumber: string; trackingId: string }>
  >([])
  const [isMultipleReminder, setIsMultipleReminder] = React.useState(false)

  const lng = useLocale()
  const t = useTranslations("messages.table")
  const localeMap: Record<string, Locale> = {
    ar: arDZ, // Algerian Arabic (if you use Standard Arabic, use `ar`)
    en: enUS,
    fr: fr,
  }

  // Get the correct locale; default to English if not found
  const locale = localeMap[lng] || enUS

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
            ? (props: any) => column.cell({ ...props, t, locale: locale })
            : column.cell,
      })),
    [columns, t, locale],
  )

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [reminderMessage, setReminderMessage] = React.useState("")
  const [selectedRecipient, setSelectedRecipient] = React.useState<string | null>(null)
  const [selectedTrackingId, setSelectedTrackingId] = React.useState<string | null>(null)
  const { shopData, setShopData } = useShop()

  // Custom filter function for messageTypes array
  const messageTypesFilterFn = React.useCallback((row: any, columnId: string, filterValue: any) => {
    const messageTypes = row.getValue(columnId) as string[] | undefined
    return messageTypes ? messageTypes.includes(filterValue) : false
  }, [])

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
    onRowSelectionChange: setRowSelection,
    filterFns: {
      messageTypesFilter: messageTypesFilterFn,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
      rowSelection,
    },
    enableRowSelection: true,
  })

  const handleSendReminder = (recipient: string, trackingId: string) => {
    setSelectedRecipient(recipient)
    setSelectedTrackingId(trackingId)
    setIsMultipleReminder(false)
    setIsModalOpen(true)
  }

  const handleSendMultipleReminders = () => {
    const selectedRows = table.getSelectedRowModel().rows
    if (selectedRows.length === 0) {
      toast({
        title: t("error"),
        description: t("select-at-least-one") || "Please select at least one recipient",
        variant: "destructive",
      })
      return
    }

    // Extract phone numbers and tracking IDs from selected rows
    const recipients = selectedRows.map((row) => ({
      phoneNumber: row.getValue("phoneNumber") as string,
      trackingId: row.getValue("trackingId") as string,
    }))

    setSelectedRecipients(recipients)
    setIsMultipleReminder(true)
    setIsModalOpen(true)
  }

  const resetModalState = () => {
    setIsModalOpen(false)
    setReminderMessage("")
    setSelectedRecipient(null)
    setSelectedTrackingId(null)
    setSelectedRecipients([])
    setIsMultipleReminder(false)
  }

  const handleSubmitReminder = async (senderId: string, smsToken: string) => {
    if (isSubmitting) return // Prevent multiple submissions

    if (!reminderMessage.trim()) {
      toast({
        title: t("error"),
        description: t("enter-message") || "Please enter a message",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true) // Disable the button

    try {
      const sendReminderSMS = httpsCallable(functions, "sendReminderSMS")

      if (isMultipleReminder && selectedRecipients.length > 0) {
        // Send to multiple recipients
        const promises = selectedRecipients.map((recipient) =>
          sendReminderSMS({
            phoneNumber: recipient.phoneNumber,
            sms: reminderMessage,
            senderId,
            smsToken,
            trackingId: recipient.trackingId,
          }),
        )

        const results = await Promise.all(promises)
        const allSuccessful = results.every((response) => response.data?.status === "success")

        if (allSuccessful) {
          // Update tokens based on the last response
          const lastResponse = results[results.length - 1]
          setShopData((prev) => ({
            ...prev,
            tokens: lastResponse.data.newTokens,
            smsReminder: [...(prev.smsReminder || []), ...results.map((r) => r.data.id)],
          }))

          toast({
            title: t("reminders-sent") || "Reminders Sent",
            description:
              t("multiple-reminders-sent-description", { count: selectedRecipients.length }) ||
              `Successfully sent reminders to ${selectedRecipients.length} recipients`,
          })

          resetModalState()
          setRowSelection({})
          table.resetRowSelection()
        } else {
          toast({
            title: t("failed-to-send-some") || "Some Reminders Failed",
            description: t("some-reminders-failed") || "Some reminders could not be sent",
            variant: "destructive",
          })
        }
      } else if (selectedRecipient && selectedTrackingId) {
        // Send to a single recipient
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
            title: t("reminder-sent") || "Reminder Sent",
            description: t("reminder-sent-description") || "Your reminder has been sent successfully",
          })

          resetModalState()
        } else {
          toast({
            title: t("failed-to-send") || "Failed to Send",
            description: response.data?.error || t("unknown-error") || "An unknown error occurred",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: t("error") || "Error",
          description: t("select-recipient-tracking") || "Please select a recipient and tracking ID",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending SMS:", error)
      toast({
        title: t("error-sending-sms") || "Error Sending SMS",
        description: t("try-again-later") || "Please try again later",
        variant: "destructive",
      })
    } finally {
      // Re-enable the button after a short delay
      setTimeout(() => {
        setIsSubmitting(false)
      }, 1000)
    }
  }

  return (
    <div className="space-y-4">
      <TableToolbar
        table={table}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        onSendMultipleReminders={handleSendMultipleReminders}
      />

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
                    <TableCell key={cell.id}>
                      {cell.column.id === "sendReminder" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendReminder(row.getValue("phoneNumber"), row.getValue("trackingId"))}
                        >
                          {t("send-reminder") || "Send Reminder"}
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
                  {t("no-results") || "No results found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination table={table} />

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetModalState()
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isMultipleReminder ? (
                <>
                  <Send className="h-5 w-5 text-primary" />
                  {t("send-reminder") || "Send Reminder"}
                  <Badge className="ml-2 bg-primary text-primary-foreground">{selectedRecipients.length}</Badge>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 text-primary" />
                  {t("send-reminder") || "Send Reminder"}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {isMultipleReminder
                ? t("multiple-reminder-description", { count: selectedRecipients.length }) ||
                  `Send a reminder to ${selectedRecipients.length} selected recipients`
                : t("reminder-description") || "Send a reminder message to this recipient"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {isMultipleReminder && selectedRecipients.length > 0 && (
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{t("selected-recipients") || "Selected Recipients"}:</p>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {selectedRecipients.length} {selectedRecipients.length === 1 ? "recipient" : "recipients"}
                  </Badge>
                </div>
                <div className="max-h-24 overflow-y-auto">
                  {selectedRecipients.map((recipient, index) => (
                    <div key={index} className="text-xs text-muted-foreground mb-1">
                      {recipient.phoneNumber} ({recipient.trackingId})
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reminder" className="text-right">
                {t("message") || "Message"}
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
            <Button variant="outline" onClick={resetModalState}>
              {t("cancel") || "Cancel"}
            </Button>
            <LoadingButton
              onClick={() => handleSubmitReminder(shopData.senderId, shopData.smsToken)}
              loading={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isMultipleReminder ? (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {t("send-to-selected", { count: selectedRecipients.length }) ||
                    `Send to ${selectedRecipients.length} selected`}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {t("send-reminder") || "Send Reminder"}
                </>
              )}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
