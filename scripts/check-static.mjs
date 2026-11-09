/**
 * Static checks over the prerendered output in dist/.
 *
 * The route list comes from the files the prerender actually wrote, not from
 * the sitemap: a page that is deliberately left out of the sitemap still has
 * to carry a correct canonical, and a page that silently stopped being
 * prerendered should fail here rather than disappear quietly.
 */
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { gunzipSync, brotliDecompressSync } from 'node:zlib';

const root = 'dist';

/** Every prerendered page in dist, as a route path. */
async function prerenderedRoutes(dir = root) {
  const routes = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue;
      routes.push(...(await prerenderedRoutes(full)));
    } else if (entry.name.endsWith('.html')) {
      const relative = path.relative(root, full).replace(/\.html$/, '');
      routes.push(relative === 'index' ? '/' : '/' + relative);
    }
  }
  return routes.sort();
}

const routes = await prerenderedRoutes();
assert.ok(routes.includes('/'), 'the home page is prerendered');
assert.ok(routes.includes('/404'), 'the 404 page is prerendered');

const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const listed = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/cirqle\.work([^<]*)<\/loc>/g)].map((match) => match[1] || '/'),
);

let noindexCount = 0;
for (const route of routes) {
  const target = path.join(root, route === '/' ? 'index.html' : route.slice(1) + '.html');
  const html = await readFile(target, 'utf8');

  const canonicals = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)];
  assert.equal(canonicals.length, 1, route + ' has one canonical');
  assert.ok(
    canonicals[0][0].includes(`href="https://cirqle.work${route === '/' ? '' : route}"`),
    route + ' uses its own canonical',
  );
  assert.match(html, /<h1[\s>]/, route + ' contains rendered content');
  assert.doesNotMatch(html, /127\.0\.0\.1|localhost:\d/, route + ' leaks no local origin');
  assert.equal(gunzipSync(await readFile(target + '.gz')).toString(), html, route + ' gzip matches');
  assert.equal(brotliDecompressSync(await readFile(target + '.br')).toString(), html, route + ' brotli matches');

  const noindex = /<meta[^>]*name="robots"[^>]*content="noindex, follow"/.test(html);
  if (route === '/404') assert.ok(noindex, '/404 is noindex');
  if (noindex) {
    noindexCount++;
    assert.ok(!listed.has(route), route + ' is noindex and must stay out of the sitemap');
  } else {
    assert.ok(listed.has(route), route + ' is indexable and must be in the sitemap');
  }
}

// Nothing in the sitemap that was never prerendered.
for (const route of listed) assert.ok(routes.includes(route), 'sitemap lists ' + route + ' but it was not prerendered');

console.log(
  `Static SEO checks passed for ${routes.length} prerendered pages ` +
    `(${listed.size} in the sitemap, ${noindexCount} noindex) and compressed HTML consistency.`,
);
