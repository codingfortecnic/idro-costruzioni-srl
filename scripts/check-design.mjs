import {readFile,readdir,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {siteImages,services} from '../.prerender/prerender.js';
const photos=JSON.parse(await readFile('src/data/editorialPhotos.json','utf8'));
const origin=process.argv[2]?.replace(/\/$/,'');
const routes=['/','/chi-siamo','/servizi','/realizzazioni','/contatti','/privacy','/note-editoriali'];
const assets=new Set(['/brand/logo-transparent-400.webp','/brand/logo-transparent-800.webp','/brand/logo-transparent-1600.webp','/brand/favicon-transparent.png']);
const titles=new Set();
for(const route of routes){const raw=origin?await fetch(origin+route).then(r=>{assert.equal(r.status,200);return r.text()}):await readFile(`dist${route==='/'?'':route}/index.html`,'utf8');const html=raw.replace(/<!--.*?-->/gs,'');
assert.match(html,/photographic-copper-v4/);assert.match(html,/<html lang="it"/);assert.match(html,/noindex,nofollow/);assert.match(html,/Demo dimostrativa non ufficiale/);
const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title&&!titles.has(title));titles.add(title);assert.equal([...html.matchAll(/<h1\b/g)].length,1);assert.ok(html.includes(`href="https://idro-costruzioni-srl.onrender.com${route}"`));
assert.equal([...html.matchAll(/data-slot-id=/g)].length,route==='/realizzazioni'?6:0,'only works placeholders '+route);
assert.equal([...html.matchAll(/sculpture-stage/g)].length,route==='/'?1:0,'one Home sculpture only');
const editorial=[...html.matchAll(/data-editorial-id="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(editorial).size,editorial.length,'no repeated photograph within a page');
assert.equal(editorial.length,route==='/'?8:route==='/chi-siamo'?2:route==='/servizi'?7:0,'photographic coverage '+route);
for(const id of editorial)assert.ok(photos.some(p=>p.id===id));
for(const img of html.matchAll(/<img\b[^>]+>/g)){assert.match(img[0],/alt="[^" ]+[^"]*"/);assert.match(img[0],/width="\d+"/);assert.match(img[0],/height="\d+"/);if(img[0].includes('data-editorial-id=')&&!img[0].includes('data-editorial-id="bathroom"'))assert.match(img[0],/loading="lazy"/);}
if(route==='/'){assert.match(html,/fetchPriority="high"/i);assert.match(html,/32 recensioni Google/)}
if(route==='/servizi'){assert.equal([...html.matchAll(/class="luxury-service-card /g)].length,6);for(const [,copy]of services)assert.ok(html.replaceAll('&#x27;',"'").includes(copy));}
if(route==='/contatti'){assert.match(html,/tel:\+393388071114/);assert.match(html,/wa.me\/393388071114/);assert.match(html,/32 recensioni Google/);assert.match(html,/31 ottobre 2026/)}
assert.doesNotMatch(html,/model-mixer|model-manifold|\/editorial\/bathroom-|<form\b/);
if(route==='/realizzazioni'){assert.equal([...html.matchAll(/<q>/g)].length,6);assert.doesNotMatch(html,/<dialog/);for(const slot of siteImages)assert.ok(html.includes(slot.description.replaceAll("'",'&#x27;')));}
for(const [,asset]of html.matchAll(/(?:src|href)="(\/(?:assets|brand|fonts|photography)\/[^" ]+)"/g))assets.add(asset);
console.log('PASS',route,editorial.length+' editorial photographs');
}
assert.equal(siteImages.length,6);assert.ok(siteImages.every(p=>p.page==='realizzazioni'&&p.imageSrc===null));assert.equal(new Set(photos.map(p=>p.source)).size,photos.length);
for(const photo of photos){assert.ok(photo.author&&photo.source.startsWith('https://')&&photo.licenseUrl.startsWith('https://'));for(const width of [640,1024,1600])assets.add(`/photography/${photo.id}-${width}.webp`)}
for(const asset of await readdir('dist/assets'))assets.add('/assets/'+asset);
for(const asset of assets){if(origin){const r=await fetch(origin+asset,{signal:AbortSignal.timeout(20000)});assert.equal(r.status,200,asset);assert.ok((await r.arrayBuffer()).byteLength>0,asset)}else await access('dist'+asset)}
const scene=await readFile('src/TechnicalScene.tsx','utf8');assert.doesNotMatch(scene,/function Mixer|function Manifold/);assert.match(scene,/function Installation/);
if(origin){assert.equal((await fetch(origin+'/pagina-inesistente')).status,404);for(const width of [640,1024,1536])assert.equal((await fetch(origin+`/editorial/bathroom-${width}.webp`)).status,404,'AI hero no longer published');assert.match(await fetch(origin+'/robots.txt').then(r=>r.text()),/Disallow: \//)}
console.log(`PASS seven routes, six future-work positions, ${photos.length} licensed photographs, ${assets.size} assets, SEO and exactly one model.`);
process.exit(0);
