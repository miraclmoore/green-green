import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getPersonalizedCrops, type CalculatedCrop } from '@/lib/calculator'
import DashboardClient from '@/components/dashboard/DashboardClient'
import type { CropWithPricing } from '@/lib/calculator'
import type { Database } from '@/types/database.types'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profileData, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  const profile = profileData as UserProfile | null

  // Get all crops with pricing
  const { data: crops } = await supabase
    .from('crops')
    .select(`
      *,
      pricing:crop_pricing(*)
    `)
    .order('name')

  const cropsWithPricing = (crops || []) as unknown as CropWithPricing[]

  // Calculate personalized recommendations
  let personalizedCrops: CalculatedCrop[] = []
  let hasCompleteProfile = false

  if (profile && !error) {
    personalizedCrops = getPersonalizedCrops(cropsWithPricing, profile)
    hasCompleteProfile = 
      typeof profile.growing_space_sqft === 'number' && 
      profile.growing_space_sqft > 0 && 
      Array.isArray(profile.sales_channels) && 
      profile.sales_channels.length > 0
  }

  return (
    <DashboardClient 
      crops={personalizedCrops} 
      hasProfile={hasCompleteProfile} 
    />
  )
}

