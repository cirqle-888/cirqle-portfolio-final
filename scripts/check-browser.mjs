/**
 * Browser checks for the v3 site.
 *
 * Runs against a built preview (`npm run preview -- --port 5176 --host
 * 127.0.0.1`) so it exercises the prerendered HTML the visitor actually gets,
 * not the dev server. Supabase is mocked: the portfolio has to render the same
 * way whatever the live database happens to hold that day.
 *
 * Checked per route, at phone and desktop width: one <h1>, one canonical with
 * the right href, a title, no horizontal scroll, no uncaught errors, no broken
 * images. Then the things that are specific to this site: the header
 * navigation, the three divisions, the Work presentation and grid, and the
 * contact form.
 */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.AUDIT_URL || 'http://127.0.0.1:5176';
const SITE = 'https://cirqle.work';

/** Every route the build prerenders — keep in step with scripts/prerender.mjs. */
const ROUTES = [
  '/',
  '/services',
  '/services/creative',
  '/services/digital',
  '/services/accounts',
  '/work',
  '/about',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
];

/** Prerendered pages that deliberately carry `noindex`, plus the 404. */
const NOINDEX = new Set(['/privacy', '/terms', '/this-page-does-not-exist']);

const item = (i) => ({
  id: String(i),
  slug: 'creative-' + i,
  title: 'Test ' + i,
  caption: 'Creative ' + i,
  width: 480,
  height: 600,
  variants: [{ width: 480, height: 600, path: `test-${i}.webp` }],
  position: i,
  collection_position: i,
  kind: 'image',
  format: 'post',
  media_path: null,
  external_url: null,
  duration_seconds: null,
});

const collections = [
  {
    slug: 'social-media',
    eyebrow: 'Work',
    title: 'Social media creatives',
    description: 'Test portfolio',
    seo_title: null,
    seo_description: null,
    position: 0,
    work_brands: [
      {
        slug: 'test-brand',
        name: 'Test Brand',
        tagline: 'Test tagline',
        position: 0,
        logo_path: null,
        work_items: Array.from({ length: 24 }, (_, i) => item(i)),
      },
    ],
  },
  {
    slug: 'brand-identity',
    eyebrow: 'Brand Identity',
    title: 'Brand identity',
    description: 'Test identity work',
    seo_title: null,
    seo_description: null,
    position: 1,
    work_brands: [
      {
        slug: 'second-brand',
        name: 'Second Brand',
        tagline: 'Second tagline',
        position: 0,
        logo_path: null,
        work_items: [{ ...item(0), format: 'logo' }],
      },
    ],
  },
];

const showcases = [
  {
    slug: 'editorial-one',
    client_name: 'Editorial One',
    category: 'Creative',
    description: 'Independent showcase entry',
    media_type: 'image',
    media_url: 'https://example.test/showcase.webp',
    poster_url: null,
    mobile_media_url: 'https://example.test/mobile.webp',
    mobile_media_type: 'image',
    mobile_focal_x: 30,
    mobile_focal_y: 70,
    alt_text: 'Editorial image',
    focal_x: 40,
    focal_y: 60,
    project_path: '/services/creative',
  },
  {
    slug: 'editorial-two',
    client_name: 'Editorial Two',
    category: 'Digital',
    description: 'Second showcase entry',
    media_type: 'image',
    media_url: 'https://example.test/showcase.webp',
    poster_url: null,
    mobile_media_url: 'https://example.test/mobile.webp',
    mobile_media_type: 'image',
    alt_text: 'Second editorial image',
    focal_x: 50,
    focal_y: 50,
    project_path: '/services/digital',
  },
];

const svg = (w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#5824a0"/></svg>`;

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});

/** A context with Supabase and the showcase media stubbed out. */
async function makeContext(width) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await context.route('**/rest/v1/work_collections?**', (route) =>
    route.fulfill({ contentType: 'application/json', body: JSON.stringify(collections) }),
  );
  await context.route('**/rest/v1/work_showcases?**', (route) =>
    route.fulfill({ contentType: 'application/json', body: JSON.stringify(showcases) }),
  );
  await context.route('**/storage/v1/object/public/**', (route) =>
    route.fulfill({ contentType: 'image/svg+xml', body: svg(480, 600) }),
  );
  await context.route('https://example.test/*', (route) =>
    route.fulfill({ contentType: 'image/svg+xml', body: svg(1600, 900) }),
  );
  await context.route('https://formspree.io/**', (route) =>
    route.fulfill({ contentType: 'application/json', body: '{"ok":true}' }),
  );
  return context;
}

/** Fails the run with the route and width that broke, rather than a bare stack. */
const failures = [];
const check = (where, message, condition) => {
  if (!condition) failures.push(`${where}: ${message}`);
};

try {
  for (const width of [390, 1440]) {
    const context = await makeContext(width);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(String(error)));

    for (const route of [...ROUTES, '/this-page-does-not-exist']) {
      const where = `${width}px ${route}`;
      errors.length = 0;
      const response = await page.goto(base + route);
      check(where, `HTTP ${response?.status()}`, response?.status() === 200);
      await page.waitForSelector('h1');
      await page.waitForFunction(
        (expected) => {
          const tags = document.querySelectorAll('link[rel="canonical"]');
          return tags.length === 1 && tags[0].getAttribute('href') === expected;
        },
        SITE + (route === '/' ? '' : route),
      );

      check(where, 'more than one <h1>', (await page.locator('h1').count()) === 1);
      check(where, 'empty <title>', (await page.title()).length > 0);
      check(
        where,
        'horizontal overflow',
        !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)),
      );
      const broken = await page.evaluate(() =>
        [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
      );
      check(where, `broken images ${broken.slice(0, 3).join(', ')}`, broken.length === 0);
      check(where, `uncaught errors ${errors.slice(0, 2).join(' | ')}`, errors.length === 0);

      // The 404 and the legal pages must not be indexed; everything else must.
      const robots = await page.locator('meta[name="robots"]').count();
      if (NOINDEX.has(route)) check(where, 'missing noindex', robots === 1);
      else check(where, 'unexpected robots meta', robots === 0);
    }

    await context.close();
  }

  // Navigation and the three divisions, at desktop width.
  const context = await makeContext(1440);
  const page = await context.newPage();

  await page.goto(base + '/');
  const bar = page.getByRole('navigation', { name: 'Main' });
  check('/', 'no "Get in touch" in the bar', (await bar.locator('a[href="/contact"]').count()) === 1);
  await bar.getByRole('button', { name: 'Open menu' }).click();
  const menu = page.getByRole('navigation', { name: 'Menu' });
  await menu.locator('a').first().waitFor();
  check('/', 'menu has fewer than four entries', (await menu.locator('a').count()) >= 4);
  await menu.getByRole('link', { name: /Work/ }).click();
  await page.waitForURL('**/work');
  check('/work', 'menu stayed open after navigating', await page.locator('.menu').evaluate((el) => !el.classList.contains('open')));

  // Work: the client list and the grid both come up from the mocked data.
  await page.locator('.plist button.pc').first().waitFor();
  check('/work', 'showcase clients missing', (await page.locator('.plist button.pc').count()) === showcases.length);
  await page.locator('#grid').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelectorAll('#grid img').length > 0);

  await page.goto(base + '/services');
  for (const [key, name] of [
    ['creative', 'Creative'],
    ['digital', 'Digital'],
    ['accounts', 'Accounts'],
  ]) {
    check('/services', `no link to /services/${key}`, (await page.locator(`a[href="/services/${key}"]`).count()) > 0);
    await page.goto(base + `/services/${key}`);
    const heading = await page.locator('h1').innerText();
    check(`/services/${key}`, `h1 "${heading}" does not name ${name}`, heading.toLowerCase().includes(name.toLowerCase()));
  }

  // Contact: the form the enquiries actually arrive through.
  await page.goto(base + '/contact');
  const form = page.locator('form.form');
  await form.waitFor();
  for (const field of ['name', 'email', 'service', 'message']) {
    check('/contact', `form field "${field}" missing`, (await form.locator(`[name="${field}"]`).count()) === 1);
  }
  check('/contact', 'name is not required', (await form.locator('input[name="name"]').getAttribute('required')) !== null);
  check('/contact', 'email is not required', (await form.locator('input[name="email"]').getAttribute('required')) !== null);

  await context.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('Browser checks failed:\n' + failures.map((f) => '  - ' + f).join('\n'));
  process.exit(1);
}

assert.equal(failures.length, 0);
console.log(`Browser checks passed for ${ROUTES.length} routes and the 404 page, at 390px and 1440px.`);
