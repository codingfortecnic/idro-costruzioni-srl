import {readFile,writeFile,mkdir} from 'node:fs/promises';
const origin=process.env.VITE_SITE_URL?.replace(/\/$/,'');
const pages=[['/','Home','Impiantistica idraulica e termoidraulica a Sassuolo.'],['/chi-siamo','Chi siamo','Conosci Idro Costruzioni SRL a Sassuolo.'],['/servizi','Servizi','Scopri le aree di intervento proposte da Idro Costruzioni SRL.'],['/realizzazioni','Realizzazioni','Galleria predisposta per fotografie aziendali autorizzate.'],['/contatti','Contatti','Telefono, sede legale e indicazioni per Idro Costruzioni SRL.'],['/privacy','Privacy','Informazioni sul funzionamento della demo.']];
const template=await readFile('dist/index.html','utf8');
for(const [path,title,description] of pages){let html=template.replace(/<title>.*?<\/title>/,`<title>${title} | Idro Costruzioni SRL – Sassuolo</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${description}"/>`);if(origin){html=html.replace('</head>',`<link rel="canonical" href="${origin}${path}"/><meta property="og:title" content="${title} | Idro Costruzioni SRL"/><meta property="og:description" content="${description}"/><meta property="og:url" content="${origin}${path}"/><meta property="og:type" content="website"/></head>`)}if(path!=='/'){await mkdir(`dist${path}`,{recursive:true});await writeFile(`dist${path}/index.html`,html)}else await writeFile('dist/index.html',html)}
await writeFile('dist/404.html',template);
await writeFile('dist/robots.txt',`User-agent: *\nDisallow: /\n${origin?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin?pages.map(([p])=>`<url><loc>${origin}${p}</loc></url>`).join(''):''}</urlset>`);
// LocalBusiness intenzionalmente escluso dalla demo: dati e uso commerciale non ancora approvati.
console.log('Pagine statiche e SEO generati. Demo noindex; URL:',origin||'non ancora assegnato');
