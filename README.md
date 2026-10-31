# Idro Costruzioni SRL — Black, White & Gold

Sito: https://idro-costruzioni-srl.onrender.com/
Repository: https://github.com/codingfortecnic/idro-costruzioni-srl

Ricostruzione completa delle cinque pagine con React, TypeScript e Vite. Hero architettonica SVG animata, sezioni editoriali nere e bianche, accenti oro e 22 segnaposto grafici. Nessuna fotografia pubblicata. Logo trasparente conservato nei colori esistenti: ricostruzione raster richiesta dall’utente, non originale vettoriale.

## Comandi Windows

```text
npm.cmd ci
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
npm.cmd test
node scripts/smoke.mjs http://127.0.0.1:4173
node scripts/smoke.mjs https://idro-costruzioni-srl.onrender.com
```

La build comprende TypeScript, client e pre-render di sette percorsi con metadati distinti. Demo noindex/nofollow, robots Disallow, canonical, sitemap e JSON-LD conservati. Font locali con licenze. Nessun backend, modulo simulato o analytics.

## Fotografie future

src/data/siteImages.ts centralizza 22 posizioni: Home 7, Chi siamo 3, Servizi 6, Realizzazioni 6. Ogni voce contiene descrizione, rapporto, variante, alt e imageSrc, attualmente null. Per una fotografia autentica autorizzata aggiungere il file ottimizzato in public e impostare percorso e alt. Non occorre cambiare layout.

PremiumImageSlot mostra geometrie, cornice oro, icona e descrizione centrale tra virgolette; un’immagine mancante torna al segnaposto. Gallery apre la lightbox soltanto per fotografie configurate; i segnaposto non sono cliccabili. La lightbox futura gestisce frecce, Escape e ritorno del focus.

Le precedenti fotografie WebP sono in assets/archive/editorial-public-images, fuori da public e dist. Originali e provenienza restano in assets/editorial-source e assets/provenance.json. Vecchi marchi in assets/archive/legacy-brand. Gli altri documenti degli asset descrivono versioni storiche. I soli raster pubblicati sono logo trasparente e favicon.

## Dati e hosting

src/company.ts centralizza i dati. Recensioni 5,0/5 e 32: valori del brief, rilevazione indicata al 31 ottobre 2026, non verifica live. Dati commerciali e servizi soggetti a conferma del titolare, come nelle Note editoriali. Telefono, WhatsApp e Maps collegati; nessun invio email simulato.

Render esistente: srv-dbirsj7b9u1s73cbpdg0, workspace tea-dak14nvqj5pc73fencb0, main, build npm ci && npm run build, publish dist, Node 22. Nessun nuovo servizio o piano a pagamento. Il servizio creato da URL pubblico non riceve push senza associazione del provider Git; il rilascio viene avviato sullo stesso servizio quando non parte automaticamente.

Controlli e limiti: VERIFICHE.md.
