"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format, formatDistanceToNow } from "date-fns"

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
    accessorKey: "status",
    header: ({ t }) => t("sms-status"),
    cell: ({ row, t }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant="outline"
          className={ status === "failed"
                  ? "bg-red-500/10 text-red-500"
                  : "bg-emerald-500/10 text-emerald-500" // Default for other statuses
          }
        >
          { status} {/* Assuming translation keys like smsStatusLabels.sent */}
        </Badge>
      )
    },
  },
  {
    accessorKey: "senderId",
    header: ({ t }) =>"senderID",
    cell: ({ row, t }) => {
      const senderId = row.getValue("senderId") as string
      return (
        <Badge
          variant="outline"
          className={ 
                  "bg-emerald-500/10 text-emerald-500" // Default for other senderIdes
          }
        >
          { senderId} {/* Assuming translation keys like smsStatusLabels.sent */}
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
    accessorKey: "date",
    header: ({ t }) => t("date"),
    cell: ({ row, locale }) => {
      const createdAtTimestamp = row.getValue("date");
      if (!createdAtTimestamp) return null;
  
      let date: Date | null = null;
      if (createdAtTimestamp instanceof Date) {
        date = createdAtTimestamp;
      } else if (createdAtTimestamp?.toDate) {
        date = createdAtTimestamp.toDate(); // Firestore Timestamp
      } else if (typeof createdAtTimestamp === "string") {
        const d = new Date(createdAtTimestamp);
        date = isNaN(+d) ? null : d;
      }
  
      if (!date) return null;
  
      const formatted = format(date, "dd-MM-yyyy HH:mm", { locale });
      return <span className="text-sm text-muted-foreground">{formatted}</span>;
    },
    enableSorting: true,
  }
]
