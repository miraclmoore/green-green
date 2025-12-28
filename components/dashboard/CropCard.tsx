import Link from 'next/link'
import type { CalculatedCrop } from '@/lib/calculator'
import { formatCurrency, formatPriceUnit } from '@/lib/calculator'
import { DIFFICULTY_LEVELS } from '@/lib/constants'
import { TrendingUp, Clock, Sprout } from 'lucide-react'

interface CropCardProps {
  crop: CalculatedCrop
}

export default function CropCard({ crop }: CropCardProps) {
  const difficultyColor = DIFFICULTY_LEVELS.find(
    d => d.value === crop.difficulty_level
  )?.color || 'text-gray-600'

  const profitabilityLevel = 
    crop.revenuePerSqFt > 500 ? 'high' : 
    crop.revenuePerSqFt > 200 ? 'medium' : 'low'

  const profitabilityColors = {
    high: 'bg-green-50 border-green-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-gray-50 border-gray-200',
  }

  return (
    <Link href={`/crops/${crop.id}`}>
      <div className={`p-6 rounded-lg border-2 ${profitabilityColors[profitabilityLevel]} hover:shadow-lg transition-shadow cursor-pointer h-full`}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{crop.name}</h3>
            <p className="text-sm text-gray-600 capitalize">{crop.category}</p>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${difficultyColor}`}>
            {crop.difficulty_level}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">
              <span className="font-bold text-green-600">{formatCurrency(crop.revenuePerSqFt)}</span>/sq ft/year
            </span>
          </div>
          
          {crop.annualRevenue > 0 && (
            <div className="text-sm text-gray-600">
              Your space: <span className="font-semibold text-gray-900">{formatCurrency(crop.annualRevenue)}</span>/year
            </div>
          )}

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {crop.days_to_harvest} days to harvest
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 capitalize">
              {crop.harvest_frequency.replace('_', ' ')} • {crop.harvests_per_year}x/year
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Price Range
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {formatCurrency(crop.priceRange.low)} - {formatCurrency(crop.priceRange.high)}
            <span className="text-gray-600 font-normal">{formatPriceUnit(crop.priceRange.unit)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

