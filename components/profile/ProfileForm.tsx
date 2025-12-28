'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { GROWING_METHODS, SALES_CHANNELS, EXPERIENCE_LEVELS } from '@/lib/constants'

interface ProfileFormProps {
  initialData?: {
    location_zip?: string | null
    location_state?: string | null
    growing_space_sqft?: number | null
    growing_methods?: string[] | null
    sales_channels?: string[] | null
    experience_level?: string | null
  }
  userId: string
}

export default function ProfileForm({ initialData, userId }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    location_zip: initialData?.location_zip || '',
    location_state: initialData?.location_state || '',
    growing_space_sqft: initialData?.growing_space_sqft || '',
    growing_methods: initialData?.growing_methods || [],
    sales_channels: initialData?.sales_channels || [],
    experience_level: initialData?.experience_level || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: upsertError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          location_zip: formData.location_zip || null,
          location_state: formData.location_state || null,
          growing_space_sqft: formData.growing_space_sqft ? Number(formData.growing_space_sqft) : null,
          growing_methods: formData.growing_methods.length > 0 ? formData.growing_methods : null,
          sales_channels: formData.sales_channels.length > 0 ? formData.sales_channels : null,
          experience_level: formData.experience_level || null,
        })

      if (upsertError) {
        setError(upsertError.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const toggleArrayValue = (field: 'growing_methods' | 'sales_channels', value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      if (currentArray.includes(value)) {
        return { ...prev, [field]: currentArray.filter(v => v !== value) }
      } else {
        return { ...prev, [field]: [...currentArray, value] }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="location_zip" className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            id="location_zip"
            type="text"
            value={formData.location_zip}
            onChange={(e) => setFormData({ ...formData, location_zip: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="87501"
          />
        </div>

        <div>
          <label htmlFor="location_state" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            id="location_state"
            type="text"
            value={formData.location_state}
            onChange={(e) => setFormData({ ...formData, location_state: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="NM"
          />
        </div>
      </div>

      <div>
        <label htmlFor="growing_space_sqft" className="block text-sm font-medium text-gray-700 mb-1">
          Total Growing Space (sq ft)
        </label>
        <input
          id="growing_space_sqft"
          type="number"
          value={formData.growing_space_sqft}
          onChange={(e) => setFormData({ ...formData, growing_space_sqft: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="1000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Growing Methods (select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {GROWING_METHODS.map(method => (
            <label
              key={method.value}
              className="flex items-center gap-2 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={formData.growing_methods.includes(method.value)}
                onChange={() => toggleArrayValue('growing_methods', method.value)}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm">{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sales Channels (select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SALES_CHANNELS.map(channel => (
            <label
              key={channel.value}
              className="flex items-center gap-2 p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={formData.sales_channels.includes(channel.value)}
                onChange={() => toggleArrayValue('sales_channels', channel.value)}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm">{channel.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 mb-1">
          Experience Level
        </label>
        <select
          id="experience_level"
          value={formData.experience_level}
          onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select your experience level</option>
          {EXPERIENCE_LEVELS.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  )
}

