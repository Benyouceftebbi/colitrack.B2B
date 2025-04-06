"use client"

import { CalendarIcon, LogOut, Squirrel, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  isFacebookConnected,
  showFacebookAuth,
  onDisconnect,
}: DashboardHeaderProps) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [logoutStep, setLogoutStep] = useState(1)
  const [confirmDisconnect, setConfirmDisconnect] = useState(false)
  const [confirmDataLoss, setConfirmDataLoss] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

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
        title: "Confirmation required",
        description: "Please confirm that you understand the consequences of disconnecting",
        variant: "destructive",
      })
      return
    }

    if (logoutStep === 2 && !confirmDataLoss) {
      toast({
        title: "Confirmation required",
        description: "Please confirm that you understand the data loss implications",
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
          title: "Logged out successfully",
          description: "You have been disconnected from Meta. Auto-retrieve is now disabled.",
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
              AI Order Retriever
            </h1>
            <div className="space-y-0.5">
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Enhance your parcels creation experience with automated order retrieval
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                from your Meta conversations and append them all in one click to your shipping company
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-[280px] justify-start text-left font-normal border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                {format(dateRange.from, "MM/dd/yyyy")} - {format(dateRange.to, "MM/dd/yyyy")}
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
            Yalidin Express
          </Button>

          {isFacebookConnected ? (
            <div className="flex items-center gap-3 ml-auto md:ml-0 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  SA
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SabyAnge Fashion</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogoutClick}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 flex items-center gap-1.5 px-2 h-8"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-xs font-medium">Disconnect</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={showFacebookAuth}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 w-full sm:w-auto ml-auto md:ml-0"
            >
              <MetaLogo className="mr-2 h-4 w-4" />
              Connect Meta
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {logoutStep === 1 && "Disconnect from Meta?"}
              {logoutStep === 2 && "Confirm Data Loss"}
              {logoutStep === 3 && "Final Confirmation"}
            </DialogTitle>
            <DialogDescription>
              {logoutStep === 1 && "Disconnecting will disable automatic order retrieval from your Meta conversations."}
              {logoutStep === 2 &&
                "All pending retrievals will be lost and you'll need to reconnect to restore functionality."}
              {logoutStep === 3 &&
                "This is your final chance to cancel. Disconnection will take some time to complete."}
            </DialogDescription>
          </DialogHeader>

          {logoutStep === 1 && (
            <div className="space-y-4 py-4">
              <div className="flex items-start space-x-3">
                <MetaLogo className="h-10 w-10 text-blue-600 dark:text-blue-400 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-medium">Connected to Meta Business</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your account is currently connected and actively retrieving orders from Facebook Messenger and
                    Instagram.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 mt-4">
                <Checkbox id="confirm-disconnect" checked={confirmDisconnect} onCheckedChange={setConfirmDisconnect} />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="confirm-disconnect"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I understand that disconnecting will stop automatic order retrieval
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You'll need to reconnect your Meta account to restore this functionality
                  </p>
                </div>
              </div>
            </div>
          )}

          {logoutStep === 2 && (
            <div className="space-y-4 py-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Warning: Data Loss
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-amber-700 dark:text-amber-300">
                  <li>• Any pending order retrievals will be canceled</li>
                  <li>• Your connection settings will be reset</li>
                  <li>• You'll need to go through the connection process again</li>
                  <li>• This may affect your order processing workflow</li>
                </ul>
              </div>

              <div className="flex items-start space-x-2 mt-4">
                <Checkbox id="confirm-data-loss" checked={confirmDataLoss} onCheckedChange={setConfirmDataLoss} />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="confirm-data-loss"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I understand and accept the data loss implications
                  </label>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone and may require manual intervention
                  </p>
                </div>
              </div>
            </div>
          )}

          {logoutStep === 3 && (
            <div className="space-y-4 py-4">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                This is your final chance to cancel the disconnection process. Are you absolutely sure you want to
                proceed?
              </p>

              {isLoggingOut && (
                <div className="space-y-2">
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    Disconnecting from Meta services...
                  </p>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    Please do not close this window ({progress}%)
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
              Cancel
            </Button>

            {logoutStep < 3 ? (
              <Button
                type="button"
                variant="default"
                onClick={handleNextStep}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Continue
              </Button>
            ) : (
              <Button type="button" variant="destructive" onClick={handleFinalLogout} disabled={isLoggingOut}>
                {isLoggingOut ? "Disconnecting..." : "Disconnect from Meta"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

