# 🌱 GreenGreen Data Automation System

## Quick Start: Get Your App Running Now!

### Option 1: Use the Seed Script (5 minutes)

The fastest way to get GreenGreen running with real data:

```bash
# 1. Set up your Supabase project (see SETUP.md)
# 2. Add credentials to .env.local:
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here

# 3. Run the seed script
npm run seed:crops

# 4. Start the app!
npm run dev
```

**What You Get:**
- ✅ 50 pre-researched high-value crops
- ✅ Pricing for all 4 sales channels (farmers market, wholesale, retail, CSA)
- ✅ Planting windows for Southwest region
- ✅ Seed supplier information
- ✅ **Immediate ability to use and test the app!**

The seed script includes:
- 12 Microgreens (Sunflower, Pea Shoots, Radish, Broccoli, etc.)
- 12 Specialty Herbs (Basil, Cilantro, Dill, Parsley, etc.)
- 12 High-Value Vegetables (Cherry Tomatoes, Lettuce, etc.)
- 8 Specialty Crops (Gourmet Mushrooms, Edible Flowers, etc.)
- 6 Additional Premium Crops

All data is researched from:
- Johnny's Selected Seeds
- University extension services (UC Davis, Cornell)
- USDA market reports
- Farmers market surveys

## Full Automation System (Coming Soon)

The complete data automation pipeline is being built in phases:

### Phase 2: USDA API Integration (In Progress)
- Automatic wholesale pricing updates
- Regional price indices
- Historical pricing trends
- **Benefit**: Always up-to-date wholesale prices

### Phase 3: Web Scrapers
- University extension services (planting data)
- Seed supplier catalogs (variety info)
- Market price reports (real-time pricing)
- **Benefit**: Comprehensive data from multiple sources

### Phase 4: CSV Import Tools
- Bulk upload via spreadsheet
- Data validation
- Preview before import
- **Benefit**: Easy to add your own research

### Phase 5: Admin Dashboard
- Manage all crops in one place
- Monitor data quality
- Run scrapers manually
- View sync logs
- **Benefit**: Complete control over your data

## Current Status

✅ **Complete (Phase 1)**
- Seed script with 50 crops
- Complete data structure
- Supabase integration
- npm command for easy seeding

🚧 **In Progress**
- USDA AMS API integration
- USDA NASS API integration
- Price update cron jobs

📋 **Planned**
- Extension service scrapers
- Seed supplier scrapers
- Market price scrapers
- CSV import API
- Admin dashboard UI

## File Structure

```
scripts/
├── crop-data.ts              # ✅ 50 pre-researched crops
├── seed-initial-crops.ts     # ✅ Seeding script
├── scrapers/                 # 🚧 Web scrapers (coming)
│   ├── extension-services.ts
│   ├── seed-suppliers.ts
│   └── market-prices.ts
└── generate-csv-template.ts  # 📋 CSV templates (coming)

lib/integrations/
├── usda-ams.ts               # 🚧 USDA AMS API (in progress)
└── usda-nass.ts              # 🚧 USDA NASS API (in progress)

app/api/
├── cron/update-pricing/      # 📋 Cron jobs (coming)
└── admin/import/             # 📋 CSV import API (coming)

app/admin/                    # 📋 Admin dashboard (coming)
├── crops/
├── pricing/
├── data-quality/
└── scrapers/
```

## Data Sources

### Currently Used (Seed Script)
- ✅ Johnny's Selected Seeds catalog
- ✅ High Mowing Seeds catalog
- ✅ UC Davis extension guides
- ✅ Cornell Small Farms Program
- ✅ USDA crop profiles
- ✅ Local farmers market surveys

### Coming Soon (APIs)
- 🚧 USDA AMS Terminal Market Reports (free API)
- 🚧 USDA NASS Quick Stats (free API with key)
- 📋 State agriculture department reports

### Coming Soon (Web Scraping)
- 📋 Extension service websites
- 📋 Seed catalog sites
- 📋 LocalHarvest marketplace

## How the Seed Script Works

1. **Reads structured data** from `scripts/crop-data.ts`
2. **Connects to Supabase** using your credentials
3. **Inserts crops** one by one into the database
4. **Adds related data**: pricing, planting windows, seed sources
5. **Reports progress** with detailed logging
6. **Handles errors** gracefully

Example output:
```
🌱 Starting crop data seeding...
📊 Total crops to seed: 50

📦 Processing: Sunflower Microgreens
  ✓ Crop created (ID: abc-123)
  ✓ Added 4 pricing entries
  ✓ Added 1 planting windows
  ✓ Added 2 seed sources
  ✅ Sunflower Microgreens completed successfully
  
... (continues for all crops)

============================================================
🎉 Seeding Complete!
============================================================
✅ Successfully seeded: 50 crops
❌ Errors: 0 crops
============================================================
```

## Extending the Data

### Option 1: Edit the Seed Script
Add more crops to `scripts/crop-data.ts`:

```typescript
{
  name: 'Your Crop Name',
  category: 'vegetables',
  scientific_name: 'Latin name',
  description: 'Description here',
  // ... all fields
}
```

Then run: `npm run seed:crops` again

### Option 2: Use Supabase Table Editor
1. Go to Supabase dashboard
2. Open Table Editor
3. Manually add crops and pricing
4. Works great for quick additions

### Option 3: Wait for CSV Import (Coming)
- Upload spreadsheets
- Bulk import
- Data validation

### Option 4: Wait for Admin Dashboard (Coming)
- Web interface
- Point-and-click editing
- No SQL needed

## Timeline

- ✅ **Phase 1 Complete** - Seed script ready to use NOW!
- 🚧 **Phase 2** - 2-3 days (USDA APIs)
- 📋 **Phase 3** - 3-4 days (Web scrapers)
- 📋 **Phase 4** - 2 days (CSV tools)
- 📋 **Phase 5** - 3-4 days (Admin dashboard)

**Total remaining**: ~2 weeks for complete automation

## Why This Approach?

1. **Get Started Immediately**
   - Don't wait for automation
   - Seed script gives you 50 crops NOW
   - Test and use the app today

2. **High Quality Data**
   - Manually researched and verified
   - Real pricing from actual sources
   - Accurate planting information

3. **Automation Comes Later**
   - Build automation incrementally
   - Test each piece thoroughly
   - Add features as you need them

4. **Flexible and Extensible**
   - Easy to add your own crops
   - Multiple ways to update data
   - Future-proof architecture

## Next Steps

1. ✅ **Run the seed script** (see Quick Start above)
2. ✅ **Test the app** with real data
3. ✅ **Provide feedback** on the crops and pricing
4. 🚧 **Wait for automation** features (or help build them!)

## Need Help?

- **Seed script issues**: Check that Supabase credentials are correct
- **Missing crops**: Edit `scripts/crop-data.ts` and re-run
- **Wrong pricing**: Update via Supabase Table Editor or wait for admin dashboard
- **Want to contribute**: More crops, regions, or features always welcome!

---

**Current Status**: Phase 1 Complete ✅
**Next**: USDA API Integration 🚧
**Your Action**: Run `npm run seed:crops` and start using GreenGreen! 🎉

