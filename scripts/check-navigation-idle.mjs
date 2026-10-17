import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try{
 const page=await browser.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'});
 await page.goto((process.env.BASE_URL||'http://127.0.0.1:5176')+'/portfolio');
 const header=page.locator('.site-header');await page.locator('.work-presentation').waitFor();
 await page.mouse.move(1100,500);
 assert.equal(await header.evaluate(e=>e.classList.contains('site-header--away')),false);
 await page.waitForFunction(()=>document.querySelector('.site-header')?.classList.contains('site-header--away'),{},{timeout:6500});
 await page.getByRole('button',{name:'Navigation ↑',exact:true}).click();
 await page.waitForFunction(()=>!document.querySelector('.site-header')?.classList.contains('site-header--away'));
 await header.getByRole('link',{name:'Home',exact:true}).focus();
 await page.waitForTimeout(3800);
 assert.equal(await header.evaluate(e=>e.classList.contains('site-header--away')),false);
 await page.mouse.move(1100,500);
 await page.getByRole('button',{name:'Navigation ↑',exact:true}).focus();
 await page.waitForFunction(()=>document.querySelector('.site-header')?.classList.contains('site-header--away'),{},{timeout:6500});
 await page.goto((process.env.BASE_URL||'http://127.0.0.1:5176')+'/');await page.waitForTimeout(3800);
 assert.equal(await header.evaluate(e=>e.classList.contains('site-header--away')),false);
 console.log('Navigation idle checks passed: timed hide, reveal, keyboard protection and homepage unaffected.');
}finally{await browser.close()}
