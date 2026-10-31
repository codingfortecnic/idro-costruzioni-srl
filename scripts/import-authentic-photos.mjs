import {readFile,writeFile,mkdir,realpath,copyFile} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {fileURLToPath} from 'node:url';

export function validatePhoto(photo){
 if(!/^[a-z0-9][a-z0-9-]{2,60}$/.test(photo.id||''))throw Error('Invalid stable photo ID');
 let url;try{url=new URL(photo.mapsPhotoUrl)}catch{throw Error(`${photo.id}: individual Maps photo link required`)}
 if(!['www.google.com','google.com','maps.google.com','maps.app.goo.gl'].includes(url.hostname)||url.protocol!=='https:')throw Error(`${photo.id}: invalid Maps source`);
 if(!photo.photoLinkVerified||photo.mapsPhotoUrl.includes('q=place_id:'))throw Error(`${photo.id}: verify the individual photo link, not just the business listing`);
 if(!photo.author?.attributionVerified||!photo.author.account)throw Error(`${photo.id}: author attribution not verified`);
 if(photo.authorization?.status!=='verified'||!photo.authorization.evidencePath||!photo.authorization.confirmedBy||!photo.authorization.confirmedAt||photo.authorization.scope!=='company-website-publication')throw Error(`${photo.id}: verified website reuse authorization required`);
 if(!photo.relevance?.assessed||!photo.relevance.pertinent||photo.duplicateOf)throw Error(`${photo.id}: relevance or duplicate review incomplete`);
 if(!photo.contentApproved||!photo.title?.trim()||!photo.alt?.trim()||!photo.description?.trim())throw Error(`${photo.id}: approved descriptive content required`);
 if(!photo.possibleUse?.length||photo.possibleUse.some(p=>!['home','about','projects','service'].includes(p)))throw Error(`${photo.id}: choose valid placements`);
 if(photo.possibleUse.includes('service')&&(!Number.isInteger(photo.serviceIndex)||photo.serviceIndex<0||photo.serviceIndex>5))throw Error(`${photo.id}: serviceIndex must be 0–5`);
 if(!photo.sourceFile)throw Error(`${photo.id}: original file required`);
}
async function run(){
 const args=process.argv.slice(2);const id=args.find(a=>!a.startsWith('--'));if(!id)throw Error('Usage: node scripts/import-authentic-photos.mjs PHOTO_ID [--write]. Default: validate only.');
 const root=process.cwd();const file='assets/google-maps-photo-inventory.json';const inventory=JSON.parse(await readFile(file,'utf8'));const photo=inventory.photos.find(p=>p.id===id);if(!photo)throw Error(`No independently catalogued photograph with ID ${id}. No files changed.`);validatePhoto(photo);
 const privateRoot=await realpath(path.join(root,'assets/private-authentic'));
 async function privateFile(relative){const resolved=await realpath(path.resolve(root,relative));if(!resolved.startsWith(privateRoot+path.sep))throw Error('Source and authorization evidence must stay inside assets/private-authentic');return resolved;}
 const source=await privateFile(photo.sourceFile);const evidence=await readFile(await privateFile(photo.authorization.evidencePath));if(evidence.length<10)throw Error('Authorization evidence is empty or incomplete');
 const bytes=await readFile(source);if(bytes.length>60*1024*1024)throw Error('Source exceeds 60 MiB');const sourceSha256=createHash('sha256').update(bytes).digest('hex');
 const pixels=await sharp(bytes).rotate().resize(9,8,{fit:'fill'}).greyscale().raw().toBuffer();let hash=0n;for(let y=0;y<8;y++)for(let x=0;x<8;x++)hash=(hash<<1n)|BigInt(pixels[y*9+x]>pixels[y*9+x+1]);const differenceHash=hash.toString(16).padStart(16,'0');
 for(const other of inventory.photos.filter(p=>p.id!==id)){if(other.sourceSha256===sourceSha256)throw Error(`Exact duplicate of ${other.id}`);if(other.differenceHash){let delta=hash^BigInt('0x'+other.differenceHash);let distance=0;while(delta){distance+=Number(delta&1n);delta>>=1n}if(distance<=4)throw Error(`Possible visual duplicate of ${other.id}; review before import`);}}
 const rotated=await sharp(bytes).rotate().toBuffer();const metadata=await sharp(rotated).metadata();if(!metadata.width||!metadata.height)throw Error('Unreadable dimensions');if(metadata.width<640&&metadata.height<640)throw Error('Insufficient source resolution');
 console.log('Validated:',id,metadata.width+'x'+metadata.height,'SHA-256:',sourceSha256);if(!args.includes('--write')){console.log('Dry run only. No files written.');return;}
 const preserved=path.join(privateRoot,id);await mkdir(preserved,{recursive:true});const savedOriginal=path.join(preserved,'original'+path.extname(source));if(savedOriginal!==source)await copyFile(source,savedOriginal);
 const output=`public/images/authentic/${id}`;await mkdir(output,{recursive:true});const widths=[...new Set([640,1024,1600,Math.min(2400,metadata.width)].map(w=>Math.min(w,metadata.width)))].sort((a,b)=>a-b);const variants=[];
 for(const width of widths){const filename=`${output}/${width}.webp`;const result=await sharp(rotated).resize({width,withoutEnlargement:true}).webp({quality:87,effort:5}).toFile(filename);variants.push({src:`/images/authentic/${id}/${width}.webp`,width:result.width});}
 Object.assign(photo,{sourceSha256,differenceHash,orientation:metadata.width>metadata.height?'horizontal':metadata.width<metadata.height?'vertical':'square',width:metadata.width,height:metadata.height,variants,imported:true});
 const approved=inventory.photos.filter(p=>p.imported&&p.authorization?.status==='verified');const data=approved.map(p=>({id:p.id,title:p.title,alt:p.alt,width:p.width,height:p.height,variants:p.variants,placements:p.possibleUse,serviceIndex:p.serviceIndex??null,authorizationVerified:true}));
 await writeFile('src/authentic-photo-data.ts',`// Generated only after verified reuse authorization.\nimport type { AuthenticPhoto } from './authenticPhotos';\nexport const authenticPhotos: AuthenticPhoto[] = ${JSON.stringify(data,null,2)};\n`);
 inventory.counts.integrated=approved.length;inventory.counts.verifiedReuseAuthorization=inventory.photos.filter(p=>p.authorization?.status==='verified').length;await writeFile(file,JSON.stringify(inventory,null,2)+'\n');console.log('Imported authorized photo:',id,'Public variants:',variants.length,'Next: lint, build, local review. No deployment performed.');
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))run().catch(error=>{console.error(error.message);process.exitCode=1});
