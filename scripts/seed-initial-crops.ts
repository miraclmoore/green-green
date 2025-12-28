#!/usr/bin/env ts-node
/**
 * Seed Script for GreenGreen Initial Crops
 * 
 * This script populates the database with 50 pre-researched high-value crops
 * including pricing, planting windows, and seed sources.
 * 
 * Usage:
 *   npm run seed:crops
 *   
 * Or with environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL=your_url NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key npm run seed:crops
 */

import { createClient } from '@supabase/supabase-js'
import { crops } from './crop-data'
import type { Database } from '../types/database.types'

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

async function seedCrops() {
  console.log('🌱 Starting crop data seeding...\n')
  console.log(`📊 Total crops to seed: ${crops.length}\n`)

  let successCount = 0
  let errorCount = 0

  for (const cropData of crops) {
    try {
      console.log(`\n📦 Processing: ${cropData.name}`)
      
      // 1. Insert crop
      const { data: crop, error: cropError } = await supabase
        .from('crops')
        .insert({
          name: cropData.name,
          category: cropData.category,
          scientific_name: cropData.scientific_name,
          description: cropData.description,
          difficulty_level: cropData.difficulty_level,
          days_to_harvest: cropData.days_to_harvest,
          harvest_frequency: cropData.harvest_frequency,
          harvests_per_year: cropData.harvests_per_year,
          yield_per_sqft_lbs: cropData.yield_per_sqft_lbs,
          space_requirements: cropData.space_requirements,
          climate_zones: cropData.climate_zones,
          growing_methods: cropData.growing_methods,
        })
        .select()
        .single()

      if (cropError) {
        throw new Error(`Failed to insert crop: ${cropError.message}`)
      }

      console.log(`  ✓ Crop created (ID: ${crop.id})`)

      // 2. Insert pricing
      if (cropData.pricing.length > 0) {
        const pricingData = cropData.pricing.map(p => ({
          crop_id: crop.id,
          sales_channel: p.sales_channel,
          price_low: p.price_low,
          price_high: p.price_high,
          price_unit: p.price_unit,
          region: p.region,
          data_source: 'manual',
          notes: p.notes,
        }))

        const { error: pricingError } = await supabase
          .from('crop_pricing')
          .insert(pricingData)

        if (pricingError) {
          throw new Error(`Failed to insert pricing: ${pricingError.message}`)
        }

        console.log(`  ✓ Added ${cropData.pricing.length} pricing entries`)
      }

      // 3. Insert planting windows
      if (cropData.planting_windows.length > 0) {
        const windowData = cropData.planting_windows.map(w => ({
          crop_id: crop.id,
          region: w.region,
          planting_start_month: w.planting_start_month,
          planting_end_month: w.planting_end_month,
          harvest_start_month: w.harvest_start_month,
          harvest_end_month: w.harvest_end_month,
          notes: w.notes,
        }))

        const { error: windowError } = await supabase
          .from('planting_windows')
          .insert(windowData)

        if (windowError) {
          throw new Error(`Failed to insert planting windows: ${windowError.message}`)
        }

        console.log(`  ✓ Added ${cropData.planting_windows.length} planting windows`)
      }

      // 4. Insert seed sources
      if (cropData.seed_sources.length > 0) {
        const seedData = cropData.seed_sources.map(s => ({
          crop_id: crop.id,
          supplier_name: s.supplier_name,
          supplier_url: s.supplier_url,
          variety_name: s.variety_name || null,
          price_range: s.price_range,
        }))

        const { error: seedError } = await supabase
          .from('seed_sources')
          .insert(seedData)

        if (seedError) {
          throw new Error(`Failed to insert seed sources: ${seedError.message}`)
        }

        console.log(`  ✓ Added ${cropData.seed_sources.length} seed sources`)
      }

      successCount++
      console.log(`  ✅ ${cropData.name} completed successfully`)

    } catch (error) {
      errorCount++
      console.error(`  ❌ Error seeding ${cropData.name}:`, error)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('🎉 Seeding Complete!')
  console.log('='.repeat(60))
  console.log(`✅ Successfully seeded: ${successCount} crops`)
  console.log(`❌ Errors: ${errorCount} crops`)
  console.log('='.repeat(60))

  if (errorCount > 0) {
    process.exit(1)
  }
}

// Run the seed function
seedCrops()
  .then(() => {
    console.log('\n✨ Database is now populated with crop data!')
    console.log('🚀 You can now run: npm run dev')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Fatal error during seeding:', error)
    process.exit(1)
  })

