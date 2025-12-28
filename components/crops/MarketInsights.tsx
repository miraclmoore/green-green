import { TrendingUp, Users, Calendar as CalendarIcon } from 'lucide-react'

interface MarketInsightsProps {
  crop: {
    name: string
    category: string
    harvest_frequency: string
  }
}

export default function MarketInsights({ crop }: MarketInsightsProps) {
  // This would ideally come from the database, but for now we'll provide general insights
  const categoryInsights: Record<string, { buyers: string; demand: string; uses: string }> = {
    microgreens: {
      buyers: 'High-end restaurants, health-conscious consumers, juice bars',
      demand: 'Year-round with peaks in winter months',
      uses: 'Garnishes, salads, smoothies, sandwiches',
    },
    herbs: {
      buyers: 'Restaurants, grocery stores, farmers market customers',
      demand: 'Peak in summer, steady year-round',
      uses: 'Culinary applications, teas, garnishes',
    },
    vegetables: {
      buyers: 'CSA members, farmers markets, restaurants, grocery stores',
      demand: 'Seasonal with summer peaks',
      uses: 'Fresh consumption, cooking, preserving',
    },
    fruits: {
      buyers: 'Farmers markets, u-pick operations, grocery stores',
      demand: 'Highly seasonal',
      uses: 'Fresh eating, preserves, baking',
    },
    specialty: {
      buyers: 'Specialty restaurants, ethnic markets, farmers markets',
      demand: 'Niche but consistent',
      uses: 'Ethnic cuisine, specialty dishes, unique applications',
    },
  }

  const insights = categoryInsights[crop.category] || categoryInsights.vegetables

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Market Insights</h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Target Buyers</h4>
            <p className="text-sm text-gray-600">{insights.buyers}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Demand Seasonality</h4>
            <p className="text-sm text-gray-600">{insights.demand}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CalendarIcon className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Common Uses</h4>
            <p className="text-sm text-gray-600">{insights.uses}</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
          <p className="text-sm text-blue-800">
            {crop.harvest_frequency === 'weekly' || crop.harvest_frequency === 'biweekly'
              ? `${crop.name} offers continuous harvests, making it ideal for establishing regular customer relationships and steady cash flow.`
              : `Plan succession plantings for ${crop.name} to extend your harvest window and maintain consistent supply to buyers.`
            }
          </p>
        </div>
      </div>
    </div>
  )
}

