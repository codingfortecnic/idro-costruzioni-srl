# Idro Costruzioni SRL — Architectural redesign

Sito: https://idro-costruzioni-srl.onrender.com/  
Repository: https://github.com/codingfortecnic/idro-costruzioni-srl

React 19, TypeScript, Vite, React Router, Motion, Lucide. Frontend statico, nessun backend. Cinque pagine principali, privacy e note editoriali. Il precedente modello Three.js e le illustrazioni dei tubi sono stati rimossi, incluse le dipendenze non più necessarie.

## Comandi Windows

```text
npm.cmd ci
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
npm.cmd test
node scripts/smoke.mjs https://idro-costruzioni-srl.onrender.com
```

La build genera bundle client, un renderer temporaneo `.prerender/` e HTML completi per ogni percorso. `dist/` e `.prerender/` non sono versionati. Il middleware di preview serve gli HTML specifici anche per URL senza slash finale. Su Render le pagine sono directory reali e gli URL sconosciuti usano `404.html`. La navigazione client continua a usare React Router.

## Visual e tipografia

Otto concept editoriali originali generati con Imagegen, non fotografie di lavori aziendali. Originali in `assets/editorial-source/`; prompt e provenienza in `assets/provenance.json`; versioni WebP in `public/images/`, larghezze 640, 1024 e 1536. `npm.cmd run images` rigenera le 24 versioni con Sharp. Manifest dei pesi in `assets/image-manifest.json`. La tavola `assets/editorial-contact-sheet.png` serve a controllare la coerenza degli asset, non è uno screenshot del sito.

Manrope variabile e Cormorant Garamond regular/italic sono serviti localmente da `public/fonts/`, con le rispettive licenze SIL Open Font License. Fonte: Google Fonts, repository google/fonts. Nessuna chiamata esterna per foto o font durante la navigazione.

## Dati e trasparenza

`src/company.ts` centralizza i dati e lo stato interno dei servizi. I dati societari trovano riscontro nelle fonti pubbliche secondarie: https://atoka.io/public/it/azienda/idro-costruzioni-srl/4ea3e663d5ec e https://www.ufficiocamerale.it/3450/idro-costruzioni-srl . Richiesta la conferma del titolare prima del lancio commerciale. Il JSON-LD comprende nome, sede e partita IVA; non include recensioni, telefono o abilitazioni non confermate.

Il footer riporta «Demo dimostrativa non ufficiale». La pagina Note editoriali chiarisce immagini generate, servizi e dati da approvare. Recensioni: 5,0/5 e 32, rilevazione del brief al 31 ottobre 2026, non live e non verificata direttamente. Nessuna fotografia da Google Maps è stata scaricata. La gallery aziendale resta in attesa di file autorizzati; il percorso editoriale ha lightbox dedicata e diciture esplicite.

Telefono e WhatsApp hanno priorità. Il modulo email resta inattivo, senza simulazioni. No analytics o tracking. Demo noindex/nofollow e robots Disallow preservati.

## Render esistente

Servizio `srv-dbirsj7b9u1s73cbpdg0`, workspace `tea-dak14nvqj5pc73fencb0`, branch `main`, build `npm ci && npm run build`, publish `dist`, `VITE_SITE_URL=https://idro-costruzioni-srl.onrender.com`, Node 22.

Nessun nuovo servizio o repository. AutoDeploy=yes è impostato, ma il sito creato tramite URL pubblico non riceve push finché non è collegato il provider Git. Per questo l’aggiornamento viene avviato manualmente sul servizio esistente. Per automatizzare: Render Account Settings → Git Deployment Credentials → collega GitHub e autorizza il repository, quindi associa la credenziale al servizio. Non è stato attivato alcun piano a pagamento.

Vedi `VERIFICHE.md` per controlli effettivamente eseguiti e limiti della verifica browser.

## Aggiornamento demo: logo e segnaposto

Il logo provvisorio è sostituito con una ricostruzione raster ad alta risoluzione dall'allegato dell'utente, su sua richiesta esplicita. Header/footer e favicon usano file locali in `public/brand/`; il sorgente è in `assets/brand-source/`, con prompt. Non è un originale vettoriale e richiede approvazione del titolare. Le anteprime social conservano la hero.

`src/data/siteImages.ts` gestisce 18 posizioni fotografiche, tutte attualmente placeholder editoriali: 3 Home, 3 Chi siamo, 6 Servizi, 6 Realizzazioni. Le etichette dicono esattamente quale foto fornire. Inserire `authenticSrc`, alt appropriato e status authentic per sostituire un'immagine senza modificare componenti o layout. Nessuna fotografia autentica è stata aggiunta. `PhotoSlots.tsx` e `photo-slots.css` implementano le nuove posizioni e la lightbox. La hero è identica al redesign approvato.

Ulteriori dettagli: `assets/SEGNAPOSTO-FOTO.md` e `assets/LOGO-ORIGINALE.md`. Controllo ripetibile: `node scripts/check-photo-slots.mjs` oppure `node scripts/check-photo-slots.mjs https://idro-costruzioni-srl.onrender.com`.
