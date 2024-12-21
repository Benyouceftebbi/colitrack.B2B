import { type ColumnDef } from "@tanstack/react-table"
import { type Message } from "@/types/message"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "trackingNumber",
    header: "Tracking #",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("trackingNumber")}</span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.getValue("recipient")}</span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "template",
    header: "Template",
    cell: ({ row }) => {
      const template = row.getValue("template") as string
      return (
        <Badge variant="outline" className="capitalize">
          {template.replace("_", " ")}
        </Badge>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant="outline"
          className={
            status === "delivered"
              ? "bg-emerald-500/10 text-emerald-500"
              : status === "pending"
              ? "bg-yellow-500/10 text-yellow-500"
              : "bg-red-500/10 text-red-500"
          }
        >
          {status}
        </Badge>
      )
    },
    enableSorting: true,
    filterFn: "equals",
  },
  {
    accessorKey: "sentAt",
    header: "Sent",
    cell: ({ row }) => {
      const date = new Date(row.getValue("sentAt"))
      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
      )
    },
    enableSorting: true,
  },
]