# Luxury Italian Baroque — report 31 ottobre 2026

## Risultato

Ricostruita la hero come copertina centrale, con scultura WebGL reale e fregi laterali. Aggiornate tutte le cinque pagine, header, footer, pannello contatti, recensioni e pagine informative. Ornamenti SVG originali: volute simmetriche, acanto, riccioli, medaglioni, corone e cornici angolari. Nessun motivo proprietario o immagine stock. Cormorant e Manrope locali, nero/avorio/oro con sfumature metalliche. Componenti descritti nel README.

Riferimento funzionale studiato: C:/Users/matte/OneDrive/Desktop/carrozzeria-moderna-demo/src/components/ServiceGrid.tsx e relativo CSS. Nessuna modifica al progetto della carrozzeria. Ripresi hover, apertura fissata, facce con dettagli/CTA e pulsante accessibile, adattati con transizione 500 ms e composizione ornamentale.

19 segnaposto: Home 4, Chi siamo 3, Servizi 6, Realizzazioni 6. Quattro varianti, rapporti diversi e configurazione centralizzata. Tutti imageSrc null. Scultura al posto del precedente segnaposto hero; nessuna fotografia utilizzata. Logo esistente trasparente, colori conservati: ricostruzione raster precedente, non originale vettoriale.

## Scultura

Tre superfici curve a nastro, larghezza e torsione variabili, due volute tubolari sottili e basamento. Materiali MeshPhysicalMaterial/Standard metallici, roughness controllata, riflessi PMREM da ambiente procedurale RoomEnvironment, tre luci di studio e ombra ambientale semplificata. Lieve rotazione oscillante e risposta al puntatore. Nessun modello o HDR remoto. Modulo separato circa 252 kB gzip, necessario al 3D richiesto. Rendering limitato fuori vista, DPR 1–1,5 con riduzione sotto carico, reduced-motion statico e fallback ornamentale.

Riferimenti tecnici primari: https://r3f.docs.pmnd.rs/api/canvas ; https://threejs.org/docs/pages/RoomEnvironment.html ; https://threejs.org/docs/pages/MeshPhysicalMaterial.html .

## Collaudo

- Lint, TypeScript e build client/SSR.
- Test statici e HTTP: sette pagine, metadati, canonical, noindex, JSON-LD, link, 19 ID e descrizioni, quattro varianti, tre/sei card, disponibilità del modulo 3D e risorse. I soli raster di dist sono marchio e favicon.
- Chromium Playwright: tutte le cinque pagine a 390, 768, 1440 e 1920 px. Controllo overflow, H1, canvas WebGL, galleria senza lightbox vuota, hover desktop, tap mobile, Enter/Escape e menu mobile.
- Test dedicato delle sei card con Space/Escape; confronto di due catture della scultura con reduced-motion; perdita simulata WebGL e ripristino del fallback visibile. Nessun pageerror nel ciclo ordinario.
- Screenshot salvati in QA/local, con card attiva e footer dedicato; QA/online per il controllo pubblico. La cattura lunga nativa della Home presentava un artefatto del compositore WebGL al fondo: sostituita con cattura per segmenti; footer verificato anche separatamente.
- Immagini esaminate realmente: hero mobile/desktop, card aperta, Home completa, Chi siamo mobile, Servizi desktop, Realizzazioni mobile/desktop, Contatti e footer. Corretti overflow delle griglie, recensioni, spazi nelle cornici panoramiche e pannello indirizzo.

La prova usa Chromium con rendering software SwiftShader, non dispositivi fisici. Non rappresenta una misura Lighthouse o una certificazione delle prestazioni su ogni GPU. Il browser integrato non era disponibile; Playwright ha consentito il collaudo.

## Pubblicazione e limiti

Repository e Render esistenti, nessun servizio o piano nuovo. Il commit di sicurezza prima delle modifiche è e305034. Il commit del sito, deploy live e risultati pubblici sono riportati nella consegna.

La precedente verifica aveva rilevato vecchi URL fotografici ancora serviti da Render, benché assenti da dist e da ogni pagina attiva; un deploy con cache pulita non li aveva eliminati. Il controllo pubblico dei vecchi URL resta separato dalla verifica visiva della nuova interfaccia e va riportato con il suo esito effettivo.

Dati aziendali e recensioni conservati dal brief; nessuna nuova verifica live delle recensioni, certificazione, garanzia o testimonianza inventata. Logo e dati commerciali restano soggetti all’approvazione del titolare prima di un lancio ufficiale.

Ricontrollo prima del rilascio barocco: i precedenti URL hero-1536.webp e detail-640.webp restituiscono ora HTTP 404. La propagazione remota del precedente rilascio risulta quindi avvenuta per questi file; lo smoke test finale verifica anche technical-1024.webp.

## Esito del rilascio pubblico

Sito pubblicato sul commit 14d42d208237754f07f5dbeebc2ebe91be6c35fb, deploy Render dep-dbiuoa6tlv9c73bpb14g, stato live. Servizio e piano esistenti invariati.

Smoke test HTTPS superato: sette percorsi, dieci risorse inclusa SculptureScene, SEO e contenuti. Tutti i 24 URL delle precedenti fotografie archiviate restituiscono HTTP 404; il limite residuo del precedente rilascio è risolto nei controlli effettuati.

Test di interazione pubblico superato: sei card con Space/Escape, scultura immobile con reduced-motion e ritorno al fallback ornamentale dopo perdita simulata del contesto WebGL. Controllo console/rete sulle cinque pagine: zero errori console e zero richieste fallite.

Screenshot effettivi in QA/online (non pubblicati dal sito), con Home composta per segmenti, cinque pagine, card attiva e footer a 390, 768, 1440 e 1920 px. I risultati della matrice sono registrati in QA/online/results.json. Esaminate anche le catture pubbliche della hero mobile, della card aperta e della hero desktop grande.
