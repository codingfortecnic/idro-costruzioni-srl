import sharp from 'sharp';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
const {assets}=JSON.parse(await readFile('assets/provenance.json','utf8'));
await mkdir('public/images',{recursive:true});
const manifest=[];
for(const {key} of assets){for(const width of [640,1024,1536]){const file=`public/images/${key}-${width}.webp`;const result=await sharp(`assets/editorial-source/${key}.png`).resize({width,withoutEnlargement:true}).webp({quality:83,effort:5}).toFile(file);manifest.push({file,width:result.width,height:result.height,bytes:result.size});}}
await writeFile('assets/image-manifest.json',JSON.stringify(manifest,null,2));
console.log('Optimized',manifest.length,'responsive images;',Math.round(manifest.reduce((n,f)=>n+f.bytes,0)/1024),'KB total');
