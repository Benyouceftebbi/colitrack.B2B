"use client"

import * as React from "react"
import { Loader2, Upload, X } from 'lucide-react'
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"

export function FeedbackDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const t = useTranslations("navigation")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [images, setImages] = React.useState<File[]>([])
  const [imageUrls, setImageUrls] = React.useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setImages((prev) => [...prev, ...newFiles])

      // Create preview URLs
      const newUrls = newFiles.map((file) => URL.createObjectURL(file))
      setImageUrls((prev) => [...prev, ...newUrls])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imageUrls[index])
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call with a timeout
   


      const formData = new FormData(e.currentTarget)
      const comment = formData.get("comment") as string
      //const uploadFeedback=httpsCallable(functions,"getFeedback")
      //await uploadFeedback({comment,images})
      // Log the form data to console (for demonstration purposes)
      console.log({
        comment,
        images: images.map((img) => img.name),
      })

      toast({
        title: t("feedbackSubmitted"),
        description: t("thankYouFeedback"),
      })

      // Reset form and close dialog
      e.currentTarget.reset()
      setImages([])
      setImageUrls([])
      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: t("error"),
        description: t("feedbackSubmitError"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("submitFeedback")}</DialogTitle>
            <DialogDescription>{t("shareThoughts")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="comment">{t("yourFeedback")}</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder={t("tellUsWhatYouThink")}
                required
                className="min-h-[120px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feedback-images">{t("attachImagesOptional")}</Label>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="feedback-images"
                  className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {t("chooseFiles")}
                </Label>
                <Input
                  id="feedback-images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {imageUrls.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative rounded-md border">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={t("previewImage", { index: index + 1 })}
                        className="h-20 w-full rounded-md object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("submitFeedback")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
