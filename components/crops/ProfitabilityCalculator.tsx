'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/calculator'
import { Calculator } from 'lucide-react'

interface ProfitabilityCalculatorProps {
  crop: {
    name: string
    yield_per_sqft_lbs: number
    harvests_per_year: number
  }
  priceRange: {
    low: number
    high: number
    unit: string
  }
}

export default function ProfitabilityCalculator({ crop, priceRange }: ProfitabilityCalculatorProps) {
  const [sqft, setSqft] = useState<string>('100')
  
  const avgPrice = (priceRange.low + priceRange.high) / 2
  const sqftNum = parseFloat(sqft) || 0
  
  const annualYield = sqftNum * crop.yield_per_sqft_lbs * crop.harvests_per_year
  const annualRevenue = annualYield * avgPrice
  const revenuePerSqFt = crop.yield_per_sqft_lbs * avgPrice * crop.harvests_per_year

  return (
    <div className="bg-green-50 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-6 h-6 text-green-700" />
        <h3 className="text-xl font-bold text-gray-900">Revenue Calculator</h3>
      </div>

      <div className="mb-6">
        <label htmlFor="sqft" className="block text-sm font-medium text-gray-700 mb-2">
          How many square feet will you dedicate to {crop.name}?
        </label>
        <input
          id="sqft"
          type="number"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="100"
        />
      </div>

      <div className="space-y-3 bg-white rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Annual Yield:</span>
          <span className="font-semibold text-gray-900">{annualYield.toFixed(1)} lbs</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Revenue per sq ft:</span>
          <span className="font-semibold text-gray-900">{formatCurrency(revenuePerSqFt)}/year</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Projected Annual Revenue:</span>
          <span className="text-2xl font-bold text-green-600">{formatCurrency(annualRevenue)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          *Based on average price of {formatCurrency(avgPrice)}/lb and {crop.harvests_per_year} harvests per year
        </p>
      </div>
    </div>
  )
}

