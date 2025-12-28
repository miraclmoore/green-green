'use client'

import { useState } from 'react'
import { CROP_CATEGORIES, DIFFICULTY_LEVELS, HARVEST_TIME_RANGES, SEASONS } from '@/lib/constants'
import { Filter } from 'lucide-react'

export interface FilterState {
  category: string
  difficulty: string
  harvestTime: string
  season: string
}

interface CropFilterProps {
  onFilterChange: (filters: FilterState) => void
}

export default function CropFilter({ onFilterChange }: CropFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    difficulty: '',
    harvestTime: '',
    season: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      category: '',
      difficulty: '',
      harvestTime: '',
      season: '',
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-700 font-medium"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear all
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Categories</option>
              {CROP_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Levels</option>
              {DIFFICULTY_LEVELS.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="harvestTime" className="block text-sm font-medium text-gray-700 mb-1">
              Time to Harvest
            </label>
            <select
              id="harvestTime"
              value={filters.harvestTime}
              onChange={(e) => handleFilterChange('harvestTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Any Time</option>
              {HARVEST_TIME_RANGES.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">
              Season
            </label>
            <select
              id="season"
              value={filters.season}
              onChange={(e) => handleFilterChange('season', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Seasons</option>
              {SEASONS.map(season => (
                <option key={season.value} value={season.value}>{season.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

