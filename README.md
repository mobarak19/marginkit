# MarginKit: profit & pricing calculators for small businesses

Idea #9 from `../09_Small_Business_Pricing_Calculators.pdf`. Static site (Astro), same stack and conventions as ShipMath, TokenMeter and ExifShield.

## Pages (37)

| Section | Tools |
|---|---|
| **E-commerce** | Marketplace profit (all 12 marketplaces) · Daraz (BD, PK, LK, NP) · Shopee (6 countries) · Lazada (6) · TikTok Shop (US, UK, MY) · Etsy (US, UK) · eBay (US, UK) · Amazon FBA (vs FBM) · Flipkart · Whatnot · Poshmark · Depop · Shipping cost / volumetric weight |
| **Restaurant** | Food cost % · Menu price · Recipe cost · Restaurant profit · Delivery-app commission (Uber Eats, DoorDash, Deliveroo, Foodpanda) · Menu engineering matrix (CSV, runs locally) |
| **Business** | Markup vs margin · Break-even · Payment fees (Stripe, PayPal, Square, Paddle) · EOQ & reorder point · Bundle pricing · Freelance rate |
| Content | Hubs ×3 · Guides: 2026 marketplace fee comparison (generated from the fee data), Markup vs margin · About · Privacy · Terms · Disclosure |

## Run

Requires **Node.js 22.12+** (Astro 7).

```bash
npm install
npm run dev            # http://localhost:4321
npm run build && npm run preview
```

## Marketplace fee data

`src/data/fees/{platform}/{country}.json`, one file per marketplace and country, read by a single engine (`src/lib/profit.ts`). Adding a marketplace is data entry: add a JSON file, and optionally a page in `src/data/tools.ts` with `platform: '<folder>'`.

**Before launch, verify every schedule.** The seed rates are `"status": "example"` and the pages say “Example rates … not yet verified”. For each file: check the `source` page, fix the rates, set `"verified": "YYYY-MM-DD"` and `"status": "verified"`. The page then shows “Last verified: <date>”. Re-check monthly (the idea report’s biggest risk), and log changes so the fee-comparison guide stays credible.

Fields: `categories[].pct` commission · `commissionOnShipping` · `commissionMin` (Amazon $0.30) · `flatBelow` (Poshmark $2.95 under $15) · `paymentPct`/`paymentFixed` · `perOrder` + `perOrderBelow` (eBay) · `feeTaxPct` (VAT/GST/SST on fees) · `extras` (optional programmes) · `notes`.

Other example rates to verify: Amazon FBA size-tier fees and storage (`AmazonFbaCalc.astro`), delivery-app plans (`DeliveryCommissionCalc.astro`), payment providers (`src/lib/payments.ts`).

## Before launch

- Name & URL: `src/data/site.ts` (“MarginKit” is a placeholder), `public/manifest.webmanifest`.
- Monetization: `src/data/monetization.ts` (seller-tool, e-commerce platform, shipping and POS affiliates, your own templates). Hidden in production until filled. Amazon Associates needs its own disclosure wording if you add Amazon links.
- Contact details for fee corrections: `src/pages/about.astro` (`#contact`).
- Hosting: Cloudflare Pages recommended (`public/_headers` is in its format; build `npm run build`, output `dist`). A GitHub Pages workflow is included too.
- Add the site to Google Search Console and submit `sitemap-index.xml`.

## Engineering notes

- Strict CSP (`script-src 'self'`); no third-party scripts, no cookies. Inputs live in the URL so results are shareable; buttons for copy link, copy result and reset.
- Marketplace calculator: changing country/category resets rates and sample amounts (value *and* default), so the share link only carries real edits. Break-even and target-margin prices are solved numerically, so minimum fees and flat fees are handled.
- Menu engineering uses Kasavana & Smith (70% popularity rule, weighted-average contribution margin) and a small built-in CSV parser (comma, semicolon or tab); files are never uploaded.

## Tests run before hand-off (30 Oct 2026)

Headless Chrome on the production build: all 37 pages at 390 px with zero console/CSP errors, no broken links, no horizontal overflow, no NaN/undefined in results. Calculator checks against hand calculations, including the idea report’s worked example (1,500 BDT, 10% commission, 1.5% payment fee, 60 BDT shipping, 900 BDT cost → 367.50 profit, 24.5% margin, 40.8% return on cost, ~1,085 break-even), Etsy/eBay/Poshmark fee rules, Amazon FBA, payment gross-up (100 → 103.30), EOQ, volumetric weight, URL share round-trip for non-default markets, and reset.
