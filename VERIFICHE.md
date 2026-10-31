# Redesign — report del 31 ottobre 2026

## Direzione grafica e modifiche

- Redesign integrale delle cinque pagine: hero fotografiche, gerarchia editoriale Cormorant/Manrope, palette avorio/pietra/blu notte e accenti ottone.
- Home con immagine full bleed, zoom lento, leggero parallax, luce ambientale e titoli in entrata. Nessun oggetto 3D. Supporto reduced-motion.
- Header trasparente che diventa solido, menu mobile dedicato con Escape e gestione del focus.
- Servizi fotografici: tre card in home; sei capitoli immagine/testo alternati nella pagina Servizi, ognuno con CTA e indice.
- Chi siamo editoriale, Realizzazioni con separazione esplicita tra gallery aziendale futura e ispirazioni, lightbox con dialog nativo, frecce, Escape e ripristino focus.
- Contatti con telefono immediato, WhatsApp, indirizzo, indicazioni e recensioni; nessun invio simulato.
- Avvertenze principali rimosse, indicazione demo nel footer e Note editoriali dettagliate.
- Pre-render HTML con contenuti, titoli, descrizioni, canonical, Open Graph, JSON-LD, sitemap e robots; noindex preservato.

## Analisi e materiale fotografico

Lo stato precedente presentava hero senza fotografia, oggetto 3D sospeso, box omogenei, testo minuto, scarsa differenziazione fra sezioni e banner tecnici invasivi. Analisi del codice di tutte le pagine e della struttura disponibile eseguita prima delle modifiche. Commit di sicurezza: `921ba85`.

Nell’allegato accessibile era presente soltanto il brief; nessuna fotografia di riferimento. La scheda Google Maps non era leggibile dagli strumenti web disponibili. La ricerca pubblica non ha restituito file aziendali con autorizzazione verificabile. Non è quindi stato possibile identificare autori, titolarità e riuso delle foto Maps; nessuna è stata scaricata o ripubblicata. Restano da acquisire i file autorizzati dal titolare.

Sono stati creati otto visual editoriali originali tramite Imagegen integrato: bagno in marmo con vasca freestanding, dettaglio lavabo/rubinetto, doccia in vetro, soggiorno con radiatore, camera con climatizzatore, cucina, collettore idraulico e architettura interna. Non rappresentano lavori aziendali e sono identificati come editoriali nelle pagine, negli alt text, nella lightbox e nelle note.

Originali e prompt: `assets/editorial-source/` e `assets/provenance.json`. WebP: `public/images/`. 24 varianti responsive: circa 2,45 MiB complessivi, hero 1536px circa 180 KiB e hero 640px circa 41 KiB. Non vengono caricate tutte le varianti dal browser. Nessuna ripetizione della stessa immagine nelle sezioni di una singola pagina. Tavola asset controllata visivamente: `assets/editorial-contact-sheet.png`.

## Controlli tecnici

- ESLint, TypeScript e build client/HTML statico completati.
- Audit npm dopo aggiornamento del tool di lint: zero vulnerabilità rilevate; audit produzione zero.
- Smoke test locale su tutte le cinque pagine, privacy e note editoriali: HTTP 200, titoli distinti, descrizioni, un H1 per pagina, versione redesign, JSON-LD e footer.
- Controllati i 29 asset: 24 immagini responsive, tre font, CSS e JavaScript. Nessuna dipendenza 3D o riferimento alle vecchie composizioni.
- Test semantico: sei sezioni servizi, presenza lightbox e distinzione editoriale, telefono e WhatsApp corretti, banner 32 recensioni, assenza form fittizio, link interni coerenti, sitemap e robots.
- Script ripetibile: `node scripts/smoke.mjs [origine]`; su HTTPS controlla anche il 404.

## Verifica visiva: limite esplicito

Il servizio browser ha restituito «The browser access host is unavailable». Il tentativo di accesso nativo a Chrome è stato fermato perché il sistema non riusciva a determinare l’URL corrente con sufficiente affidabilità. Non sono stati aggirati questi limiti.

Non sono stati acquisiti screenshot desktop/mobile del sito. Non sono stati eseguiti controlli visuali del layout a 375, 430, 768, 1024, 1440 e 1920px, controllo console/rete del browser, misura CLS, verifica runtime delle animazioni e dei ritagli o test interattivi di menu/lightbox. La tavola degli asset non sostituisce questi test. Le regole responsive e reduced-motion e le interazioni sono implementate e revisionate nel codice, ma non presentate come verificate nel browser.

## Pubblicazione e configurazione

Sito e infrastruttura esistenti mantenuti: https://idro-costruzioni-srl.onrender.com/ ; repository https://github.com/codingfortecnic/idro-costruzioni-srl ; servizio Render `srv-dbirsj7b9u1s73cbpdg0`, branch main. Nessun nuovo servizio o piano a pagamento. Il deploy viene verificato sul commit effettivo e con lo smoke test HTTPS prima della consegna.

L’auto deploy richiede ancora l’associazione del provider GitHub a Render: la sola opzione AutoDeploy=yes con URL pubblico non riceve i push. Aggiornamento autorizzato tramite deploy manuale dello stesso servizio. Dashboard: https://dashboard.render.com/static/srv-dbirsj7b9u1s73cbpdg0 . I commit e l’esito finale sono riportati nella consegna in chat.

## Conferme ancora necessarie

File fotografici originali e diritti; servizi realmente disponibili e relative abilitazioni; telefono, WhatsApp, orari e testi commerciali; recensioni Google e data; approvazione del titolare; canale email e informativa definitiva prima di un eventuale modulo. Nessuna certificazione, anzianità, partnership o testimonianza inventata.
