import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/auth/LogoutButton'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-2xl font-bold text-green-800">
                🌱 GreenGreen
              </Link>
              <div className="hidden md:flex gap-4">
                <Link 
                  href="/dashboard" 
                  className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/profile" 
                  className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
                >
                  Profile
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
      
      {children}
    </div>
  )
}

