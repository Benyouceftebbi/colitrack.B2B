"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

// Update the Message type to be SMS-based
type SMSMessage = {
  id: string
  phoneNumber: string
  smsStatus: string // e.g., "sent", "delivered", "failed"
  content: string
  createdAt: Date
}

export const columns: ColumnDef<SMSMessage>[] = [
  {
    accessorKey: "id",
    header: ({ t }) => t("message-id"),
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ t }) => t("phone-number"),
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("phoneNumber")}</span>,
  },
  {
    accessorKey: "smsStatus",
    header: ({ t }) => t("sms-status"),
    cell: ({ row, t }) => {
      const status = row.getValue("smsStatus") as string
      return (
        <Badge
          variant="outline"
          className={
            status === "delivered"
              ? "bg-emerald-500/10 text-emerald-500"
              : status === "sent"
                ? "bg-blue-500/10 text-blue-500"
                : status === "failed"
                  ? "bg-red-500/10 text-red-500"
                  : "bg-yellow-500/10 text-yellow-500" // Default for other statuses
          }
        >
          {t(`smsStatusLabels.${status}`) || status} {/* Assuming translation keys like smsStatusLabels.sent */}
        </Badge>
      )
    },
  },
  {
    accessorKey: "content",
    header: ({ t }) => t("content"),
    cell: ({ row }) => <span className="text-sm line-clamp-2">{row.getValue("content")}</span>,
  },
  {
    accessorKey: "createdAt",
    header: ({ t }) => t("date"),
    cell: ({ row, locale }) => {
      const createdAtTimestamp = row.getValue("createdAt")
      if (!createdAtTimestamp) return null

      let date
      if (createdAtTimestamp instanceof Date) {
        date = createdAtTimestamp
      } else if (createdAtTimestamp?.toDate) {
        date = createdAtTimestamp.toDate()
      } else if (typeof createdAtTimestamp === "string") {
        date = new Date(createdAtTimestamp)
      } else {
        console.warn("Invalid date format:", createdAtTimestamp)
        return null
      }

      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true, locale: locale })}
        </span>
      )
    },
    enableSorting: true,
  },
]
