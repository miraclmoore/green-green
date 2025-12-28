-- GreenGreen Database Schema for Supabase
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USER PROFILES TABLE
-- =====================================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  location_zip TEXT,
  location_state TEXT,
  climate_zone TEXT, -- Calculated from ZIP
  growing_space_sqft INTEGER,
  growing_methods TEXT[], -- Array: outdoor, greenhouse, hydroponic, indoor
  sales_channels TEXT[], -- Array: farmers_market, wholesale, retail, csa
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read/update their own profile
CREATE POLICY "Users can view own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
  ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- CROPS TABLE
-- =====================================================
CREATE TABLE crops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('microgreens', 'herbs', 'vegetables', 'fruits', 'specialty')),
  scientific_name TEXT,
  description TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  days_to_harvest INTEGER,
  harvest_frequency TEXT CHECK (harvest_frequency IN ('one_time', 'weekly', 'biweekly', 'monthly', 'seasonal')),
  harvests_per_year DECIMAL,
  yield_per_sqft_lbs DECIMAL,
  space_requirements TEXT, -- e.g., "12 inches apart, requires trellising"
  climate_zones TEXT[], -- USDA zones where this grows well
  growing_methods TEXT[], -- Compatible methods: outdoor, greenhouse, hydroponic, indoor
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Make crops table publicly readable
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Crops are viewable by everyone" 
  ON crops FOR SELECT 
  USING (true);

-- Index for faster lookups
CREATE INDEX idx_crops_category ON crops(category);
CREATE INDEX idx_crops_difficulty ON crops(difficulty_level);

-- =====================================================
-- CROP PRICING TABLE
-- =====================================================
CREATE TABLE crop_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE NOT NULL,
  sales_channel TEXT CHECK (sales_channel IN ('farmers_market', 'wholesale', 'retail', 'csa')),
  price_low DECIMAL NOT NULL,
  price_high DECIMAL NOT NULL,
  price_unit TEXT CHECK (price_unit IN ('per_lb', 'per_oz', 'per_bunch', 'per_unit')),
  region TEXT, -- e.g., southwest, northeast, midwest, west_coast
  data_source TEXT, -- e.g., USDA, manual, community
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Make pricing publicly readable
ALTER TABLE crop_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pricing is viewable by everyone" 
  ON crop_pricing FOR SELECT 
  USING (true);

-- Indexes
CREATE INDEX idx_pricing_crop_id ON crop_pricing(crop_id);
CREATE INDEX idx_pricing_channel ON crop_pricing(sales_channel);
CREATE INDEX idx_pricing_region ON crop_pricing(region);

-- =====================================================
-- PLANTING WINDOWS TABLE
-- =====================================================
CREATE TABLE planting_windows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE NOT NULL,
  region TEXT, -- e.g., southwest, northeast (broader than climate zones)
  climate_zone TEXT, -- Optional: specific USDA zone like "7a", "8b"
  planting_start_month INTEGER CHECK (planting_start_month BETWEEN 1 AND 12),
  planting_end_month INTEGER CHECK (planting_end_month BETWEEN 1 AND 12),
  harvest_start_month INTEGER CHECK (harvest_start_month BETWEEN 1 AND 12),
  harvest_end_month INTEGER CHECK (harvest_end_month BETWEEN 1 AND 12),
  notes TEXT, -- e.g., "Plant after last frost date"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Make planting windows publicly readable
ALTER TABLE planting_windows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Planting windows are viewable by everyone" 
  ON planting_windows FOR SELECT 
  USING (true);

CREATE INDEX idx_planting_crop_id ON planting_windows(crop_id);
CREATE INDEX idx_planting_region ON planting_windows(region);

-- =====================================================
-- SEED SOURCES TABLE
-- =====================================================
CREATE TABLE seed_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE NOT NULL,
  supplier_name TEXT NOT NULL,
  supplier_url TEXT,
  variety_name TEXT, -- Optional: specific variety like "Cherry Belle Radish"
  price_range TEXT, -- e.g., "$5-10 per packet"
  notes TEXT,
  is_affiliate BOOLEAN DEFAULT FALSE, -- For future monetization
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Make seed sources publicly readable
ALTER TABLE seed_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Seed sources are viewable by everyone" 
  ON seed_sources FOR SELECT 
  USING (true);

CREATE INDEX idx_seeds_crop_id ON seed_sources(crop_id);

-- =====================================================
-- BUYERS TABLE
-- =====================================================
CREATE TABLE buyers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  buyer_type TEXT CHECK (buyer_type IN ('farmers_market', 'restaurant', 'grocery', 'food_hub', 'csa', 'institutional')),
  location_city TEXT,
  location_state TEXT,
  location_zip TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website_url TEXT,
  description TEXT,
  crops_interested TEXT[], -- Array of crop names or categories
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Make buyers publicly readable
ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers are viewable by everyone" 
  ON buyers FOR SELECT 
  USING (true);

-- Indexes
CREATE INDEX idx_buyers_type ON buyers(buyer_type);
CREATE INDEX idx_buyers_state ON buyers(location_state);
CREATE INDEX idx_buyers_city ON buyers(location_city);

-- =====================================================
-- USER SAVED CROPS TABLE (For V2 - "My Farm" feature)
-- =====================================================
CREATE TABLE user_crops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE NOT NULL,
  sqft_allocated DECIMAL,
  planting_date DATE,
  expected_harvest_date DATE,
  status TEXT CHECK (status IN ('planned', 'planted', 'growing', 'harvested')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for user crops
ALTER TABLE user_crops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own crops" 
  ON user_crops FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own crops" 
  ON user_crops FOR ALL 
  USING (auth.uid() = user_id);

CREATE INDEX idx_user_crops_user_id ON user_crops(user_id);
CREATE INDEX idx_user_crops_status ON user_crops(status);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON crops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_buyers_updated_at BEFORE UPDATE ON buyers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_crops_updated_at BEFORE UPDATE ON user_crops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA INSERTION (Optional - for testing)
-- =====================================================

-- Sample crop: Microgreens (Sunflower)
INSERT INTO crops (name, category, scientific_name, description, difficulty_level, days_to_harvest, harvest_frequency, harvests_per_year, yield_per_sqft_lbs, space_requirements, climate_zones, growing_methods)
VALUES (
  'Sunflower Microgreens',
  'microgreens',
  'Helianthus annuus',
  'Fast-growing, nutty-flavored microgreens popular at farmers markets and restaurants.',
  'easy',
  10,
  'weekly',
  52,
  2.5,
  'Dense planting, 1-2 inches apart',
  ARRAY['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b'],
  ARRAY['indoor', 'greenhouse']
);

-- Get the crop_id for pricing insertion
-- Note: Replace 'CROP_UUID_HERE' with actual UUID after insertion, or use a subquery

-- Sample pricing for Sunflower Microgreens
INSERT INTO crop_pricing (crop_id, sales_channel, price_low, price_high, price_unit, region, data_source, notes)
SELECT id, 'farmers_market', 25.00, 40.00, 'per_lb', 'southwest', 'manual', 'Premium pricing for fresh-cut at markets'
FROM crops WHERE name = 'Sunflower Microgreens';

INSERT INTO crop_pricing (crop_id, sales_channel, price_low, price_high, price_unit, region, data_source, notes)
SELECT id, 'wholesale', 18.00, 25.00, 'per_lb', 'southwest', 'manual', 'Bulk pricing for restaurants'
FROM crops WHERE name = 'Sunflower Microgreens';

-- Sample planting window (year-round for microgreens indoors)
INSERT INTO planting_windows (crop_id, region, planting_start_month, planting_end_month, harvest_start_month, harvest_end_month, notes)
SELECT id, 'southwest', 1, 12, 1, 12, 'Can be grown year-round indoors'
FROM crops WHERE name = 'Sunflower Microgreens';

-- Sample seed source
INSERT INTO seed_sources (crop_id, supplier_name, supplier_url, variety_name, price_range)
SELECT id, 'Johnny''s Selected Seeds', 'https://www.johnnyseeds.com', 'Black Oil Sunflower', '$10-15 per lb'
FROM crops WHERE name = 'Sunflower Microgreens';

-- Sample buyer
INSERT INTO buyers (business_name, buyer_type, location_city, location_state, location_zip, contact_email, description, crops_interested)
VALUES (
  'Green Table Restaurant',
  'restaurant',
  'Santa Fe',
  'NM',
  '87501',
  'chef@greentable.com',
  'Farm-to-table restaurant specializing in local, organic ingredients',
  ARRAY['microgreens', 'herbs', 'specialty']
);

-- =====================================================
-- NOTES FOR DEVELOPER
-- =====================================================

/*
SETUP STEPS:
1. Create Supabase project at supabase.com
2. Run this entire SQL script in SQL Editor
3. Verify tables are created
4. Test RLS policies by signing up a test user
5. Populate crops table with your 30-50 high-value crops
6. Add corresponding pricing, planting windows, and seed sources

SECURITY NOTES:
- Row Level Security (RLS) is enabled on all tables
- User-specific data (profiles, saved crops) is protected
- Public data (crops, pricing, buyers) is readable by everyone
- Only authenticated users can create profiles and save crops

DATA POPULATION WORKFLOW:
1. Manually create crop records (or import CSV)
2. Add pricing for each crop across all 4 sales channels
3. Add planting windows for your target region(s)
4. Add 2-3 seed sources per crop
5. Populate buyer directory manually or via scraping

FUTURE ENHANCEMENTS:
- Add full-text search on crops
- Add geospatial queries for buyer proximity
- Add materialized views for faster dashboard queries
- Add audit logging for pricing updates
*/
