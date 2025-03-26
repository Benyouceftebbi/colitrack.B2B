"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Update the Message type to be parcel-based with message types
type Message = {
  id: string
  trackingId: string
  phoneNumber: string
  status: string
  location: string
  messageTypes: string[] // Array of message types sent for this parcel
  lastStatus: string
  createdAt: Date
}

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "trackingId",
    header: ({ t }) => t("tracking"),
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("trackingId")}</span>,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ t }) => t("recipient"),
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("phoneNumber")}</span>,
  },
  {
    accessorKey: "location",
    header: ({ t }) => t("location"),
    cell: ({ row }) => <span className="text-sm">{row.getValue("location")}</span>,
  },
  {
    accessorKey: "messageTypes",
    header: ({ t }) => t("message-types"),
    cell: ({ row }) => {
      const messageTypes = row.getValue("messageTypes") as string[] | undefined
      return (
        <div className="flex flex-wrap gap-1">
          {messageTypes && messageTypes.length > 0 ? (
            messageTypes.map((type, index) => (
              <Badge
                key={index}
                variant="outline"
                className={
                  type === "Real-Time Tracking"
                    ? "bg-blue-500/10 text-blue-500"
                    : type === "Delivery Alert"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-amber-500/10 text-amber-500"
                }
              >
                {type}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">No messages</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "lastStatus",
    header: ({ t }) => t("status"),
    cell: ({ row, t }) => {
      const status = row.getValue("lastStatus") as string
      return (
        <Badge
          variant="outline"
          className={
            status === "delivered"
              ? "bg-emerald-500/10 text-emerald-500"
              : status === "shipped"
                ? "bg-yellow-500/10 text-yellow-500"
                : status === "delivery-failed"
                  ? "bg-red-500/10 text-red-500"
                  : "bg-yellow-500/10 text-yellow-500"
          }
        >
          {t(`statusLabels.${status}`)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ t }) => t("sent"),
    cell: ({ row }) => {
      const createdAtTimestamp = row.getValue("createdAt")
      const date = createdAtTimestamp instanceof Date ? createdAtTimestamp : new Date(createdAtTimestamp.toDate())
      return <span className="text-sm text-muted-foreground">{formatDistanceToNow(date, { addSuffix: true })}</span>
    },
    enableSorting: true,
  },
  {
    id: "sendReminder",
    header: ({ t }) => (
      <div className="flex items-center gap-2">
        {t("send-reminder")}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("reminder-tooltip")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    cell: ({ t }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // This will be handled in the DataTable component
        }}
      >
        {t("send-reminder")}
      </Button>
    ),
  },
]

