"use client"

import { useState, useEffect } from "react"
import { getYalidineCentersByCommune, type YalidineCenter } from "../data/yalidin-centers"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface StopDeskSelectorProps {
  communeName: string
  selectedCenterId?: number
  onSelectCenter: (center: YalidineCenter) => void
  className?: string
}

export function StopDeskSelector({
  communeName,
  selectedCenterId,
  onSelectCenter,
  className = "",
}: StopDeskSelectorProps) {
  const [centers, setCenters] = useState<YalidineCenter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (communeName) {
      setLoading(true)
      // Get centers for this commune
      const availableCenters = getYalidineCentersByCommune(communeName)
      setCenters(availableCenters)

      // If there's only one center, select it automatically
      if (availableCenters.length === 1 && !selectedCenterId) {
        onSelectCenter(availableCenters[0])
      }

      // If there are centers and a selected ID, make sure it exists
      if (availableCenters.length > 0 && selectedCenterId) {
        const selectedCenter = availableCenters.find((c) => c.center_id === selectedCenterId)
        if (!selectedCenter && availableCenters.length > 0) {
          // If the selected center doesn't exist, select the first one
          onSelectCenter(availableCenters[0])
        }
      }

      setLoading(false)
    }
  }, [communeName, selectedCenterId, onSelectCenter])

  if (loading) {
    return <div className="text-sm text-gray-500 dark:text-gray-400">Loading stop desk centers...</div>
  }

  if (centers.length === 0) {
    return (
      <div className="text-sm text-amber-600 dark:text-amber-400">
        No stop desk centers available in this commune. Please choose home delivery instead.
      </div>
    )
  }

  return (
    <div className={className}>
      <Label htmlFor="stop-desk-center" className="text-sm font-medium mb-2 block">
        Select a Stop Desk Center:
      </Label>
      <Select
        value={selectedCenterId?.toString()}
        onValueChange={(value) => {
          const centerId = Number.parseInt(value, 10)
          const center = centers.find((c) => c.center_id === centerId)
          if (center) {
            onSelectCenter(center)
          }
        }}
      >
        <SelectTrigger id="stop-desk-center" className="w-full">
          <SelectValue placeholder="Select a center">
            {selectedCenterId
              ? centers.find((c) => c.center_id === selectedCenterId)?.name || "Select a center"
              : "Select a center"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {centers.map((center) => (
            <SelectItem key={center.center_id} value={center.center_id.toString()}>
              {center.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedCenterId && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {centers.find((c) => c.center_id === selectedCenterId)?.address}
        </p>
      )}
    </div>
  )
}
