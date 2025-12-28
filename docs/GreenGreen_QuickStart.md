# GreenGreen - Quick Start Guide

## 🚀 Ready to Build? Start Here!

This guide will get you from zero to running code in under 30 minutes.

---

## Prerequisites

Make sure you have:
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal access
- [ ] Cursor IDE (for Claude Code integration)

---

## Step 1: Initialize Next.js Project (5 minutes)

```bash
# Create new Next.js project
npx create-next-app@latest greengreen

# When prompted, select:
# ✅ TypeScript: Yes
# ✅ ESLint: Yes
# ✅ Tailwind CSS: Yes
# ✅ src/ directory: No (optional)
# ✅ App Router: Yes
# ✅ Turbopack: Yes (for faster dev)
# ✅ Import alias: Yes (@/*)

cd greengreen
```

---

## Step 2: Set Up Supabase (10 minutes)

### Create Supabase Project
1. Go to https://supabase.com
2. Sign in (or create account)
3. Click "New Project"
4. Fill in:
   - **Name:** GreenGreen
   - **Database Password:** [Generate strong password - SAVE IT!]
   - **Region:** Choose closest to you
5. Wait for project to spin up (~2 minutes)

### Set Up Database
1. In Supabase dashboard, go to **SQL Editor**
2. Copy entire contents of `GreenGreen_Schema.sql`
3. Paste into SQL Editor
4. Click **RUN**
5. Verify tables appear in **Table Editor**

### Get API Keys
1. Go to **Settings** → **API**
2. Copy these values (you'll need them next):
   - `Project URL` (looks like: https://xxxxx.supabase.co)
   - `anon public` key (long string starting with "eyJ...")

---

## Step 3: Install Dependencies & Configure (5 minutes)

```bash
# Install Supabase client
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# Install additional dependencies
npm install recharts lucide-react
npm install -D @types/node
```

### Create Environment Variables
Create `.env.local` file in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace with your actual values from Step 2.

---

## Step 4: Create Supabase Client (5 minutes)

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## Step 5: Deploy to Vercel (5 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# Link to existing project? No
# Project name: greengreen
# Directory: ./
# Override settings? No
```

### Add Environment Variables to Vercel
1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add both env vars from `.env.local`
5. Redeploy

---

## Step 6: Verify Setup

```bash
# Start local dev server
npm run dev
```

Open http://localhost:3000

You should see the default Next.js page. ✅

---

## Next Steps - Start Building!

### Day 1 Priority Tasks:

1. **Build Auth Pages**
   ```
   app/
     auth/
       login/
         page.tsx
       signup/
         page.tsx
   ```

2. **Create Profile Form**
   ```
   app/
     profile/
       page.tsx
   components/
     ProfileForm.tsx
   ```

3. **Test Database Connection**
   - Create a test user via signup
   - Save profile to database
   - Verify data in Supabase Table Editor

### Reference the Sprint Checklist
Open `GreenGreen_Sprint_Checklist.md` and start checking off tasks!

---

## Helpful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Deployment
vercel                   # Deploy to preview
vercel --prod            # Deploy to production

# Database
# Access SQL editor: supabase.com → your project → SQL Editor
```

---

## Folder Structure (Recommended)

```
greengreen/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── auth/                # Auth pages
│   ├── dashboard/           # Main dashboard
│   ├── crops/               # Crop pages
│   ├── buyers/              # Buyer directory
│   └── compare/             # Comparison tool
├── components/
│   ├── CropCard.tsx
│   ├── ProfileForm.tsx
│   ├── Navigation.tsx
│   └── ...
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── calculator.ts        # Profitability logic
│   └── utils.ts             # Helper functions
├── types/
│   └── database.types.ts    # TypeScript types
└── public/
    └── images/              # Crop images
```

---

## Using Claude Code in Cursor

1. Open project in Cursor IDE
2. Press `Cmd+L` (Mac) or `Ctrl+L` (Windows) to open Claude
3. Reference this PRD:
   ```
   "I'm building GreenGreen. Here's the PRD: [paste or reference]
   Help me build the auth signup page."
   ```

4. Claude Code will:
   - Generate component code
   - Set up routing
   - Handle Supabase integration
   - Write tests

---

## Common Issues & Solutions

### Issue: "Supabase client error"
**Solution:** Check `.env.local` has correct URL and key (no quotes, no spaces)

### Issue: "Module not found"
**Solution:** Run `npm install` again, restart dev server

### Issue: "Database query fails"
**Solution:** Verify Row Level Security policies are created (check schema.sql)

### Issue: "Build fails on Vercel"
**Solution:** Ensure environment variables are added in Vercel dashboard

---

## Getting Help

- **Documentation:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Claude Code:** Use Cursor IDE chat (`Cmd+L`)
- **Troubleshooting:** Check `GreenGreen_PRD.md` → Risks & Mitigation section

---

## Daily Development Workflow

### Morning (30 min)
1. Review sprint checklist
2. Pick 2-3 tasks for the day
3. Check Supabase dashboard for any issues

### During Day (6-8 hours)
1. Code in Cursor with Claude Code
2. Test locally after each feature
3. Commit to Git frequently
4. Deploy to Vercel for testing

### Evening (15 min)
1. Update sprint checklist
2. Note any blockers
3. Push code to Git
4. Plan tomorrow's tasks

---

## Success Checkpoints

**End of Day 2:**
- [ ] Auth works (signup/login)
- [ ] User can create profile
- [ ] Profile saves to database

**End of Week 1:**
- [ ] Dashboard shows crops
- [ ] Profitability calculator works
- [ ] Crop detail pages render

**End of Week 2:**
- [ ] All core features complete
- [ ] Mobile responsive
- [ ] Deployed to production
- [ ] 5+ test users signed up

---

## Ready? Let's Build! 🌱💚

Open your terminal, run `npx create-next-app@latest greengreen`, and let's make this happen!

For any questions, reference the full PRD in `GreenGreen_PRD.md`.

**Happy coding!** 🚀
