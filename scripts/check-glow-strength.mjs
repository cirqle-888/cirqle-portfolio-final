import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const base=process.env.BASE_URL||'http://127.0.0.1:5176';
try {
 for(const touch of [false,true]){
  const page=await browser.newPage({viewport:{width:touch?390:1440,height:900},hasTouch:touch,isMobile:touch,reducedMotion:'reduce'});
  const area={id:'area',label:'Explore artwork',path:'/portfolio/social-media/test',points:[[35,30],[65,30],[65,65],[35,65]]};
  const row={slug:'test',client_name:'Test',category:'Social media',media_type:'image',media_url:'https://example.test/art.webp',alt_text:'Test',focal_x:50,focal_y:50,hotspots:{desktop:[{...area,glowStrength:.5}],mobile:[{...area,glowStrength:3}]}};
  await page.route('**/rest/v1/work_showcases?**',r=>r.fulfill({contentType:'application/json',body:JSON.stringify([row])}));
  await page.route('https://example.test/art.webp',r=>r.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#282028"/></svg>'}));
  await page.goto(base+'/portfolio');const outline=page.locator('.wp-hotspot-outline');await outline.waitFor({state:'attached'});
  assert.equal(await outline.evaluate(e=>getComputedStyle(e).opacity),'0.35');
  const stroke=await outline.locator('polygon').evaluate(e=>({width:parseFloat(getComputedStyle(e).strokeWidth),fill:getComputedStyle(e).fill,filter:getComputedStyle(e).filter}));
  assert.ok(Math.abs(stroke.width-1.6)<.01);assert.equal(stroke.fill,'none');assert.ok(stroke.filter.includes(touch?'21px':'3.5px'));
  if(!touch){await page.locator('.wp-hotspot').focus();assert.equal(await outline.evaluate(e=>getComputedStyle(e).opacity),'1')}
  await page.locator('.wp-browse').focus();
  await page.mouse.move(0,0);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await outline.evaluate(e=>{const a=e.getAnimations()[0];a.pause();a.currentTime=1500+7500*.2});
  assert.equal(await outline.evaluate(e=>getComputedStyle(e).opacity),'0');
  await outline.evaluate(e=>{e.getAnimations()[0].currentTime=1500+7500*.72});
  assert.ok(Number(await outline.evaluate(e=>getComputedStyle(e).opacity))>.8);
  if(!touch){
   await page.locator('.wp-hotspot-hit').hover();
   assert.equal(await outline.evaluate(e=>getComputedStyle(e).animationName),'none');
   assert.equal(await outline.evaluate(e=>getComputedStyle(e).opacity),'1');
  }
  await page.close();
 }
 console.log('Glow checks passed: fixed thin edge at different strengths, gentle pulse and quiet gap on touch and desktop, steady desktop hover, reduced motion, desktop focus and no interior fill.');
}finally{await browser.close()}
