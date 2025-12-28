import { formatCurrency, formatPriceUnit } from '@/lib/calculator'
import type { Database } from '@/types/database.types'

type CropPricing = Database['public']['Tables']['crop_pricing']['Row']

interface PricingTableProps {
  pricing: CropPricing[]
}

export default function PricingTable({ pricing }: PricingTableProps) {
  const channelLabels: Record<string, string> = {
    farmers_market: "Farmers' Market",
    wholesale: 'Wholesale/Restaurant',
    retail: 'Retail/Grocery',
    csa: 'CSA/Direct',
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing by Sales Channel</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                Sales Channel
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                Price Range
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {pricing.map((price) => (
              <tr key={price.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {channelLabels[price.sales_channel] || price.sales_channel}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatCurrency(price.price_low)} - {formatCurrency(price.price_high)}
                  <span className="text-gray-600 ml-1">{formatPriceUnit(price.price_unit)}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {price.notes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pricing.length > 0 && pricing[0].last_updated && (
        <p className="mt-3 text-xs text-gray-500">
          Last updated: {new Date(pricing[0].last_updated).toLocaleDateString()}
        </p>
      )}
    </div>
  )
}

