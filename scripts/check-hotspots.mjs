import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const area={id:'poster',label:'Explore poster gallery',path:'/portfolio/social-media/test-brand',points:[[42,32],[65,32],[65,60],[42,60]]};
/** Brand violet (#7c5cff) mixed 65% with white, as the hover rule computes it. */
const brandStroke='color(srgb 0.666078 0.58451 1)';

const fixture=[{slug:'one',client_name:'One',category:'Social media',description:'Test',media_type:'image',media_url:'https://example.test/art.webp',mobile_media_url:'https://example.test/phone.webp',mobile_media_type:'image',mobile_focal_x:30,mobile_focal_y:70,alt_text:'Test artwork',focal_x:40,focal_y:60,hotspots:{desktop:[area],mobile:[{...area,id:'phone',label:'Explore phone poster',points:[[30,35],[45,35],[45,65],[30,65]]}]}},{slug:'two',client_name:'Two',category:'Motion',media_type:'video',media_url:'https://example.test/video.mp4',poster_url:'https://example.test/art.webp',alt_text:'Video',focal_x:50,focal_y:50}];
await page.route('**/rest/v1/work_showcases?**',r=>r.fulfill({contentType:'application/json',body:JSON.stringify(fixture)}));
await page.route('https://example.test/*.webp',r=>r.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#382052"/></svg>'}));
await page.route('https://example.test/*.mp4',r=>r.abort());
// Overridable: the dev server takes another port whenever 5176 is already
// held (autoPort), and a check pinned to one port silently tests whatever
// happens to be listening there — including another session's stale build.
const base=process.env.BASE_URL||'http://127.0.0.1:5176';
try {
 await page.goto(base+'/portfolio');
 const hot=page.getByRole('link',{name:'Explore poster gallery',exact:true});await hot.waitFor();
 await hot.focus();assert.equal(await hot.evaluate(el=>el===document.activeElement),true);
 // Default: no colour stored on this area, so it glows Cirqle brand violet.
 assert.equal(await hot.locator('polygon').evaluate(el=>getComputedStyle(el).stroke),brandStroke);
 await hot.press('Enter');await page.waitForURL('**/portfolio/social-media/test-brand');
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/portfolio');
 const phone=page.getByRole('link',{name:'Explore phone poster',exact:true});await phone.waitFor();
 const box=await phone.locator('svg').boundingBox(),frame=await page.locator('.wp-hotspots').boundingBox();
 assert.ok(Math.abs(box.width-1600*Math.max(frame.width/1600,frame.height/900))<2);
 assert.ok(Math.abs(box.x-frame.x-(frame.width-box.width)*.3)<2);
 await phone.locator('.wp-hotspot-marker').click();await page.waitForURL('**/portfolio/social-media/test-brand');
 await page.setViewportSize({width:874,height:804});await page.goto(base+'/portfolio');await hot.waitFor();
 await page.setViewportSize({width:1440,height:900});await hot.waitFor();
 await page.getByRole('button',{name:'Two',exact:true}).hover();await page.locator('.wp-media video').waitFor();assert.equal(await page.locator('.wp-hotspot').count(),0);
 await page.getByRole('button',{name:'One',exact:true}).hover();await hot.waitFor();await hot.locator('.wp-hotspot-marker').hover();
 await page.screenshot({path:'/tmp/cirqle-hotspot-desktop.png'});
 console.log('Hotspot checks passed: keyboard, brand-default glow, gallery destination, mobile tap, cover geometry, resizing and client switching. Showcase responses mocked.');
} finally {await browser.close();}
