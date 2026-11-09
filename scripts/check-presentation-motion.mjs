import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1100,height:850},reducedMotion:'no-preference'});
const area={id:'poster',label:'Explore gallery',path:'/portfolio/brand-identity/test',points:[[40,35],[65,35],[65,70],[40,70]]};
const rows=['One','Two'].map((name,i)=>({slug:name.toLowerCase(),client_name:name,category:'Branding',description:'Test',media_type:'image',media_url:`https://example.test/${i}.webp`,alt_text:name,focal_x:50,focal_y:50,hotspots:{desktop:[area],mobile:[area]}}));
await page.route('**/rest/v1/work_showcases?**',r=>r.fulfill({contentType:'application/json',body:JSON.stringify(rows)}));
await page.route('https://example.test/*.webp',async r=>{if(r.request().url().includes('/1.'))await new Promise(resolve=>setTimeout(resolve,500));await r.fulfill({contentType:'image/svg+xml',body:`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="${r.request().url().includes('/1.')?'#526044':'#382052'}"/></svg>`})});
try{
 await page.goto('http://127.0.0.1:5176/portfolio');await page.locator('.wp-media--ready:not(.wp-media--held)').waitFor();await page.waitForTimeout(700);
 const marker=page.locator('.wp-hotspot-marker');assert.equal(await marker.evaluate(e=>getComputedStyle(e).opacity),'0');assert.equal(await marker.textContent(),'↗Explore gallery ↗');
 await page.getByRole('button',{name:'Two',exact:true}).hover();await page.waitForTimeout(180);
 assert.match(await page.locator('.wp-media--held img').getAttribute('src'),/0.webp/);
 await page.waitForFunction(()=>document.querySelector('.wp-media:not(.wp-media--held)')?.classList.contains('wp-media--ready'));
 assert.match(await page.locator('.wp-media--held img').getAttribute('src'),/0.webp/);
 const opacity=await page.locator('.wp-media:not(.wp-media--held)').evaluate(e=>Number(getComputedStyle(e).opacity));assert.ok(opacity<1,'Incoming visual must dissolve rather than jump');
 await page.waitForTimeout(750);assert.equal(await page.locator('.wp-media:not(.wp-media--held)').evaluate(e=>getComputedStyle(e).opacity),'1');
 await page.getByRole('button',{name:'One',exact:true}).hover();await page.waitForTimeout(40);await page.mouse.move(1050,500);await page.waitForTimeout(200);assert.equal(await page.getByRole('button',{name:'Two',exact:true}).getAttribute('aria-pressed'),'true');
 const link=page.getByRole('link',{name:'Explore gallery',exact:true});await link.focus();await page.waitForFunction(()=>getComputedStyle(document.querySelector('.wp-hotspot-marker')).opacity==='1');
 await page.evaluate(()=>{window.__keptDocument='yes';window.__transitions=0;const original=document.startViewTransition.bind(document);document.startViewTransition=(...args)=>{window.__transitions++;return original(...args)}});
 await link.press('Enter');await page.waitForURL('**/portfolio/brand-identity/test');assert.equal(await page.evaluate(()=>window.__keptDocument),'yes');assert.equal(await page.evaluate(()=>window.__transitions),1);
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:5176/portfolio');await page.locator('.wp-hotspot').waitFor();assert.ok(await page.locator('.wp-media:not(.wp-media--held)').evaluate(e=>parseFloat(getComputedStyle(e).transitionDuration)<0.001));
 console.log('Presentation motion passed: held frame, intermediate opacity, hover intent, clean resting artwork, keyboard label, SPA gallery dissolve and reduced motion.');
}finally{await browser.close()}
