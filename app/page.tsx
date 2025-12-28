import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-green-50 to-white">
      <main className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-green-800">
            🌱 GreenGreen
          </h1>
          <p className="text-2xl text-gray-700 font-medium">
            The Real-Time Profitability Partner for Small-Scale Growers
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make data-driven decisions about what to plant. Get personalized crop recommendations,
            pricing insights, and maximize your revenue per square foot.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Sign In
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-lg mb-2">Profitability Calculator</h3>
            <p className="text-gray-600 text-sm">
              See exactly how much you can earn from each crop based on your space and sales channels
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">🌤️</div>
            <h3 className="font-semibold text-lg mb-2">Plant This Week</h3>
            <p className="text-gray-600 text-sm">
              Get timely recommendations on what to plant right now for your location and season
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-lg mb-2">Channel Pricing</h3>
            <p className="text-gray-600 text-sm">
              Compare earnings across farmers markets, wholesale, retail, and CSA channels
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

