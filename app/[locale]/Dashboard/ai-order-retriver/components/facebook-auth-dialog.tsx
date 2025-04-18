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
import { MetaLogo } from "./meta-logo"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FacebookAuthDialogProps {
  isOpen: boolean
  onClose: () => void
  onAuthenticate?: () => void
  onRequestSent: () => void
  hasRequestedBeta?: boolean // Add this prop
}

// Update the component to use the new prop
export function FacebookAuthDialog({
  isOpen,
  onClose,
  onAuthenticate,
  onRequestSent,
  hasRequestedBeta = false,
}: FacebookAuthDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleRequestAccess = async () => {
    if (isSubmitting) return // Prevent multiple submissions

    setIsSubmitting(true)

    try {
      console.log("Submitting beta access request...")
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Only set isSubmitted to true after successful API call
      setIsSubmitted(true)
      console.log("Request submitted successfully")

      toast({
        title: "Request submitted successfully",
        description: "We'll contact you soon with beta access information.",
        variant: "default",
      })

      // Notify parent component that request has been sent - ONLY after success
      onRequestSent()

      // Reset after 3 seconds and close dialog
      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Error submitting beta request:", error)

      toast({
        title: "Request failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      })

      // Make sure to reset the submitting state
      setIsSubmitting(false)
    }
  }

  // If the user has already requested beta access, show a different message
  if (hasRequestedBeta) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md dark:border-gray-700">
          <DialogHeader>
            <div className="flex items-center justify-center gap-2">
              <DialogTitle className="text-xl font-bold text-center">AI Order Retriever</DialogTitle>
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                BETA
              </Badge>
            </div>
            <DialogDescription className="text-center">Your beta access request is pending</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full">
              <Sparkles className="h-12 w-12 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-lg font-medium text-center">Request Pending</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Your request for beta access has been submitted and is currently under review. We'll notify you when your
              access is approved.
            </p>
          </div>

          <DialogFooter>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Original dialog for users who haven't requested beta access yet
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md dark:border-gray-700">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2">
            <DialogTitle className="text-xl font-bold text-center">AI Order Retriever</DialogTitle>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              BETA
            </Badge>
          </div>
          <DialogDescription className="text-center">
            Request access to automatically retrieve orders from your Meta conversations
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-center">Request Submitted!</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Thank you for your interest. Our team will contact you shortly with information about joining the beta
              program.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-4 space-y-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-full">
                <MetaLogo className="h-10 w-10 text-white" />
              </div>

              <div className="text-center space-y-3 max-w-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI Order Retriever automatically scans your Facebook and Instagram messages to identify and
                  extract order information.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  This powerful feature helps you save time by automatically processing orders from your social media
                  conversations.
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  This feature is currently in beta and available by request only.
                </p>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                onClick={handleRequestAccess}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Beta Access"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}





















/*
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
import { MetaLogo } from "./meta-logo"

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
          <DialogTitle className="text-xl font-bold text-center">Connect to Meta</DialogTitle>
          <DialogDescription className="text-center">
            Connect your Meta account to enable automatic order retrieval
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-full">
            <MetaLogo className="h-12 w-12 text-white" />
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
            <MetaLogo className="h-4 w-4" />
            Connect with Meta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

*/