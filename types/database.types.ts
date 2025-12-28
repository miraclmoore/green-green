export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          location_zip: string | null
          location_state: string | null
          climate_zone: string | null
          growing_space_sqft: number | null
          growing_methods: string[] | null
          sales_channels: string[] | null
          experience_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          location_zip?: string | null
          location_state?: string | null
          climate_zone?: string | null
          growing_space_sqft?: number | null
          growing_methods?: string[] | null
          sales_channels?: string[] | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          location_zip?: string | null
          location_state?: string | null
          climate_zone?: string | null
          growing_space_sqft?: number | null
          growing_methods?: string[] | null
          sales_channels?: string[] | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      crops: {
        Row: {
          id: string
          name: string
          category: string
          scientific_name: string | null
          description: string | null
          difficulty_level: string
          days_to_harvest: number
          harvest_frequency: string
          harvests_per_year: number
          yield_per_sqft_lbs: number
          space_requirements: string | null
          climate_zones: string[] | null
          growing_methods: string[] | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          scientific_name?: string | null
          description?: string | null
          difficulty_level: string
          days_to_harvest: number
          harvest_frequency: string
          harvests_per_year: number
          yield_per_sqft_lbs: number
          space_requirements?: string | null
          climate_zones?: string[] | null
          growing_methods?: string[] | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          scientific_name?: string | null
          description?: string | null
          difficulty_level?: string
          days_to_harvest?: number
          harvest_frequency?: string
          harvests_per_year?: number
          yield_per_sqft_lbs?: number
          space_requirements?: string | null
          climate_zones?: string[] | null
          growing_methods?: string[] | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      crop_pricing: {
        Row: {
          id: string
          crop_id: string
          sales_channel: string
          price_low: number
          price_high: number
          price_unit: string
          region: string | null
          data_source: string | null
          last_updated: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          crop_id: string
          sales_channel: string
          price_low: number
          price_high: number
          price_unit: string
          region?: string | null
          data_source?: string | null
          last_updated?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          crop_id?: string
          sales_channel?: string
          price_low?: number
          price_high?: number
          price_unit?: string
          region?: string | null
          data_source?: string | null
          last_updated?: string
          notes?: string | null
          created_at?: string
        }
      }
      planting_windows: {
        Row: {
          id: string
          crop_id: string
          region: string | null
          climate_zone: string | null
          planting_start_month: number
          planting_end_month: number
          harvest_start_month: number
          harvest_end_month: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          crop_id: string
          region?: string | null
          climate_zone?: string | null
          planting_start_month: number
          planting_end_month: number
          harvest_start_month: number
          harvest_end_month: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          crop_id?: string
          region?: string | null
          climate_zone?: string | null
          planting_start_month?: number
          planting_end_month?: number
          harvest_start_month?: number
          harvest_end_month?: number
          notes?: string | null
          created_at?: string
        }
      }
      seed_sources: {
        Row: {
          id: string
          crop_id: string
          supplier_name: string
          supplier_url: string | null
          variety_name: string | null
          price_range: string | null
          notes: string | null
          is_affiliate: boolean
          created_at: string
        }
        Insert: {
          id?: string
          crop_id: string
          supplier_name: string
          supplier_url?: string | null
          variety_name?: string | null
          price_range?: string | null
          notes?: string | null
          is_affiliate?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          crop_id?: string
          supplier_name?: string
          supplier_url?: string | null
          variety_name?: string | null
          price_range?: string | null
          notes?: string | null
          is_affiliate?: boolean
          created_at?: string
        }
      }
      buyers: {
        Row: {
          id: string
          business_name: string
          buyer_type: string
          location_city: string | null
          location_state: string | null
          location_zip: string | null
          contact_email: string | null
          contact_phone: string | null
          website_url: string | null
          description: string | null
          crops_interested: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_name: string
          buyer_type: string
          location_city?: string | null
          location_state?: string | null
          location_zip?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website_url?: string | null
          description?: string | null
          crops_interested?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_name?: string
          buyer_type?: string
          location_city?: string | null
          location_state?: string | null
          location_zip?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website_url?: string | null
          description?: string | null
          crops_interested?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      user_crops: {
        Row: {
          id: string
          user_id: string
          crop_id: string
          sqft_allocated: number | null
          planting_date: string | null
          expected_harvest_date: string | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          crop_id: string
          sqft_allocated?: number | null
          planting_date?: string | null
          expected_harvest_date?: string | null
          status: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          crop_id?: string
          sqft_allocated?: number | null
          planting_date?: string | null
          expected_harvest_date?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

