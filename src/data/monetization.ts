// ─────────────────────────────────────────────────────────────────────────────
// Monetization settings: the ONLY file you need to edit.
//
// • Replace values containing "REPLACE". Until then they show as dashed
//   placeholders in `npm run dev` and are HIDDEN in production builds.
// • {placement} in a URL is replaced with where the link was shown, so your
//   affiliate/sponsor dashboard can tell you which spot performs.
// • Plain links only (no third-party scripts). The strict CSP is part of the
//   site's credibility, and ad scripts would need a certified CMP in the EEA/UK.
// • Amazon Associates requires its own disclosure wording; if you add Amazon
//   links, also add "As an Amazon Associate I earn from qualifying purchases."
// ─────────────────────────────────────────────────────────────────────────────

export interface Offer {
  id: string;
  kicker: string;
  title: string;
  text: string;
  cta: string;
  url: string;
  icon: string;
  sponsored: boolean;
}

export const MONETIZATION = {
  disclosure: 'Some links are affiliate links. We may earn a commission at no extra cost to you. It keeps these calculators free.',

  donate: {
    label: 'Buy me a coffee',
    url: 'REPLACE_DONATION_URL',
  },

  offers: {
    // Product research / Amazon seller suites (recurring commissions).
    sellerTools: {
      id: 'sellerTools',
      kicker: 'Recommended',
      title: 'Find products that are worth selling',
      text: 'Product research, sales estimates and keyword tracking for marketplace sellers.',
      cta: 'Try it free',
      url: 'REPLACE_SELLER_TOOL_AFFILIATE_URL?ref={placement}',
      icon: 'search',
      sponsored: true,
    },
    store: {
      id: 'store',
      kicker: 'Recommended',
      title: 'Sell on your own website, keep the commission',
      text: 'Start an online store and sell alongside the marketplaces without a per-sale commission.',
      cta: 'Start a free trial',
      url: 'REPLACE_ECOMMERCE_PLATFORM_AFFILIATE_URL?ref={placement}',
      icon: 'globe',
      sponsored: true,
    },
    shipping: {
      id: 'shipping',
      kicker: 'Recommended',
      title: 'Cheaper shipping labels',
      text: 'Compare carriers and print discounted labels for every order.',
      cta: 'Compare rates',
      url: 'REPLACE_SHIPPING_SOFTWARE_AFFILIATE_URL?ref={placement}',
      icon: 'truck',
      sponsored: true,
    },
    pos: {
      id: 'pos',
      kicker: 'Recommended',
      title: 'Restaurant POS with recipe costing',
      text: 'Track ingredient costs, menu margins and online orders in one system.',
      cta: 'Get a demo',
      url: 'REPLACE_RESTAURANT_POS_REFERRAL_URL?ref={placement}',
      icon: 'chef',
      sponsored: true,
    },
    template: {
      id: 'template',
      kicker: 'Built by the author',
      title: 'Menu costing & P&L spreadsheet',
      text: 'The same formulas as these calculators, in a spreadsheet you can keep and share with your team.',
      cta: 'Get the template',
      url: 'REPLACE_TEMPLATE_STORE_URL?ref={placement}',
      icon: 'table',
      sponsored: false,
    },
  } satisfies Record<string, Offer>,

  placements: {
    ecommerce: ['sellerTools', 'store'],
    amazon: ['sellerTools', 'shipping'],
    shipping: ['shipping', 'store'],
    restaurant: ['pos', 'template'],
    business: ['template', 'store'],
    guide: ['sellerTools', 'store', 'template'],
    sidebar: ['template'],
  },
} as const;

export type OfferId = keyof typeof MONETIZATION.offers;
export type PlacementId = keyof typeof MONETIZATION.placements;
export const isConfigured = (value: string) => !!value && !value.includes('REPLACE');
