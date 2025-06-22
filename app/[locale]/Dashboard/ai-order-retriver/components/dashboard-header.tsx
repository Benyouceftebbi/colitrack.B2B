"use client"

import { CalendarIcon, LogOut, Squirrel, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { MetaLogo } from "./meta-logo"
import { useToast } from "@/hooks/use-toast"
import { useShop } from "@/app/context/ShopContext"
import { useTranslations } from "next-intl"
import FacebookConnect from "./FcebookConnect"

interface DashboardHeaderProps {
  dateRange: {
    from: Date
    to: Date
  }
  onDateRangeChange: (range: { from: Date; to: Date }) => void
  isFacebookConnected: boolean
  showFacebookAuth: () => void
  onDisconnect?: () => void
}

export function DashboardHeader({
  dateRange,
  onDateRangeChange,
  onDisconnect,
}: DashboardHeaderProps) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [logoutStep, setLogoutStep] = useState(1)
  const [confirmDisconnect, setConfirmDisconnect] = useState(false)
  const [confirmDataLoss, setConfirmDataLoss] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const { shopData ,setShopData} = useShop()
  const t = useTranslations("ai-order-retriever")

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true)
    setLogoutStep(1)
    setConfirmDisconnect(false)
    setConfirmDataLoss(false)
    setProgress(0)
  }

  const handleNextStep = () => {
    if (logoutStep === 1 && !confirmDisconnect) {
      toast({
        title: t("confirmationRequired"),
        description: t("confirmDisconnectingConsequences"),
        variant: "destructive",
      })
      return
    }

    if (logoutStep === 2 && !confirmDataLoss) {
      toast({
        title: t("confirmationRequired"),
        description: t("confirmDataLossImplications"),
        variant: "destructive",
      })
      return
    }

    setLogoutStep(logoutStep + 1)
  }

  const handleFinalLogout = () => {
    setIsLoggingOut(true)

    // Simulate a slow logout process
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        toast({
          title: t("loggedOutSuccessfully"),
          description: t("disconnectedFromMeta"),
        })
        setIsLoggingOut(false)
        setIsLogoutDialogOpen(false)

        // Call the onDisconnect callback to update the parent component state
        if (onDisconnect) {
          onDisconnect()
        }
      }
    }, 300)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 p-3 rounded-lg shadow-sm">
            <Squirrel className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t("aiOrderRetriever")}
            </h1>
            <div className="space-y-0.5">
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{t("enhanceParcelCreation")}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{t("fromMetaConversations")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-[140px] justify-start text-left font-normal border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                {format(dateRange.from, "dd/MM")} - {format(dateRange.to, "dd/MM")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    onDateRangeChange(range)
                  }
                }}
                initialFocus
                className="rounded-md border border-indigo-100 dark:border-indigo-800/50"
              />
            </PopoverContent>
          </Popover>

          <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white w-full md:w-auto font-medium">
            {shopData.deliveryCompany}
          </Button>

          {shopData.isFacebookConnected ? (
           <Tooltip>
           <TooltipTrigger asChild>
             <Button
              onClick={handleLogoutClick}
               variant="outline"
               className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 w-full sm:w-auto ml-auto md:ml-0"
             >
               <LogOut className="mr-2 h-5 w-5" />
               Disconnect Facebook
             </Button>
           </TooltipTrigger>
           <TooltipContent>
             This will disable Facebook-related features.
           </TooltipContent>
         </Tooltip>
          ) : (
      <FacebookConnect shopId={shopData.id} setShopData={setShopData} />
          )}
        </div>
      </div>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {logoutStep === 1 && t("disconnectFromMeta")}
              {logoutStep === 2 && t("confirmDataLoss")}
              {logoutStep === 3 && t("finalConfirmation")}
            </DialogTitle>
            <DialogDescription>
              {logoutStep === 1 && t("disconnectingWillDisable")}
              {logoutStep === 2 && t("allPendingRetrievalsLost")}
              {logoutStep === 3 && t("finalChanceToCancel")}
            </DialogDescription>
          </DialogHeader>

          {logoutStep === 1 && (
            <div className="space-y-4 py-4">
              <div className="flex items-start space-x-3">
                <MetaLogo className="h-10 w-10 text-blue-600 dark:text-blue-400 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-medium">{t("connectedToMetaBusiness")}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("accountCurrentlyConnected")}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 mt-4">
                <Checkbox id="confirm-disconnect" checked={confirmDisconnect} onCheckedChange={setConfirmDisconnect} />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="confirm-disconnect"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("understandDisconnecting")}
                  </label>
                  <p className="text-sm text-muted-foreground">{t("needToReconnect")}</p>
                </div>
              </div>
            </div>
          )}

          {logoutStep === 2 && (
            <div className="space-y-4 py-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {t("warningDataLoss")}
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-amber-700 dark:text-amber-300">
                  <li>• {t("pendingOrdersCanceled")}</li>
                  <li>• {t("connectionSettingsReset")}</li>
                  <li>• {t("connectionProcessAgain")}</li>
                  <li>• {t("affectWorkflow")}</li>
                </ul>
              </div>

              <div className="flex items-start space-x-2 mt-4">
                <Checkbox id="confirm-data-loss" checked={confirmDataLoss} onCheckedChange={setConfirmDataLoss} />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="confirm-data-loss"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("understandDataLoss")}
                  </label>
                  <p className="text-sm text-muted-foreground">{t("actionCannotBeUndone")}</p>
                </div>
              </div>
            </div>
          )}

          {logoutStep === 3 && (
            <div className="space-y-4 py-4">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">{t("finalChanceToCancel")}</p>

              {isLoggingOut && (
                <div className="space-y-2">
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">{t("disconnectingFromMeta")}</p>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    {t("doNotCloseWindow", { progress })}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLogoutDialogOpen(false)}
              disabled={isLoggingOut}
            >
              {t("cancel")}
            </Button>

            {logoutStep < 3 ? (
              <Button
                type="button"
                variant="default"
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {t("continue")}
              </Button>
            ) : (
              <Button type="button" variant="destructive" onClick={handleFinalLogout} disabled={isLoggingOut}>
                {isLoggingOut ? t("disconnecting") : t("disconnectFromMeta")}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
