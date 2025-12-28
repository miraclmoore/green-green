import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProfitabilityCalculator from '@/components/crops/ProfitabilityCalculator'
import PricingTable from '@/components/crops/PricingTable'
import GrowingRequirements from '@/components/crops/GrowingRequirements'
import MarketInsights from '@/components/crops/MarketInsights'
import SeedSources from '@/components/crops/SeedSources'

export default async function CropDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  // Fetch crop with all related data
  const { data: cropData } = await supabase
    .from('crops')
    .select(`
      *,
      pricing:crop_pricing(*),
      planting_windows(*),
      seed_sources(*)
    `)
    .eq('id', params.id)
    .single()

  const crop = cropData as any // Type assertion to handle Supabase's complex types

  if (!crop) {
    notFound()
  }

  // Get representative pricing for calculator
  const representativePricing = crop.pricing && crop.pricing.length > 0
    ? {
        low: crop.pricing[0].price_low,
        high: crop.pricing[0].price_high,
        unit: crop.pricing[0].price_unit,
      }
    : { low: 0, high: 0, unit: 'per_lb' }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{crop.name}</h1>
            <p className="text-lg text-gray-600 capitalize">{crop.category}</p>
            {crop.scientific_name && (
              <p className="text-sm text-gray-500 italic">{crop.scientific_name}</p>
            )}
          </div>

          {crop.description && (
            <p className="text-gray-700 mb-6">{crop.description}</p>
          )}

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Difficulty</div>
              <div className="text-lg font-semibold text-gray-900 capitalize">
                {crop.difficulty_level}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Days to Harvest</div>
              <div className="text-lg font-semibold text-gray-900">
                {crop.days_to_harvest} days
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Harvest Frequency</div>
              <div className="text-lg font-semibold text-gray-900 capitalize">
                {crop.harvest_frequency.replace('_', ' ')}
              </div>
            </div>
          </div>

          <ProfitabilityCalculator crop={crop} priceRange={representativePricing} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <PricingTable pricing={crop.pricing || []} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <GrowingRequirements crop={crop} plantingWindows={crop.planting_windows || []} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <MarketInsights crop={crop} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <SeedSources sources={crop.seed_sources || []} cropName={crop.name} />
        </div>
      </div>
    </div>
  )
}

