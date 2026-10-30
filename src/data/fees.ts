// Marketplace fee schedules: one JSON file per platform and country in
// src/data/fees/{platform}/{country}.json. Adding a marketplace is data entry:
// drop in a new file and (optionally) a tool page in tools.ts.
//
// status "example" = seed rates that have not been checked against the official
// schedule yet. Set "verified" to the date you checked the source, and the page
// switches from "example rates" to "Last verified: <date>".

export interface FeeCategory {
  name: string;
  /** Commission / referral / final value fee, % of the fee base. */
  pct: number;
  /** Overrides the schedule's per-order fee for this category. */
  perOrder?: number;
}

export interface FeeSchedule {
  platform: string;
  platformName: string;
  country: string;
  countryName: string;
  currency: string;
  status: 'example' | 'verified';
  entered: string;
  verified: string | null;
  source: string;
  categories: FeeCategory[];
  /** Commission also applies to the shipping the buyer pays. */
  commissionOnShipping: boolean;
  /** Minimum commission per item (e.g. Amazon's $0.30). */
  commissionMin?: number;
  /** Flat commission below a sale price (e.g. Poshmark $2.95 under $15). */
  flatBelow?: { below: number; fee: number };
  paymentPct: number;
  paymentFixed: number;
  perOrder: number;
  /** Lower per-order fee for small orders (e.g. eBay $0.30 at $10 or less). */
  perOrderBelow?: { below: number; fee: number };
  perOrderLabel: string;
  /** VAT / GST / SST the marketplace adds to its own fees. */
  feeTaxPct: number;
  feeTaxLabel: string;
  /** Optional programmes (free-shipping, cashback, offsite ads, affiliates). */
  extras: { name: string; pct: number }[];
  notes: string;
}

const files = import.meta.glob<FeeSchedule>('./fees/*/*.json', { eager: true, import: 'default' });

export const SCHEDULES: FeeSchedule[] = Object.values(files).sort(
  (a, b) => a.platformName.localeCompare(b.platformName) || a.countryName.localeCompare(b.countryName),
);

export const scheduleId = (s: Pick<FeeSchedule, 'platform' | 'country'>) => `${s.platform}-${s.country}`.toLowerCase();
export const schedulesFor = (platform?: string) => (platform ? SCHEDULES.filter((s) => s.platform === platform) : SCHEDULES);
export const findSchedule = (id: string) => SCHEDULES.find((s) => scheduleId(s) === id);

export function reviewLabel(s: FeeSchedule): string {
  return s.verified ? `Last verified: ${s.verified}` : `Example rates entered ${s.entered}, not yet verified`;
}
