# Idro Costruzioni SRL — Contemporary Copper

Sito: https://idro-costruzioni-srl.onrender.com/
Repository: https://github.com/codingfortecnic/idro-costruzioni-srl

Redesign contemporaneo con blu notte/antracite, bianco caldo, pietra e rame/bronzo. Home fotografica, tre modelli WebGL reali, servizi interattivi e cinque pagine distinte. Logo trasparente esistente e colori conservati: la ricostruzione raster precedentemente richiesta, non un nuovo marchio o un originale vettoriale.

## Riferimenti e procedimento

Consultato il progetto locale carrozzeria-moderna-demo, senza modificarlo: ServiceGrid.tsx e automotive.css. Card a due facce, hover temporaneo e apertura fissabile con pulsante, inert/aria-expanded e gestione touch/tastiera. Nei sorgenti attuali della carrozzeria non risultano scene Three.js/WebGL: la profondità delle card usa CSS perspective/rotateY. Il 3D tecnico di Idro è realizzato direttamente con Three.js e React Three Fiber.

Le tre immagini citate nel brief non erano presenti negli allegati accessibili. Usata la descrizione e l’immagine del bagno già disponibile in assets/archive/editorial-public-images, di provenienza editoriale generata nella precedente iterazione. La hero la identifica come illustrativa e non come lavoro aziendale. Versioni responsive locali in public/editorial (640, 1024, 1536 px). Nessun’altra foto pubblicata nelle pagine dei lavori.

Prima verificati Home e una card a 1440 e 390 px, con screenshot normale/aperto e scena WebGL. Corretto l’overflow dei segnaposto annidati. Solo dopo il controllo visivo il sistema è stato esteso agli altri servizi e ai modelli aggiuntivi. Prove del prototipo in QA/copper-prototype.

## Componenti e 3D

- TechnicalScene.tsx: scena installation con tre derivazioni, collettori, raccordi, valvole, manometro, supporti e pannello; scena mixer con rubinetto cromato; scena manifold con quattro derivazioni. Reti collegate e supporti coerenti, non elementi sospesi casualmente.
- Sculpture.tsx: caricamento separato del motore, osservazione viewport e visibilità scheda, error boundary e fallback tecnico. Home: installazione in rame subito dopo la hero. Chi siamo: miscelatore. Servizi: collettore. Una scena per pagina, modulo condiviso circa 252 kB gzip.
- Materiali PBR, ambiente procedurale RoomEnvironment/PMREM, luci di studio, ombre a 512 px, DPR 1–1,4 riducibile a 1. Oscillazione lenta e risposta moderata al puntatore. Rendering demand fuori vista e con movimento ridotto. Fallback per assenza o perdita WebGL. Nessun modello, HDR o texture remota.
- ServiceCards.tsx: tre card Home e sei Servizi, testi esatti del brief in company.ts, transizione 500 ms. Hover apre e uscita richiude; +/× fissa o chiude il pannello; Enter/Space ed Escape. Le facce condividono la stessa cella e altezza, evitando salti.
- PhotoPlaceholder.tsx: 19 posizioni con superfici pietra/antracite, tracciati architettonici, camera discreta e descrizione centrale tra virgolette. Nessun fregio o cornice barocca nei componenti attivi; vecchi componenti e CSS rimossi.

## Fotografie future

src/data/siteImages.ts centralizza 19 posizioni: Home 4, Chi siamo 3, Servizi 6, Realizzazioni 6. Inserire file autentico autorizzato e impostare imageSrc/alt per sostituire il segnaposto senza cambiare layout. File mancante: fallback automatico. Lightbox soltanto per fotografie configurate, mai per i segnaposto.

## Comandi Windows

```text
npm.cmd ci
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd test
npm.cmd run preview
node scripts/prototype-qa.mjs
node scripts/visual-qa.mjs
node scripts/interaction-qa.mjs
node scripts/smoke.mjs http://127.0.0.1:4173
node scripts/smoke.mjs https://idro-costruzioni-srl.onrender.com
node scripts/visual-qa.mjs https://idro-costruzioni-srl.onrender.com
```

Playwright: npx.cmd playwright install chromium. Prove e screenshot in QA/copper-local e QA/copper-online, fuori dalla distribuzione. Per la Home la cattura pagina viene composta con il fotogramma reale della scena, salvato anche separatamente, per evitare artefatti del compositore software. Movimento fermato solo durante le catture, animazione verificata separatamente confrontando fotogrammi reali. Chromium usa SwiftShader nel collaudo; non sostituisce prove su dispositivi fisici.

## Dati, SEO e hosting

Sette percorsi pre-renderizzati, metadati distinti, canonical, Open Graph con logo, JSON-LD, sitemap, robots e demo noindex/nofollow. Telefono, Maps e WhatsApp conservati, nessun modulo fittizio. Recensioni 5,0/5 e 32 al 31 ottobre 2026: valori del brief, non nuova verifica live. Categorie servizi proposte per la demo, da confermare prima della pubblicazione commerciale.

Render esistente srv-dbirsj7b9u1s73cbpdg0, workspace tea-dak14nvqj5pc73fencb0, main, build npm ci && npm run build, publish dist, Node 22. Nessun nuovo repository, servizio o piano a pagamento. Commit di sicurezza f05fe90. Dettagli in VERIFICHE.md.
