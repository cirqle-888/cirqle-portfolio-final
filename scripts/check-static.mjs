import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gunzipSync,brotliDecompressSync} from 'node:zlib';
const sitemap=await readFile('dist/sitemap.xml','utf8');
const routes=[...sitemap.matchAll(/<loc>https:\/\/cirqle.work([^<]*)<\/loc>/g)].map(match=>match[1]);
for(const route of [...routes,'/404']) {
 const target=route==='/'?'dist/index.html':`dist${route}.html`;
 const html=await readFile(target,'utf8');
 const canonicals=[...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)];
 assert.equal(canonicals.length,1,route+' has one canonical');
 assert.ok(canonicals[0][0].includes(`href="https://cirqle.work${route==='/'?'':route}"`),route+' uses its own canonical');
 assert.match(html,/<h1[\s>]/,route+' contains rendered content');
 assert.equal(gunzipSync(await readFile(target+'.gz')).toString(),html);
 assert.equal(brotliDecompressSync(await readFile(target+'.br')).toString(),html);
 if(route==='/404') assert.match(html,/<meta[^>]*name="robots"[^>]*content="noindex, follow"/);
}
console.log(`Static SEO checks passed for ${routes.length} routes, 404 metadata and compressed HTML consistency.`);
