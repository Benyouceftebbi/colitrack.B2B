import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Feature } from '../types/feature'

interface FeatureCardProps {
  feature: Feature
  variants: any
}

export function FeatureCard({ feature, variants }: FeatureCardProps) {
  return (
    <motion.div variants={variants}>
      <Card className="group relative overflow-hidden dark:bg-black/50 bg-white/50 backdrop-blur-lg border dark:border-white/10 border-black/10">
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${feature.gradient}`} style={{ opacity: 0.1 }} />
        <CardHeader>
          <div className="flex items-center justify-between">
            <feature.icon className={`h-8 w-8 bg-gradient-to-r ${feature.gradient} [&>path]:fill-white rounded-lg p-1.5`} />
            <Badge variant="outline" className="dark:border-white/10 border-black/10">
              {feature.timeline}
            </Badge>
          </div>
          <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm dark:text-gray-400 text-gray-600">
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}