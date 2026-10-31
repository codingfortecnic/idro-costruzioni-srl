# Restyling Black, White & Gold — 31 ottobre 2026

## Modifiche

Ricostruite Home, Chi siamo, Servizi, Realizzazioni e Contatti, oltre alle pagine informative. Nuova hero architettonica animata senza fotografie, palette nero/bianco/oro, composizione asimmetrica e sezioni alternate. Header fisso e menu mobile con gestione focus/Escape, CTA telefono e WhatsApp, footer e metadati aggiornati.

22 segnaposto: Home 7, Chi siamo 3, Servizi 6, Realizzazioni 6. Geometrie, cornici oro, icona e descrizione esatta al centro tra virgolette. Tutti hanno imageSrc null. Nessun dialog o pulsante vuoto nella galleria. Supporto per fotografie future e fallback in caso di errore.

Logo trasparente conservato nei colori esistenti: ricostruzione raster dall’allegato, non file vettoriale originale. Fotografie precedenti rimosse da public, CSS, metadati e componenti attivi; archiviate in assets/archive/editorial-public-images. Sorgenti fuori dalla distribuzione pubblica.

Commit di sicurezza: e46a2a3.

## Controlli

- ESLint senza errori; TypeScript e build client/SSR completati.
- Test statico: sette percorsi, titoli distinti, descrizioni, canonical, Open Graph con logo, un H1, JSON-LD e noindex.
- 22 ID univoci, etichette e descrizioni; sei servizi, telefono e WhatsApp, link interni e assenza di moduli simulati.
- Nove risorse richieste, logo/favicon, font e bundle. Nessuna fotografia in dist: i soli raster sono quattro file del marchio.
- Test HTTP locale e pubblico tramite node scripts/smoke.mjs [origine]. Controlla anche 404 e indisponibilità dei vecchi URL fotografici con parametro anti-cache.

Il rilascio viene verificato sul commit effettivo e con test HTTPS prima della consegna. ID e commit finali nella risposta di consegna.

## Limite della verifica visiva

Il servizio browser restituisce «The browser access host is unavailable». I precedenti tentativi nativi sono stati fermati perché il sistema non determinava l’URL in modo affidabile. Nessun limite aggirato.

Nessuno screenshot desktop/mobile disponibile. Non verificati visivamente i viewport 375, 430, 768, 1024, 1440 e 1920 px, console/rete runtime, CLS, hover, animazioni o interazioni nel browser. Responsive, contrasto, gestione del focus e reduced-motion implementati e revisionati nel codice; test HTML/HTTP non sostituiscono il collaudo visivo.

## Pubblicazione

https://idro-costruzioni-srl.onrender.com/
Repository: https://github.com/codingfortecnic/idro-costruzioni-srl
Render: srv-dbirsj7b9u1s73cbpdg0. Nessun nuovo servizio o piano a pagamento.
