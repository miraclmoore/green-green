# GreenGreen - 2 Week Development Sprint Checklist

## WEEK 1: Foundation & Core Features

### Days 1-2: Setup & Infrastructure ⚙️
- [ ] Initialize Next.js 14 project with App Router
- [ ] Install and configure Tailwind CSS
- [ ] Create Supabase project
- [ ] Set up Supabase database tables (run schema.sql)
- [ ] Configure Supabase Auth
- [ ] Connect Next.js to Supabase
- [ ] Deploy initial version to Vercel
- [ ] Set up environment variables
- [ ] Build signup/login/logout flows
- [ ] Create user profile form component
- [ ] Save user profile to database
- [ ] Test auth flows end-to-end

**Deliverable:** Working auth system with user profiles

---

### Days 3-4: Crop Data & Calculator 🌱
- [ ] Create crop data entry template/script
- [ ] Manually populate 30-50 high-value crops in database
  - Microgreens (10+)
  - Specialty herbs (10+)
  - High-value vegetables (10+)
  - Specialty/ethnic produce (5+)
- [ ] Add pricing data for each crop (all 4 channels)
- [ ] Add planting windows for Southwest region
- [ ] Write profitability calculator function
  - Input: user profile + crop data
  - Output: annual revenue, revenue per sqft
- [ ] Build dashboard page layout
- [ ] Create crop card component
- [ ] Fetch and display personalized crop rankings
- [ ] Implement filter dropdowns (season, category, difficulty)
- [ ] Test calculator accuracy with sample data

**Deliverable:** Working dashboard with personalized crop recommendations

---

### Days 5-7: Crop Pages & Recommendations 📊
- [ ] Create crop detail page template (`/crops/[id]`)
- [ ] Build profitability section component
  - Revenue calculator input
  - Pricing by channel table
  - Yield breakdown
- [ ] Build growing requirements section
  - Climate zones
  - Planting windows
  - Difficulty explanation
  - Space requirements
- [ ] Build market insights section
  - Buyer preferences
  - Demand seasonality
- [ ] Add seed source links section
- [ ] Create basic growing guide component
- [ ] Build "What to Plant This Week" algorithm
  - Filter by current date
  - Match to planting windows
  - Sort by urgency/revenue
- [ ] Display recommendations widget on dashboard
- [ ] Add navigation between pages
- [ ] Test all crop pages for data accuracy

**Deliverable:** Complete crop detail pages + weekly planting recommendations

---

## WEEK 2: Advanced Features & Polish

### Days 8-9: Comparison & Buyer Directory 🔍
- [ ] Build crop comparison page (`/compare`)
- [ ] Create "Add to Compare" functionality (max 3 crops)
- [ ] Build comparison table component
  - Side-by-side metrics
  - Color-coded winners
  - Bar chart visualization
- [ ] Manually populate buyers table (50-100 entries)
  - Southwest region focus
  - All buyer types represented
- [ ] Create buyer directory page (`/buyers`)
- [ ] Build buyer card component
- [ ] Implement filtering (type, location, crops)
- [ ] Add search functionality
- [ ] Test comparison logic
- [ ] Verify buyer contact information

**Deliverable:** Working comparison tool + searchable buyer directory

---

### Days 10-11: UX & Mobile Optimization 📱
- [ ] Audit all pages on mobile (iPhone, Android)
- [ ] Fix responsive layout issues
  - Dashboard crop grid
  - Crop detail tables
  - Comparison tool
  - Buyer directory
- [ ] Add loading states (skeletons, spinners)
- [ ] Add error handling and user feedback
  - Form validation
  - API error messages
  - Empty states
- [ ] Build persistent navigation
  - Header with logo
  - Bottom nav for mobile OR hamburger menu
- [ ] Add breadcrumbs for crop pages
- [ ] Add tooltips/help text where needed
- [ ] Optimize images (Next.js Image component)
- [ ] Implement lazy loading for heavy content
- [ ] Test performance (Lighthouse score)

**Deliverable:** Polished, mobile-friendly experience

---

### Days 12-14: Testing, Bug Fixes & Launch 🚀
- [ ] End-to-end testing checklist:
  - [ ] Signup flow
  - [ ] Profile creation/editing
  - [ ] Dashboard loads with correct data
  - [ ] Filters work correctly
  - [ ] Crop pages display accurate info
  - [ ] Calculator produces correct revenue
  - [ ] Comparison tool works
  - [ ] Buyer directory is searchable
  - [ ] "What to Plant" shows relevant crops
  - [ ] All links work
  - [ ] Mobile experience is smooth
- [ ] Fix identified bugs (prioritize critical ones)
- [ ] Create test accounts with different profiles
- [ ] Seed production database with real data
- [ ] Write README.md with:
  - Product description
  - Setup instructions
  - Data sources documentation
- [ ] Set up analytics (Vercel Analytics or Plausible)
- [ ] Create simple landing page copy
- [ ] Final deployment to production
- [ ] Smoke test in production
- [ ] Soft launch to 5-10 test users
- [ ] Gather initial feedback
- [ ] Create feedback form or Discord/Slack for users

**Deliverable:** Live, tested GreenGreen v1!

---

## Daily Standup Questions
1. What did I complete yesterday?
2. What am I working on today?
3. Any blockers or questions?
4. Am I on track for the 2-week deadline?

## Definition of Done (Each Feature)
- [ ] Code written and tested locally
- [ ] Works on mobile and desktop
- [ ] No console errors
- [ ] Passes basic user testing
- [ ] Deployed to production
- [ ] Documented (if needed)

## Critical Path Items (DO NOT SKIP)
1. ✅ Auth system working
2. ✅ User profiles saving
3. ✅ Crop data populated (30+ crops minimum)
4. ✅ Profitability calculator accurate
5. ✅ Dashboard functional
6. ✅ Crop detail pages complete
7. ✅ Mobile responsive

## Nice-to-Haves (Cut if time runs short)
- Crop comparison tool (can be v1.1)
- Buyer directory (can be v1.1)
- Advanced filters
- Charts/visualizations
- Email notifications

## Post-Launch Immediate Tasks
- [ ] Monitor analytics daily
- [ ] Collect user feedback
- [ ] Fix critical bugs within 24 hours
- [ ] Plan v1.1 improvements based on feedback
- [ ] Start building email list
- [ ] Share on relevant communities (Reddit, Facebook groups, etc.)

---

## Resources & Links
- **Supabase Dashboard:** [Insert link after setup]
- **Vercel Dashboard:** [Insert link after setup]
- **GitHub Repo:** [Insert link]
- **Production URL:** [Insert link]
- **Analytics:** [Insert link]

## Emergency Contacts
- **Claude Code:** Available 24/7 for debugging
- **Supabase Support:** support.supabase.io
- **Vercel Support:** vercel.com/support

---

**Remember:** Progress > Perfection. Ship v1, then iterate!
