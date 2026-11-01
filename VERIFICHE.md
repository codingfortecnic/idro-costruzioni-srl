# Verifiche — rifinitura fotografica finale

Versione `photographic-copper-v4`. Punto di sicurezza precedente alle modifiche: `b5cf729`.

## Collaudo locale

- `npm run lint`: superato.
- `npm run build`: TypeScript, build browser e prerender di sette percorsi superati.
- `npm test`: sette percorsi, metadati/canonical/noindex, 36 varianti WebP, alt/dimensioni/lazy loading, copertura fotografica e assenza di fotografie ripetute nella stessa pagina, sei segnaposto aziendali e un solo modello nel sorgente.
- `node scripts/visual-qa.mjs`: Home, Chi siamo, Servizi, Realizzazioni e Contatti a 390 e 1440 px. Nessun overflow, immagine mancante, errore JavaScript, errore di console, richiesta fallita o risposta HTTP di errore nella navigazione normale. Screenshot esaminati per composizione, leggibilità, ritagli, logo e segnaposto. Il modello è presente solo in Home; le altre quattro pagine hanno zero canvas.
- `node scripts/card-qa.mjs`: tutte le sei card su desktop (hover) e mobile (tap), Enter/Escape, facce inert e fotografie caricate.
- `node scripts/interaction-qa.mjs`: sei card con Space/Escape, movimento del modello reale, pausa reduced-motion e fallback statico alla perdita del contesto WebGL.
- Fallback anche con WebGL non disponibile: verificato.

Le prove mobile sono eseguite con viewport e touch emulati in Chromium, non su dispositivi fisici. Il renderer di test usa SwiftShader. Per evitare artefatti nelle catture molto lunghe, gli screenshot vengono composti da viewport reali scorrendo la pagina, senza modificare il layout.

## Contenuti e pubblicazione

- Fotografia hero precedente generata con IA eliminata dagli asset pubblici.
- Dodici soggetti fotografici autentici con fonti e licenze in `PHOTO-LICENSES.md`; versioni responsive senza copie duplicate del medesimo asset. Le anteprime degli stessi servizi su pagine diverse condividono il file.
- Titolo, CTA, palette rame/blu notte e logo alle dimensioni approvate mantenuti.
- Mixer e collettore 3D rimossi dal codice; installazione in rame mantenuta nella Home, con caricamento separato dal bundle principale.
- Sei segnaposto in Realizzazioni; nessun lavoro stock attribuito all'azienda. Configurazione futura in `src/data/siteImages.ts`.
- Contatti, collegamenti Maps/WhatsApp e banner 5,0/5 — 32 recensioni, rilevazione del brief 31 ottobre 2026, conservati. Nessuna testimonianza inventata.

Il bundle separato del renderer Three.js produce ancora un avviso Vite per la dimensione (circa 252 kB gzip). La build termina correttamente; quel renderer è richiesto soltanto dalla Home. Nessun piano o servizio Render aggiunto.

La pubblicazione usa il repository e il servizio Render esistenti. Il controllo sul sito pubblico viene eseguito dopo il deploy con gli stessi script, passando `https://idro-costruzioni-srl.onrender.com` come origine. Report browser: `QA/final-local/results.json` e `QA/final-online/results.json`; screenshot PNG nelle stesse cartelle.
