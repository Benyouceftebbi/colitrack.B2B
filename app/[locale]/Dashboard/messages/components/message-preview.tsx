import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'

interface Feature {
  id: string
  name: string
}

interface MessagePreviewProps {
  features: Feature[]
  previewMessage: string | null
  activePreviewTab: string | null
  previewDeliveryMessage: (stage: string) => void
}

export function MessagePreview({ features, previewMessage, activePreviewTab, previewDeliveryMessage }: MessagePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Message Preview</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Preview messages for any feature</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {features.map((feature) => (
            <div key={feature.id}>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => previewDeliveryMessage(feature.id)}
                  className="w-full mb-1 sm:mb-2 text-xs sm:text-sm"
                  size="sm"
                >
                  Preview {feature.name}
                </Button>
              </motion.div>
              <AnimatePresence>
                {previewMessage && activePreviewTab === feature.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 p-3 sm:p-4 bg-muted rounded-md overflow-hidden"
                  >
                    <h4 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Preview:</h4>
                    <p className="text-xs sm:text-sm">{previewMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

