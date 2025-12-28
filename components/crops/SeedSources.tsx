import type { Database } from '@/types/database.types'
import { ExternalLink, DollarSign } from 'lucide-react'

type SeedSource = Database['public']['Tables']['seed_sources']['Row']

interface SeedSourcesProps {
  sources: SeedSource[]
  cropName: string
}

export default function SeedSources({ sources, cropName }: SeedSourcesProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Where to Buy Seeds</h3>
      
      {sources.length > 0 ? (
        <div className="space-y-4">
          {sources.map(source => (
            <div key={source.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{source.supplier_name}</h4>
                  {source.variety_name && (
                    <p className="text-sm text-gray-600 mt-1">Variety: {source.variety_name}</p>
                  )}
                </div>
                {source.price_range && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{source.price_range}</span>
                  </div>
                )}
              </div>
              
              {source.notes && (
                <p className="text-sm text-gray-600 mb-3">{source.notes}</p>
              )}
              
              {source.supplier_url && (
                <a
                  href={source.supplier_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  <span>Visit supplier</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">
            We're still adding seed sources for {cropName}. Check back soon!
          </p>
          <p className="text-sm text-gray-500">
            In the meantime, try popular suppliers like Johnny's Selected Seeds, High Mowing Seeds, or Baker Creek Heirloom Seeds.
          </p>
        </div>
      )}
    </div>
  )
}

