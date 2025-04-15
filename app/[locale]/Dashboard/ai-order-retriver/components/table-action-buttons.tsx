"use client"

import { useMemo } from "react"

import type React from "react"

import { useState, useCallback, memo } from "react"
import { Download, TruckIcon, HelpCircle, RefreshCw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LearnMoreDialog } from "./learn-more-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface TableActionButtonsProps {
  onExcelExport: () => void
  onShippingExport: () => void
  selectedCount: number
  isRetrieving: boolean
  isExporting?: boolean
  isFacebookConnected: boolean
  showFacebookAuth: () => void
  validationStatus?: { valid: boolean; invalidCount: number }
}

// Memoize the tooltip content to prevent unnecessary re-renders
const ValidationTooltipContent = memo(function ValidationTooltipContent({
  invalidCount,
  selectedCount,
}: {
  invalidCount: number
  selectedCount: number
}) {
  return (
    <TooltipContent className="max-w-xs">
      <p>
        {invalidCount} of {selectedCount} selected orders have validation issues:
      </p>
      <ul className="mt-1 list-disc list-inside text-sm">
        <li>Missing or invalid region data</li>
        <li>Invalid delivery type for the selected commune</li>
      </ul>
      <p className="mt-1 text-sm">
        {invalidCount === selectedCount
          ? "Please fix these issues before exporting."
          : "Only valid orders will be exported."}
      </p>
    </TooltipContent>
  )
})

// Use memo to prevent unnecessary re-renders
export const TableActionButtons = memo(function TableActionButtons({
  onExcelExport,
  onShippingExport,
  selectedCount,
  isRetrieving,
  isExporting = false,
  isFacebookConnected,
  showFacebookAuth,
  validationStatus = { valid: true, invalidCount: 0 },
}: TableActionButtonsProps) {
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  const hasInvalidOrders = !validationStatus.valid && validationStatus.invalidCount > 0

  const handleLearnMoreOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLearnMoreOpen(true)
  }, [])

  const handleLearnMoreClose = useCallback(() => {
    setIsLearnMoreOpen(false)
  }, [])

  // Memoize the badge component
  const ConnectionBadge = useMemo(() => {
    if (!isFacebookConnected) return null

    return (
      <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 flex items-center gap-1.5 py-1.5">
        <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></div>
        {isRetrieving ? (
          <span className="flex items-center">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            Retrieving Orders...
          </span>
        ) : (
          "Auto-Retrieve Active"
        )}
      </Badge>
    )
  }, [isFacebookConnected, isRetrieving])

  // Memoize the export button
  const ExportButton = useMemo(() => {
    return (
      <Button
        onClick={onShippingExport}
        variant={selectedCount > 0 ? "default" : "outline"}
        className={`w-full sm:w-auto ${
          selectedCount > 0
            ? hasInvalidOrders
              ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 dark:text-white"
              : "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
            : ""
        }`}
        disabled={
          isExporting || selectedCount === 0 || (hasInvalidOrders && validationStatus.invalidCount === selectedCount)
        }
      >
        {isExporting ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <TruckIcon className="mr-2 h-4 w-4" />
            Export to Shipping Provider
          </>
        )}
        {selectedCount > 0 && !isExporting && (
          <>
            <span
              className={`ml-2 ${
                hasInvalidOrders
                  ? "bg-white dark:bg-gray-200 text-amber-600 dark:text-amber-700"
                  : "bg-white dark:bg-gray-200 text-green-600 dark:text-green-700"
              } rounded-full px-2 py-0.5 text-xs font-bold`}
            >
              {selectedCount - validationStatus.invalidCount}/{selectedCount}
            </span>
            {hasInvalidOrders && <AlertTriangle className="ml-1 h-4 w-4 text-white dark:text-gray-200" />}
          </>
        )}
      </Button>
    )
  }, [selectedCount, hasInvalidOrders, isExporting, onShippingExport, validationStatus])

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex items-center">
          {ConnectionBadge}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 h-9 w-9"
                  onClick={handleLearnMoreOpen}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Learn more about automatic retrieval</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Learn how automatic retrieval works</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button onClick={onExcelExport} variant="outline" className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Excel Export
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{ExportButton}</div>
            </TooltipTrigger>
            {hasInvalidOrders && (
              <ValidationTooltipContent invalidCount={validationStatus.invalidCount} selectedCount={selectedCount} />
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      <LearnMoreDialog isOpen={isLearnMoreOpen} onClose={handleLearnMoreClose} />
    </>
  )
})
