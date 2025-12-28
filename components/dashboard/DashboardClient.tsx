'use client'

import { useState, useMemo } from 'react'
import CropCard from '@/components/dashboard/CropCard'
import CropFilter, { type FilterState } from '@/components/dashboard/CropFilter'
import PlantThisWeek from '@/components/dashboard/PlantThisWeek'
import type { CalculatedCrop } from '@/lib/calculator'

interface DashboardClientProps {
  crops: CalculatedCrop[]
  hasProfile: boolean
}

export default function DashboardClient({ crops, hasProfile }: DashboardClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    difficulty: '',
    harvestTime: '',
    season: '',
  })

  const filteredCrops = useMemo(() => {
    return crops.filter(crop => {
      // Category filter
      if (filters.category && crop.category !== filters.category) {
        return false
      }

      // Difficulty filter
      if (filters.difficulty && crop.difficulty_level !== filters.difficulty) {
        return false
      }

      // Harvest time filter
      if (filters.harvestTime) {
        const days = crop.days_to_harvest
        switch (filters.harvestTime) {
          case '<30':
            if (days >= 30) return false
            break
          case '30-60':
            if (days < 30 || days > 60) return false
            break
          case '60-90':
            if (days < 60 || days > 90) return false
            break
          case '90+':
            if (days < 90) return false
            break
        }
      }

      return true
    })
  }, [crops, filters])

  // For now, show top profitable crops as "plant this week"
  // TODO: Implement proper planting window logic
  const plantThisWeekCrops = crops.slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {!hasProfile && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-900">
            📝 Complete your profile to get personalized recommendations based on your growing space and sales channels.
          </p>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Crop Recommendations</h1>
        <p className="text-gray-600">
          Showing {filteredCrops.length} crops ranked by profitability
        </p>
      </div>

      {hasProfile && crops.length > 0 && (
        <div className="mb-8">
          <PlantThisWeek crops={plantThisWeekCrops} />
        </div>
      )}

      <div className="mb-6">
        <CropFilter onFilterChange={setFilters} />
      </div>

      {filteredCrops.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No crops match your filters. Try adjusting your selection.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map(crop => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      )}
    </div>
  )
}

