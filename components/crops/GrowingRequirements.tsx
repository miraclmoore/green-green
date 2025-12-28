import type { Database } from '@/types/database.types'
import { MapPin, Calendar, Gauge, Ruler } from 'lucide-react'

type Crop = Database['public']['Tables']['crops']['Row']
type PlantingWindow = Database['public']['Tables']['planting_windows']['Row']

interface GrowingRequirementsProps {
  crop: Crop
  plantingWindows: PlantingWindow[]
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function GrowingRequirements({ crop, plantingWindows }: GrowingRequirementsProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Growing Requirements</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Climate Zones</h4>
              <p className="text-sm text-gray-600">
                {crop.climate_zones && crop.climate_zones.length > 0 
                  ? `USDA Zones: ${crop.climate_zones.join(', ')}`
                  : 'Adaptable to most zones'
                }
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Days to Harvest</h4>
              <p className="text-sm text-gray-600">
                {crop.days_to_harvest} days from planting to first harvest
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Gauge className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Difficulty Level</h4>
              <p className="text-sm text-gray-600 capitalize">
                {crop.difficulty_level}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Ruler className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Space Requirements</h4>
              <p className="text-sm text-gray-600">
                {crop.space_requirements || 'Standard spacing'}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Planting Windows</h4>
          {plantingWindows.length > 0 ? (
            <div className="space-y-3">
              {plantingWindows.map(window => (
                <div key={window.id} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {window.region ? `Region: ${window.region}` : 'General'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Plant:</strong> {monthNames[window.planting_start_month - 1]} - {monthNames[window.planting_end_month - 1]}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Harvest:</strong> {monthNames[window.harvest_start_month - 1]} - {monthNames[window.harvest_end_month - 1]}
                  </p>
                  {window.notes && (
                    <p className="text-xs text-gray-500 mt-1">{window.notes}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">Can be grown year-round in suitable conditions</p>
          )}
        </div>
      </div>

      {crop.growing_methods && crop.growing_methods.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Compatible Growing Methods</h4>
          <div className="flex flex-wrap gap-2">
            {crop.growing_methods.map(method => (
              <span
                key={method}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

