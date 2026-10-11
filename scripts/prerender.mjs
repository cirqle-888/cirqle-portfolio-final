import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { loadEnv } from 'vite';
import { gzipSync, brotliCompressSync } from 'node:zlib';
const root = path.resolve('dist');
const env = loadEnv('production', process.cwd(), 'VITE_');
const routes = ['/', '/services', '/services/brand-identity', '/services/event-branding', '/services/ui-ux-design', '/highlights/supermarket-campaign', '/products/marketing-pack', '/portfolio', '/about', '/careers', '/contact', '/privacy', '/terms'];
if (env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY) {
  const url = env.VITE_SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/work_collections?select=slug,work_brands(slug,work_items!inner(id))';
  const response = await fetch(url, { headers: { apikey: env.VITE_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}` }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('Cannot build the published-content sitemap.');
  for (const collection of await response.json()) {
    routes.push(`/portfolio/${collection.slug}`);
    for (const brand of collection.work_brands || []) routes.push(`/portfolio/${collection.slug}/${brand.slug}`);
  }
}
const template = await readFile(path.join(root, 'index.html'));
const mime = { '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const server = createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  try { const content = await readFile(file); res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream'); res.end(content); }
  catch { if (path.extname(pathname)) res.writeHead(404).end(); else { res.setHeader('Content-Type', 'text/html'); res.end(template); } }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  let executablePath = process.env.CHROME_PATH;
  if (!executablePath) { try { await access('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'); executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; } catch { /* CI uses Playwright's installed Chromium. */ } }
  browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.route('https://formspree.io/**', route => route.abort());
  for (const route of [...new Set(routes), '/404']) {
    await page.goto(`http://127.0.0.1:${server.address().port}${route}`);
    await page.waitForSelector('h1', { timeout: 30000 });
    await page.waitForFunction(expected => { const tags = document.querySelectorAll('link[rel="canonical"]'); return tags.length === 1 && tags[0].getAttribute('href') === expected; }, 'https://cirqle.work'+(route==='/'?'':route));
    await page.evaluate(() => { for (const el of document.querySelectorAll("[style]")) { if (el instanceof HTMLElement && el.style.opacity === "0") { el.style.opacity = "1"; el.style.transform = "none"; } } });
    let html = await page.content();
    // Local browser origin must never enter production canonical/share metadata.
    html = html.replaceAll(`http://127.0.0.1:${server.address().port}`, 'https://cirqle.work');
    const target = path.join(root, route === '/' ? 'index.html' : route === '/404' ? '404.html' : route.slice(1) + '.html');
    await mkdir(path.dirname(target), { recursive: true }); await writeFile(target, html);
    await writeFile(target + ".gz", gzipSync(html)); await writeFile(target + ".br", brotliCompressSync(html));
  }
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + [...new Set(routes)].map(route => `  <url><loc>https://cirqle.work${route}</loc></url>`).join('\n') + '\n</urlset>\n';
  await writeFile(path.join(root, 'sitemap.xml'), sitemap);
  console.log(`Prerendered ${new Set(routes).size} routes and a 404 page; generated sitemap.`);
} finally { await browser?.close(); server.close(); }
