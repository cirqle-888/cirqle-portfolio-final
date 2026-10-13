import { chromium } from 'playwright';
import fs from 'node:fs';
import sharp from 'sharp';
import assert from 'node:assert/strict';
const row=JSON.parse(fs.readFileSync(new URL('../docs/fixtures/elara-desktop-scene.json',import.meta.url),'utf8'));
const points=JSON.parse(fs.readFileSync(new URL('../docs/fixtures/elara-desktop-bottle-outline.json',import.meta.url),'utf8'));
row.hotspots={...row.hotspots,desktop:[{id:'elara-desktop-bottle',label:'Explore Elara branding',path:'/portfolio/brand-identity/elara-perfumes',points,color:'#edc88e',colorTo:null}]};
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
await page.route('**/rest/v1/work_showcases?**',r=>r.fulfill({contentType:'application/json',body:JSON.stringify([row])}));
try{
 await page.goto('http://127.0.0.1:5176/portfolio');const link=page.getByRole('link',{name:'Explore Elara branding'});await link.waitFor();await page.waitForTimeout(300);
 const baseline=await page.screenshot();
 await link.locator('.wp-hotspot-hit').hover({position:{x:130,y:190}});await page.waitForTimeout(300);
 const after=await page.screenshot({path:'/tmp/elara-outer-glow-desktop.png'});
 assert.equal(await link.locator('.wp-hotspot-outline polygon').evaluate(e=>getComputedStyle(e).fill),'none');
 assert.equal(await link.locator('.wp-hotspot-outline').evaluate(e=>getComputedStyle(e).opacity),'1');
 const geometry=await link.locator('svg').boundingBox();
 // Sample well inside the lower bottle, away from the interactive label.
 const region={left:Math.round(geometry.x+geometry.width*.58),top:Math.round(geometry.y+geometry.height*.69),width:60,height:60};
 const beforePixels=await sharp(baseline).extract(region).raw().toBuffer();const afterPixels=await sharp(after).extract(region).raw().toBuffer();assert.deepEqual(beforePixels,afterPixels,'Hover must not tint the bottle interior');
 const poly=await link.locator('.wp-hotspot-hit').getAttribute('points');assert.equal(poly.split(' ').length,180);
 await link.focus();assert.equal(await link.locator('.wp-hotspot-outline').evaluate(e=>getComputedStyle(e).opacity),'1');
 await link.press('Enter');await page.waitForURL('**/portfolio/brand-identity/elara-perfumes');
 console.log('Elara: 180-point mask, exterior-only glow, unchanged interior pixels and gallery navigation verified.');
}finally{await browser.close()}
