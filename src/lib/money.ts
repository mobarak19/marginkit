// Currency formatting and sensible sample inputs per currency.
const ZERO_DECIMALS = new Set(['VND', 'IDR', 'JPY', 'KRW']);

export function money(currency: string) {
  const f = new Intl.NumberFormat('en', {
    style: 'currency', currency, currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: ZERO_DECIMALS.has(currency) ? 0 : 2,
    minimumFractionDigits: ZERO_DECIMALS.has(currency) ? 0 : 2,
  });
  return (x: number) => (Number.isFinite(x) ? f.format(x) : '—');
}

export const pct = (x: number, digits = 1) => (Number.isFinite(x) ? `${(x * 100).toFixed(digits)}%` : '—');

/** Example order for each currency: price, buyer shipping, COGS, seller shipping, packaging. */
export const SAMPLES: Record<string, { price: number; ship: number; cogs: number; shipcost: number; pack: number; step: number }> = {
  BDT: { price: 1500, ship: 0, cogs: 900, shipcost: 60, pack: 0, step: 10 },
  PKR: { price: 3000, ship: 0, cogs: 1800, shipcost: 150, pack: 30, step: 10 },
  LKR: { price: 5000, ship: 0, cogs: 3000, shipcost: 300, pack: 50, step: 10 },
  NPR: { price: 2000, ship: 0, cogs: 1200, shipcost: 100, pack: 20, step: 10 },
  INR: { price: 999, ship: 0, cogs: 550, shipcost: 70, pack: 15, step: 1 },
  MYR: { price: 59, ship: 0, cogs: 30, shipcost: 5, pack: 1, step: 0.5 },
  PHP: { price: 799, ship: 0, cogs: 420, shipcost: 50, pack: 10, step: 1 },
  SGD: { price: 29.9, ship: 0, cogs: 14, shipcost: 2, pack: 0.5, step: 0.1 },
  THB: { price: 590, ship: 0, cogs: 300, shipcost: 35, pack: 8, step: 1 },
  VND: { price: 299000, ship: 0, cogs: 150000, shipcost: 15000, pack: 3000, step: 1000 },
  IDR: { price: 159000, ship: 0, cogs: 80000, shipcost: 8000, pack: 2000, step: 1000 },
  USD: { price: 35, ship: 5.99, cogs: 12, shipcost: 6.5, pack: 0.75, step: 0.01 },
  GBP: { price: 28, ship: 3.99, cogs: 10, shipcost: 3.5, pack: 0.5, step: 0.01 },
};
export const sampleFor = (currency: string) => SAMPLES[currency] ?? SAMPLES.USD;
