// Shared pricing maths. Pure functions, used by the calculators (client) and
// by build-time pages (fee comparison tables).

export interface SaleInput {
  /** Item price the buyer pays (before any seller-funded discount). */
  price: number;
  /** Shipping the buyer pays on top of the price. */
  shippingCharged: number;
  /** Seller-funded discount / voucher per order. */
  discount: number;
  cogs: number;
  /** Shipping the seller pays (labels, subsidies). */
  shipCost: number;
  packaging: number;
  otherCost: number;
  /** % of the sale spent on ads / marketing. */
  adsPct: number;
  /** Sales VAT / GST included in the price that the seller must remit, %. */
  vatPct: number;
  commissionPct: number;
  commissionMin: number;
  commissionOnShipping: boolean;
  flatBelow?: { below: number; fee: number };
  paymentPct: number;
  paymentFixed: number;
  perOrder: number;
  perOrderBelow?: { below: number; fee: number };
  extrasPct: number;
  feeTaxPct: number;
}

export interface SaleResult {
  sale: number;
  revenue: number;
  commission: number;
  payment: number;
  extras: number;
  perOrder: number;
  feeTax: number;
  fees: number;
  vat: number;
  ads: number;
  costs: number;
  profit: number;
  /** Profit ÷ revenue (what the buyer paid). */
  margin: number;
  /** Profit ÷ product cost. */
  roi: number;
}

export function saleProfit(i: SaleInput): SaleResult {
  const sale = Math.max(0, i.price - i.discount);
  const revenue = sale + i.shippingCharged;
  const base = sale + (i.commissionOnShipping ? i.shippingCharged : 0);
  let commission = base * (i.commissionPct / 100);
  if (i.flatBelow && sale < i.flatBelow.below) commission = i.flatBelow.fee;
  else if (i.commissionPct > 0 && i.commissionMin) commission = Math.max(commission, i.commissionMin);
  const payment = revenue > 0 ? revenue * (i.paymentPct / 100) + i.paymentFixed : 0;
  const extras = base * (i.extrasPct / 100);
  const perOrder = revenue > 0 ? (i.perOrderBelow && revenue <= i.perOrderBelow.below ? i.perOrderBelow.fee : i.perOrder) : 0;
  const feesBeforeTax = commission + payment + extras + perOrder;
  const feeTax = feesBeforeTax * (i.feeTaxPct / 100);
  const fees = feesBeforeTax + feeTax;
  const vat = sale - sale / (1 + i.vatPct / 100);
  const ads = sale * (i.adsPct / 100);
  const costs = i.cogs + i.shipCost + i.packaging + i.otherCost;
  const profit = revenue - fees - vat - ads - costs;
  return {
    sale, revenue, commission, payment, extras, perOrder, feeTax, fees, vat, ads, costs, profit,
    margin: revenue ? profit / revenue : 0,
    roi: i.cogs ? profit / i.cogs : 0,
  };
}

/**
 * Smallest x in [0, hi] where f(x) >= 0, by bisection (f should be roughly
 * increasing). Returns null if f never reaches 0 below `limit`.
 */
export function solveUp(f: (x: number) => number, limit = 1e10): number | null {
  if (f(0) >= 0) return 0;
  let hi = 1;
  while (f(hi) < 0) {
    hi *= 2;
    if (hi > limit) return null;
  }
  let lo = 0;
  for (let k = 0; k < 100; k++) {
    const mid = (lo + hi) / 2;
    if (f(mid) >= 0) hi = mid;
    else lo = mid;
  }
  return hi;
}

/** Item price at which profit is zero (null when fees take ≥ 100%). */
export const breakEvenPrice = (i: SaleInput) => solveUp((p) => saleProfit({ ...i, price: p }).profit);

/** Item price that earns `marginPct` % of revenue as profit. */
export const priceForMargin = (i: SaleInput, marginPct: number) =>
  solveUp((p) => {
    const r = saleProfit({ ...i, price: p });
    return r.profit - (marginPct / 100) * r.revenue;
  });

// ───────────────────────────────────────────────────────── markup & margin
export const marginFromMarkup = (markupPct: number) => (markupPct / (100 + markupPct)) * 100;
export const markupFromMargin = (marginPct: number) => (marginPct >= 100 ? Infinity : (marginPct / (100 - marginPct)) * 100);
export const priceFromMarkup = (cost: number, markupPct: number) => cost * (1 + markupPct / 100);
export const priceFromMargin = (cost: number, marginPct: number) => (marginPct >= 100 ? Infinity : cost / (1 - marginPct / 100));

// ───────────────────────────────────────────────────────── payments
/** Fee and net for a charge of `amount`. */
export function paymentFee(amount: number, pct: number, fixed: number) {
  const fee = amount > 0 ? amount * (pct / 100) + fixed : 0;
  return { fee, net: amount - fee };
}
/** Amount to charge so that `net` arrives after fees. */
export const grossUp = (net: number, pct: number, fixed: number) => (pct >= 100 ? Infinity : (net + fixed) / (1 - pct / 100));

// ───────────────────────────────────────────────────────── inventory
/** Economic order quantity: √(2DS / H). */
export const eoq = (annualDemand: number, orderCost: number, holdingCost: number) =>
  holdingCost > 0 ? Math.sqrt((2 * annualDemand * orderCost) / holdingCost) : 0;

/** z-score for a one-sided service level (Acklam's inverse-normal approximation). */
export function zForServiceLevel(p: number): number {
  if (p <= 0 || p >= 1) return p >= 1 ? Infinity : -Infinity;
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const pl = 0.02425;
  if (p < pl) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - pl) return -zForServiceLevel(1 - p);
  const q = p - 0.5;
  const r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

// ───────────────────────────────────────────────────────── shipping
/** Dimensional (volumetric) weight. Divisor 5000 for cm/kg, 139 for in/lb. */
export const dimWeight = (l: number, w: number, h: number, divisor: number) => (divisor > 0 ? (l * w * h) / divisor : 0);

/** Round a weight up to the carrier's increment (e.g. 0.5 kg or 1 lb). */
export const roundUpTo = (x: number, step: number) => (step > 0 ? Math.ceil(x / step - 1e-9) * step : x);

// ───────────────────────────────────────────────────────── menu engineering
export type MenuClass = 'Star' | 'Plowhorse' | 'Puzzle' | 'Dog';
export interface MenuItem { name: string; sold: number; price: number; cost: number }
export interface MenuRow extends MenuItem { cm: number; mix: number; totalCm: number; highPop: boolean; highCm: boolean; cls: MenuClass }

/**
 * Kasavana & Smith menu engineering: popularity is "high" when an item's
 * share of sales is at least 70% of an equal share (0.7 ÷ n); contribution
 * margin is "high" when it is at least the sales-weighted average.
 */
export function menuEngineering(items: MenuItem[]) {
  const valid = items.filter((i) => i.sold > 0 && i.price > 0);
  const totalSold = valid.reduce((s, i) => s + i.sold, 0);
  const totalCm = valid.reduce((s, i) => s + (i.price - i.cost) * i.sold, 0);
  const avgCm = totalSold ? totalCm / totalSold : 0;
  const popThreshold = valid.length ? 0.7 / valid.length : 0;
  const rows: MenuRow[] = valid.map((i) => {
    const cm = i.price - i.cost;
    const mix = totalSold ? i.sold / totalSold : 0;
    const highPop = mix >= popThreshold;
    const highCm = cm >= avgCm;
    const cls: MenuClass = highPop ? (highCm ? 'Star' : 'Plowhorse') : highCm ? 'Puzzle' : 'Dog';
    return { ...i, cm, mix, totalCm: cm * i.sold, highPop, highCm, cls };
  });
  const revenue = valid.reduce((s, i) => s + i.price * i.sold, 0);
  const foodCost = valid.reduce((s, i) => s + i.cost * i.sold, 0);
  return { rows, avgCm, popThreshold, totalSold, totalCm, revenue, foodCostPct: revenue ? foodCost / revenue : 0 };
}

/** Minimal RFC 4180 CSV parser (quotes, escaped quotes, CRLF, ; or tab delimiters). */
export function parseCsv(text: string): string[][] {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? '';
  const counts = { ',': 0, ';': 0, '\t': 0 } as Record<string, number>;
  for (const ch of firstLine) if (ch in counts) counts[ch]++;
  const [best, n] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const delim = n > 0 ? best : ',';
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === delim) { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.some((c) => c.trim() !== '')) rows.push(row);
  return rows.map((r) => r.map((c) => c.trim()));
}
