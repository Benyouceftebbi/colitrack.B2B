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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TableToolbar } from "./table-toolbar"
import { TablePagination } from "./table-pagination"
import { ArrowUpDown } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [reminderMessage, setReminderMessage] = React.useState("")
  const [selectedRecipient, setSelectedRecipient] = React.useState<string | null>(null)
  const table = useReactTable({
    data,
    columns,
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
  const handleSendReminder = (recipient: string) => {
    setSelectedRecipient(recipient)
    setIsModalOpen(true)
  }

  const handleSubmitReminder = () => {
    if (reminderMessage.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a message.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically send the reminder message to your backend
    console.log(`Sending reminder to ${selectedRecipient}: ${reminderMessage}`)

    toast({
      title: "Reminder Sent",
      description: "Your reminder has been sent successfully. 15 tokens have been deducted.",
    })

    setIsModalOpen(false)
    setReminderMessage("")
    setSelectedRecipient(null)
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
                          onClick={() => handleSendReminder(row.getValue("phoneNumber"))}
                        >
                          Send Reminder
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
                  No results found.
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
            <DialogTitle>Send Reminder</DialogTitle>
            <DialogDescription>
              Enter your reminder message below. This will cost 15 tokens. Inappropriate content will not be sent, and
              you will still lose the tokens.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reminder" className="text-right">
                Message
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
              Cancel
            </Button>
            <Button onClick={handleSubmitReminder}>Send Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}