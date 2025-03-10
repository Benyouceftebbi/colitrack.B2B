"use client"

import type React from "react"

import { useState } from "react"
import { Download, ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { SentMessage } from "../types"
import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type SortField = "campaignName" | "date" | "recipients" | "messageCount" | "totalCost" | "content" | "status"
type SortDirection = "asc" | "desc"

type MessageHistoryProps = {
  sentMessages: SentMessage[]
  exportToExcel: (message: SentMessage) => void
}

export function MessageHistory({ sentMessages, exportToExcel }: MessageHistoryProps) {
  const t = useTranslations("retargeting")
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortedMessages = () => {
    return [...sentMessages].sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case "campaignName":
          comparison = a.campaignName.localeCompare(b.campaignName)
          break
        case "date":
          comparison = a.date.toDate().getTime() - b.date.toDate().getTime()
          break
        case "recipients":
          comparison = a.recipients.length - b.recipients.length
          break
        case "messageCount":
          comparison = a.messageCount - b.messageCount
          break
        case "totalCost":
          comparison = a.totalCost - b.totalCost
          break
        case "content":
          comparison = a.content.localeCompare(b.content)
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 font-medium">
            {t("pending")}
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 font-medium">
            {t("sent")}
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 font-medium">
            {t("failed")}
          </Badge>
        )
      default:
        return null
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const sortedMessages = getSortedMessages()

  if (sentMessages.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>{t("noMessagesTitle")}</CardTitle>
       {/*   <CardDescription>{t("noMessagesDescription")}</CardDescription>*/}
        </CardHeader>
      </Card>
    )
  }

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null

    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4 inline" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 inline" />
    )
  }

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead
      className="font-semibold cursor-pointer hover:text-primary transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center">
        {children}
        {renderSortIcon(field)}
      </div>
    </TableHead>
  )

  return (
    <Card className="overflow-hidden border">
  
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <SortableHeader field="campaignName">{t("campaignName")}</SortableHeader>
                <SortableHeader field="date">{t("date")}</SortableHeader>
                <SortableHeader field="recipients">
                  <div className="text-right w-full">{t("recipients")}</div>
                </SortableHeader>
                <SortableHeader field="messageCount">
                  <div className="text-right w-full">{t("messageCount")}</div>
                </SortableHeader>
                <SortableHeader field="totalCost">
                  <div className="text-right w-full">{t("totalCost")}</div>
                </SortableHeader>
                <SortableHeader field="content">{t("content")}</SortableHeader>
                <SortableHeader field="status">{t("status")}</SortableHeader>
                <TableHead className="font-semibold">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMessages.map((msg) => (
                <TableRow key={msg.id} className="hover:bg-muted/30 transition-colors border-b last:border-b-0">
                  <TableCell className="font-medium">{msg.campaignName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(msg.date.toDate()).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{msg.recipients.length}</TableCell>
                  <TableCell className="text-right">{msg.messageCount}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(msg.totalCost)}</TableCell>
                  <TableCell className="max-w-xs">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="truncate max-w-[200px]">{msg.content}</div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-md">
                          <p>{msg.content}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{getStatusBadge(msg.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportToExcel(msg)}
                      className="transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {t("export")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

