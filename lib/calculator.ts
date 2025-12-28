import type { Database } from '@/types/database.types'

type Crop = Database['public']['Tables']['crops']['Row']
type CropPricing = Database['public']['Tables']['crop_pricing']['Row']
type UserProfile = Database['public']['Tables']['user_profiles']['Row']

export interface CropWithPricing extends Crop {
  pricing: CropPricing[]
}

export interface CalculatedCrop extends CropWithPricing {
  annualRevenue: number
  revenuePerSqFt: number
  priceRange: {
    low: number
    high: number
    unit: string
  }
}

/**
 * Calculate annual revenue for a crop based on user's profile
 */
export function calculateAnnualRevenue(params: {
  userSqFt: number
  cropYieldPerSqFt: number
  pricePerUnit: number
  harvestsPerYear: number
}): number {
  const { userSqFt, cropYieldPerSqFt, pricePerUnit, harvestsPerYear } = params
  return userSqFt * cropYieldPerSqFt * pricePerUnit * harvestsPerYear
}

/**
 * Calculate revenue per square foot
 */
export function calculateRevenuePerSqFt(params: {
  cropYieldPerSqFt: number
  pricePerUnit: number
  harvestsPerYear: number
}): number {
  const { cropYieldPerSqFt, pricePerUnit, harvestsPerYear } = params
  return cropYieldPerSqFt * pricePerUnit * harvestsPerYear
}

/**
 * Get relevant pricing for user's sales channels
 */
export function getRelevantPricing(
  pricing: CropPricing[],
  salesChannels: string[] | null,
  region: string = 'southwest'
): CropPricing | null {
  if (!salesChannels || salesChannels.length === 0) {
    // Default to farmers market pricing
    return pricing.find(p => p.sales_channel === 'farmers_market') || pricing[0] || null
  }

  // Find pricing that matches user's primary sales channel and region
  for (const channel of salesChannels) {
    const matchingPrice = pricing.find(
      p => p.sales_channel === channel && (p.region === region || !p.region)
    )
    if (matchingPrice) return matchingPrice
  }

  // Fallback to first matching channel
  for (const channel of salesChannels) {
    const matchingPrice = pricing.find(p => p.sales_channel === channel)
    if (matchingPrice) return matchingPrice
  }

  return pricing[0] || null
}

/**
 * Calculate profitability for a crop based on user profile
 */
export function calculateCropProfitability(
  crop: CropWithPricing,
  userProfile: UserProfile
): CalculatedCrop | null {
  const relevantPricing = getRelevantPricing(
    crop.pricing,
    userProfile.sales_channels,
    'southwest' // TODO: derive from user location
  )

  if (!relevantPricing) {
    return null
  }

  // Use average of price range
  const avgPrice = (relevantPricing.price_low + relevantPricing.price_high) / 2

  const userSqFt = userProfile.growing_space_sqft || 0
  const revenuePerSqFt = calculateRevenuePerSqFt({
    cropYieldPerSqFt: crop.yield_per_sqft_lbs,
    pricePerUnit: avgPrice,
    harvestsPerYear: crop.harvests_per_year,
  })

  const annualRevenue = userSqFt > 0 
    ? calculateAnnualRevenue({
        userSqFt,
        cropYieldPerSqFt: crop.yield_per_sqft_lbs,
        pricePerUnit: avgPrice,
        harvestsPerYear: crop.harvests_per_year,
      })
    : 0

  return {
    ...crop,
    annualRevenue,
    revenuePerSqFt,
    priceRange: {
      low: relevantPricing.price_low,
      high: relevantPricing.price_high,
      unit: relevantPricing.price_unit,
    },
  }
}

/**
 * Filter crops by user's growing methods
 */
export function filterCropsByGrowingMethods(
  crops: CropWithPricing[],
  userMethods: string[] | null
): CropWithPricing[] {
  if (!userMethods || userMethods.length === 0) {
    return crops
  }

  return crops.filter(crop => {
    if (!crop.growing_methods || crop.growing_methods.length === 0) {
      return true // Include crops with no specific method requirements
    }
    return crop.growing_methods.some(method => userMethods.includes(method))
  })
}

/**
 * Sort crops by profitability (revenue per sq ft)
 */
export function sortCropsByProfitability(
  crops: CalculatedCrop[],
  descending: boolean = true
): CalculatedCrop[] {
  return [...crops].sort((a, b) => {
    return descending
      ? b.revenuePerSqFt - a.revenuePerSqFt
      : a.revenuePerSqFt - b.revenuePerSqFt
  })
}

/**
 * Get personalized crop recommendations for a user
 */
export function getPersonalizedCrops(
  crops: CropWithPricing[],
  userProfile: UserProfile
): CalculatedCrop[] {
  // Filter by growing methods
  const filteredCrops = filterCropsByGrowingMethods(crops, userProfile.growing_methods)

  // Calculate profitability for each crop
  const calculatedCrops = filteredCrops
    .map(crop => calculateCropProfitability(crop, userProfile))
    .filter((crop): crop is CalculatedCrop => crop !== null)

  // Sort by profitability
  return sortCropsByProfitability(calculatedCrops)
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format price unit for display
 */
export function formatPriceUnit(unit: string): string {
  const unitMap: Record<string, string> = {
    per_lb: '/lb',
    per_oz: '/oz',
    per_bunch: '/bunch',
    per_unit: '/unit',
  }
  return unitMap[unit] || unit
}

