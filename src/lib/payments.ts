// Example published online-card rates (US). Providers change these; the
// calculator lets people type their own.
export const PROVIDERS = [
  { id: 'stripe', name: 'Stripe (US cards)', pct: 2.9, fixed: 0.3 },
  { id: 'paypal', name: 'PayPal Checkout (US)', pct: 3.49, fixed: 0.49 },
  { id: 'square', name: 'Square online (US)', pct: 2.9, fixed: 0.3 },
  { id: 'square-pos', name: 'Square in person (US)', pct: 2.6, fixed: 0.15 },
  { id: 'paddle', name: 'Paddle (merchant of record)', pct: 5, fixed: 0.5 },
  { id: 'lemonsqueezy', name: 'Lemon Squeezy (merchant of record)', pct: 5, fixed: 0.5 },
  { id: 'custom', name: 'Custom rate', pct: 2.5, fixed: 0 },
];
