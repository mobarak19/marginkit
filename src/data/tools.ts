// Tool registry: one entry per tool page (content written for people first).
import type { PlacementId } from './monetization';

export type Section = 'ecom' | 'restaurant' | 'business';

export interface Tool {
  slug: string;
  section: Section;
  icon: string;
  name: string;
  card: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  /** Marketplace pages: fee data folder in src/data/fees/ ('' = every marketplace). */
  platform?: string;
  defaultCountry?: string;
  placement?: PlacementId;
  sections: { h2: string; html: string }[];
  faq: [string, string][];
  related: string[];
}

export const SECTIONS: Record<Section, { name: string; short: string; icon: string; hub: string; text: string }> = {
  ecom: { name: 'E-commerce & marketplace calculators', short: 'E-commerce', icon: 'store', hub: 'ecommerce-calculators', text: 'Fees and profit per order on Daraz, Shopee, Lazada, TikTok Shop, Etsy, eBay, Amazon and more.' },
  restaurant: { name: 'Restaurant calculators', short: 'Restaurant', icon: 'utensils', hub: 'restaurant-calculators', text: 'Food cost, menu prices, recipe costing, delivery-app commission and menu engineering.' },
  business: { name: 'Pricing & business calculators', short: 'Business', icon: 'briefcase', hub: 'business-calculators', text: 'Markup vs margin, break-even, payment fees, inventory, bundles and freelance rates.' },
};

// ─────────────────────────────────────────────── shared marketplace content
const FORMULA = `<pre><code>buyer pays    = price − your discount + shipping charged
fees          = commission + payment fee + programmes + fixed fee
              + tax on those fees (VAT / GST / SST)
net profit    = buyer pays − fees − product cost − shipping you pay
              − packaging − ads
margin        = net profit ÷ buyer pays
break-even    = the price where net profit is zero</code></pre>`;

const MISTAKES = `<ul>
<li><strong>Forgetting tax on fees.</strong> In many countries VAT or GST is added to the marketplace’s commission, so a 10% commission really costs 11–12%.</li>
<li><strong>Calculating margin on cost.</strong> A 40% markup is only a 28.6% margin. Use the <a href="../markup-margin-calculator/">markup vs margin calculator</a> if the two get mixed up.</li>
<li><strong>Ignoring vouchers and campaign fees.</strong> Free-shipping and cashback programmes are charged on every order, not just the ones that use them.</li>
<li><strong>Leaving out returns and failed deliveries.</strong> Cash-on-delivery markets in particular lose money on parcels that come back.</li>
</ul>`;

const campaigns = (name: string) => ({
  h2: 'Pricing for 11.11, 12.12 and other campaigns',
  html: `<p>Mega sales bring volume, but ${name} usually asks sellers to fund part of the discount and may add a campaign fee. Before you join:</p>
<ol><li>Set the <em>Your discount</em> field to the voucher you will fund.</li><li>Tick the programmes you have to join for the campaign.</li><li>Check the break-even price: your campaign price must stay above it.</li></ol>
<p>If the margin turns negative, join with a bundle instead of a deeper discount: the fees and shipping are paid once for several items (see the <a href="../bundle-pricing-calculator/">bundle pricing calculator</a>).</p>`,
});

const marketplaceSections = (how: string, extra: { h2: string; html: string }[] = []) => [
  { h2: 'How the fees work', html: how },
  { h2: 'The formula', html: FORMULA },
  ...extra,
  { h2: 'Common mistakes', html: MISTAKES },
];

export const TOOLS: Tool[] = [
  // ───────────────────────────────────────────────────────────── E-commerce
  {
    slug: 'marketplace-profit-calculator',
    section: 'ecom',
    icon: 'store',
    platform: '',
    defaultCountry: 'BD',
    name: 'Marketplace Profit Calculator',
    card: 'Profit per order on 12 marketplaces in 13 countries, with fees, tax on fees and break-even price.',
    title: 'Marketplace Fee & Profit Calculator (All Platforms)',
    description: 'Calculate profit per order after marketplace commission, payment fees, VAT on fees, shipping and ads. Daraz, Shopee, Lazada, TikTok Shop, Etsy, eBay, Amazon and more.',
    h1: 'Marketplace profit calculator',
    lead: 'Pick a marketplace and category, enter your price and costs, and see your real profit per order, break-even price and the price you need for your target margin.',
    placement: 'ecommerce',
    sections: [
      { h2: 'One calculator, every marketplace', html: '<p>Every marketplace charges the same kinds of fees under different names: a <strong>commission</strong> (referral fee, final value fee, transaction fee), a <strong>payment fee</strong>, sometimes a <strong>fixed fee</strong> per order or listing, optional <strong>programme fees</strong> for free shipping or cashback, and in many countries <strong>VAT or GST on those fees</strong>. This calculator applies them in the right order for each marketplace and lets you edit every rate.</p>' },
      { h2: 'The formula', html: FORMULA + '<p><strong>Worked example (Daraz Bangladesh):</strong> a 1,500 BDT sale with 10% commission (150) and a 1.5% payment fee (22.5), 60 BDT shipping subsidy and 900 BDT product cost leaves about 367.5 BDT before VAT on fees: a 24.5% margin and a 40.8% return on product cost. Break-even is about 1,085 BDT.</p>' },
      { h2: 'Common mistakes', html: MISTAKES },
    ],
    faq: [
      ['Which marketplace has the lowest fees?', 'It depends on the category and price. Meesho and Depop UK charge no commission; Etsy is about 10% all-in on a typical US order; Amazon referral fees are 8–20% before fulfilment. See the <a href="../guides/marketplace-fee-comparison/">marketplace fee comparison</a> for a worked comparison.'],
      ['Are these the exact fees I will pay?', 'No. They are example rates per category; your account, campaign participation and seller level change the real numbers. Every rate is editable: copy the figures from your seller statement for an exact result.'],
      ['Is margin calculated on price or cost?', 'Margin is profit ÷ what the buyer pays. Return on product cost (profit ÷ product cost) is shown separately.'],
      ['Can I share my calculation?', 'Yes. Inputs are saved in the page address; use “Copy link to this result”.'],
    ],
    related: ['daraz-commission-calculator', 'shopee-fee-calculator', 'tiktok-shop-fee-calculator', 'etsy-fee-calculator', 'amazon-fba-calculator', 'markup-margin-calculator'],
  },
  {
    slug: 'daraz-commission-calculator',
    section: 'ecom',
    icon: 'percent',
    platform: 'daraz',
    defaultCountry: 'BD',
    name: 'Daraz Commission Calculator',
    card: 'Daraz seller commission, payment fee and VAT on fees for Bangladesh, Pakistan, Sri Lanka and Nepal.',
    title: 'Daraz Commission Calculator: Seller Fees & Profit',
    description: 'Free Daraz seller commission calculator for Bangladesh, Pakistan, Sri Lanka and Nepal. Profit per order after commission, payment fee, VAT on fees and shipping.',
    h1: 'Daraz seller commission calculator',
    lead: 'See what Daraz deducts from each order and what you keep, by country and category, with VAT on fees included. Works in your browser, no sign-up.',
    placement: 'ecommerce',
    sections: marketplaceSections(
      '<p>Daraz deducts a <strong>commission</strong> that depends on the product category, a <strong>payment fee</strong> on the order value, and in some cases shipping fees or campaign fees. The government adds <strong>VAT on Daraz’s fees</strong> (15% in Bangladesh), so the real deduction is higher than the commission rate alone.</p><p>Your Seller Center statement lists each deduction separately: compare it with the calculator and edit the rates if your category differs.</p>',
      [campaigns('Daraz')],
    ),
    faq: [
      ['How much commission does Daraz take?', 'It depends on the country and category; most categories fall between about 5% and 20%. Electronics and phones are at the low end, fashion and beauty at the high end. Check the current rate card in Seller Center.'],
      ['Is VAT charged on the Daraz commission?', 'Yes. In Bangladesh, 15% VAT is added to commission and fees, so a 10% commission costs 11.5% of the sale.'],
      ['How do I calculate my selling price on Daraz?', 'Enter your product cost and shipping, set your target margin, and read “Price for target margin”. The calculator includes commission, payment fee and VAT on fees.'],
      ['Does this work for Daraz Mall (LazMall) sellers?', 'Yes, but Daraz Mall categories can have different commission rates. Enter your exact rate under “Fee rates”.'],
    ],
    related: ['marketplace-profit-calculator', 'shopee-fee-calculator', 'lazada-fee-calculator', 'markup-margin-calculator', 'bundle-pricing-calculator'],
  },
  {
    slug: 'shopee-fee-calculator',
    section: 'ecom',
    icon: 'percent',
    platform: 'shopee',
    defaultCountry: 'MY',
    name: 'Shopee Fee Calculator',
    card: 'Shopee commission, transaction fee and programme fees for Malaysia, Philippines, Singapore, Thailand, Vietnam and Indonesia.',
    title: 'Shopee Fee Calculator: Commission & Seller Profit',
    description: 'Shopee seller fee calculator for MY, PH, SG, TH, VN and ID. Commission, transaction fee, Free Shipping and Coins Cashback programmes, tax on fees and profit.',
    h1: 'Shopee fee calculator',
    lead: 'Commission, transaction fee and optional programmes for six Shopee markets. See your profit per order and the price you need for your target margin.',
    placement: 'ecommerce',
    sections: marketplaceSections(
      '<p>Shopee charges a <strong>commission</strong> (higher for Shopee Mall and preferred sellers in many markets), a <strong>transaction fee</strong> on the order total, and fees for optional programmes such as <strong>Free Shipping</strong> and <strong>Coins Cashback</strong>, which are charged on every order once you join. Many markets add tax (SST, VAT, GST) to these fees.</p>',
      [campaigns('Shopee')],
    ),
    faq: [
      ['What fees does Shopee charge sellers?', 'A commission by category, a transaction (payment) fee, and fees for any programmes you join. The rates differ by country and seller type (Mall, Preferred, regular).'],
      ['Should I join the Free Shipping programme?', 'It usually increases visibility and conversion, but it is charged on all your orders. Tick it in the calculator to see the effect on margin before you join.'],
      ['Are Shopee fees charged on shipping?', 'Commission is charged on the item price in most markets; the transaction fee applies to the amount the buyer pays. Edit the rates if your statement shows otherwise.'],
    ],
    related: ['lazada-fee-calculator', 'tiktok-shop-fee-calculator', 'daraz-commission-calculator', 'marketplace-profit-calculator', 'bundle-pricing-calculator'],
  },
  {
    slug: 'lazada-fee-calculator',
    section: 'ecom',
    icon: 'percent',
    platform: 'lazada',
    defaultCountry: 'PH',
    name: 'Lazada Fee Calculator',
    card: 'Lazada commission, payment fee and programme fees for six Southeast Asian countries.',
    title: 'Lazada Fee Calculator: Commission, Fees & Profit',
    description: 'Lazada seller fee calculator for the Philippines, Malaysia, Singapore, Thailand, Vietnam and Indonesia. Commission, payment fee, Free Shipping Max, tax on fees and profit.',
    h1: 'Lazada fee calculator',
    lead: 'Work out Lazada’s commission, payment fee and programme fees per order, and the selling price you need to stay profitable.',
    placement: 'ecommerce',
    sections: marketplaceSections(
      '<p>Lazada charges a <strong>commission</strong> by category, a <strong>payment fee</strong> on the order value, and fees for programmes such as <strong>Free Shipping Max</strong> and <strong>LazCoins Discount</strong>. Tax is added to the fees in most markets. LazMall sellers often pay higher commission.</p>',
      [campaigns('Lazada')],
    ),
    faq: [
      ['How much is Lazada’s commission?', 'It varies by country and category, typically a few percent for electronics and higher for fashion and beauty. Check your rate card in Seller Center and enter it under “Fee rates”.'],
      ['Is Lazada cheaper than Shopee?', 'Headline commissions are similar; the difference usually comes from programme fees and campaign requirements. Run the same product through both calculators to compare.'],
      ['Does this include LazMall?', 'Yes: enter your LazMall commission under “Fee rates”.'],
    ],
    related: ['shopee-fee-calculator', 'tiktok-shop-fee-calculator', 'daraz-commission-calculator', 'marketplace-profit-calculator', 'shipping-cost-calculator'],
  },
  {
    slug: 'tiktok-shop-fee-calculator',
    section: 'ecom',
    icon: 'percent',
    platform: 'tiktok-shop',
    defaultCountry: 'US',
    name: 'TikTok Shop Fee Calculator',
    card: 'TikTok Shop referral fee, affiliate creator commission and profit for the US, UK and Malaysia.',
    title: 'TikTok Shop Fee Calculator: Referral Fee & Profit',
    description: 'TikTok Shop seller fee calculator: referral fee, affiliate creator commission, tax on fees and profit per order for the US, UK and Malaysia.',
    h1: 'TikTok Shop fee calculator',
    lead: 'See what TikTok Shop and your affiliate creators take from each order, and the price you need to stay profitable after paying for reach.',
    placement: 'ecommerce',
    sections: marketplaceSections(
      '<p>TikTok Shop charges a <strong>referral fee</strong> on each order (in the US and UK it applies to the customer payment, including shipping). If a creator sells your product through the affiliate programme, you also pay their <strong>affiliate commission</strong>, often 10–20%. Fees on TikTok Shop have changed several times since launch, so check the current rate in Seller Center.</p>',
      [{ h2: 'Pricing for affiliate creators', html: '<p>Creator commission is the largest variable cost for many TikTok sellers. Tick “Affiliate creator commission” and set “Other fees %” to the rate you offer to see the break-even price. A product that makes money with a 10% creator commission may lose money at 20%.</p>' }],
    ),
    faq: [
      ['What is the TikTok Shop referral fee?', 'A percentage of each order, which has changed several times and differs by country. The calculator uses example rates; enter the rate from your Seller Center.'],
      ['Do I pay fees on affiliate sales?', 'Yes. You pay the normal referral fee plus the commission you offered the creator.'],
      ['Is shipping included in the fee?', 'In the US and UK the referral fee is calculated on the customer payment including shipping. Other markets may differ.'],
    ],
    related: ['shopee-fee-calculator', 'etsy-fee-calculator', 'whatnot-fee-calculator', 'marketplace-profit-calculator', 'markup-margin-calculator'],
  },
  {
    slug: 'etsy-fee-calculator',
    section: 'ecom',
    icon: 'tag',
    platform: 'etsy',
    defaultCountry: 'US',
    name: 'Etsy Fee Calculator',
    card: 'Listing fee, 6.5% transaction fee, payment processing and Offsite Ads, for the US and UK.',
    title: 'Etsy Fee Calculator: Profit After All Etsy Fees',
    description: 'Etsy fee calculator: $0.20 listing fee, 6.5% transaction fee on price and shipping, payment processing, Offsite Ads and VAT on fees. See your profit per sale.',
    h1: 'Etsy fee calculator',
    lead: 'Listing fee, transaction fee on price and shipping, payment processing and Offsite Ads, all in one place, with your real profit per sale.',
    placement: 'ecommerce',
    sections: marketplaceSections(
      '<p>An Etsy sale has several fees: a <strong>$0.20 listing fee</strong> (charged again when the item sells and auto-renews), a <strong>6.5% transaction fee</strong> on the item price <em>and</em> the shipping you charge, and a <strong>payment processing fee</strong> (3% + $0.25 in the US). If the buyer came through <strong>Offsite Ads</strong>, Etsy also takes 15% (12% once you pass $10,000 in yearly sales). Some countries add VAT or a regulatory operating fee.</p>',
      [{ h2: 'Charging for shipping on Etsy', html: '<p>Because the transaction fee also applies to shipping, “free shipping” with the cost built into the price costs the same in fees as charging shipping separately. Choose based on how buyers respond, not on fees.</p>' }],
    ),
    faq: [
      ['How much does Etsy take from a sale?', 'Typically 9.5–10% plus $0.45 on a US sale (6.5% transaction, 3% + $0.25 payment, $0.20 listing), and up to about 25% if the sale came from Offsite Ads.'],
      ['Does Etsy charge fees on shipping?', 'Yes. The 6.5% transaction fee and payment processing apply to the shipping you charge.'],
      ['Can I opt out of Offsite Ads?', 'Shops with under $10,000 in yearly sales can opt out; above that, Offsite Ads are mandatory at 12%.'],
    ],
    related: ['ebay-fee-calculator', 'tiktok-shop-fee-calculator', 'depop-fee-calculator', 'markup-margin-calculator', 'payment-fee-calculator'],
  },
  {
    slug: 'ebay-fee-calculator',
    section: 'ecom',
    icon: 'tag',
    platform: 'ebay',
    defaultCountry: 'US',
    name: 'eBay Fee Calculator',
    card: 'eBay final value fee by category plus the per-order fee, for the US and UK.',
    title: 'eBay Fee Calculator: Final Value Fee & Profit',
    description: 'eBay fee calculator for the US and UK: final value fee by category on price and shipping, per-order fee, and your profit after costs.',
    h1: 'eBay fee calculator',
    lead: 'Final value fee by category, the per-order fee and your profit after product and shipping costs.',
    placement: 'ecommerce',
    sections: marketplaceSections(
      '<p>eBay charges a <strong>final value fee</strong>: a percentage of the total sale, including shipping (and sales tax in the US), plus a <strong>per-order fee</strong> ($0.40, or $0.30 for orders of $10 or less in the US). Payment processing is included. Store subscribers, top-rated sellers and some categories pay different rates; promoted listings add an ad fee you can model with “Ads / marketing”.</p><p>In the UK, private sellers pay no final value fee on most items; business sellers do.</p>',
    ),
    faq: [
      ['What is the eBay final value fee?', 'A percentage of the total sale amount, including shipping, that depends on the category. Most categories in the US are around 13–15%.'],
      ['Do private sellers in the UK pay fees?', 'Not on most items: eBay removed the final value fee for UK private sellers and charges buyers a protection fee instead. Business sellers still pay.'],
      ['How do promoted listings change my profit?', 'Enter your ad rate as “Ads / marketing %”. It is charged on the sale price when the sale came from a promoted listing.'],
    ],
    related: ['etsy-fee-calculator', 'poshmark-fee-calculator', 'amazon-fba-calculator', 'shipping-cost-calculator', 'marketplace-profit-calculator'],
  },
  {
    slug: 'amazon-fba-calculator',
    section: 'ecom',
    icon: 'package',
    name: 'Amazon FBA Calculator',
    card: 'Referral fee, FBA fulfilment, storage, PPC and returns, compared with fulfilling orders yourself.',
    title: 'Amazon FBA Calculator: Fees, Profit & FBA vs FBM',
    description: 'Free Amazon FBA profit calculator: referral fee, fulfilment fee by size tier, monthly storage, PPC, returns and a side-by-side comparison with FBM.',
    h1: 'Amazon FBA profit calculator',
    lead: 'Every cost between your supplier and your payout: referral fee, fulfilment, storage, ads and returns. Compare FBA with fulfilling orders yourself.',
    placement: 'amazon',
    sections: [
      { h2: 'How Amazon FBA fees add up', html: `<ul><li><strong>Referral fee</strong>: a percentage of the selling price by category (most are 15%, with a $0.30 minimum).</li><li><strong>FBA fulfilment fee</strong>: a fixed fee per unit by size tier and weight.</li><li><strong>Monthly storage</strong>: per cubic foot, about three times higher in October–December.</li><li><strong>Inbound placement and shipping</strong> to Amazon’s warehouses.</li><li><strong>Advertising</strong>: most private-label sellers spend 5–15% of sales on PPC.</li></ul>` },
      { h2: 'The formula', html: `<pre><code>profit = price − referral fee − FBA fee − storage − inbound
       − PPC − returns − product cost
FBM    = price − referral fee − your shipping − PPC − returns − cost</code></pre><p>Returned units are treated as refunded and not resold, with Amazon keeping 20% of the referral fee (up to $5). That is cautious for most products; change the returns rate to suit your category.</p>` },
      { h2: 'Common mistakes', html: '<ul><li>Using last year’s fee table: Amazon changes FBA fees every year.</li><li>Ignoring Q4 storage, which can wipe out the margin on slow sellers.</li><li>Leaving out PPC. Launches often spend 20–30% of sales on ads for the first months.</li></ul>' },
    ],
    faq: [
      ['How much does Amazon take per sale?', 'For a typical $25 product, the 15% referral fee plus a fulfilment fee of $4–6 means Amazon takes roughly 30–40% before ads and storage.'],
      ['Is FBA cheaper than FBM?', 'Not always on fees alone, but FBA gives Prime eligibility and usually better conversion. The calculator shows the fee difference per unit so you can judge whether the extra sales are worth it.'],
      ['Are these fees exact?', 'They are example US fees. Look up your product’s size tier and exact fees in Seller Central or Amazon’s official revenue calculator, then enter them here to model ads, returns and storage.'],
    ],
    related: ['marketplace-profit-calculator', 'ebay-fee-calculator', 'shipping-cost-calculator', 'eoq-reorder-point-calculator', 'break-even-calculator'],
  },
  {
    slug: 'flipkart-fee-calculator',
    section: 'ecom',
    icon: 'percent',
    platform: 'flipkart',
    defaultCountry: 'IN',
    name: 'Flipkart Seller Fee Calculator',
    card: 'Flipkart commission, fixed and collection fees plus 18% GST on fees, per order.',
    title: 'Flipkart Seller Fee Calculator: Commission & Profit',
    description: 'Flipkart seller fee calculator: category commission, fixed fee, collection fee and 18% GST on fees. See your profit per order and the price you need.',
    h1: 'Flipkart seller fee calculator',
    lead: 'Commission, fixed fee, collection fee and 18% GST on fees, with profit per order and the price you need for your target margin.',
    placement: 'ecommerce',
    sections: marketplaceSections(
      '<p>Flipkart’s marketplace fees combine a <strong>commission</strong> by category and price band, a <strong>fixed fee</strong> per item, a <strong>collection fee</strong> (payment) and <strong>shipping</strong> by weight and zone. <strong>18% GST</strong> is charged on all of these fees; registered sellers can usually claim it back as input tax credit, in which case set the GST field to 0.</p><p>Selling on Meesho instead? Choose it in the <a href="../marketplace-profit-calculator/?market=meesho-in">marketplace profit calculator</a>.</p>',
    ),
    faq: [
      ['What fees does Flipkart charge?', 'Commission by category, a fixed fee, a collection fee and shipping, plus 18% GST on the fees.'],
      ['Can I claim back the GST on Flipkart fees?', 'GST-registered sellers can usually claim it as input tax credit. Set “GST on fees” to 0 to see profit after the credit.'],
      ['Why is my settlement lower than the calculator?', 'Shipping by weight and zone, returns and reverse shipping are deducted too. Add your average shipping cost to “Shipping you pay”.'],
    ],
    related: ['marketplace-profit-calculator', 'daraz-commission-calculator', 'markup-margin-calculator', 'shipping-cost-calculator', 'break-even-calculator'],
  },
  {
    slug: 'whatnot-fee-calculator',
    section: 'ecom',
    icon: 'tag',
    platform: 'whatnot',
    name: 'Whatnot Fee Calculator',
    card: 'Whatnot commission and payment processing for live-selling, with profit per sale.',
    title: 'Whatnot Fee Calculator: Seller Fees & Profit',
    description: 'Whatnot seller fee calculator: commission on the sold price plus payment processing on the order total. See profit per sale for live auctions and buy-it-now.',
    h1: 'Whatnot fee calculator',
    lead: 'Commission on the sold price, payment processing on the total, and your profit per sale for live auctions and buy-it-now.',
    placement: 'ecommerce',
    sections: marketplaceSections('<p>Whatnot charges a <strong>commission on the sold price</strong> and a <strong>payment processing fee</strong> (percentage plus a fixed amount) on the order total including shipping and tax. Some categories have different commission rates; check the Whatnot help centre for yours.</p><p>For auctions, use the break-even price as your minimum starting bid.</p>'),
    faq: [
      ['How much does Whatnot take?', 'A commission (8% in most categories) plus payment processing of about 2.9% + $0.30 on the order total.'],
      ['What should my auction starting price be?', 'At least the break-even price shown here, so a single low bid can’t lose you money.'],
    ],
    related: ['poshmark-fee-calculator', 'ebay-fee-calculator', 'tiktok-shop-fee-calculator', 'depop-fee-calculator', 'marketplace-profit-calculator'],
  },
  {
    slug: 'poshmark-fee-calculator',
    section: 'ecom',
    icon: 'tag',
    platform: 'poshmark',
    name: 'Poshmark Fee Calculator',
    card: 'Poshmark’s 20% fee (flat $2.95 under $15) and your earnings per sale.',
    title: 'Poshmark Fee Calculator: Earnings After the 20% Fee',
    description: 'Poshmark fee calculator: 20% on sales of $15 or more, a flat $2.95 below $15. See your earnings, profit and break-even listing price.',
    h1: 'Poshmark fee calculator',
    lead: 'See your earnings after Poshmark’s fee (20%, or a flat $2.95 under $15) and the listing price you need after offers and discounts.',
    placement: 'ecommerce',
    sections: marketplaceSections('<p>Poshmark takes a <strong>flat $2.95</strong> on sales under $15 and <strong>20%</strong> on sales of $15 or more. The buyer pays shipping, so you only pay for the item and any discounted-shipping offers you make. Model accepted offers with “Your discount”.</p>'),
    faq: [
      ['How much does Poshmark take?', '20% of the sale price for sales of $15 or more, and a flat $2.95 below that.'],
      ['Who pays shipping on Poshmark?', 'The buyer pays the shipping label. If you offer discounted shipping, enter what you pay in “Shipping you pay”.'],
    ],
    related: ['depop-fee-calculator', 'whatnot-fee-calculator', 'ebay-fee-calculator', 'etsy-fee-calculator', 'markup-margin-calculator'],
  },
  {
    slug: 'depop-fee-calculator',
    section: 'ecom',
    icon: 'tag',
    platform: 'depop',
    name: 'Depop Fee Calculator',
    card: 'Depop UK payment processing (no selling fee) and your profit per sale.',
    title: 'Depop Fee Calculator (UK): Fees & Profit per Sale',
    description: 'Depop UK fee calculator: no selling fee, payment processing on the total including shipping, and your profit after costs.',
    h1: 'Depop fee calculator',
    lead: 'Depop UK charges no selling fee, but payment processing still applies. See what you keep from each sale after shipping and costs.',
    placement: 'ecommerce',
    sections: marketplaceSections('<p>UK sellers on Depop pay <strong>no selling fee</strong>; buyers pay a marketplace fee instead. A <strong>payment processing fee</strong> (percentage plus a fixed amount) still applies to the total, including shipping. Boosted listings add a fee on boosted sales: model it with “Ads / marketing”.</p>'),
    faq: [
      ['Does Depop charge selling fees in the UK?', 'No selling fee for UK sellers; a payment processing fee still applies.'],
      ['How do boosted listings affect profit?', 'Enter the boosting fee as “Ads / marketing %”. It only applies to sales that came from a boosted listing.'],
    ],
    related: ['poshmark-fee-calculator', 'etsy-fee-calculator', 'ebay-fee-calculator', 'whatnot-fee-calculator', 'payment-fee-calculator'],
  },
  {
    slug: 'shipping-cost-calculator',
    section: 'ecom',
    icon: 'truck',
    name: 'Shipping Cost Calculator',
    card: 'Volumetric (dimensional) weight, billable weight and shipping cost per parcel and per month.',
    title: 'Shipping Cost & Volumetric Weight Calculator',
    description: 'Calculate volumetric (dimensional) weight, billable weight and shipping cost in cm/kg or inches/lb. See how much a smaller box would save each month.',
    h1: 'Shipping cost & volumetric weight calculator',
    lead: 'Carriers charge for the space a parcel takes up. Work out the billable weight, the cost per parcel and what a smaller box would save.',
    placement: 'shipping',
    sections: [
      { h2: 'How volumetric weight works', html: `<pre><code>volumetric weight = length × width × height ÷ divisor
billable weight   = max(actual weight, volumetric weight), rounded up</code></pre><p>The usual divisor is <strong>5000</strong> for centimetres and kilograms and <strong>139</strong> for inches and pounds (UPS and FedEx daily rates). Some postal services use 6000 or 166. A 40 × 30 × 20 cm box has a volumetric weight of 4.8 kg: if it holds 3.2 kg of product, you pay for 5 kg.</p>` },
      { h2: 'How to cut shipping costs', html: '<ul><li>Use the smallest box that protects the product; mailers and poly bags beat boxes for soft goods.</li><li>Negotiate a better divisor once you ship volume.</li><li>Charge shipping by billable weight, not actual weight, so big light items don’t lose money.</li></ul>' },
    ],
    faq: [
      ['What is dimensional weight?', 'A weight calculated from the parcel’s size. Carriers charge the higher of actual and dimensional weight so that large, light parcels pay for the space they use.'],
      ['Which divisor should I use?', 'Check your carrier’s rate card: 5000 (cm/kg) and 139 (in/lb) are the most common for express couriers.'],
      ['Does this give exact carrier prices?', 'No. Enter your carrier’s base fee and rate per kg or lb for an estimate; real rates also depend on zone and surcharges.'],
    ],
    related: ['marketplace-profit-calculator', 'amazon-fba-calculator', 'ebay-fee-calculator', 'bundle-pricing-calculator', 'eoq-reorder-point-calculator'],
  },

  // ───────────────────────────────────────────────────────────── Restaurant
  {
    slug: 'food-cost-calculator',
    section: 'restaurant',
    icon: 'utensils',
    name: 'Food Cost Percentage Calculator',
    card: 'Food cost % for one dish or your whole kitchen, compared with your target.',
    title: 'Food Cost Percentage Calculator for Restaurants',
    description: 'Calculate food cost percentage for a dish or for a week or month of sales (opening inventory + purchases − closing inventory). Compare with your target.',
    h1: 'Food cost percentage calculator',
    lead: 'Work out the food cost % of a dish or of your whole kitchen for a period, and see how far you are from your target.',
    placement: 'restaurant',
    sections: [
      { h2: 'The formulas', html: `<pre><code>dish food cost %   = ingredient cost per plate ÷ menu price
period food cost % = (opening inventory + purchases − closing inventory)
                     ÷ food sales</code></pre><p>Use menu prices and sales <strong>before</strong> sales tax or VAT. Example: a dish that costs 3.60 in ingredients and sells for 12.50 has a food cost of 28.8%.</p>` },
      { h2: 'What is a good food cost percentage?', html: '<p>Most full-service restaurants aim for <strong>28–35%</strong>, quick-service for <strong>25–30%</strong>, and fine dining and steakhouses can run higher because of expensive proteins. What matters most is <em>gross profit per plate</em> and keeping the percentage stable from month to month.</p>' },
      { h2: 'Why food cost rises', html: '<ul><li>Supplier price increases that never made it into the menu price.</li><li>Over-portioning and inconsistent plating.</li><li>Waste, spoilage and staff meals that aren’t recorded.</li><li>Inventory counted differently from one period to the next.</li></ul>' },
    ],
    faq: [
      ['How do I calculate food cost percentage?', 'Divide the cost of the ingredients by the menu price (for a dish) or the cost of food used by food sales (for a period), then multiply by 100.'],
      ['Should I include drinks?', 'Track beverage cost separately: drinks usually run at a much lower cost percentage than food.'],
      ['Is lower always better?', 'No. A low percentage on a cheap dish can earn less gross profit than a higher percentage on an expensive one. Use the <a href="../menu-engineering-calculator/">menu engineering matrix</a> to judge by profit.'],
    ],
    related: ['menu-price-calculator', 'recipe-cost-calculator', 'restaurant-profit-calculator', 'menu-engineering-calculator', 'delivery-app-commission-calculator'],
  },
  {
    slug: 'menu-price-calculator',
    section: 'restaurant',
    icon: 'receipt',
    name: 'Menu Price Calculator',
    card: 'Menu price from plate cost and target food cost %, with tax and price endings.',
    title: 'Menu Price Calculator: Price Dishes by Food Cost',
    description: 'Calculate the menu price for a dish from its plate cost and target food cost percentage, with sales tax and charm-price rounding.',
    h1: 'Menu price calculator',
    lead: 'Turn a plate cost into a menu price that hits your target food cost, with tax included and a sensible price ending.',
    placement: 'restaurant',
    sections: [
      { h2: 'The formula', html: `<pre><code>menu price = plate cost ÷ target food cost %
example    = 4.20 ÷ 30% = 14.00</code></pre><p>If your menu prices include tax or VAT, the calculator adds it and then rounds, so the food cost is calculated on the price <em>after</em> tax is removed.</p>` },
      { h2: 'Beyond the food cost method', html: '<p>The food cost method treats every dish the same. In practice, dishes that take a lot of prep or skilled labour should carry a lower food cost percentage, and dishes guests compare easily (burgers, coffee) need to stay close to competitors. Check the competitor field before you print the menu.</p>' },
    ],
    faq: [
      ['What food cost percentage should I use?', 'Start with 28–32% for most dishes, lower for labour-intensive dishes and higher for premium proteins where guests are price-sensitive.'],
      ['Should menu prices end in .99?', 'Casual and quick-service menus often use .99 or .95 endings; full-service menus often use whole numbers, which feel less like a discount.'],
    ],
    related: ['food-cost-calculator', 'recipe-cost-calculator', 'delivery-app-commission-calculator', 'menu-engineering-calculator', 'markup-margin-calculator'],
  },
  {
    slug: 'recipe-cost-calculator',
    section: 'restaurant',
    icon: 'chef',
    name: 'Recipe Cost Calculator',
    card: 'Cost per portion from ingredient pack prices, amounts used and yield.',
    title: 'Recipe Cost Calculator: Cost per Portion & Price',
    description: 'Free recipe costing calculator: ingredient pack price, amount used and yield % give the cost per portion and a suggested menu price.',
    h1: 'Recipe cost calculator',
    lead: 'Enter what you pay for each ingredient and how much the recipe uses, and get the cost per portion and a suggested menu price.',
    placement: 'restaurant',
    sections: [
      { h2: 'How recipe costing works', html: `<pre><code>ingredient cost = pack price ÷ pack size × amount used ÷ yield %
cost per portion = recipe total ÷ portions + extras</code></pre><p><strong>Yield</strong> is the usable part after trimming, peeling, deboning or cooking loss. Chicken breast trimmed to 85% yield means 180 g on the plate needs about 212 g bought.</p>` },
      { h2: 'Tips for accurate costing', html: '<ul><li>Use today’s supplier prices, and re-cost your top sellers whenever prices move.</li><li>Include oil, spices and garnish: small items add up.</li><li>Add packaging for takeaway and delivery under “Extras per portion”.</li></ul>' },
    ],
    faq: [
      ['What units should I use?', 'Any, as long as pack size and amount used are in the same unit for each ingredient (for example, grams and grams).'],
      ['What is a yield percentage?', 'The share of the purchased ingredient that ends up usable. Onions might be 90%, a whole fish 40–50%.'],
    ],
    related: ['food-cost-calculator', 'menu-price-calculator', 'menu-engineering-calculator', 'restaurant-profit-calculator', 'delivery-app-commission-calculator'],
  },
  {
    slug: 'restaurant-profit-calculator',
    section: 'restaurant',
    icon: 'trending',
    name: 'Restaurant Profit Calculator',
    card: 'Monthly profit, prime cost and break-even sales for a restaurant or café.',
    title: 'Restaurant Profit Calculator: Margin & Break-even',
    description: 'Restaurant profit and loss calculator: food cost, labour, prime cost, rent and fees give monthly net profit, margin and break-even sales per day.',
    h1: 'Restaurant profit calculator',
    lead: 'A simple monthly P&L for a restaurant, café or cloud kitchen: net profit, prime cost and the sales you need each day to break even.',
    placement: 'restaurant',
    sections: [
      { h2: 'Prime cost and profit', html: `<pre><code>prime cost   = food &amp; drink cost + labour
net profit   = sales − food − labour − rent − utilities − other − fees
break-even   = (labour + fixed costs) ÷ (1 − food % − fees %)</code></pre><p>Prime cost is the number most operators watch: <strong>55–65% of sales</strong> is typical. Net margins for restaurants are usually thin, around <strong>3–10%</strong>.</p>` },
    ],
    faq: [
      ['What is a good restaurant profit margin?', 'Full-service restaurants typically make 3–6% net, quick-service and cloud kitchens 6–10% when they run well.'],
      ['What is prime cost?', 'Food and drink cost plus labour. It is the biggest controllable cost and should usually be under 65% of sales.'],
    ],
    related: ['food-cost-calculator', 'break-even-calculator', 'delivery-app-commission-calculator', 'menu-price-calculator', 'menu-engineering-calculator'],
  },
  {
    slug: 'delivery-app-commission-calculator',
    section: 'restaurant',
    icon: 'truck',
    name: 'Delivery App Commission Calculator',
    card: 'Uber Eats, DoorDash, Deliveroo and Foodpanda: the menu price you need to keep your profit.',
    title: 'Delivery App Commission Calculator: Menu Markup',
    description: 'How much to mark up menu prices on Uber Eats, DoorDash, Deliveroo or Foodpanda to keep your profit after commission, packaging and promos.',
    h1: 'Delivery app commission calculator',
    lead: 'Delivery apps take 15–30% of each order. Find the app menu price that keeps the same profit (or the same margin) as dine-in.',
    placement: 'restaurant',
    sections: [
      { h2: 'The formula', html: `<pre><code>profit on the app = app price × (1 − promo) × (1 − commission − payment fee)
                    − food cost − packaging
same-profit price = (in-store profit + food cost + packaging)
                    ÷ ((1 − promo) × (1 − commission − payment fee))</code></pre><p>Example: a 14.00 dish with 4.50 food cost earns 9.50 in-store. With 0.60 packaging on a 25% plan, the app price that earns the same 9.50 is (9.50 + 4.50 + 0.60) ÷ 0.75 = <strong>19.47</strong>, a 39% markup.</p>` },
      { h2: 'Ways to stay profitable on delivery apps', html: '<ul><li>Use a separate, shorter delivery menu with dishes that travel well and have high margins.</li><li>Pick the commission plan by your order volume: lower plans reduce reach but keep more per order.</li><li>Fund promos only on items with a large margin.</li><li>Push repeat customers to direct ordering or pickup.</li></ul>' },
    ],
    faq: [
      ['How much commission does Uber Eats or DoorDash take?', 'In the US both offer plans at roughly 15%, 25% and 30% of the food subtotal, with lower rates for pickup. Rates and plans differ by country and contract.'],
      ['Is it allowed to charge more on delivery apps?', 'Usually yes, and many restaurants mark up 15–30%. Some agreements offer lower commission in exchange for price parity; check yours.'],
      ['Does the commission apply to tax and tips?', 'Generally not; commission is charged on the food subtotal. Enter prices before tax.'],
    ],
    related: ['menu-price-calculator', 'food-cost-calculator', 'restaurant-profit-calculator', 'recipe-cost-calculator', 'payment-fee-calculator'],
  },
  {
    slug: 'menu-engineering-calculator',
    section: 'restaurant',
    icon: 'grid',
    name: 'Menu Engineering Matrix',
    card: 'Upload item sales → Stars, Plowhorses, Puzzles and Dogs, with what to do about each.',
    title: 'Menu Engineering Matrix: Stars, Plowhorses & Dogs',
    description: 'Upload or paste menu item sales (CSV) and classify every dish as a Star, Plowhorse, Puzzle or Dog. Runs in your browser; your data is never uploaded.',
    h1: 'Menu engineering matrix',
    lead: 'Paste or upload item sales from your POS and see which dishes earn the most, which to reprice, and which to drop. Your file stays on your device.',
    placement: 'restaurant',
    sections: [
      { h2: 'How the matrix works', html: '<p>Menu engineering (Kasavana &amp; Smith) compares each item on two measures:</p><ul><li><strong>Popularity</strong>: an item is popular if its share of items sold is at least 70% of an equal share (with 10 items, 7%).</li><li><strong>Profitability</strong>: an item is profitable if its contribution margin (price − plate cost) is at least the sales-weighted average.</li></ul><p><strong>Stars</strong> are popular and profitable, <strong>Plowhorses</strong> popular but low-margin, <strong>Puzzles</strong> profitable but slow, and <strong>Dogs</strong> neither.</p>' },
      { h2: 'Preparing your data', html: '<p>Export one period (four weeks is typical) from your POS with the quantity sold and menu price for each item, add the plate cost from your <a href="../recipe-cost-calculator/">recipe costing</a>, and save as CSV with columns <code>item, sold, price, cost</code>. Analyse one menu category at a time (starters with starters) for the clearest results.</p>' },
    ],
    faq: [
      ['Is my sales data uploaded?', 'No. The file is read and analysed in your browser; nothing is sent to a server.'],
      ['What should I do with Dogs?', 'Remove or rework them, unless they serve a purpose such as a kids’ dish or a dietary option that brings in groups.'],
      ['Can I use Excel?', 'Yes: save the sheet as CSV, or copy the four columns from Excel and paste them into the box (tab-separated works too).'],
    ],
    related: ['recipe-cost-calculator', 'food-cost-calculator', 'menu-price-calculator', 'restaurant-profit-calculator', 'delivery-app-commission-calculator'],
  },

  // ───────────────────────────────────────────────────────────── Business
  {
    slug: 'markup-margin-calculator',
    section: 'business',
    icon: 'percent',
    name: 'Markup vs Margin Calculator',
    card: 'Convert between markup and margin, or price a product from either.',
    title: 'Markup vs Margin Calculator: Convert & Price',
    description: 'Free markup and margin calculator: find margin from cost and price, price from markup or margin, and a markup-to-margin conversion table.',
    h1: 'Markup vs margin calculator',
    lead: 'Markup is profit as a share of cost; margin is profit as a share of price. Convert between them and price products correctly.',
    placement: 'business',
    sections: [
      { h2: 'Markup vs margin', html: `<pre><code>markup = (price − cost) ÷ cost
margin = (price − cost) ÷ price
margin = markup ÷ (1 + markup)
markup = margin ÷ (1 − margin)</code></pre><p>A product that costs 60 and sells for 100 has a <strong>66.7% markup</strong> but a <strong>40% margin</strong>. Adding a 40% markup to the same cost gives a price of 84 and only a 28.6% margin, the most common pricing mistake in small businesses.</p>` },
      { h2: 'Common mistakes', html: '<ul><li>Pricing with a markup when your target is a margin.</li><li>Forgetting that marketplace and payment fees come out of the margin.</li><li>Comparing your markup with a competitor’s margin.</li></ul>' },
    ],
    faq: [
      ['Is a 50% markup the same as a 50% margin?', 'No. A 50% markup is a 33.3% margin; a 50% margin needs a 100% markup.'],
      ['Can margin be more than 100%?', 'No. Margin is a share of the price, so it is always below 100%. Markup can be any size.'],
      ['Which should I use?', 'Margin for financial targets and comparing products; markup is convenient for quick pricing from cost. Just don’t mix them.'],
    ],
    related: ['break-even-calculator', 'marketplace-profit-calculator', 'menu-price-calculator', 'bundle-pricing-calculator', 'payment-fee-calculator'],
  },
  {
    slug: 'break-even-calculator',
    section: 'business',
    icon: 'target',
    name: 'Break-even Calculator',
    card: 'Units and sales you need to cover fixed costs, and to hit a profit target.',
    title: 'Break-even Calculator: Units & Sales to Profit',
    description: 'Break-even point calculator: units and revenue needed to cover fixed costs, units for a target profit, and margin of safety.',
    h1: 'Break-even calculator',
    lead: 'How many units you need to sell each month to cover your fixed costs, and how many to reach the profit you want.',
    placement: 'business',
    sections: [
      { h2: 'The formula', html: `<pre><code>contribution per unit = price − variable cost per unit
break-even units      = fixed costs ÷ contribution per unit
units for a target    = (fixed costs + target profit) ÷ contribution
margin of safety      = (expected units − break-even units) ÷ expected units</code></pre><p>Example: fixed costs of 8,000 a month, a price of 40 and variable costs of 22 give a contribution of 18 per unit and a break-even of <strong>445 units</strong>.</p>` },
      { h2: 'What counts as a variable cost?', html: '<p>Anything that rises with each sale: product cost, marketplace and payment fees, shipping, packaging and per-order ad spend. Rent, salaries and software subscriptions are fixed for the month.</p>' },
    ],
    faq: [
      ['What is a break-even point?', 'The number of units (or the sales) at which total contribution exactly covers fixed costs: no profit, no loss.'],
      ['How can I lower my break-even point?', 'Raise the price, cut variable costs per unit (cheaper shipping, lower fees) or reduce fixed costs.'],
    ],
    related: ['markup-margin-calculator', 'restaurant-profit-calculator', 'marketplace-profit-calculator', 'freelance-rate-calculator', 'eoq-reorder-point-calculator'],
  },
  {
    slug: 'payment-fee-calculator',
    section: 'business',
    icon: 'card',
    name: 'Payment Fee Calculator',
    card: 'Stripe, PayPal, Square and Paddle fees, what you receive and what to charge.',
    title: 'Payment Fee Calculator: Stripe, PayPal, Square',
    description: 'Calculate Stripe, PayPal, Square, Paddle and Lemon Squeezy fees: what you receive from a payment, and how much to charge to receive an exact amount.',
    h1: 'Payment fee calculator',
    lead: 'See what Stripe, PayPal, Square or Paddle take from a payment, or how much to charge so you receive an exact amount.',
    placement: 'business',
    sections: [
      { h2: 'The formulas', html: `<pre><code>fee        = amount × fee % + fixed fee
you receive = amount − fee
to receive X, charge (X + fixed fee) ÷ (1 − fee %)</code></pre><p>To receive exactly 100 through Stripe’s standard US rate (2.9% + 0.30), charge <strong>103.30</strong>, not 102.90.</p>` },
      { h2: 'Payment processor vs merchant of record', html: '<p>Stripe, PayPal and Square process the payment; you handle sales tax and VAT yourself. <strong>Paddle</strong> and <strong>Lemon Squeezy</strong> are merchants of record: their higher fee includes collecting and paying sales tax worldwide, which can be worth it for digital products sold internationally.</p>' },
    ],
    faq: [
      ['How much does Stripe charge?', 'The standard US online rate is 2.9% + 30¢ per successful card charge, with extra fees for international cards and currency conversion. Rates differ by country.'],
      ['Can I pass payment fees to customers?', 'In some countries and card schemes surcharging is restricted or capped. Many businesses build the fee into the price instead.'],
    ],
    related: ['markup-margin-calculator', 'marketplace-profit-calculator', 'freelance-rate-calculator', 'etsy-fee-calculator', 'break-even-calculator'],
  },
  {
    slug: 'eoq-reorder-point-calculator',
    section: 'business',
    icon: 'boxes',
    name: 'EOQ & Reorder Point Calculator',
    card: 'Economic order quantity, safety stock and the stock level that should trigger a reorder.',
    title: 'EOQ & Reorder Point Calculator (Safety Stock)',
    description: 'Calculate economic order quantity (EOQ), safety stock for a service level, and the reorder point from lead time and daily demand.',
    h1: 'EOQ & reorder point calculator',
    lead: 'How much to order, and when: economic order quantity, safety stock for your service level and the reorder point.',
    placement: 'business',
    sections: [
      { h2: 'The formulas', html: `<pre><code>EOQ           = √(2 × annual demand × cost per order ÷ holding cost per unit)
safety stock  = z × daily demand std dev × √lead time
reorder point = daily demand × lead time + safety stock</code></pre><p>At a 95% service level, z ≈ 1.645: you expect to run out in about 1 replenishment cycle in 20.</p>` },
      { h2: 'When EOQ doesn’t fit', html: '<p>EOQ assumes steady demand and a fixed cost per order. For seasonal products, supplier minimum order quantities or volume discounts, use EOQ as a starting point and round to what your supplier accepts.</p>' },
    ],
    faq: [
      ['What is a good service level?', '95% is a common default; use 98–99% for best-sellers where a stock-out loses ranking on marketplaces, and lower for slow, expensive items.'],
      ['What is holding cost?', 'The yearly cost of keeping one unit in stock: storage, insurance, shrinkage and the cost of the money tied up. 20–30% of unit cost is a typical estimate.'],
    ],
    related: ['amazon-fba-calculator', 'break-even-calculator', 'shipping-cost-calculator', 'marketplace-profit-calculator', 'markup-margin-calculator'],
  },
  {
    slug: 'bundle-pricing-calculator',
    section: 'business',
    icon: 'package',
    name: 'Bundle Pricing Calculator',
    card: 'Bundle price, customer saving and profit compared with selling items alone.',
    title: 'Bundle Pricing Calculator: Price & Profit per Bundle',
    description: 'Price product bundles: bundle discount, charm-price endings, customer saving and profit per bundle compared with selling the main product alone.',
    h1: 'Bundle pricing calculator',
    lead: 'Set a bundle discount that customers notice without giving away your margin, and see the profit compared with selling the main product alone.',
    placement: 'business',
    sections: [
      { h2: 'Why bundles work', html: '<p>Fees and shipping are paid once per order, so adding a second item at a discount often earns more than the discount costs. Bundles also make prices harder to compare, which reduces price pressure on marketplaces.</p>' },
      { h2: 'Pricing psychology tips', html: '<ul><li>Show the saving in money for expensive items and in percent for cheap ones (the “rule of 100”).</li><li>Prices ending in .99 or .95 read as deals; whole numbers read as premium.</li><li>Offer three options and make the middle one the bundle you want to sell (the decoy effect).</li></ul>' },
    ],
    faq: [
      ['How much should a bundle discount be?', '10–20% is common. The right number is the one where profit per bundle is still higher than profit on the main product alone.'],
      ['Should I bundle slow sellers?', 'Bundling a slow seller with a best-seller can clear stock, but keep an eye on the margin; check it here first.'],
    ],
    related: ['markup-margin-calculator', 'marketplace-profit-calculator', 'shipping-cost-calculator', 'break-even-calculator', 'menu-price-calculator'],
  },
  {
    slug: 'freelance-rate-calculator',
    section: 'business',
    icon: 'briefcase',
    name: 'Freelance Rate Calculator',
    card: 'Hourly and day rate from your income goal, taxes, expenses and billable hours.',
    title: 'Freelance Hourly Rate Calculator & Project Price',
    description: 'Calculate your freelance hourly and day rate from target take-home pay, taxes, business expenses and realistic billable hours, plus a project price.',
    h1: 'Freelance rate calculator',
    lead: 'Work backwards from the income you want to the hourly rate you need, with taxes, expenses and realistic billable hours.',
    placement: 'business',
    sections: [
      { h2: 'The formula', html: `<pre><code>revenue needed = (take-home ÷ (1 − tax %) + expenses) × (1 + buffer %)
hourly rate    = revenue needed ÷ (billable hours per week × weeks worked)
project price  = estimated hours × (1 + contingency %) × hourly rate</code></pre>` },
      { h2: 'Pricing projects, not hours', html: '<p>Clients compare project prices, not hourly rates. Estimate hours, add contingency for revisions and unknowns, then round to a clean figure. If the work is valuable to the client, price above your minimum.</p>' },
    ],
    faq: [
      ['How many billable hours should I assume?', '20–30 hours a week is realistic for most freelancers once admin, sales and learning are counted.'],
      ['Should I charge more for small projects?', 'Yes. Small projects carry the same admin and sales time as big ones, so a minimum fee or a higher rate is common.'],
    ],
    related: ['break-even-calculator', 'payment-fee-calculator', 'markup-margin-calculator', 'bundle-pricing-calculator', 'restaurant-profit-calculator'],
  },
];

export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug)!;
export const toolsIn = (s: Section) => TOOLS.filter((t) => t.section === s);
