import Link from 'next/link'
import type { CalculatedCrop } from '@/lib/calculator'
import { formatCurrency } from '@/lib/calculator'
import { Calendar, TrendingUp } from 'lucide-react'

interface PlantThisWeekProps {
  crops: CalculatedCrop[]
}

export default function PlantThisWeek({ crops }: PlantThisWeekProps) {
  if (crops.length === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-6 h-6 text-green-700" />
        <h2 className="text-2xl font-bold text-green-900">Plant This Week</h2>
      </div>
      
      <p className="text-gray-700 mb-6">
        Based on your location and the current season, these crops are perfect to plant right now:
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crops.slice(0, 6).map(crop => (
          <Link
            key={crop.id}
            href={`/crops/${crop.id}`}
            className="bg-white p-4 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
          >
            <h3 className="font-bold text-gray-900 mb-2">{crop.name}</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>{formatCurrency(crop.revenuePerSqFt)}/sq ft/year</span>
              </div>
              <div className="text-gray-600">
                ⏱️ {crop.days_to_harvest} days to harvest
              </div>
              <div className="text-green-700 font-medium mt-2">
                🌱 Perfect timing!
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

