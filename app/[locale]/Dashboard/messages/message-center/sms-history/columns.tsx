import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Message = {
  id: string
  trackingId: string
  phoneNumber: string
  type: string
  lastStatus: string
  createdAt: Date
}

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "trackingId",
    header: "Tracking #",
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("trackingId")}</span>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Recipient",
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("phoneNumber")}</span>,
  },
  {
    accessorKey: "type",
    header: "Template",
    cell: ({ row }) => {
      const template = row.getValue("type") as string
      return (
        <Badge variant="outline" className="capitalize">
          {template.replace("_", " ")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("lastStatus") as string
      return (
        <Badge
          variant="outline"
          className={
            status === "delivered"
              ? "bg-emerald-500/10 text-emerald-500"
              : status === "shipped"
                ? "bg-yellow-500/10 text-yellow-500"
                : "bg-red-500/10 text-red-500"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Sent",
    cell: ({ row }) => {
      const createdAtTimestamp = row.getValue("createdAt");
  
      // Convert Firestore Timestamp to Date
      const date = createdAtTimestamp?.toDate
        ? createdAtTimestamp.toDate()
        : new Date(createdAtTimestamp);
  
      return (
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
      );
    },
    enableSorting: true,
  },
  {
    id: "sendReminder",
    header: () => (
      <div className="flex items-center gap-2">
        Send Reminder
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Send a reminder SMS to the recipient. Costs 15 tokens per message.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // This will be handled in the DataTable component
        }}
      >
        Send Reminder
      </Button>
    ),
  },
]

