# Idro Costruzioni SRL — Luxury Italian Baroque

Sito: https://idro-costruzioni-srl.onrender.com/
Repository: https://github.com/codingfortecnic/idro-costruzioni-srl

Cinque pagine principali, privacy e note editoriali, React 19 e TypeScript. Restyling ornamentale originale: nero vellutato, avorio, oro metallico; Cormorant classica e Manrope locali. Nessuna fotografia utilizzata. Logo trasparente esistente mantenuto nei suoi colori, su supporto neutro; è la ricostruzione raster precedentemente richiesta, non un nuovo marchio o un originale vettoriale.

## Componenti

- Ornaments.tsx: LuxuryFlourish, BaroqueCorner, OrnamentalDivider, GoldFiligree, Medallion, DecorativeFrame. Tracciati SVG originali con volute, foglie, riccioli, fregi e gradienti metallici.
- Sculpture.tsx / SculptureScene.tsx: vera scena Three.js con React Three Fiber, tre nastri tridimensionali a larghezza variabile, due volute, basamento e ombra. Materiali PBR metallici, ambiente di studio procedurale e luci locali. Nessuna texture o modello remoto. Modulo 3D lazy caricato solo dalla Home, circa 252 kB gzip; DPR massimo 1,5, ridotto a 1 con frame lenti. Rendering sospeso fuori vista o a scheda nascosta; demand con movimento ridotto. Fallback ornamentale per errori, assenza o perdita WebGL.
- ServiceCards.tsx: riprende l’esperienza del componente ServiceGrid.tsx della carrozzeria locale, consultato senza modificarlo: hover e apertura fissata, due facce, descrizione e CTA. Tre card Home e sei Servizi; pulsante +/× accessibile, Enter/Space, Escape, aria-expanded, aria-controls e faccia inattiva inert. Transizione 500 ms, disattivata con movimento ridotto.
- BaroquePhotoPlaceholder.tsx: 19 posizioni fotografiche con medaglione, descrizione tra virgolette e cornici originali. Quattro composizioni: scura, avorio, panoramica, verticale ad arco. La Home dedica la hero alla scultura e sposta il suo spazio fotografico nella presentazione.

## Fotografie future

src/data/siteImages.ts centralizza 19 posizioni: Home 4, Chi siamo 3, Servizi 6, Realizzazioni 6. Per aggiungere una foto autentica autorizzata basta inserire il file ottimizzato in public e impostare imageSrc e alt. Il layout resta invariato. File mancante: ripristino del segnaposto. La lightbox si attiva solo per foto configurate; nessun segnaposto è cliccabile.

Vecchie fotografie e marchi non utilizzati restano in assets/archive, fuori da public/dist; originali e provenienza nei rispettivi archivi assets. I soli raster distribuiti sono logo e favicon. I vecchi documenti degli asset sono storici.

## Comandi Windows

```text
npm.cmd ci
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd test
npm.cmd run preview
node scripts/smoke.mjs http://127.0.0.1:4173
node scripts/visual-qa.mjs
node scripts/interaction-qa.mjs
node scripts/smoke.mjs https://idro-costruzioni-srl.onrender.com
node scripts/visual-qa.mjs https://idro-costruzioni-srl.onrender.com
```

Playwright: npx.cmd playwright install chromium. Screenshot e risultati in QA/local e QA/online, fuori dalla distribuzione. La Home viene catturata per segmenti per evitare artefatti della cattura lunga del compositore WebGL. Le altre pagine e il footer hanno catture dedicate.

## Hosting e dati

Sette percorsi pre-renderizzati, metadati distinti, canonical, Open Graph con logo, JSON-LD, sitemap e robots. Demo noindex/nofollow conservata. Nessun modulo fittizio, analytics o incorporamento Maps automatico. Recapiti e dati invariati in src/company.ts. Recensioni 5,0/5, 32 e data 31 ottobre 2026 provengono dal brief, non da verifica live.

Render esistente srv-dbirsj7b9u1s73cbpdg0, workspace tea-dak14nvqj5pc73fencb0, main, build npm ci && npm run build, publish dist, Node 22. Nessun nuovo servizio o piano a pagamento. Commit di sicurezza e305034. Esiti e limiti in VERIFICHE.md.
