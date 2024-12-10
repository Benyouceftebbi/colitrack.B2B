import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Feature {
  id: string
  name: string
  tokens: number
  description: string
}

interface MessageFeaturesProps {
  features: Feature[]
  selectedFeatures: string[]
  toggleFeature: (featureId: string) => void
}

export function MessageFeatures({ features, selectedFeatures, toggleFeature }: MessageFeaturesProps) {
  const totalTokens = features.reduce((sum, feature) => 
    selectedFeatures.includes(feature.id) ? sum + feature.tokens : sum, 0
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Message Features</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Select the features you want to enable</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between space-x-2 sm:space-x-4">
              <div>
                <Label htmlFor={feature.id} className="text-sm sm:text-base font-semibold">
                  {feature.name}
                </Label>
                <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-medium">{feature.tokens} tokens</span>
                <Switch
                  id={feature.id}
                  checked={selectedFeatures.includes(feature.id)}
                  onCheckedChange={() => toggleFeature(feature.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted rounded-md">
          <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Total Cost:</h4>
          <p className="text-xs sm:text-sm">{totalTokens} tokens per message</p>
          <p className="text-xs text-muted-foreground mt-1">This is the cost for sending one message with all selected features.</p>
        </div>
      </CardContent>
    </Card>
  )
}

