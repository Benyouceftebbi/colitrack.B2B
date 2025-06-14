"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Lightbulb, Wand2, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PromptBuilderModalProps {
  isOpen: boolean
  onClose: () => void
  currentPrompt: string
  onPromptGenerated: (newPrompt: string) => void
}



export function PromptBuilderModal({ isOpen, onClose, currentPrompt, onPromptGenerated }: PromptBuilderModalProps) {
  const [description, setDescription] = useState("")
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setDescription(currentPrompt) // Pre-fill with current prompt if any
      setGeneratedPrompt("")
      setSelectedStyle(null)
    }
  }, [isOpen, currentPrompt])

  const handleGeneratePrompt = () => {
    setIsLoading(true)
    let basePrompt = description.trim()
    if (!basePrompt) {
      basePrompt = "A stunning image" // Default if description is empty
    }

    let enhancedPrompt = basePrompt
    if (selectedStyle) {
      enhancedPrompt += `, ${selectedStyle.toLowerCase()} style`
    }

    // Add some common enhancers if not already present
    if (!enhancedPrompt.toLowerCase().includes("detailed")) {
      enhancedPrompt += ", highly detailed"
    }
    if (
      !enhancedPrompt.toLowerCase().includes("resolution") &&
      !enhancedPrompt.toLowerCase().includes("4k") &&
      !enhancedPrompt.toLowerCase().includes("8k")
    ) {
      enhancedPrompt += ", 4k resolution"
    }
    if (!enhancedPrompt.toLowerCase().includes("lighting") && Math.random() > 0.5) {
      enhancedPrompt += ", cinematic lighting"
    }

    // Simulate API call / processing time
    setTimeout(() => {
      setGeneratedPrompt(enhancedPrompt)
      setIsLoading(false)
    }, 700)
  }

  const handleUsePrompt = () => {
    onPromptGenerated(generatedPrompt)
    onClose()
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Prompt Assistant
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 py-4">
          <div>
            <Label htmlFor="description" className="text-base font-semibold">
              Describe your vision
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              What are the key elements, subject, mood, and overall feel you're aiming for?
            </p>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., A majestic lion on a rocky cliff overlooking a savanna at sunset"
              className="h-28 resize-none"
            />
          </div>

          <div>
          
          </div>

          <Button onClick={handleGeneratePrompt} disabled={isLoading || !description.trim()} className="w-full">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Generate Enhanced Prompt
              </div>
            )}
          </Button>

          {generatedPrompt && (
            <div>
              <Label htmlFor="generatedPrompt" className="text-base font-semibold">
                Suggested Prompt
              </Label>
              <div className="mt-2 p-3 bg-muted rounded-md border relative">
                <p className="text-sm text-foreground whitespace-pre-wrap">{generatedPrompt}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyPrompt}
                  className="absolute top-2 right-2 h-7 w-7"
                  aria-label="Copy prompt"
                >
                  {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="mt-auto pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleUsePrompt} disabled={!generatedPrompt || isLoading}>
            Use This Prompt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
