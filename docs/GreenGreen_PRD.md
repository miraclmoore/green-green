# GreenGreen - Product Requirements Document (PRD)

## Executive Summary

**Product Name:** GreenGreen

**Tagline:** The Real-Time Profitability Partner for Small-Scale Growers

**Vision:** Empower small and medium local growers, hobbyists, and agricultural entrepreneurs to maximize profitability by providing data-driven insights on crop selection, pricing strategies, and market opportunities.

**Target Launch:** 2 weeks from start date

**Platform:** Web application (mobile-responsive)

---

## Product Overview

### The Problem
Small-scale growers (backyard hobbyists to 5-10 acre farms) lack access to actionable profitability data. They currently rely on:
- Peer pricing ("What's the farmer next to me charging?")
- Trial and error
- Cost-plus guesswork
- Limited knowledge of which crops yield the best returns

This information gap leads to:
- Suboptimal crop selection
- Leaving money on the table
- Wasted growing space on low-value crops
- Missed market opportunities

### The Solution
GreenGreen is a web-based profitability calculator and market intelligence platform that helps growers:
1. Identify the most profitable crops for their specific situation (location, space, growing method)
2. Understand pricing across different sales channels (farmers markets, wholesale, retail, CSA)
3. Get actionable planting recommendations based on current season and location
4. Connect with potential buyers
5. Access seed sources and basic growing guidance

### Key Differentiators
- **Channel-specific pricing:** Show revenue potential across farmers markets, wholesale, retail, and direct sales
- **Personalized recommendations:** Based on user's actual growing conditions and sales channels
- **Actionable timing:** "What to plant this week" based on location and season
- **High-value crop focus:** Emphasis on specialty crops, microgreens, herbs, and premium produce
- **Complete workflow:** Research → Decide → Source seeds → Plant

---

## Target Users

### Primary Personas

**1. The Hobbyist Grower (Sarah)**
- 200-1000 sq ft growing space
- Backyard garden or small greenhouse
- Sells at local farmers markets or to neighbors
- Limited agricultural knowledge
- Goal: Supplement income while enjoying gardening
- Pain: Doesn't know which crops are worth the effort

**2. The Side-Hustle Farmer (Miguel)**
- 0.5-2 acre plot
- Mix of outdoor and greenhouse/hoop house
- Sells to restaurants, farmers markets, small CSA
- Some agricultural experience
- Goal: Turn passion into profitable side business
- Pain: Wastes space on low-margin crops, pricing uncertainty

**3. The Small Commercial Grower (Jennifer)**
- 5-10 acres
- Multiple growing methods (field, greenhouse, hydroponic)
- Established wholesale relationships + farmers markets
- Experienced grower
- Goal: Optimize crop mix for maximum revenue per acre
- Pain: Can't easily compare profitability across crop options

### User Demographics
- **Geography:** United States (initial focus: Southwest)
- **Farm Size:** Backyard (100 sq ft) to 10 acres
- **Growing Methods:** All (outdoor, greenhouse, hydroponic, indoor)
- **Experience Level:** Beginner to intermediate
- **Tech Comfort:** Must work on mobile devices (in-field usage)

---

## Product Goals & Success Metrics

### Business Goals
1. Launch functional MVP within 2 weeks
2. Validate product-market fit with small growers
3. Build defensible data moat through aggregated pricing intelligence
4. Create foundation for future monetization (subscriptions, affiliates, data licensing)

### User Goals
1. Spend less time researching crop profitability
2. Make more confident decisions about what to plant
3. Increase revenue per square foot of growing space
4. Discover new high-value crop opportunities

### Success Metrics (90 days post-launch)
- **Engagement:** 100+ registered users
- **Activation:** 60% of signups complete full profile (location, space, method)
- **Retention:** 30% weekly active users
- **Value Delivery:** Users report finding at least 1 new profitable crop to try
- **Data Quality:** Pricing data updated weekly for top 30 crops

---

## Core Features - V1 (2 Week MVP)

### 1. User Authentication & Profile

**Description:** Simple account creation to save user preferences and personalize recommendations

**User Story:** "As a grower, I want to save my location and growing setup so I get relevant crop recommendations every time I visit."

**Requirements:**
- Email/password authentication via Supabase Auth
- User profile fields:
  - Location (ZIP code or State)
  - Total growing space (sq ft)
  - Growing method(s): Outdoor, Greenhouse, Hydroponic, Indoor (multi-select)
  - Primary sales channel(s): Farmers Market, Wholesale/Restaurant, Retail/Grocery, CSA/Direct (multi-select)
  - Experience level: Beginner, Intermediate, Advanced
- Profile is editable after creation
- No social login required for v1

**Success Criteria:**
- User can create account in < 60 seconds
- Profile saves and persists across sessions
- Mobile-friendly form inputs

---

### 2. Profitability Calculator & Dashboard

**Description:** Main dashboard showing personalized crop recommendations ranked by revenue potential

**User Story:** "As a grower, I want to see which crops will make me the most money based on my growing space and sales channels."

**Requirements:**

**Dashboard View:**
- Top 20-30 crops ranked by potential annual revenue
- Each crop card shows:
  - Crop name and category (microgreens, herbs, vegetables, fruits, specialty)
  - Revenue range per year (based on user's space and selected sales channels)
  - Revenue per sq ft
  - Difficulty level (Easy/Medium/Hard)
  - Days to first harvest
  - Harvest frequency (one-time vs recurring)
  - Quick visual indicator (color-coded profitability: high/medium/low)

**Filters:**
- By season (Spring, Summer, Fall, Winter, Year-round)
- By category (Microgreens, Herbs, Vegetables, Fruits, Specialty)
- By difficulty level
- By time to harvest (< 30 days, 30-60 days, 60-90 days, 90+ days)
- By sales channel compatibility

**Calculator Logic:**
```
Annual Revenue Potential = 
  (User's sq ft) × (Crop yield per sq ft) × (Price per unit for selected channel) × (Harvests per year)
```

**Personalization:**
- Uses user's primary sales channel(s) for pricing
- Applies regional pricing multiplier based on location
- Filters out crops incompatible with user's growing method
- Adjusts for climate zone/growing season based on location

**Success Criteria:**
- Dashboard loads in < 2 seconds
- Revenue calculations are transparent (user can see the math)
- Results update when user changes filters
- Mobile scrolling is smooth

---

### 3. Crop Deep-Dive Pages

**Description:** Detailed information page for each crop with pricing breakdown, growing requirements, and buyer insights

**User Story:** "As a grower, I want to understand the full picture of a crop's profitability and requirements before committing space to it."

**Requirements:**

**Each Crop Page Includes:**

**Profitability Section:**
- Revenue calculator specific to this crop
  - Input: sq ft dedicated to this crop
  - Output: Projected annual revenue breakdown
- Pricing by sales channel table:
  ```
  | Sales Channel        | Price Range      | Notes                    |
  |---------------------|------------------|--------------------------|
  | Farmers Market      | $25-40/lb        | Best for retail bunches  |
  | Wholesale/Restaurant| $18-25/lb        | Requires consistent supply|
  | Retail/Grocery      | $3-6/oz packaged | Needs packaging/labeling |
  | CSA/Direct          | $30-35/lb        | Premium for fresh-cut    |
  ```
- Regional price variations (if available)
- Yield expectations (lbs per sq ft, harvests per year)

**Growing Requirements:**
- Climate zones (USDA hardiness zones)
- Best planting windows by region
- Days to maturity/first harvest
- Growing difficulty level with brief explanation
- Space requirements (plant spacing)
- Special requirements (e.g., "Requires trellising," "Shade tolerant")

**Market Insights:**
- Which buyer types prefer this crop most
- Demand seasonality (high demand months)
- Common uses/applications
- Shelf life considerations

**Seed Sources:**
- 2-3 reputable seed supplier links
- Variety recommendations if applicable
- Estimated seed cost per sq ft

**Basic Growing Guide:**
- Planting tips (depth, spacing, method)
- Watering needs
- Common issues to watch for
- Harvest tips
- Link to more detailed external resources (extension services, guides)

**Success Criteria:**
- Each crop page loads in < 1 second
- Pricing data is clearly sourced and dated
- Mobile-readable formatting
- Easy navigation back to dashboard

---

### 4. "What to Plant This Week" Feature

**Description:** Personalized, actionable planting recommendations based on current date and user's location

**User Story:** "As a grower, I want to know exactly what I should plant right now to maximize my returns this season."

**Requirements:**

**Recommendation Engine:**
- Shows 5-10 crops that should be planted "this week" (current 7-day window)
- Based on:
  - User's location (climate zone, frost dates)
  - Current calendar date
  - User's growing method
  - Crop's planting windows
  - Time to harvest (prioritizes crops that will mature before season end)

**Display Format:**
- Card-based layout with:
  - Crop name
  - "Plant by [date]" urgency indicator
  - Expected harvest date
  - Revenue potential
  - Quick reason: "Last chance for fall harvest" or "Perfect timing for spring crop"
- Sorted by urgency/opportunity

**Weekly Updates:**
- Recommendations refresh every Monday
- Optional: Email notification of new recommendations (v2)

**Success Criteria:**
- Recommendations feel timely and relevant to user's location
- At least 3-5 crops shown at any given time
- Clear call-to-action: "View crop details" or "Add to my plan"

---

### 5. Crop Comparison Tool

**Description:** Side-by-side comparison of 2-3 crops to aid decision-making

**User Story:** "As a grower with limited space, I want to compare my top crop options to make the best choice."

**Requirements:**

**Comparison Interface:**
- User selects 2-3 crops from dashboard or search
- Side-by-side table comparing:
  - Annual revenue potential (for user's space)
  - Revenue per sq ft
  - Days to first harvest
  - Harvest frequency
  - Difficulty level
  - Primary sales channels
  - Space efficiency rating
  - Growing season compatibility

**Visual Comparison:**
- Color-coded highlights for "best in category"
- Bar charts for revenue comparison
- Clear winner indicators where applicable

**Use Cases:**
- "Should I grow microgreens or specialty lettuce?"
- "Compare three herb options for my 50 sq ft greenhouse"

**Success Criteria:**
- Comparison loads instantly
- Easy to add/remove crops from comparison
- Helps user make quick decisions
- Mobile-friendly side-scroll or stacked layout

---

### 6. Basic Buyer Directory

**Description:** Categorized directory of potential buyers for growers' products

**User Story:** "As a grower, I want to find local restaurants, markets, and food hubs that might buy my crops."

**Requirements:**

**Directory Structure:**
- Buyers categorized by type:
  - Farmers Markets
  - Restaurants & Chefs
  - Grocery Stores & Co-ops
  - Food Hubs & Distributors
  - CSA Programs
  - Institutional Buyers (schools, hospitals)

**Buyer Profiles (Simple v1):**
- Business name
- Type/category
- Location (city, state)
- Contact information (email, phone, website)
- Crops they typically buy (tags/categories)
- Brief description
- No transaction/booking features in v1

**Search & Filtering:**
- Filter by:
  - Buyer type
  - Location (proximity to user's ZIP)
  - Crops interested in
- Simple search by name or keyword

**Data Source:**
- Initial v1: Manually curated 50-100 buyers in Southwest US
- Future: Scraped from Local Harvest, USDA Food Hub directory, state ag lists
- Users can submit buyer suggestions (manual review)

**Success Criteria:**
- Directory is easily browsable on mobile
- Contact information is accurate and up-to-date
- Useful even with limited initial data (quality over quantity)

---

## Technical Architecture

### Tech Stack

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Context API (for v1, Redux if needed in v2)
- **UI Components:** Headless UI or shadcn/ui for modals, dropdowns, etc.
- **Charts/Visualizations:** Recharts or Chart.js (for comparison tool, revenue projections)

**Backend & Database:**
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **API:** Next.js API routes (for custom logic) + Supabase client-side queries
- **Real-time:** Supabase real-time subscriptions (if needed for live updates)

**Hosting & Deployment:**
- **Hosting:** Vercel (frontend + serverless functions)
- **Database:** Supabase Cloud (free tier initially)
- **Domain:** Custom domain (greengreen.app or similar)

**Data Updates:**
- **Cron Jobs:** Vercel Cron or Supabase Edge Functions
- **Schedule:** Weekly updates for pricing data
- **Manual triggers:** Admin can force data refresh

**Third-Party Integrations:**
- **USDA APIs:** Agricultural Marketing Service (AMS), NASS Quick Stats
- **Weather API (v2):** For frost dates, planting windows
- **Email:** Vercel Email or Resend (for transactional emails in v2)

---

### Database Schema

**Users Table:**
```sql
users (
  id UUID PRIMARY KEY (Supabase Auth user ID)
  email TEXT UNIQUE NOT NULL
  created_at TIMESTAMP DEFAULT NOW()
  updated_at TIMESTAMP DEFAULT NOW()
)
```

**User Profiles Table:**
```sql
user_profiles (
  id UUID PRIMARY KEY
  user_id UUID REFERENCES users(id) ON DELETE CASCADE
  location_zip TEXT
  location_state TEXT
  climate_zone TEXT (calculated from ZIP)
  growing_space_sqft INTEGER
  growing_methods TEXT[] (array: outdoor, greenhouse, hydroponic, indoor)
  sales_channels TEXT[] (array: farmers_market, wholesale, retail, csa)
  experience_level TEXT (beginner, intermediate, advanced)
  created_at TIMESTAMP DEFAULT NOW()
  updated_at TIMESTAMP DEFAULT NOW()
)
```

**Crops Table:**
```sql
crops (
  id UUID PRIMARY KEY
  name TEXT NOT NULL
  category TEXT (microgreens, herbs, vegetables, fruits, specialty)
  scientific_name TEXT
  description TEXT
  difficulty_level TEXT (easy, medium, hard)
  days_to_harvest INTEGER
  harvest_frequency TEXT (one_time, weekly, biweekly, monthly, seasonal)
  harvests_per_year DECIMAL
  yield_per_sqft_lbs DECIMAL
  space_requirements TEXT (plant spacing, trellis needed, etc.)
  climate_zones TEXT[] (USDA zones where this grows)
  growing_methods TEXT[] (compatible methods)
  image_url TEXT
  created_at TIMESTAMP DEFAULT NOW()
  updated_at TIMESTAMP DEFAULT NOW()
)
```

**Crop Pricing Table:**
```sql
crop_pricing (
  id UUID PRIMARY KEY
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE
  sales_channel TEXT (farmers_market, wholesale, retail, csa)
  price_low DECIMAL (low end of price range)
  price_high DECIMAL (high end of price range)
  price_unit TEXT (per_lb, per_oz, per_bunch, per_unit)
  region TEXT (southwest, northeast, midwest, etc.)
  data_source TEXT (USDA, manual, community)
  last_updated TIMESTAMP
  notes TEXT
)
```

**Planting Windows Table:**
```sql
planting_windows (
  id UUID PRIMARY KEY
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE
  region TEXT (southwest, northeast, etc.) OR climate_zone TEXT
  planting_start_month INTEGER (1-12)
  planting_end_month INTEGER (1-12)
  harvest_start_month INTEGER (1-12)
  harvest_end_month INTEGER (1-12)
  notes TEXT (e.g., "Plant after last frost")
)
```

**Seed Sources Table:**
```sql
seed_sources (
  id UUID PRIMARY KEY
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE
  supplier_name TEXT
  supplier_url TEXT
  variety_name TEXT (optional, specific variety)
  price_range TEXT (e.g., "$5-10 per packet")
  notes TEXT
  is_affiliate BOOLEAN DEFAULT FALSE
)
```

**Buyers Table:**
```sql
buyers (
  id UUID PRIMARY KEY
  business_name TEXT NOT NULL
  buyer_type TEXT (farmers_market, restaurant, grocery, food_hub, csa, institutional)
  location_city TEXT
  location_state TEXT
  location_zip TEXT
  contact_email TEXT
  contact_phone TEXT
  website_url TEXT
  description TEXT
  crops_interested TEXT[] (tags/categories)
  created_at TIMESTAMP DEFAULT NOW()
  updated_at TIMESTAMP DEFAULT NOW()
)
```

**User Saved Crops (v2 - for "My Farm" feature):**
```sql
user_crops (
  id UUID PRIMARY KEY
  user_id UUID REFERENCES users(id) ON DELETE CASCADE
  crop_id UUID REFERENCES crops(id) ON DELETE CASCADE
  sqft_allocated DECIMAL
  planting_date DATE
  expected_harvest_date DATE
  status TEXT (planned, planted, growing, harvested)
  notes TEXT
  created_at TIMESTAMP DEFAULT NOW()
)
```

---

### Data Strategy

**Initial Data Population (Manual + Semi-Automated):**

**Phase 1: Core Crops (Week 1)**
- Manually curate 30-50 high-value crops
  - Focus: Microgreens, specialty herbs, gourmet mushrooms, ethnic produce, high-demand vegetables
  - Sources: Extension service guides, seed catalogs, grower forums
- Create crop records with growing requirements
- Input planting windows by region (Southwest initially, expand later)

**Phase 2: Pricing Data (Week 1-2)**
- **USDA AMS API:** Pull available wholesale terminal market prices
  - Endpoint: https://marsapi.ams.usda.gov/services/v1.2/reports
  - Update frequency: Weekly via cron job
  - Coverage: Limited to commodity crops, use as baseline
  
- **Manual Price Research:**
  - Farmers market prices: Survey LocalHarvest listings, state ag market reports
  - Wholesale: Call local food hubs, check restaurant supplier catalogs
  - Retail: Spot-check grocery store prices (Whole Foods, local co-ops)
  - Enter price ranges by channel and region into crop_pricing table
  
- **Regional Adjustments:**
  - Use USDA regional price indices to adjust base prices
  - Start with 3-4 regions: Southwest, West Coast, Midwest, Southeast

**Phase 3: Buyer Directory (Week 2)**
- Manually add 50-100 buyers in target regions
  - Start: New Mexico, Arizona, Colorado (Southwest)
  - Sources: 
    - USDA Local Food Directories
    - LocalHarvest marketplace
    - State agriculture department buyer lists
    - Direct outreach to farmers markets, food hubs
- Categorize and tag with crop interests

**Phase 4: Seed Sources (Week 2)**
- Add 2-3 reputable seed suppliers per crop
  - Johnny's Selected Seeds, High Mowing Seeds, Territorial Seed, Baker Creek, etc.
  - Include direct product links where possible
  - Note any affiliate program opportunities (for v2 monetization)

**Automation Roadmap (Post-V1):**
- **Week 3-4:** Build web scraper for state ag market reports (PDF parsing)
- **Month 2:** Integrate additional USDA NASS data via API
- **Month 3:** Crowdsource pricing validation from users (community reporting)
- **Month 6:** Explore paid data partnerships (FreshPlaza, agricultural pricing services)

**Data Quality & Maintenance:**
- Weekly automated updates where possible (USDA APIs)
- Monthly manual review of pricing ranges
- User-reported price submissions (reviewed before publishing)
- Flagging system for outdated data (auto-flag if not updated in 90 days)

---

## User Experience & Design

### Design Principles
1. **Mobile-First:** Growers use this in the field, on phones
2. **Clarity Over Cleverness:** Data-dense but scannable
3. **Action-Oriented:** Every page has a clear next step
4. **Trust Through Transparency:** Show data sources, update dates, calculation logic

### Key User Flows

**Flow 1: New User Onboarding**
1. Land on homepage with value prop + CTA "Get Started"
2. Sign up with email/password
3. Complete profile wizard (5 steps):
   - Location
   - Growing space
   - Growing methods
   - Sales channels
   - Experience level
4. See personalized dashboard with top crop recommendations
5. Prompt: "Explore a crop" or "See what to plant this week"

**Flow 2: Research & Decision**
1. View dashboard with ranked crops
2. Apply filters (season, category, difficulty)
3. Click crop card → Deep-dive page
4. Review profitability, requirements, pricing
5. Compare 2-3 finalist crops
6. Decision made → See seed sources, add to plan (v2)

**Flow 3: Weekly Check-In**
1. User returns to app (or receives email in v2)
2. See "What to Plant This Week" widget
3. Review 5 timely recommendations
4. Click crop → Deep-dive → Get seeds

**Flow 4: Finding Buyers**
1. Navigate to Buyer Directory
2. Filter by type and location
3. Browse listings
4. Contact buyer directly (external to app in v1)

### Design Mockup Priorities (To Build)
- **Homepage:** Clear value prop, CTA, sample data preview
- **Dashboard:** Card grid layout, responsive, filterable
- **Crop Page:** Clean layout with tabs/sections (Profitability, Growing, Market, Seeds)
- **Comparison Tool:** Table or split-screen view
- **Mobile Navigation:** Bottom nav bar or hamburger menu

---

## Development Roadmap - 2 Week Sprint

### Week 1: Foundation & Core Features

**Days 1-2: Setup & Infrastructure**
- [ ] Initialize Next.js project with Tailwind CSS
- [ ] Set up Supabase project (database + auth)
- [ ] Create database schema and tables
- [ ] Set up Vercel deployment pipeline
- [ ] Build basic auth flows (signup, login, logout)
- [ ] Create user profile form and save to DB

**Days 3-4: Crop Data & Calculator**
- [ ] Populate crops table with 30 high-value crops (manual data entry)
- [ ] Input pricing data for each crop by channel
- [ ] Input planting windows for Southwest region
- [ ] Build profitability calculator logic (backend function)
- [ ] Create dashboard page with crop cards
- [ ] Implement basic filtering (season, category)

**Days 5-7: Crop Pages & Recommendations**
- [ ] Build crop deep-dive page template
- [ ] Display profitability section with channel pricing table
- [ ] Display growing requirements and market insights
- [ ] Add seed source links
- [ ] Build "What to Plant This Week" recommendation engine
- [ ] Display recommendations on dashboard

### Week 2: Advanced Features & Polish

**Days 8-9: Comparison & Buyer Directory**
- [ ] Build crop comparison tool (select & compare interface)
- [ ] Populate buyers table with 50+ initial listings
- [ ] Create buyer directory page with filtering
- [ ] Display buyer profiles

**Days 10-11: UX & Mobile Optimization**
- [ ] Refine mobile responsive layouts (all pages)
- [ ] Add loading states and error handling
- [ ] Improve navigation (persistent nav, breadcrumbs)
- [ ] Add tooltips/help text for clarity
- [ ] Optimize performance (lazy loading, image optimization)

**Days 12-14: Testing & Launch Prep**
- [ ] End-to-end testing of all user flows
- [ ] Fix bugs and edge cases
- [ ] Seed database with realistic test data
- [ ] Write basic documentation (README, user guide)
- [ ] Deploy to production on Vercel
- [ ] Set up analytics (Vercel Analytics or Plausible)
- [ ] Soft launch to small test group (friends, local growers)

---

## Post-Launch Roadmap (V2 & Beyond)

### V2 Features (Weeks 3-6)
- **My Farm Dashboard:** Track active crops, projected revenue, harvest calendar
- **Harvest Reminders:** Email/SMS notifications for upcoming harvests
- **Community Price Reporting:** Let users submit actual prices they're getting
- **Expanded Geography:** Add more regions beyond Southwest
- **Weather Integration:** Frost dates, planting alerts based on local weather
- **Succession Planting Calendar:** Visual timeline of crop rotations

### V3 Features (Months 3-6)
- **Mobile App:** Native iOS/Android (React Native or PWA)
- **Advanced Analytics:** Revenue tracking, year-over-year comparisons
- **Buyer Marketplace:** Direct messaging, transaction facilitation
- **Crop Planning Tool:** Drag-and-drop garden layout planner
- **Educational Content:** Video guides, webinars, expert Q&A
- **Affiliate Integration:** Seed/equipment purchase links with revenue share

### Monetization Strategy (Month 6+)
- **Freemium Model:**
  - Free: Basic profitability calculator, limited crop data
  - Pro ($10/month): Full crop database, buyer directory, farm tracking, priority support
- **Affiliate Revenue:** Seed suppliers, equipment vendors
- **Data Licensing:** Aggregate pricing data sold to agricultural researchers, policy makers
- **Premium Listings:** Buyers pay to be featured in directory

---

## Success Criteria & KPIs

### V1 Launch Success (30 days)
- ✅ 100+ registered users
- ✅ 60% profile completion rate
- ✅ 30% weekly active users (return visits)
- ✅ Average session: 5+ minutes (deep engagement)
- ✅ 5+ user testimonials about crop discoveries
- ✅ < 5% error rate in calculations (data quality)

### Long-Term Success (6-12 months)
- 1,000+ active users
- 10+ paying subscribers (if premium tier launched)
- $500+/month affiliate revenue
- Featured in agricultural publications or podcasts
- Partnerships with 2-3 seed companies or ag organizations
- Expansion to 5+ US regions

---

## Risks & Mitigation

### Risk 1: Data Quality & Accuracy
**Concern:** Inaccurate pricing data could lead to bad decisions and erode trust.

**Mitigation:**
- Clearly label data sources and last updated dates
- Start with conservative estimates (show ranges, not absolutes)
- Implement user reporting for incorrect data
- Regular manual audits of pricing data
- Disclaim: "Estimates based on regional averages; actual prices vary"

### Risk 2: Limited Initial Data Coverage
**Concern:** Users outside Southwest or growing niche crops won't find value.

**Mitigation:**
- Set clear expectations: "Currently optimized for Southwest growers"
- Prioritize high-demand crops that work in multiple regions
- Roadmap transparency: Show which regions are coming next
- Allow users to request crops/regions (build waitlist)

### Risk 3: User Adoption & Retention
**Concern:** Growers may not return after initial exploration.

**Mitigation:**
- Email engagement: Weekly "what to plant" updates
- Seasonal triggers: Notifications at key planting times
- Community building: Share success stories, grower spotlights
- Continuous value: Add new crops, update pricing, fresh content

### Risk 4: Technical Challenges (2-week timeline)
**Concern:** Ambitious scope may lead to incomplete or buggy v1.

**Mitigation:**
- Ruthless prioritization: Core calculator + crop pages are non-negotiable
- Cut features if needed: Comparison tool and directory are "nice-to-haves"
- Manual data entry acceptable for v1: Automation can wait
- Testing with real users before public launch

### Risk 5: Competition
**Concern:** Existing agricultural apps or new entrants.

**Mitigation:**
- Differentiation: Channel-specific pricing + small grower focus (not general farming)
- Speed to market: First-mover advantage in this niche
- Data moat: Proprietary pricing database becomes defensible over time
- Community: Build loyal user base through exceptional UX

---

## Appendix

### Glossary
- **CSA:** Community Supported Agriculture
- **Food Hub:** Aggregators that connect multiple small farms to buyers
- **Microgreens:** Young vegetable greens (7-14 days old), high-value crop
- **USDA AMS:** US Department of Agriculture, Agricultural Marketing Service
- **USDA NASS:** US Department of Agriculture, National Agricultural Statistics Service
- **Wholesale:** Selling in bulk to restaurants, retailers, or distributors

### Resources
- **USDA AMS Market News:** https://www.ams.usda.gov/market-news
- **USDA NASS Quick Stats:** https://quickstats.nass.usda.gov/
- **LocalHarvest:** https://www.localharvest.org/
- **Extension Services:** State university agricultural extension programs

### Open Questions (To Resolve)
- [ ] What is the minimum viable crop count for v1? (30-50 range)
- [ ] Should we include cost tracking (seeds, inputs) or just revenue?
- [ ] Email notifications for v1 or v2?
- [ ] How to handle organic vs conventional pricing differences?

---

## Sign-Off

**Product Manager:** Chan (GreenGreen Founder)
**Development Team:** Claude Code + Chan
**Target Launch Date:** [Insert Date - 2 weeks from start]

**Approval:**
- [ ] PRD Reviewed and Approved
- [ ] Technical Architecture Confirmed
- [ ] Data Strategy Validated
- [ ] Development Roadmap Agreed Upon

---

**Next Steps:**
1. Review and finalize this PRD
2. Set up development environment
3. Kick off Week 1 sprint
4. Daily check-ins on progress
5. Iterate based on findings

---

*End of PRD*
