/* global document, window, innerWidth, scrollY, scrollTo, HTMLCanvasElement */
import {chromium} from '@playwright/test';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const origin=process.argv[2]||'http://127.0.0.1:4173';
const folder=origin.includes('onrender')?'QA/copper-online':'QA/copper-local';await mkdir(folder,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[],results=[];const buildTag=(await fetch(origin).then(r=>r.text())).match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1];
async function homeCapture(page,path){
 const stage=page.locator('.technical-stage');await stage.scrollIntoViewIfNeeded();const box=await stage.boundingBox();const top=box.y+await page.evaluate(()=>scrollY);const rendered=await stage.screenshot({timeout:60000});await stage.locator('canvas').evaluate(canvas=>{canvas.style.visibility='hidden'});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));const full=await page.screenshot({fullPage:true,timeout:60000});await stage.locator('canvas').evaluate(canvas=>{canvas.style.visibility=''});await sharp(full).composite([{input:rendered,left:Math.round(box.x),top:Math.round(top)}]).png().toFile(path);
}
try{
 for(const width of (process.env.QA_WIDTHS?process.env.QA_WIDTHS.split(',').map(Number):[390,768,1440,1920])){
  const isolated=await chromium.launch({headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const context=await isolated.newContext({viewport:{width,height:1000},deviceScaleFactor:1,isMobile:width===390,hasTouch:width===390});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/chi-siamo','/servizi','/realizzazioni','/contatti']){
   await page.goto(origin+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   // Reveal every scroll-triggered section before the complete-page capture.
   await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,70))}window.scrollTo({top:0,behavior:"instant"})});await page.waitForTimeout(850);
   const overflow=await page.evaluate(()=>({body:document.documentElement.scrollWidth,viewport:innerWidth}));assert.ok(overflow.body<=width+1,`${route} overflow ${width}: ${JSON.stringify(overflow)}`);
   assert.equal(await page.locator('h1').count(),1);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(250);
   await page.locator('footer').screenshot({path:`${folder}/footer-${route==='/'?'home':route.slice(1)}-${width}.png`});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(120);
   const screenshotPath=`${folder}/${route==='/'?'home':route.slice(1)}-${width}.png`;if(route==='/')await homeCapture(page,screenshotPath);else await page.screenshot({path:screenshotPath,fullPage:true});
   if(route==='/'){
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.locator('canvas[data-renderer="three-webgl"]').waitFor({state:'attached'});const renderer=await page.locator('canvas[data-renderer="three-webgl"]').count();assert.equal(renderer,1,'real WebGL canvas');
    const mesh=await page.locator('canvas').evaluate(c=>({width:c.width,height:c.height}));assert.ok(mesh.width>0&&mesh.height>0);
    const card=page.locator('.luxury-service-card').first(),toggle=card.locator('button');await card.scrollIntoViewIfNeeded();
    if(width===390){await toggle.tap()}else await card.hover();await page.waitForTimeout(600);assert.equal(await toggle.getAttribute('aria-expanded'),'true');if(width!==390){await page.mouse.move(0,0);await page.waitForTimeout(550);assert.equal(await toggle.getAttribute('aria-expanded'),'false');await card.hover();await page.waitForTimeout(550)}assert.equal(await card.locator('.service-card-back').getAttribute('inert'),null);
    await card.screenshot({path:`${folder}/service-active-${width}.png`});
    await page.mouse.move(0,0);if(await toggle.getAttribute('aria-expanded')==='true')await toggle.click();await toggle.focus();await page.keyboard.press('Enter');assert.equal(await toggle.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    if(width===390){await page.evaluate(()=>scrollTo({top:0,behavior:"instant"}));const menu=page.locator('.menu-toggle');await menu.tap();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false')}
   }
   if(['/','/chi-siamo','/servizi'].includes(route)){await page.emulateMedia({reducedMotion:'reduce'});const stage=page.locator('.technical-stage');await stage.scrollIntoViewIfNeeded();await stage.locator('canvas[data-renderer]').waitFor({state:'attached'});await page.waitForTimeout(350);await stage.screenshot({path:`${folder}/model-${route==='/'?'installation':route.slice(1)}-${width}.png`});}
   if(route==='/realizzazioni'){assert.equal(await page.locator('dialog').count(),0);assert.equal(await page.locator('[data-slot-id]').count(),6)}
   await page.emulateMedia({reducedMotion:'no-preference'});results.push({route,width,overflow:false});console.log('PASS',route,width);
  }
  await context.close();await isolated.close();
 }
 const fallback=await browser.newPage({viewport:{width:390,height:844}});await fallback.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=()=>null});await fallback.goto(origin,{waitUntil:'networkidle'});assert.ok(await fallback.locator('.sculpture-stage > [data-sculpture-fallback]').count()>0);await fallback.screenshot({path:`${folder}/webgl-fallback.png`});await fallback.close();
 assert.deepEqual(errors,[]);const previous=await readFile(`${folder}/results.json`,'utf8').then(JSON.parse).catch(()=>null);const combined=new Map((previous?.buildTag===buildTag&&previous?.origin===origin?previous.results:[]).map(item=>[item.route+'|'+item.width,item]));for(const item of results)combined.set(item.route+'|'+item.width,item);await writeFile(`${folder}/results.json`,JSON.stringify({origin,buildTag,results:[...combined.values()],errors,webglFallback:true,checkedAt:new Date().toISOString()},null,2));console.log(`PASS visual QA: ${results.length} route/viewport combinations in this run, ${combined.size} combined for this build; three technical models, hover/tap/keyboard, menu, fallback; screenshots in ${folder}`);
}finally{await browser.close()}
