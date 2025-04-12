"use client"

import { useState } from "react"
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
  isFacebookConnected: boolean
  showFacebookAuth: () => void
  validationStatus?: { valid: boolean; invalidCount: number }
}

export function TableActionButtons({
  onExcelExport,
  onShippingExport,
  selectedCount,
  isRetrieving,
  isFacebookConnected,
  showFacebookAuth,
  validationStatus = { valid: true, invalidCount: 0 },
}: TableActionButtonsProps) {
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  const hasInvalidOrders = !validationStatus.valid && validationStatus.invalidCount > 0

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex items-center">
          {isFacebookConnected && (
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
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 h-9 w-9"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLearnMoreOpen(true)
                  }}
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
              <div>
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
                >
                  <TruckIcon className="mr-2 h-4 w-4" />
                  Export to Shipping Provider
                  {selectedCount > 0 && (
                    <>
                      <span
                        className={`ml-2 ${
                          hasInvalidOrders
                            ? "bg-white dark:bg-gray-200 text-amber-600 dark:text-amber-700"
                            : "bg-white dark:bg-gray-200 text-green-600 dark:text-green-700"
                        } rounded-full px-2 py-0.5 text-xs font-bold`}
                      >
                        {selectedCount}
                      </span>
                      {hasInvalidOrders && <AlertTriangle className="ml-1 h-4 w-4 text-white dark:text-gray-200" />}
                    </>
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            {hasInvalidOrders && (
              <TooltipContent className="max-w-xs">
                <p>
                  {validationStatus.invalidCount} of {selectedCount} selected orders have invalid region data and cannot
                  be exported. These orders will be skipped.
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      <LearnMoreDialog isOpen={isLearnMoreOpen} onClose={() => setIsLearnMoreOpen(false)} />
    </>
  )
}
