import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const origin=process.argv[2]||'http://127.0.0.1:4173';
const browser=await chromium.launch({args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/servizi',{waitUntil:'networkidle'});
 for(const card of await page.locator('.luxury-service-card').all()){const button=card.locator('button');await button.focus();await page.keyboard.press('Space');assert.equal(await button.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await button.getAttribute('aria-expanded'),'false')}
 for(const route of ['/','/chi-siamo','/servizi']){await page.goto(origin+route,{waitUntil:'networkidle'});const stage=page.locator('.technical-stage');await stage.scrollIntoViewIfNeeded();const canvas=stage.locator('canvas[data-renderer]');await canvas.waitFor({state:'attached',timeout:20000});const box=await canvas.boundingBox();const first=await canvas.screenshot();await page.mouse.move(box.x+box.width*.75,box.y+box.height*.4);await page.waitForTimeout(700);assert.ok(!first.equals(await canvas.screenshot()),'real animated model '+route);}
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(origin,{waitUntil:'networkidle'});await page.locator('.technical-stage').scrollIntoViewIfNeeded();await page.waitForTimeout(600);const canvas=page.locator('canvas[data-renderer]');await canvas.waitFor({state:'attached',timeout:20000});assert.equal(await canvas.count(),1);let previous=await canvas.screenshot(),stable=false;for(let attempt=0;attempt<6;attempt++){await page.waitForTimeout(400);const next=await canvas.screenshot();if(previous.equals(next)){stable=true;break}previous=next}assert.ok(stable,'reduced-motion freezes the technical model after renderer warm-up');
 await canvas.evaluate(canvas=>{const gl=canvas.getContext('webgl2');gl.getExtension('WEBGL_lose_context').loseContext()});await page.waitForTimeout(500);assert.equal(await page.locator('.technical-stage > [data-sculpture-fallback]').count(),1,'context loss restores technical fallback');assert.equal(await page.locator('h1').count(),1);
 await page.screenshot({path:'QA/context-loss-fallback.png'});assert.deepEqual(errors,[]);console.log('PASS six service cards with Space/Escape, three animated WebGL models, reduced-motion static WebGL, context-loss fallback; no page errors.');
}finally{await browser.close()}
