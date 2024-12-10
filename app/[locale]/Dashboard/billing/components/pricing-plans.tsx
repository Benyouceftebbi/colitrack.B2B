import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    name: "Starter",
    price: 10,
    tokens: "2,400",
    bonus: "",
    features: [
      "Basic SMS notifications",
      "Standard delivery tracking",
      "Email support",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: 100,
    tokens: "24,000",
    bonus: "+15% Bonus Tokens FREE",
    features: [
      "Enterprise SMS automation",
      "Premium delivery tracking",
      "24/7 priority support",
      "Advanced API access",
      "Custom analytics",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: 80,
    tokens: "19,200",
    bonus: "+5% Bonus Tokens FREE",
    features: [
      "Advanced SMS automation",
      "Priority delivery tracking",
      "Priority email & chat support",
      "Advanced API access",
      "Analytics dashboard",
      "Custom integrations",
    ],
  },
]

export function PricingPlans() {
  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">
          Get the tokens you need to power your SMS communications
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
            {plan.popular && (
              <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/one-time</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="text-lg font-semibold">{plan.tokens} Tokens</div>
                {plan.bonus && (
                  <div className="text-sm text-primary">{plan.bonus}</div>
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

