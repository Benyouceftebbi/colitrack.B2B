import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { categories } from '../data/categories'

interface FeatureFiltersProps {
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function FeatureFilters({ selectedCategory, onSelectCategory }: FeatureFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-2 mb-12"
    >
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        className="rounded-full"
      >
        All Features
      </Button>
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={selectedCategory === category.name ? "default" : "outline"}
          onClick={() => onSelectCategory(category.name)}
          className="rounded-full gap-2"
        >
          <category.icon className="w-4 h-4" />
          {category.name}
        </Button>
      ))}
    </motion.div>
  )
}