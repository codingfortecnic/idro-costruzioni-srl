# Integrazione fotografie autentiche — 31 ottobre 2026

Il design approvato e la hero restano invariati. Nessuna nuova fotografia scaricata, importata, pubblicata o attribuita all’azienda. Nessun deploy o push effettuato per questa attività.

## Inventario e risultati reali

`google-maps-photo-inventory.json` contiene zero fotografie osservate. Il totale disponibile su Maps, gli autori, le pertinenze e i duplicati non sono valutabili con l’accesso disponibile. Zero immagini autorizzate o integrate. Non significa che la scheda non contenga fotografie.

La foto indicata nel brief come caricata da “Idro Costruzioni Srl” a settembre 2024 è registrata separatamente in `unverifiedLeads`, con data e attribuzione dichiarate dall’utente, non verificate. Non ha un identificativo inventato né un link individuale presunto. Le cinque categorie sono segnate non esaminate.

Il servizio browser risponde “The browser access host is unavailable”. Il tentativo nativo Chrome è stato fermato perché il sistema non determina l’URL corrente con sufficiente affidabilità. Anche l’apertura web della scheda Maps è risultata indisponibile. La ricerca pubblica non ha fornito singole foto attribuibili. Non sono state aggirate limitazioni o eseguito scraping.

## Preparazione locale

- `src/AuthenticWorks.tsx`: sezione fotografica asimmetrica, immagini intere senza ritagli dei lavori, lightbox nativa, navigazione, Escape, ritorno del focus, lazy loading.
- `src/authentic-photo-data.ts`: lista vuota. Nessuna sezione è visibile senza fotografie autorizzate.
- Home: predisposizione prima delle recensioni, titolo “La qualità si vede nel lavoro”, massimo tre immagini e link a Realizzazioni.
- Chi siamo: predisposizione prima della CTA finale, mantenendo i contenuti esistenti.
- Servizi: una foto pertinente autorizzata può sostituire esclusivamente il visual della relativa sezione (indice 0–5). Nessuna sostituzione automatica della hero.
- Realizzazioni: galleria autentica prioritaria; il testo di attesa è conservato finché non esistono foto approvate. Il percorso editoriale mantiene la propria distinzione.

Nessun riempitivo o immagine IA viene presentato come fotografia autentica. Non è possibile creare un’anteprima fotografica reale senza file. Il browser indisponibile impedisce screenshot e test desktop/mobile/lightbox runtime.

## Procedura dopo accesso ai materiali

1. Aprire singolarmente le foto in tutte le categorie Maps e compilare una voce usando `google-maps-photo-entry.template.json`. Il template non è una fotografia catalogata. Registrare il link individuale osservato, autore/data quando disponibili, contenuto, categoria, qualità e destinazioni. Usare null per dati assenti.
2. Distinguere attribuzione all’account e diritti: anche una foto “Dal proprietario” resta `authorization.status: pending` finché manca una conferma adeguata.
3. Ottenere file originale e prova dell’autorizzazione alla pubblicazione sul sito. Conservare entrambi in `assets/private-authentic/<id>/`, esclusa da Git. Non inserire documenti privati in public o nel repository.
4. Compilare `authorization` con stato verified, evidencePath, confirmedBy, confirmedAt, scope `company-website-publication`; verificare descrizione, titolo, alt, pertinenza, duplicati e destinazioni. L’autorizzazione deve coprire anche eventuali foto di terzi; il nome dell’account da solo non basta.
5. Eseguire `node scripts/import-authentic-photos.mjs ID` (sola validazione). Lo script non scarica da Maps. Controlla attribuzione e diritti, evidenza locale, percorsi, hash esatto e somiglianza visiva, dimensioni e contenuti approvati.
6. Dopo la revisione: `node scripts/import-authentic-photos.mjs ID --write`. Conserva l’originale privato, normalizza orientamento EXIF e crea WebP fino a 2400px senza ingrandire. Genera il manifest del sito solo con foto approvate. Nessun deploy automatico.
7. Lint, TypeScript/build, test locali delle pagine, lightbox, tastiera e dispositivi. Rivedere manualmente anche ritagli, qualità ed eventuali duplicati non intercettati dagli hash. Solo dopo autorizzazione e revisione si può aggiornare lo stesso Render.

Per proseguire servono accesso effettivo alla galleria o link individuali alle foto e, per la pubblicazione, file originali con conferma dei diritti. Nessun piano a pagamento è stato attivato.

## Esiti del collaudo locale

- Quattro test automatici superati: l’attribuzione al proprietario non sostituisce i diritti; autori non verificati e duplicati bloccati; ambito di autorizzazione errato e didascalie non approvate bloccati; inventario reale vuoto senza osservazioni inventate.
- ESLint, TypeScript e build di produzione completati. Nessuna nuova dipendenza installata.
- Confronto SHA-256 del body HTML delle cinque pagine prima/dopo: identico per Home, Chi siamo, Servizi, Realizzazioni e Contatti, con manifest vuoto. Risultati locali in `test-results/authentic-no-change.json` (non versionati).
- Nessuna prova di importazione con una fotografia reale: non sono disponibili file e diritti. Nessun test visivo desktop/mobile, screenshot, lightbox runtime o misura prestazionale nel browser è dichiarato eseguito.
- Nessun aggiornamento di GitHub o Render; il sito pubblico rimane al redesign approvato `df654e0`. Le modifiche sono preparazione locale.
