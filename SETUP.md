# GreenGreen - Setup Instructions

## Prerequisites Complete ✅

- ✅ Next.js 16.1 project initialized
- ✅ Dependencies installed
- ✅ All components and pages created
- ✅ Authentication system built
- ✅ Dashboard and profitability calculator complete

## Next Steps: Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Name:** GreenGreen
   - **Database Password:** [Generate and save securely]
   - **Region:** Choose closest to you (e.g., US West)
5. Wait ~2 minutes for project to initialize

### 2. Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `docs/GreenGreen_Schema.sql`
4. Paste into the SQL Editor
5. Click **RUN** (or press Cmd/Ctrl + Enter)
6. Verify success: Go to **Table Editor** and confirm all tables exist:
   - user_profiles
   - crops
   - crop_pricing
   - planting_windows
   - seed_sources
   - buyers
   - user_crops

### 3. Get API Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with "eyJ...")

### 4. Configure Environment Variables

Create `.env.local` file in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Replace with your actual values from step 3.

### 5. Populate Sample Data (Optional but Recommended)

The database is now set up but empty. You have two options:

**Option A: Use the sample data (already in schema.sql)**
The schema includes one sample crop (Sunflower Microgreens). You can test with this.

**Option B: Add more crops manually**
1. Go to **Table Editor** in Supabase
2. Select `crops` table
3. Click "Insert row"
4. Fill in crop details
5. Repeat for `crop_pricing`, `planting_windows`, and `seed_sources` tables

**Option C: Run seed script (Coming soon)**
We'll create a seed script to populate 30-50 crops automatically.

### 6. Test the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

1. Click "Get Started" to sign up
2. Create an account
3. Fill out your profile
4. View dashboard (will be empty until you add crops)

## Application Structure

```
green-green/
├── app/
│   ├── (auth)/          # Auth pages (login, signup)
│   ├── (dashboard)/     # Protected dashboard pages
│   ├── crops/[id]/      # Crop detail pages
│   ├── api/auth/        # Auth callback
│   └── page.tsx         # Homepage
├── components/
│   ├── auth/            # Auth components
│   ├── dashboard/       # Dashboard components
│   ├── crops/           # Crop detail components
│   └── profile/         # Profile components
├── lib/
│   ├── supabase/        # Supabase clients
│   ├── calculator.ts    # Profitability logic
│   ├── planting-recommendations.ts  # Planting logic
│   ├── constants.ts     # App constants
│   └── utils.ts         # Utility functions
└── types/
    └── database.types.ts  # TypeScript types
```

## Features Implemented ✅

### Authentication
- ✅ Email/password signup
- ✅ Login/logout
- ✅ Session management
- ✅ Protected routes

### User Profile
- ✅ Location (ZIP, state)
- ✅ Growing space (sq ft)
- ✅ Growing methods (outdoor, greenhouse, hydroponic, indoor)
- ✅ Sales channels (farmers market, wholesale, retail, CSA)
- ✅ Experience level

### Dashboard
- ✅ Personalized crop recommendations
- ✅ Profitability rankings
- ✅ Filters (category, difficulty, harvest time, season)
- ✅ "Plant This Week" widget
- ✅ Crop cards with revenue calculations

### Crop Detail Pages
- ✅ Profitability calculator
- ✅ Pricing by sales channel
- ✅ Growing requirements
- ✅ Market insights
- ✅ Seed sources
- ✅ Planting windows

### Calculator & Logic
- ✅ Annual revenue calculations
- ✅ Revenue per square foot
- ✅ Personalization by user profile
- ✅ Channel-specific pricing
- ✅ Planting window recommendations
- ✅ Urgency scoring

## What's Next

### Immediate (Complete setup)
1. **Supabase setup** - Follow steps above
2. **Add crop data** - Populate database with crops
3. **Test all features** - Sign up, create profile, view dashboard

### Short-term (Week 1-2)
1. Create seed data script for 30-50 crops
2. Add more sample buyers to directory
3. Mobile optimization and testing
4. Deploy to Vercel

### Future Enhancements (V2)
- Crop comparison tool
- Buyer directory with search
- My Farm dashboard (track planted crops)
- Email notifications
- Weather integration
- More regions beyond Southwest

## Troubleshooting

### "Supabase client error"
- Check `.env.local` has correct URL and key
- Restart dev server after adding env vars

### "No crops showing"
- Database needs crop data
- Check Supabase Table Editor to verify data exists

### "Authentication not working"
- Verify Supabase project is active
- Check RLS policies are created (from schema.sql)
- Confirm env variables are set

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors with `npm run build`

## Support

For issues or questions:
1. Check this documentation
2. Review `docs/GreenGreen_PRD.md` for feature details
3. Check Supabase logs in dashboard

---

**Ready to grow! 🌱💚**

