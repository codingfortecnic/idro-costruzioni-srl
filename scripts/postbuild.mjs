import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {render,schema} from '../.prerender/prerender.js';
const origin=(process.env.VITE_SITE_URL||'https://idro-costruzioni-srl.onrender.com').replace(/\/$/,'');
const pages=[
 ['/','Acqua, calore e comfort a Sassuolo','Impianti idraulici e soluzioni termoidrauliche per ambienti progettati per durare. Idro Costruzioni SRL, Sassuolo.'],
 ['/chi-siamo','Chi siamo','Precisione, ascolto e attenzione ai dettagli: scopri Idro Costruzioni SRL a Sassuolo.'],
 ['/servizi','Impianti e servizi','Impianti idraulici, riscaldamento, climatizzazione, manutenzione e reti idriche. Esplora gli ambiti di intervento.'],
 ['/realizzazioni','Realizzazioni e ispirazioni','Uno spazio dedicato ai lavori documentati e una selezione editoriale sul rapporto tra acqua, materiali e comfort.'],
 ['/contatti','Contatti','Chiama +39 338 807 1114 o scrivi su WhatsApp. Sede legale: Viale Fabio Filzi 55, Sassuolo (MO).'],
 ['/privacy','Privacy','Informazioni sul funzionamento e sui dati tecnici della demo.'],
 ['/note-editoriali','Note editoriali','Provenienza dei visual e distinzione tra ispirazioni e realizzazioni aziendali.'],
];
const template=await readFile('dist/index.html','utf8');
function pageHTML(path,title,description){return template.replace(/<title>.*?<\/title>/,`<title>${title} | Idro Costruzioni SRL</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${description}"/>`).replace('<div id="root"></div>',()=>`<div id="root">${render(path)}</div>`).replace('</head>',`<link rel="canonical" href="${origin}${path}"/><meta property="og:title" content="${title} | Idro Costruzioni SRL"/><meta property="og:description" content="${description}"/><meta property="og:url" content="${origin}${path}"/><meta property="og:type" content="website"/><meta property="og:locale" content="it_IT"/><meta property="og:image" content="${origin}/images/hero-1536.webp"/><meta name="design-version" content="architectural-2026-10-31"/><script type="application/ld+json" id="business-schema">${JSON.stringify(schema)}</script></head>`)}
for(const [path,title,description]of pages){const directory=path==='/'?'dist':`dist${path}`;await mkdir(directory,{recursive:true});await writeFile(`${directory}/index.html`,pageHTML(path,title,description));}
await writeFile('dist/404.html',pageHTML('/pagina-inesistente','Pagina non trovata','La pagina richiesta non è disponibile.'));
await writeFile('dist/robots.txt',`User-agent: *\nDisallow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([p])=>`<url><loc>${origin}${p}</loc></url>`).join('')}</urlset>`);
console.log('Prerender complete:',pages.length,'pages. Demo noindex.',origin);
