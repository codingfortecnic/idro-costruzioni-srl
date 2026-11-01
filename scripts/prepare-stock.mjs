import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
const photos=[
 ['bathroom',30725660,'Chad Populis','Bagno contemporaneo con marmo chiaro, vasca e doccia in vetro','50% 50%'],
 ['shower',19916739,'Lisa Anna','Doccia in vetro con pareti in marmo e rubinetteria nera','50% 50%'],
 ['copper-work',39885416,'Yudi Ding','Lavorazione di un tubo in rame su banco con piegatubi','50% 48%'],
 ['maintenance-detail',16509869,'AR Abnoy','Mani di un tecnico durante la manutenzione di una tubazione','50% 50%'],
 ['heating-work',34938441,'МОБО Модульные Котельные','Tecnico al lavoro sui collegamenti di un impianto termico','52% 55%'],
 ['pipes',5658852,'Marina Agrelo','Tubazioni metalliche installate con valvole di intercettazione','48% 50%'],
 ['drainage',29274530,'Sergei Starostin','Tubazioni di scarico durante una lavorazione in cantiere','50% 50%'],
 ['radiator',36864512,'Daniel Wells','Radiatore a parete illuminato dalla luce naturale','50% 60%'],
 ['climate-room',20653851,'Roshan Patel','Camera contemporanea con climatizzatore installato a parete','50% 30%'],
 ['radiator-detail',10821325,'furkanfdemir','Dettaglio ravvicinato di un radiatore in ghisa','50% 50%'],
 ['climate-detail',38788452,'NEOSiAM 18+','Unità interna di climatizzazione installata in un ambiente reale','50% 50%'],
 ['copper-water','copper-water','Tony Webster','Tubazioni idriche in rame con valvola di intercettazione','50% 45%'],
].map(([id,sourceId,author,alt,position])=>({id,sourceId,author,alt,position,source:sourceId==='copper-water'?'https://commons.wikimedia.org/wiki/File:Copper_Water_Pipes_and_Water_Line_Shutoff.jpg':`https://www.pexels.com/photo/${sourceId}/`,license:sourceId==='copper-water'?'CC BY 2.0':'Pexels License',licenseUrl:sourceId==='copper-water'?'https://creativecommons.org/licenses/by/2.0/':'https://www.pexels.com/license/',retrieved:'2026-11-01'}));
await mkdir('public/photography',{recursive:true});
for(const photo of photos){const input=`assets/stock-originals/${photo.sourceId}.jpg`;const meta=await sharp(input).metadata();photo.width=meta.width;photo.height=meta.height;for(const width of [640,1024,1600])await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:82,effort:5}).toFile(`public/photography/${photo.id}-${width}.webp`);}
await writeFile('src/data/editorialPhotos.json',JSON.stringify(photos,null,2));
await writeFile('PHOTO-LICENSES.md',`# Fotografie editoriali — 1 novembre 2026\n\nImmagini fotografiche stock, non lavori né personale di Idro Costruzioni SRL. Nessuna fotografia IA è pubblicata. File originali scaricati da Pexels e Wikimedia; derivati WebP locali 640/1024/1600 px. Modifiche: ridimensionamento, compressione e ritaglio responsive CSS, nessuna generazione o alterazione del soggetto.\n\nPexels consente uso gratuito, anche commerciale, adattamento e uso su siti; attribuzione non obbligatoria. Vietati rivendita della copia inalterata, redistribuzione come stock, false approvazioni e usi offensivi delle persone. Non si suggeriscono rapporti tra fotografi, persone raffigurate e azienda. Verifica licenza: https://www.pexels.com/license/ .\n\nLa fotografia di Tony Webster è CC BY 2.0: autore, fonte, licenza e indicazione delle modifiche sono visibili in didascalia e nelle note editoriali. Nessuna approvazione implicita.\n\nOgni soggetto è disponibile in un solo insieme di file responsive, senza copie di asset. Le anteprime dello stesso servizio in Home e Servizi condividono la fotografia del servizio; nessuna foto è ripetuta all'interno della stessa pagina. Realizzazioni contiene solo segnaposto.\n\n| Asset | Autore | Fonte | Licenza |\n|---|---|---|---|\n`+photos.map(p=>`| ${p.id} | ${p.author} | [scheda originale](${p.source}) | [${p.license}](${p.licenseUrl}) |`).join('\n')+'\n');
