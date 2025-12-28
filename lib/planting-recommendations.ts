import type { Database } from '@/types/database.types'
import type { CropWithPricing, CalculatedCrop } from './calculator'

type PlantingWindow = Database['public']['Tables']['planting_windows']['Row']

interface RecommendationParams {
  currentDate?: Date
  userLocation?: string
  userRegion?: string
  growingMethods?: string[] | null
}

/**
 * Get the current month (1-12)
 */
export function getCurrentMonth(date: Date = new Date()): number {
  return date.getMonth() + 1
}

/**
 * Check if a crop is plantable in the current month
 */
export function isCropPlantable(
  plantingWindows: PlantingWindow[],
  currentMonth: number,
  userRegion: string = 'southwest'
): boolean {
  if (!plantingWindows || plantingWindows.length === 0) {
    // If no planting windows defined, assume year-round
    return true
  }

  // Find matching planting window for user's region
  const relevantWindow = plantingWindows.find(
    window => window.region === userRegion || !window.region
  )

  if (!relevantWindow) {
    return false
  }

  const { planting_start_month, planting_end_month } = relevantWindow

  // Handle case where planting window wraps around the year
  if (planting_start_month <= planting_end_month) {
    // Normal case: e.g., March (3) to June (6)
    return currentMonth >= planting_start_month && currentMonth <= planting_end_month
  } else {
    // Wraps around year: e.g., October (10) to February (2)
    return currentMonth >= planting_start_month || currentMonth <= planting_end_month
  }
}

/**
 * Calculate urgency score for planting (1-5, 5 being most urgent)
 */
export function calculatePlantingUrgency(
  plantingWindows: PlantingWindow[],
  currentMonth: number,
  userRegion: string = 'southwest'
): number {
  const relevantWindow = plantingWindows.find(
    window => window.region === userRegion || !window.region
  )

  if (!relevantWindow) {
    return 0
  }

  const { planting_start_month, planting_end_month } = relevantWindow

  // If we're at the start of the window, lower urgency
  if (currentMonth === planting_start_month) {
    return 2
  }

  // If we're in the middle, moderate urgency
  const windowSize = planting_end_month >= planting_start_month
    ? planting_end_month - planting_start_month + 1
    : (12 - planting_start_month + planting_end_month + 1)

  const positionInWindow = currentMonth >= planting_start_month
    ? currentMonth - planting_start_month
    : (12 - planting_start_month + currentMonth)

  const percentThrough = positionInWindow / windowSize

  // More urgent as we approach the end of the window
  if (percentThrough > 0.75) {
    return 5 // Very urgent - last chance!
  } else if (percentThrough > 0.5) {
    return 4 // Urgent
  } else if (percentThrough > 0.25) {
    return 3 // Moderate
  } else {
    return 2 // Low urgency
  }
}

/**
 * Get expected harvest date
 */
export function getExpectedHarvestDate(
  currentDate: Date,
  daysToHarvest: number
): Date {
  const harvestDate = new Date(currentDate)
  harvestDate.setDate(harvestDate.getDate() + daysToHarvest)
  return harvestDate
}

/**
 * Check if there's enough time to harvest before season ends
 */
export function hasTimeToHarvest(
  plantingWindows: PlantingWindow[],
  currentMonth: number,
  daysToHarvest: number,
  userRegion: string = 'southwest'
): boolean {
  const relevantWindow = plantingWindows.find(
    window => window.region === userRegion || !window.region
  )

  if (!relevantWindow) {
    return true // If no window data, assume it's okay
  }

  const currentDate = new Date()
  currentDate.setMonth(currentMonth - 1)
  
  const harvestDate = getExpectedHarvestDate(currentDate, daysToHarvest)
  const harvestMonth = harvestDate.getMonth() + 1

  const { harvest_end_month } = relevantWindow

  // Simple check: will harvest month be within or before harvest end month?
  if (harvestMonth <= harvest_end_month) {
    return true
  }

  // Handle year wrap
  if (harvest_end_month < currentMonth && harvestMonth <= harvest_end_month) {
    return true
  }

  return false
}

/**
 * Get weekly planting recommendations
 */
export function getWeeklyRecommendations(
  crops: CropWithPricing[],
  cropsWithPlantingWindows: Array<{ crop: CropWithPricing; plantingWindows: PlantingWindow[] }>,
  params: RecommendationParams = {}
): Array<{ crop: CropWithPricing; urgency: number; expectedHarvestDate: Date }> {
  const {
    currentDate = new Date(),
    userRegion = 'southwest',
    growingMethods = null,
  } = params

  const currentMonth = getCurrentMonth(currentDate)

  const recommendations = cropsWithPlantingWindows
    .filter(({ crop, plantingWindows }) => {
      // Filter by growing methods if specified
      if (growingMethods && growingMethods.length > 0) {
        if (crop.growing_methods && crop.growing_methods.length > 0) {
          const hasMatchingMethod = crop.growing_methods.some(method =>
            growingMethods.includes(method)
          )
          if (!hasMatchingMethod) return false
        }
      }

      // Check if plantable this month
      if (!isCropPlantable(plantingWindows, currentMonth, userRegion)) {
        return false
      }

      // Check if there's enough time to harvest
      if (!hasTimeToHarvest(plantingWindows, currentMonth, crop.days_to_harvest, userRegion)) {
        return false
      }

      return true
    })
    .map(({ crop, plantingWindows }) => ({
      crop,
      urgency: calculatePlantingUrgency(plantingWindows, currentMonth, userRegion),
      expectedHarvestDate: getExpectedHarvestDate(currentDate, crop.days_to_harvest),
    }))
    // Sort by urgency (highest first), then by days to harvest (shortest first)
    .sort((a, b) => {
      if (b.urgency !== a.urgency) {
        return b.urgency - a.urgency
      }
      return a.crop.days_to_harvest - b.crop.days_to_harvest
    })

  return recommendations
}

/**
 * Get planting recommendations with calculated profitability
 */
export function getWeeklyRecommendationsWithProfitability(
  calculatedCrops: CalculatedCrop[],
  cropsWithPlantingWindows: Array<{ cropId: string; plantingWindows: PlantingWindow[] }>,
  params: RecommendationParams = {}
): Array<CalculatedCrop & { urgency: number; expectedHarvestDate: Date }> {
  const {
    currentDate = new Date(),
    userRegion = 'southwest',
  } = params

  const currentMonth = getCurrentMonth(currentDate)

  const recommendations = calculatedCrops
    .map(crop => {
      const windowData = cropsWithPlantingWindows.find(pw => pw.cropId === crop.id)
      if (!windowData) return null

      const plantingWindows = windowData.plantingWindows

      // Check if plantable this month
      if (!isCropPlantable(plantingWindows, currentMonth, userRegion)) {
        return null
      }

      // Check if there's enough time to harvest
      if (!hasTimeToHarvest(plantingWindows, currentMonth, crop.days_to_harvest, userRegion)) {
        return null
      }

      return {
        ...crop,
        urgency: calculatePlantingUrgency(plantingWindows, currentMonth, userRegion),
        expectedHarvestDate: getExpectedHarvestDate(currentDate, crop.days_to_harvest),
      }
    })
    .filter((item): item is CalculatedCrop & { urgency: number; expectedHarvestDate: Date } => item !== null)
    .sort((a, b) => {
      // Sort by urgency first, then by profitability
      if (b.urgency !== a.urgency) {
        return b.urgency - a.urgency
      }
      return b.revenuePerSqFt - a.revenuePerSqFt
    })

  return recommendations
}

/**
 * Format urgency message
 */
export function getUrgencyMessage(urgency: number): string {
  switch (urgency) {
    case 5:
      return '🔥 Last chance! Plant ASAP'
    case 4:
      return '⚠️ Plant soon - window closing'
    case 3:
      return '⏰ Good time to plant'
    case 2:
      return '🌱 Perfect timing'
    case 1:
      return '✨ Early window - plenty of time'
    default:
      return '🌱 Plantable now'
  }
}

