// Cirqle v3 — the design system's content, in one place.
// Divisions, services and the artwork used by the static panels.

export type DivisionKey = 'creative' | 'digital' | 'accounts';

export interface Division {
  key: DivisionKey;
  n: string;
  name: string;
  short: string;
  tag: string;
  color: string;
  soft: string;
  ink: string;
  path: string;
  intro: string;
  services: string[];
  steps: [string, string][];
}

export const DIVISIONS: Record<DivisionKey, Division> = {
  creative: {
    key: 'creative',
    n: '01',
    name: 'Creative',
    short: 'Creative',
    tag: 'Make it look right.',
    color: '#D9479F',
    soft: '#FFF1F8',
    ink: '#8F1C62',
    path: '/services/creative',
    intro: 'Brand identity, design, print and video. Work that looks right the first time.',
    services: ['Branding', 'Design', 'Print & Promotions', 'Video'],
    steps: [
      ['Brief', 'Tell us what it is for and when you need it.'],
      ['Design', 'We share drafts. You pick, we refine.'],
      ['Deliver', 'Final files, ready for print or screen.'],
    ],
  },
  digital: {
    key: 'digital',
    n: '02',
    name: 'Digital',
    short: 'Digital',
    tag: 'Get it seen.',
    color: '#1E8FD6',
    soft: '#EEF7FD',
    ink: '#0F5C8E',
    path: '/services/digital',
    intro: 'Social media, websites and ads. Your business, seen by the right people.',
    services: ['Social Media', 'Websites', 'Meta Ads', 'Content'],
    steps: [
      ['Plan', 'Goals, audience and a monthly calendar.'],
      ['Publish', 'Posts, ads and pages go live on schedule.'],
      ['Report', 'One simple report each month.'],
    ],
  },
  accounts: {
    key: 'accounts',
    n: '03',
    name: 'Accounts & Compliance',
    short: 'Accounts',
    tag: 'Keep it in order.',
    color: '#5B3FD6',
    soft: '#F2EFFF',
    ink: '#3B2694',
    path: '/services/accounts',
    intro: 'GST, tax, reports and company filings. Your numbers in order, every month.',
    services: ['GST', 'Income Tax', 'TDS & TCS', 'MIS Reports', 'MCA Works', 'Bookkeeping'],
    steps: [
      ['Collect', 'We gather invoices and statements from you.'],
      ['Prepare', 'Books, returns and reports, checked twice.'],
      ['File', 'Submitted on time, with confirmation to you.'],
    ],
  },
};

export const DIVISION_ORDER: DivisionKey[] = ['creative', 'digital', 'accounts'];

export const SERVICE_DETAIL: Record<string, string> = {
  Branding: 'Logo, identity, guidelines',
  Design: 'Graphics for print and screen',
  'Print & Promotions': 'Offers, catalogues, displays',
  Video: 'Reels, ads, thumbnails',
  'Social Media': 'Posts, planning, management',
  Websites: 'Design, build, upkeep',
  'Meta Ads': 'Campaigns and reporting',
  Content: 'Copy, photo, short video',
  GST: 'Registration, returns, notices',
  'Income Tax': 'Filing and planning',
  'TDS & TCS': 'Deductions and returns',
  'MIS Reports': 'Monthly numbers you can read',
  'MCA Works': 'Company filings and records',
  Bookkeeping: 'Clean books, every month',
};

// Artwork for the static panels. Portfolio work itself comes from Supabase.
export const ART = {
  logo: '/v3/cirqle-logo.png',
  mark: '/v3/cirqle-mark.png',
  elaraBrand: '/v3/elara-brand.jpg',
  elaraPackaging: '/v3/elara-packaging.jpg',
  elaraSocial: '/v3/elara-social.jpg',
  elmidoBrand: '/v3/elmido-brand.jpg',
  elmidoPackaging: '/v3/elmido-packaging.jpg',
  elmidoVisuals: '/v3/elmido-visuals.jpg',
  rootsSocial: '/v3/roots-social.jpg',
  rootsApp: '/v3/roots-app.jpg',
  rootsVideo: '/v3/roots-video.jpg',
  offer: '/v3/offer-almadina.jpg',
  offer2: '/v3/offer-page2.jpg',
};

// Which division a portfolio collection belongs to.
export const COLLECTION_DIVISION: Record<string, DivisionKey> = {
  'brand-identity': 'creative',
  'social-media': 'digital',
};

export function divisionForCollection(slug?: string | null): DivisionKey {
  if (!slug) return 'creative';
  return COLLECTION_DIVISION[slug] ?? 'creative';
}

export function brandSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const CONTACT = {
  email: 'team@cirqle.work',
  whatsapp: 'https://wa.me/918301839488',
  instagram: 'https://instagram.com/cirqle.works',
  applyUrl: 'https://app.cirqle.work/careers/apply',
  formspree: 'https://formspree.io/f/xdawkvje',
};

export const TAGLINE = 'One Cirqle. Many Possibilities.';
