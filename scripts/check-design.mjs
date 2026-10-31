import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {siteImages} from '../.prerender/prerender.js';
const origin=process.argv[2]?.replace(/\/$/,'');
const routes=['/','/chi-siamo','/servizi','/realizzazioni','/contatti','/privacy','/note-editoriali'];
const expected={'/':4,'/chi-siamo':3,'/servizi':6,'/realizzazioni':6,'/contatti':0,'/privacy':0,'/note-editoriali':0};
const ids=new Set(),titles=new Set(),assets=new Set(['/brand/logo-transparent-400.webp','/brand/logo-transparent-800.webp','/brand/logo-transparent-1600.webp','/brand/favicon-transparent.png','/fonts/manrope.woff2','/fonts/cormorant.woff2','/fonts/cormorant-italic.woff2']);
async function load(route){if(origin){const response=await fetch(origin+route,{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});assert.equal(response.status,200,route);return response.text()}return readFile(`dist${route==='/'?'':route}/index.html`,'utf8')}
for(const route of routes){
 const html=(await load(route)).replace(/<!--.*?-->/gs,'');
 assert.match(html,/italian-baroque-v2/);assert.match(html,/<html lang="it"/);assert.match(html,/noindex,nofollow/);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title);assert.ok(!titles.has(title),'distinct title '+route);titles.add(title);
 assert.match(html,/<meta name="description" content="[^"]+"/);assert.ok(html.includes(`href="https://idro-costruzioni-srl.onrender.com${route}"`),'canonical '+route);assert.match(html,/og:image[^>]+\/brand\//);
 assert.equal([...html.matchAll(/<h1\b/g)].length,1,'one h1 '+route);assert.match(html,/Demo dimostrativa non ufficiale/);assert.match(html,/Vai al contenuto/);
 const matches=[...html.matchAll(/data-slot-id="([^"]+)"/g)];assert.equal(matches.length,expected[route],'slot count '+route);for(const [,id]of matches){assert.ok(!ids.has(id),'unique slot '+id);ids.add(id)}
 assert.equal([...html.matchAll(/<q>/g)].length,expected[route],'quoted photograph descriptions');
 assert.equal([...html.matchAll(/class="slot-eyebrow"/g)].length,expected[route],'photography labels');
 const imgs=[...html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)];assert.equal(imgs.length,2,'only header/footer logos');for(const [,src]of imgs)assert.ok(src.startsWith('/brand/logo-transparent-'),'no photographs: '+src);
 assert.doesNotMatch(html,/<picture\b|<dialog\b|\/images\/|hero-1536|PipeScene|<form\b/,'no photo resources, empty lightbox or fictitious form');
 for(const [,asset]of html.matchAll(/(?:src|href)="(\/(?:assets|brand|fonts)\/[^" ]+)"/g))assets.add(asset);
 for(const [,href]of html.matchAll(/href="(\/[^"#?]*)/g))if(!/\.[a-z0-9]+$/i.test(href))assert.ok(routes.includes(href),'valid internal route '+href);
 const json=html.match(/<script type="application\/ld\+json" id="business-schema">(.*?)<\/script>/)?.[1];assert.equal(JSON.parse(json).taxID,'04135090365');
 if(route==='/'){assert.match(html,/sculpture-stage/);assert.equal([...html.matchAll(/class="luxury-service-card /g)].length,3);}
 if(route==='/servizi')assert.equal([...html.matchAll(/class="luxury-service-card /g)].length,6);
 if(route==='/')assert.match(html,/L’eccellenza/);
 if(route==='/servizi')assert.equal([...html.matchAll(/id="servizio-\d"/g)].length,6);
 if(route==='/contatti'){assert.match(html,/tel:\+393388071114/);assert.match(html,/wa.me\/393388071114/);assert.match(html,/32 recensioni Google/);}
 console.log('PASS',route,expected[route]+' premium photo positions');
}
assert.equal(ids.size,19);assert.equal(new Set(siteImages.map(image=>image.id)).size,19);for(const image of siteImages){assert.equal(image.imageSrc,null,'no photo configured');assert.ok(image.description.length>10);assert.ok(image.alt.length>10);assert.ok(ids.has(image.id),'configured position rendered');}
for(const entry of await readdir('dist/assets'))if(entry.endsWith('.js'))assets.add('/assets/'+entry);
assert.equal(new Set(siteImages.map(image=>image.variant)).size,4,'four configured ornament variants');
for(const asset of assets){if(origin){const response=await fetch(origin+asset,{signal:AbortSignal.timeout(20000)});assert.equal(response.status,200,asset);const type=response.headers.get('content-type')||'';if(asset.endsWith('.js')){assert.ok(type.includes('javascript'));assert.doesNotMatch(await response.text(),/\/images\/|hero-1536|editorial-source/)}else if(asset.endsWith('.css')){const css=await response.text();assert.doesNotMatch(css,/\/images\/|data:image|#[ ]*112235|#[ ]*258ca7/i);for(const [,url]of css.matchAll(/url\(([^)]+)\)/g))assert.ok(url.includes('/fonts/'),'only local font URLs in CSS')}else assert.ok((await response.arrayBuffer()).byteLength>0);}else await access('public'+asset).catch(()=>access('dist'+asset));}
if(origin){assert.equal((await fetch(origin+'/pagina-inesistente')).status,404);for(const name of (await readdir('assets/archive/editorial-public-images')).filter(name=>name.endsWith('.webp'))){const response=await fetch(origin+'/images/'+name+'?verify=black-gold-removal');assert.equal(response.status,404,'old photograph removed '+name)}const robots=await fetch(origin+'/robots.txt').then(response=>response.text());assert.match(robots,/Disallow: \//);const sitemap=await fetch(origin+'/sitemap.xml').then(response=>response.text());for(const route of routes)assert.ok(sitemap.includes('https://idro-costruzioni-srl.onrender.com'+route+'</loc>'));}
async function files(directory){const result=[];for(const entry of await readdir(directory,{withFileTypes:true})){const full=path.join(directory,entry.name);if(entry.isDirectory())result.push(...await files(full));else result.push(full)}return result;}
const published=await files('dist');for(const file of published.filter(file=>/\.(png|webp|jpe?g|avif|gif)$/i.test(file)))assert.ok(file.startsWith(path.join('dist','brand')+path.sep),'only logo raster assets published');
for(const file of published.filter(file=>/\.(css|js|html)$/i.test(file))){const content=await readFile(file,'utf8');assert.doesNotMatch(content,/\/images\/|hero-1536|editorial-source|url\([^)]*\.(?:png|webp|jpe?g)/i,'no prior photograph reference '+file);}
console.log(`PASS 19 unique baroque positions, seven routes, ${assets.size} assets, SEO and published photograph removal. Visual browser checks remain separate.`);
process.exit(0);
