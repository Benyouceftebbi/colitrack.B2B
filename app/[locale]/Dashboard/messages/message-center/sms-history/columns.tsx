"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"

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
  deliveryType: string
}

export const columns: ColumnDef<Message>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "messageTypes",
    header: ({ t }) => t("message-types"),
    cell: ({ row, t }) => {
      const messageTypes = row.getValue("messageTypes") as string[] | undefined
      return (
        <div className="flex flex-wrap gap-1">
          {messageTypes && messageTypes.length > 0 ? (
            messageTypes.map((type, index) => (
              <Badge
                key={index}
                variant="outline"
                className={
                  type === "shipped" || type === "out-for-delivery" || type === "ready-for-pickup"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-emerald-500/10 text-emerald-500"
                  //?
                  //: "bg-amber-500/10 text-amber-500"
                }
              >
                {t(`sms.${type}`)}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">No messages sent yet</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "deliveryType",
    header: ({ t }) => t("deliveryTypes.delivery"),
    cell: ({ row, t }) => {
      const deliveryType = row.getValue("deliveryType") as string
      const icon = deliveryType === "stopdesk" ? "🏢" : deliveryType === "domicile" ? "🏠" : "❓" // Default icon for unknown types
      return (
        <span className="flex items-center">
          <span className="mr-1">{icon}</span>
          {t(`deliveryTypes.${deliveryType}`)}
        </span>
      )
    },
  },
  {
    accessorKey: "lastUpdated",
    header: ({ t }) => t("lastUpdated"),
    cell: ({ row, locale }) => {
      const createdAtTimestamp = row.getValue("lastUpdated")
      if (!createdAtTimestamp) return null

      // Handle both Date objects and Firestore Timestamps
      let date
      if (createdAtTimestamp instanceof Date) {
        date = createdAtTimestamp
      } else if (createdAtTimestamp?.toDate) {
        // Handle Firestore Timestamp
        date = createdAtTimestamp.toDate()
      } else if (typeof createdAtTimestamp === "string") {
        // Handle string dates
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
