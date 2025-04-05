"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Facebook } from "lucide-react"

interface FacebookAuthDialogProps {
  isOpen: boolean
  onClose: () => void
  onAuthenticate: () => void
}

export function FacebookAuthDialog({ isOpen, onClose, onAuthenticate }: FacebookAuthDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Connect to Facebook</DialogTitle>
          <DialogDescription className="text-center">
            Connect your Facebook account to enable automatic order retrieval
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-full">
            <Facebook className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="text-center space-y-2 max-w-sm">
            <p className="text-gray-700 dark:text-gray-300">
              To automatically retrieve orders from your Facebook and Instagram messages, we need permission to access
              your business conversations.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              We only scan for order-related messages and never post on your behalf.
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 gap-2"
            onClick={onAuthenticate}
          >
            <Facebook className="h-4 w-4" />
            Connect with Facebook
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

