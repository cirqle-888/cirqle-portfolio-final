import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const base=process.env.BASE_URL||'http://127.0.0.1:5176';
try{
const page=await browser.newPage({viewport:{width:502,height:798},isMobile:true,hasTouch:true});
const area={id:'a',label:'Open work',path:'/portfolio/social-media/test',points:[[40,35],[65,35],[65,60],[40,60]]};
const rows=['One','Two','Three'].map((name,i)=>({slug:name.toLowerCase(),client_name:name,category:'Branding',description:'Selected work',media_type:'image',media_url:`https://example.test/${i}.webp`,alt_text:name,focal_x:50,focal_y:50,hotspots:{desktop:[area],mobile:[area]}}));
await page.route('**/rest/v1/work_showcases?**',r=>r.fulfill({contentType:'application/json',body:JSON.stringify(rows)}));
await page.route('https://example.test/*.webp',r=>r.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#47344e"/></svg>'}));
await page.goto(base+'/portfolio');await page.locator('.wp-media--ready:not(.wp-media--held)').waitFor();
const centre=page.locator('.wp-client-list .is-current');assert.equal(await centre.textContent(),'One');await page.waitForTimeout(750);const y=(await centre.boundingBox()).y;
await page.waitForFunction(()=>document.querySelector('.wp-client-list .is-current')?.textContent==='Two',null,{timeout:10000});
await page.waitForTimeout(750);assert.ok(Math.abs((await centre.boundingBox()).y-y)<3,'Centre name stays in one position');
assert.equal(await page.locator('.wp-hotspot-outline').evaluate(e=>getComputedStyle(e).animationIterationCount),'1');
await page.getByRole('button',{name:'Pause client rotation'}).click();await page.waitForTimeout(7000);assert.equal(await centre.textContent(),'Two');
await page.getByRole('button',{name:'Three',exact:true}).click();assert.equal(await centre.textContent(),'Three');
await page.getByRole('button',{name:'Resume client rotation'}).click();await page.waitForFunction(()=>document.querySelector('.wp-client-list .is-current')?.textContent==='One',null,{timeout:10000});
await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('button',{name:'Pause client rotation'}).waitFor({state:'detached'});await page.waitForTimeout(7000);assert.equal(await centre.textContent(),'One');
await page.setViewportSize({width:1280,height:900});assert.equal(await page.getByRole('navigation',{name:'Select a client',exact:true}).isVisible(),true);
console.log('Client rotation passed: advance, fixed centre, single reveal, pause/resume, manual selection, wrap, desktop selector and reduced motion.');
}finally{await browser.close()}
