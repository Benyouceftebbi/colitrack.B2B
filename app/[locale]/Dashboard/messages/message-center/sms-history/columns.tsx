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
    header: ({ t }) => t("tracking"),
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("trackingId")}</span>,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ t }) => t("recipient"),
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("phoneNumber")}</span>,
  },
  {
    accessorKey: "type",
    header: ({ t }) => t("template"),
    cell: ({ row, t }) => {
      const template = row.getValue("type") as string
      return (
        <Badge variant="outline" className="capitalize">
{t(`templates.${template?.replace("_", "-")}`, { defaultValue: template || "N/A" })}
        </Badge>
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
                : "bg-yellow-500/10 text-yellow-500" // <-- Added default case to prevent syntax error
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