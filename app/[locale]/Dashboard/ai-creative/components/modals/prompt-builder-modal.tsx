"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Lightbulb, Wand2, Copy, Check } from "lucide-react"
import { httpsCallable } from "firebase/functions"
import { functions } from "@/firebase/firebase"
import { useShop } from "@/app/context/ShopContext"
import { useTranslations } from "next-intl"

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
  const { shopData, setShopData } = useShop()
  const t = useTranslations("creativeAi")
  useEffect(() => {
    if (isOpen) {
      setDescription(currentPrompt) // Pre-fill with current prompt if any
      setGeneratedPrompt("")
      setSelectedStyle(null)
    }
  }, [isOpen, currentPrompt])

  const handleGeneratePrompt = async () => {
    setIsLoading(true)
    const basePrompt = description.trim()

    const generateAdBrief = httpsCallable(functions, "promptAdEnhancer")
    const result = await generateAdBrief({
      userPrompt: basePrompt,
      shopId: shopData.id,
    })

    if (result.data.success) {
      setGeneratedPrompt(result.data.prompt)
      //set tokens {result.data.tokens}
      setShopData((prev: any) => ({
        ...prev,
        tokens: result.data.tokens, // assumes `tokens` is returned in response
      }))
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }

    // Simulate API call / processing time
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
            {t("promptAssistant")} - 50 TKN
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 py-4">
          <div>
            <Label htmlFor="description" className="text-base font-semibold">
              {t("describeVision")}
            </Label>
            <p className="text-sm text-muted-foreground mb-2">{t("describeVisionHelperText")}</p>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., A majestic lion on a rocky cliff overlooking a savanna at sunset"
              className="h-28 resize-none"
            />
          </div>

          <div></div>

          <Button onClick={handleGeneratePrompt} disabled={isLoading || !description.trim()} className="w-full">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                {t("generating")}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                {t("generateEnhancedPrompt")}
              </div>
            )}
          </Button>

          {generatedPrompt && (
            <div>
              <Label htmlFor="generatedPrompt" className="text-base font-semibold">
                {t("suggestedPrompt")}
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
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button onClick={handleUsePrompt} disabled={!generatedPrompt || isLoading}>
            {t("useThisPrompt")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
