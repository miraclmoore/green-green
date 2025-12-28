import SignupForm from '@/components/auth/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="mb-8">
        <Link href="/" className="text-3xl font-bold text-green-800">
          🌱 GreenGreen
        </Link>
      </div>
      <SignupForm />
    </div>
  )
}

