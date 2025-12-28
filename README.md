# GreenGreen 🌱💚

**The Real-Time Profitability Partner for Small-Scale Growers**

GreenGreen is a web application that empowers small and medium local growers, hobbyists, and agricultural entrepreneurs to maximize profitability through data-driven insights on crop selection, pricing strategies, and market opportunities.

## 🎯 Features

- **Profitability Calculator**: Personalized crop recommendations ranked by revenue potential
- **Channel-Specific Pricing**: Compare earnings across farmers markets, wholesale, retail, and CSA
- **Planting Recommendations**: "What to plant this week" based on your location and season
- **Crop Comparison Tool**: Side-by-side analysis of crop profitability and requirements
- **Buyer Directory**: Connect with local restaurants, markets, and food hubs
- **Growing Guides**: Complete information on planting, harvesting, and seed sources

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Hosting**: Vercel
- **UI Components**: Headless UI / shadcn/ui
- **Charts**: Recharts

## 📋 Project Status

Currently in active development - 2-week sprint to MVP launch.

See `/docs` folder for complete documentation:
- `GreenGreen_PRD.md` - Full Product Requirements Document
- `GreenGreen_QuickStart.md` - Development setup guide
- `GreenGreen_Schema.sql` - Database schema
- `GreenGreen_Sprint_Checklist.md` - Development checklist

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Vercel account (for deployment)

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/green-green.git
cd green-green
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Add your Supabase credentials
```

4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Project Structure

```
green-green/
├── app/                 # Next.js app directory
├── components/          # Reusable React components
├── lib/                 # Utility functions and configurations
├── types/               # TypeScript type definitions
├── public/              # Static assets
└── docs/                # Project documentation
```

## 🎯 Target Users

- **Hobbyist Growers**: 200-1000 sq ft, backyard gardens
- **Side-Hustle Farmers**: 0.5-2 acres, multiple sales channels
- **Small Commercial Growers**: 5-10 acres, established operations

## 📊 Success Metrics

- 100+ registered users in first 90 days
- 60% profile completion rate
- 30% weekly active users
- Users discover at least 1 new profitable crop

## 🗺️ Roadmap

### V1 (Current - 2 Weeks)
- ✅ User authentication and profiles
- ✅ Crop profitability calculator
- ✅ Crop detail pages
- ✅ Weekly planting recommendations
- ✅ Crop comparison tool
- ✅ Buyer directory

### V2 (Weeks 3-6)
- My Farm Dashboard
- Harvest reminders
- Community price reporting
- Expanded geography
- Weather integration

### V3 (Months 3-6)
- Mobile app
- Advanced analytics
- Buyer marketplace
- Crop planning tool
- Educational content

## 🤝 Contributing

This project is currently in private development. Contributions will be welcome after initial launch.

## 📄 License

Copyright © 2025 GreenGreen. All rights reserved.

## 📧 Contact

For questions or feedback, please contact [your-email@example.com]

---

Built with ❤️ for small-scale growers everywhere

