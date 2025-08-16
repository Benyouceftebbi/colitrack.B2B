"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format, formatDistanceToNow } from "date-fns"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

// Update the Message type to be SMS-based
type SMSMessage = {
  id: string
  phoneNumber: string
  smsStatus: string // e.g., "sent", "delivered", "failed"
  content: string
  createdAt: Date
}
function calculateSmsUnits(text: string) {
  let total = 0;
  for (let char of text) {
    const code = char.charCodeAt(0);
    if (char === " ") {
      total += 1;
    } else if (
      (code >= 0x0600 && code <= 0x06ff) ||
      (code >= 0x0750 && code <= 0x077f)
    ) {
      total += 2; // Arabic characters
    } else {
      total += 1; // French, numbers, etc.
    }
  }
  return total;
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
    size: 250,
    maxSize: 300,
    cell: ({ row }) => {
      const text = row.getValue("content") as string;
  
      return (
        <HoverCard openDelay={150}>
          <HoverCardTrigger asChild>
            <span className="block text-sm truncate max-w-[250px] cursor-help">
              {text}
            </span>
          </HoverCardTrigger>
          <HoverCardContent
            side="top" // or "right"
            align="center"
            className="whitespace-pre-wrap text-sm leading-6"
          >
            {text}
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    id: "count",
    header: ({ t }) => t("count"),
    cell: ({ row }) => {
      const text = row.getValue("content") as string;
      const units = calculateSmsUnits(text);
  
      // SMS rules: 160 chars max = 1 SMS, then 153 chars per segment
      const smsCount = units <= 160 ? 1 : Math.ceil(units / 153);
  
      return <span className="text-sm font-medium">{smsCount}</span>;
    },
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
