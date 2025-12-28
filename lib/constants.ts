// Constants for the GreenGreen app

export const GROWING_METHODS = [
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'greenhouse', label: 'Greenhouse' },
  { value: 'hydroponic', label: 'Hydroponic' },
  { value: 'indoor', label: 'Indoor' },
] as const

export const SALES_CHANNELS = [
  { value: 'farmers_market', label: "Farmers' Market" },
  { value: 'wholesale', label: 'Wholesale/Restaurant' },
  { value: 'retail', label: 'Retail/Grocery' },
  { value: 'csa', label: 'CSA/Direct' },
] as const

export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
] as const

export const CROP_CATEGORIES = [
  { value: 'microgreens', label: 'Microgreens' },
  { value: 'herbs', label: 'Herbs' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'specialty', label: 'Specialty' },
] as const

export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy', color: 'text-green-600' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'hard', label: 'Hard', color: 'text-red-600' },
] as const

export const SEASONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'fall', label: 'Fall' },
  { value: 'winter', label: 'Winter' },
  { value: 'year-round', label: 'Year-round' },
] as const

export const HARVEST_TIME_RANGES = [
  { value: '<30', label: 'Under 30 days' },
  { value: '30-60', label: '30-60 days' },
  { value: '60-90', label: '60-90 days' },
  { value: '90+', label: '90+ days' },
] as const

