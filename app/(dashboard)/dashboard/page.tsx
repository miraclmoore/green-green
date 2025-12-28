import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getPersonalizedCrops } from '@/lib/calculator'
import DashboardClient from '@/components/dashboard/DashboardClient'
import type { CropWithPricing } from '@/lib/calculator'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

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
  const personalizedCrops = profile 
    ? getPersonalizedCrops(cropsWithPricing, profile)
    : []

  // If no profile, show all crops sorted by default profitability
  // (assuming 1000 sq ft and farmers market channel)
  const displayCrops = personalizedCrops.length > 0 
    ? personalizedCrops 
    : []

  return (
    <DashboardClient 
      crops={displayCrops} 
      hasProfile={!!profile && !!(profile.growing_space_sqft && profile.sales_channels?.length)} 
    />
  )
}

