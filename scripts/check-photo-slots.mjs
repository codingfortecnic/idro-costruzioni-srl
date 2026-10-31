import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const pages=[['',3],['chi-siamo',3],['servizi',6],['realizzazioni',6],['contatti',0]];
const origin=process.argv[2]?.replace(/\/$/,'');
async function loadPage(page){if(!origin)return readFile(`dist/${page?page+'/':''}index.html`,'utf8');const response=await fetch(origin+'/'+page,{signal:AbortSignal.timeout(20000)});assert.equal(response.status,200,page);return response.text();}
const allIds=new Set();
for(const [page,count]of pages){const html=(await loadPage(page)).replace(/<!--.*?-->/gs,'');const ids=[...html.matchAll(/data-photo-id="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,count,page+' slots');for(const id of ids){assert.ok(!allIds.has(id),'duplicate slot '+id);allIds.add(id)}assert.equal([...html.matchAll(/class="brand brand-original"/g)].length,2,'header/footer logo');assert.ok(html.includes('/brand/logo-transparent-800.webp'));for(const match of html.matchAll(/(?:src|href)="(\/(?:brand|images|fonts)\/[^" ]+)"/g))await access('public'+match[1]);if(html.includes('is-placeholder'))assert.ok(html.includes('Foto da inserire:'));if(page==='realizzazioni')assert.ok(html.includes('Anteprima dimostrativa.'));console.log('PASS photo slots',page||'home',count);}
const home=await loadPage('');const hero=home.match(/<section class="photo-hero home-hero">[\s\S]*?<\/section>/)?.[0];assert.ok(hero);assert.ok(!hero.includes('Foto da inserire'));assert.ok(hero.includes('/images/hero-1536.webp'));console.log('Hero SHA-256:',createHash('sha256').update(hero).digest('hex'));console.log('PASS 18 unique positions, unchanged hero asset, logos and asset files. Browser layout not tested.');
