'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

export function SenderIdSubscription() {
  const [senderId, setSenderId] = useState('')
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('monthly')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted')
    setIsSubmitting(true)

    toast({
      title: "Request Sent Successfully",
      description: "Your Sender ID request is now under review. This process typically takes 7 to 10 days to activate.",
      duration: 5000,
    })

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Reset form
      setSenderId('')
      setSubscriptionPeriod('monthly')
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sender ID Subscription</CardTitle>
        <CardDescription>Set up and manage your custom sender IDs</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sender-id">Sender ID</Label>
            <Input 
              id="sender-id" 
              placeholder="Enter your desired sender ID" 
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              This is the name that will appear as the sender of your SMS messages
            </p>
          </div>

          <div className="space-y-4">
            <Label>Subscription Period</Label>
            <RadioGroup 
              value={subscriptionPeriod} 
              onValueChange={setSubscriptionPeriod} 
              className="grid gap-4"
            >
              <Label
                className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <div className="space-y-1">
                  <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                  <span className="font-semibold">Monthly</span>
                  <p className="text-sm text-muted-foreground">$29/month</p>
                </div>
              </Label>
              <Label
                className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <div className="space-y-1">
                  <RadioGroupItem value="yearly" id="yearly" className="sr-only" />
                  <span className="font-semibold">Yearly</span>
                  <p className="text-sm text-muted-foreground">$290/year (Save 20%)</p>
                </div>
              </Label>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Subscribe'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

