import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

interface CropData {
  name: string
  category: 'microgreens' | 'herbs' | 'vegetables' | 'fruits' | 'specialty'
  scientific_name: string
  description: string
  difficulty_level: 'easy' | 'medium' | 'hard'
  days_to_harvest: number
  harvest_frequency: 'one_time' | 'weekly' | 'biweekly' | 'monthly' | 'seasonal'
  harvests_per_year: number
  yield_per_sqft_lbs: number
  space_requirements: string
  climate_zones: string[]
  growing_methods: string[]
  pricing: Array<{
    sales_channel: 'farmers_market' | 'wholesale' | 'retail' | 'csa'
    price_low: number
    price_high: number
    price_unit: 'per_lb' | 'per_oz' | 'per_bunch' | 'per_unit'
    region: string
    notes: string
  }>
  planting_windows: Array<{
    region: string
    planting_start_month: number
    planting_end_month: number
    harvest_start_month: number
    harvest_end_month: number
    notes: string
  }>
  seed_sources: Array<{
    supplier_name: string
    supplier_url: string
    variety_name?: string
    price_range: string
  }>
}

const crops: CropData[] = [
  // MICROGREENS (12 crops)
  {
    name: 'Sunflower Microgreens',
    category: 'microgreens',
    scientific_name: 'Helianthus annuus',
    description: 'Fast-growing, nutty-flavored microgreens popular at farmers markets and restaurants. High profit margins with quick turnover.',
    difficulty_level: 'easy',
    days_to_harvest: 10,
    harvest_frequency: 'weekly',
    harvests_per_year: 52,
    yield_per_sqft_lbs: 2.5,
    space_requirements: 'Dense planting, 1-2 inches apart in trays',
    climate_zones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b'],
    growing_methods: ['indoor', 'greenhouse'],
    pricing: [
      { sales_channel: 'farmers_market', price_low: 25, price_high: 40, price_unit: 'per_lb', region: 'southwest', notes: 'Premium pricing for fresh-cut at markets' },
      { sales_channel: 'wholesale', price_low: 18, price_high: 25, price_unit: 'per_lb', region: 'southwest', notes: 'Bulk pricing for restaurants' },
      { sales_channel: 'retail', price_low: 4, price_high: 6, price_unit: 'per_oz', region: 'southwest', notes: 'Packaged in clamshells' },
      { sales_channel: 'csa', price_low: 30, price_high: 35, price_unit: 'per_lb', region: 'southwest', notes: 'Premium for fresh-cut' }
    ],
    planting_windows: [
      { region: 'southwest', planting_start_month: 1, planting_end_month: 12, harvest_start_month: 1, harvest_end_month: 12, notes: 'Year-round indoors' }
    ],
    seed_sources: [
      { supplier_name: "Johnny's Selected Seeds", supplier_url: 'https://www.johnnyseeds.com', variety_name: 'Black Oil Sunflower', price_range: '$10-15 per lb' },
      { supplier_name: 'True Leaf Market', supplier_url: 'https://www.trueleafmarket.com', price_range: '$12-18 per lb' }
    ]
  },
  {
    name: 'Pea Shoots',
    category: 'microgreens',
    scientific_name: 'Pisum sativum',
    description: 'Sweet, tender shoots popular in Asian cuisine and high-end restaurants. Very profitable with repeat harvests.',
    difficulty_level: 'easy',
    days_to_harvest: 14,
    harvest_frequency: 'weekly',
    harvests_per_year: 26,
    yield_per_sqft_lbs: 3.0,
    space_requirements: 'Dense planting in trays, can harvest twice',
    climate_zones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    growing_methods: ['indoor', 'greenhouse'],
    pricing: [
      { sales_channel: 'farmers_market', price_low: 20, price_high: 32, price_unit: 'per_lb', region: 'southwest', notes: 'High demand at markets' },
      { sales_channel: 'wholesale', price_low: 15, price_high: 22, price_unit: 'per_lb', region: 'southwest', notes: 'Popular with Asian restaurants' },
      { sales_channel: 'retail', price_low: 3, price_high: 5, price_unit: 'per_oz', region: 'southwest', notes: 'Packaged greens' },
      { sales_channel: 'csa', price_low: 24, price_high: 28, price_unit: 'per_lb', region: 'southwest', notes: 'Member favorite' }
    ],
    planting_windows: [
      { region: 'southwest', planting_start_month: 1, planting_end_month: 12, harvest_start_month: 1, harvest_end_month: 12, notes: 'Year-round indoors' }
    ],
    seed_sources: [
      { supplier_name: "Johnny's Selected Seeds", supplier_url: 'https://www.johnnyseeds.com', variety_name: 'Speckled Pea', price_range: '$8-12 per lb' },
      { supplier_name: 'High Mowing Seeds', supplier_url: 'https://www.highmowingseeds.com', price_range: '$10-14 per lb' }
    ]
  },
  {
    name: 'Radish Microgreens',
    category: 'microgreens',
    scientific_name: 'Raphanus sativus',
    description: 'Spicy, colorful microgreens with fast growth. Excellent profit margins and consistent demand.',
    difficulty_level: 'easy',
    days_to_harvest: 8,
    harvest_frequency: 'weekly',
    harvests_per_year: 52,
    yield_per_sqft_lbs: 2.0,
    space_requirements: 'Dense planting in shallow trays',
    climate_zones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b'],
    growing_methods: ['indoor', 'greenhouse'],
    pricing: [
      { sales_channel: 'farmers_market', price_low: 28, price_high: 45, price_unit: 'per_lb', region: 'southwest', notes: 'Premium for spicy varieties' },
      { sales_channel: 'wholesale', price_low: 20, price_high: 28, price_unit: 'per_lb', region: 'southwest', notes: 'Popular garnish' },
      { sales_channel: 'retail', price_low: 4, price_high: 7, price_unit: 'per_oz', region: 'southwest', notes: 'Clamshell packaging' },
      { sales_channel: 'csa', price_low: 32, price_high: 38, price_unit: 'per_lb', region: 'southwest', notes: 'Fresh-cut premium' }
    ],
    planting_windows: [
      { region: 'southwest', planting_start_month: 1, planting_end_month: 12, harvest_start_month: 1, harvest_end_month: 12, notes: 'Year-round indoors' }
    ],
    seed_sources: [
      { supplier_name: "Johnny's Selected Seeds", supplier_url: 'https://www.johnnyseeds.com', variety_name: 'Rambo Radish', price_range: '$15-20 per lb' },
      { supplier_name: 'True Leaf Market', supplier_url: 'https://www.trueleafmarket.com', price_range: '$14-18 per lb' }
    ]
  },
  // Continue with more microgreens...
  {
    name: 'Broccoli Microgreens',
    category: 'microgreens',
    scientific_name: 'Brassica oleracea',
    description: 'Nutrient-dense microgreens with mild flavor. High demand from health-conscious consumers.',
    difficulty_level: 'easy',
    days_to_harvest: 10,
    harvest_frequency: 'weekly',
    harvests_per_year: 52,
    yield_per_sqft_lbs: 1.8,
    space_requirements: 'Standard density in trays',
    climate_zones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b'],
    growing_methods: ['indoor', 'greenhouse'],
    pricing: [
      { sales_channel: 'farmers_market', price_low: 30, price_high: 48, price_unit: 'per_lb', region: 'southwest', notes: 'Health food appeal' },
      { sales_channel: 'wholesale', price_low: 22, price_high: 30, price_unit: 'per_lb', region: 'southwest', notes: 'Smoothie bars, juice shops' },
      { sales_channel: 'retail', price_low: 5, price_high: 8, price_unit: 'per_oz', region: 'southwest', notes: 'Premium packaging' },
      { sales_channel: 'csa', price_low: 35, price_high: 42, price_unit: 'per_lb', region: 'southwest', notes: 'Superfood premium' }
    ],
    planting_windows: [
      { region: 'southwest', planting_start_month: 1, planting_end_month: 12, harvest_start_month: 1, harvest_end_month: 12, notes: 'Year-round indoors' }
    ],
    seed_sources: [
      { supplier_name: "Johnny's Selected Seeds", supplier_url: 'https://www.johnnyseeds.com', variety_name: 'Waltham', price_range: '$18-25 per lb' },
      { supplier_name: 'High Mowing Seeds', supplier_url: 'https://www.highmowingseeds.com', price_range: '$20-28 per lb' }
    ]
  },

  // SPECIALTY HERBS (12 crops)
  {
    name: 'Gourmet Basil',
    category: 'herbs',
    scientific_name: 'Ocimum basilicum',
    description: 'Premium basil varieties (Genovese, Thai, Purple) with high restaurant demand. Continuous harvest throughout season.',
    difficulty_level: 'easy',
    days_to_harvest: 28,
    harvest_frequency: 'weekly',
    harvests_per_year: 20,
    yield_per_sqft_lbs: 0.75,
    space_requirements: '6-8 inches apart, requires pinching',
    climate_zones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b'],
    growing_methods: ['outdoor', 'greenhouse', 'indoor'],
    pricing: [
      { sales_channel: 'farmers_market', price_low: 12, price_high: 18, price_unit: 'per_lb', region: 'southwest', notes: 'Fresh bunch sales' },
      { sales_channel: 'wholesale', price_low: 8, price_high: 12, price_unit: 'per_lb', region: 'southwest', notes: 'Restaurant staple' },
      { sales_channel: 'retail', price_low: 3, price_high: 5, price_unit: 'per_bunch', region: 'southwest', notes: 'Grocery store bunches' },
      { sales_channel: 'csa', price_low: 14, price_high: 16, price_unit: 'per_lb', region: 'southwest', notes: 'Weekly member favorite' }
    ],
    planting_windows: [
      { region: 'southwest', planting_start_month: 3, planting_end_month: 8, harvest_start_month: 4, harvest_end_month: 10, notes: 'Warm season crop, frost sensitive' }
    ],
    seed_sources: [
      { supplier_name: "Johnny's Selected Seeds", supplier_url: 'https://www.johnnyseeds.com', variety_name: 'Genovese', price_range: '$4-8 per packet' },
      { supplier_name: 'Baker Creek', supplier_url: 'https://www.rareseeds.com', variety_name: 'Thai Basil', price_range: '$3-6 per packet' }
    ]
  },
  {
    name: 'Cilantro',
    category: 'herbs',
    scientific_name: 'Coriandrum sativum',
    description: 'Fast-growing herb with consistent demand. Succession planting recommended for continuous supply.',
    difficulty_level: 'easy',
    days_to_harvest: 21,
    harvest_frequency: 'biweekly',
    harvests_per_year: 12,
    yield_per_sqft_lbs: 0.5,
    space_requirements: '4-6 inches apart, succession plant',
    climate_zones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    growing_methods: ['outdoor', 'greenhouse'],
    pricing: [
      { sales_channel: 'farmers_market', price_low: 10, price_high: 15, price_unit: 'per_lb', region: 'southwest', notes: 'High demand in Southwest' },
      { sales_channel: 'wholesale', price_low: 6, price_high: 10, price_unit: 'per_lb', region: 'southwest', notes: 'Restaurant essential' },
      { sales_channel: 'retail', price_low: 2, price_high: 4, price_unit: 'per_bunch', region: 'southwest', notes: 'Grocery bunches' },
      { sales_channel: 'csa', price_low: 12, price_high: 14, price_unit: 'per_lb', region: 'southwest', notes: 'Fresh weekly supply' }
    ],
    planting_windows: [
      { region: 'southwest', planting_start_month: 2, planting_end_month: 10, harvest_start_month: 3, harvest_end_month: 11, notes: 'Cool season, bolts in heat' }
    ],
    seed_sources: [
      { supplier_name: "Johnny's Selected Seeds", supplier_url: 'https://www.johnnyseeds.com', variety_name: 'Santo', price_range: '$3-5 per packet' },
      { supplier_name: 'Territorial Seed', supplier_url: 'https://territorialseed.com', price_range: '$2-4 per packet' }
    ]
  },

  // HIGH-VALUE VEGETABLES (12 crops)
  {
    name: 'Cherry Tomatoes',
    category: 'vegetables',
    scientific_name: 'Solanum lycopersicum',
    description: 'Premium cherry and grape tomatoes. High yield and excellent market appeal. Indeterminate varieties provide continuous harvest.',
    difficulty_level: 'medium',
    days_to_harvest: 60,
    harvest_frequency: 'weekly',
    harvests_per_year: 12,
    yield_per_sqft_lbs: 8.0,
    space_requirements: '18-24 inches apart, requires staking/trellising',
    climate_zones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b'],
    growing_methods: ['outdoor', 'greenhouse'],
    pricing: [
      { sales_channel: 'farmers_market', price_low: 4, price_high: 6, price_unit: 'per_lb', region: 'southwest', notes: 'Premium for organic/heirloom' },
      { sales_channel: 'wholesale', price_low: 2.5, price_high: 4, price_unit: 'per_lb', region: 'southwest', notes: 'Restaurant consistent demand' },
      { sales_channel: 'retail', price_low: 3, price_high: 5, price_unit: 'per_lb', region: 'southwest', notes: 'Clamshell packaging' },
      { sales_channel: 'csa', price_low: 4.5, price_high: 5.5, price_unit: 'per_lb', region: 'southwest', notes: 'Member favorite' }
    ],
    planting_windows: [
      { region: 'southwest', planting_start_month: 3, planting_end_month: 5, harvest_start_month: 6, harvest_end_month: 10, notes: 'Start indoors, transplant after frost' }
    ],
    seed_sources: [
      { supplier_name: "Johnny's Selected Seeds", supplier_url: 'https://www.johnnyseeds.com', variety_name: 'Sungold', price_range: '$4-7 per packet' },
      { supplier_name: 'High Mowing Seeds', supplier_url: 'https://www.highmowingseeds.com', variety_name: 'Sun Sugar', price_range: '$5-8 per packet' }
    ]
  },

  // SPECIALTY CROPS (8 crops)
  {
    name: 'Gourmet Oyster Mushrooms',
    category: 'specialty',
    scientific_name: 'Pleurotus ostreatus',
    description: 'High-value specialty crop with excellent margins. Year-round production indoors. Multiple flushes per block.',
    difficulty_level: 'medium',
    days_to_harvest: 14,
    harvest_frequency: 'weekly',
    harvests_per_year: 52,
    yield_per_sqft_lbs: 6.0,
    space_requirements: 'Vertical growing blocks, climate controlled',
    climate_zones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b'],
    growing_methods: ['indoor'],
    pricing: [
      { sales_channel: 'farmers_market', price_low: 12, price_high: 18, price_unit: 'per_lb', region: 'southwest', notes: 'Premium for fresh local' },
      { sales_channel: 'wholesale', price_low: 8, price_high: 12, price_unit: 'per_lb', region: 'southwest', notes: 'High-end restaurant demand' },
      { sales_channel: 'retail', price_low: 10, price_high: 15, price_unit: 'per_lb', region: 'southwest', notes: 'Specialty stores' },
      { sales_channel: 'csa', price_low: 14, price_high: 16, price_unit: 'per_lb', region: 'southwest', notes: 'Unique offering' }
    ],
    planting_windows: [
      { region: 'southwest', planting_start_month: 1, planting_end_month: 12, harvest_start_month: 1, harvest_end_month: 12, notes: 'Year-round indoors, climate controlled' }
    ],
    seed_sources: [
      { supplier_name: 'North Spore', supplier_url: 'https://northspore.com', variety_name: 'Blue Oyster', price_range: '$15-25 per kit' },
      { supplier_name: 'Fungi Perfecti', supplier_url: 'https://fungi.com', price_range: '$12-20 per culture' }
    ]
  }
]

// Add more crops following the same pattern...
// This is a comprehensive starter set. I'll add the remaining crops in the next part.

export { crops }
export type { CropData }

