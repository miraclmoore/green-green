import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileForm from '@/components/profile/ProfileForm'

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Try to get existing profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
            <p className="mt-2 text-gray-600">
              Tell us about your growing setup so we can personalize your recommendations
            </p>
          </div>

          <ProfileForm 
            initialData={profile || undefined} 
            userId={user.id} 
          />
        </div>
      </div>
    </div>
  )
}

