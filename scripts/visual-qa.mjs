/* global document, window, innerWidth, scrollTo, HTMLCanvasElement */
import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const origin=process.argv[2]||'http://127.0.0.1:4173';
const folder=origin.includes('onrender')?'QA/online':'QA/local';await mkdir(folder,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[],results=[];
async function homeCapture(page,path){
 const {width,height}=page.viewportSize();const total=await page.evaluate(()=>document.documentElement.scrollHeight);const tiles=[];
 for(let top=0;top<total;top+=height){const y=Math.min(top,Math.max(0,total-height));await page.locator('header').evaluate((el,hidden)=>{el.style.visibility=hidden?'hidden':''},top>0);await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(120);const screenshot=await page.screenshot();const tile=await sharp(screenshot).extract({left:0,top:top-y,width,height:Math.min(height,total-top)}).toBuffer();tiles.push({input:tile,top,left:0})}
 await sharp({create:{width,height:total,channels:3,background:'#080808'}}).composite(tiles).png().toFile(path);await page.locator('header').evaluate(el=>{el.style.visibility=''});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
}
try{
 for(const width of (process.env.QA_WIDTHS?process.env.QA_WIDTHS.split(',').map(Number):[390,768,1440,1920])){
  const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1,isMobile:width===390,hasTouch:width===390});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/chi-siamo','/servizi','/realizzazioni','/contatti']){
   await page.goto(origin+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   // Reveal every scroll-triggered section before the complete-page capture.
   await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,70))}window.scrollTo({top:0,behavior:"instant"})});await page.waitForTimeout(850);
   const overflow=await page.evaluate(()=>({body:document.documentElement.scrollWidth,viewport:innerWidth}));assert.ok(overflow.body<=width+1,`${route} overflow ${width}: ${JSON.stringify(overflow)}`);
   assert.equal(await page.locator('h1').count(),1);
   await page.locator('footer').screenshot({path:`${folder}/footer-${route==='/'?'home':route.slice(1)}-${width}.png`});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(120);
   const screenshotPath=`${folder}/${route==='/'?'home':route.slice(1)}-${width}.png`;if(route==='/')await homeCapture(page,screenshotPath);else await page.screenshot({path:screenshotPath,fullPage:true});
   if(route==='/'){
    const renderer=await page.locator('canvas[data-renderer="three-webgl"]').count();assert.equal(renderer,1,'real WebGL canvas');
    const mesh=await page.locator('canvas').evaluate(c=>({width:c.width,height:c.height}));assert.ok(mesh.width>0&&mesh.height>0);
    const card=page.locator('.luxury-service-card').first(),toggle=card.locator('button');await card.scrollIntoViewIfNeeded();
    if(width===390){await toggle.tap()}else await card.hover();await page.waitForTimeout(600);assert.equal(await toggle.getAttribute('aria-expanded'),'true');assert.equal(await card.locator('.service-card-back').getAttribute('inert'),null);
    await card.screenshot({path:`${folder}/service-active-${width}.png`});
    await page.mouse.move(0,0);if(await toggle.getAttribute('aria-expanded')==='true')await toggle.click();await toggle.focus();await page.keyboard.press('Enter');assert.equal(await toggle.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    if(width===390){await page.evaluate(()=>scrollTo({top:0,behavior:"instant"}));const menu=page.locator('.menu-toggle');await menu.tap();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false')}
   }
   if(route==='/realizzazioni'){assert.equal(await page.locator('dialog').count(),0);assert.equal(await page.locator('[data-slot-id]').count(),6)}
   results.push({route,width,overflow:false});console.log('PASS',route,width);
  }
  await context.close();
 }
 const fallback=await browser.newPage({viewport:{width:390,height:844}});await fallback.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=()=>null});await fallback.goto(origin,{waitUntil:'networkidle'});assert.ok(await fallback.locator('.sculpture-stage > [data-sculpture-fallback]').count()>0);await fallback.screenshot({path:`${folder}/webgl-fallback.png`});await fallback.close();
 assert.deepEqual(errors,[]);await writeFile(`${folder}/results.json`,JSON.stringify({origin,results,errors,webglFallback:true,checkedAt:new Date().toISOString()},null,2));console.log('PASS visual QA: 20 route/viewport combinations, WebGL, hover/tap/keyboard, menu, no overflow, fallback; screenshots in '+folder);
}finally{await browser.close()}
