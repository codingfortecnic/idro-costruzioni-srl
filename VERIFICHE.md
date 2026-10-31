# Contemporary Copper — verifiche del 31 ottobre 2026

## Direzione e riferimenti

Redesign completo in blu notte/antracite, bianco caldo, pietra e rame/bronzo. Hero fotografica con overlay scuro e testi leggibili, sezioni editoriali e tre modelli 3D pertinenti. Rimossi dal codice attivo e dai sorgenti i fregi, le cornici barocche e la scultura a nastri della versione precedente.

Analizzato concretamente il sito locale carrozzeria-moderna-demo: ServiceGrid.tsx, automotive.css e sorgenti src. Le card usano due facce, perspective/rotateY, hover e apertura fissabile, inert e pulsante accessibile. Nei sorgenti attuali non risultano scene WebGL/Three.js. Nessuna modifica al progetto della carrozzeria. Ripreso il principio di funzionamento delle card, adattato all’impiantistica.

Le tre immagini di riferimento citate nel brief non erano disponibili negli allegati accessibili. Usate la descrizione e la hero del bagno già presente nell’archivio editoriale del progetto. È una immagine illustrativa generata in una precedente iterazione, non una foto di un lavoro aziendale; dicitura visibile nella hero e spiegazione nelle Note editoriali. Tre versioni WebP locali, solo nella Home. Nessuna fotografia dei lavori o della squadra inventata.

## Procedura e componenti

Commit di sicurezza f05fe90 prima di intervenire. Prima realizzati Home, installazione 3D e una card completa. Screenshot a 1440 e 390 px: stato normale/aperto, verifica dell’altezza costante e del canvas WebGL. Individuato e corretto l’overflow dei segnaposto annidati. Dopo il controllo visivo estesi i servizi e le altre pagine. Prove in QA/copper-prototype.

TechnicalScene.tsx realizza tre scene effettive in Three.js/React Three Fiber:

- Home: pannello con due collettori orizzontali, tre derivazioni in rame, curve, raccordi, valvole a leva, manometro, staffe e supporto inferiore.
- Chi siamo: miscelatore cromato con corpo, bocca curva, aeratore e comando laterale.
- Servizi: collettore con quattro derivazioni, valvole, giunzioni e supporti sui collettori.

Materiali PBR, rame satinato, bronzo e cromo, ambiente di studio procedurale PMREM, luci e ombre a 512 px. Lieve rotazione e risposta al puntatore. Scena condivisa caricata separatamente, circa 252 kB gzip, una per pagina; DPR massimo 1,4 riducibile a 1 una sola volta sotto carico. Rendering demand fuori vista, a scheda nascosta e con movimento ridotto; fallback tecnico per assenza/errore/perdita WebGL. Nessun asset 3D remoto. I modelli sono illustrativi, non schemi esecutivi o lavori documentati.

ServiceCards.tsx: tre card Home e sei Servizi, con testi brevi e approfonditi forniti nel brief. Hover rivela il pannello; uscita lo richiude; +/× permette apertura fissata e chiusura su touch. Enter/Space ed Escape, aria-expanded/controls e faccia inattiva inert. Transizione 500 ms; nessun salto di altezza. Servizi proposti per la demo, da confermare con il titolare.

PhotoPlaceholder.tsx: 19 posizioni (Home 4, Chi siamo 3, Servizi 6, Realizzazioni 6), superfici pietra/antracite, trame architettoniche, camera discreta e descrizione centrale tra virgolette. Configurazione in src/data/siteImages.ts; sostituzione futura tramite imageSrc e alt, fallback su errore. Lightbox soltanto per immagini autentiche configurate. Logo trasparente già utilizzato conservato, colori invariati: ricostruzione raster precedente, non nuovo marchio né originale vettoriale.

## Test tecnici e visivi

Lint, TypeScript e build client/SSR. Smoke test statico e HTTP locale su sette percorsi e tredici risorse: titoli distinti, metadati, canonical, Open Graph, noindex, JSON-LD, sitemap/robots, un H1, contatti e link, descrizioni esatte dei sei servizi, 19 ID univoci e assenza di ornamenti barocchi. Solo logo/favicon e tre versioni della hero editoriale in dist.

Playwright Chromium: viewport 390, 768, 1440 e 1920 px, cinque pagine, overflow, menu, card hover/tap/tastiera e canvas reali. Screenshot normali/aperti, pagine complete, footer e modelli in QA/copper-local. Per le catture il movimento viene fermato tramite prefers-reduced-motion; l’animazione è verificata separatamente confrontando fotogrammi reali dei tre modelli, anche dopo spostamento del puntatore. Prove di movimento ridotto e perdita simulata WebGL con ritorno al fallback.

Durante il collaudo desktop una cattura lunga ha incontrato un timeout nel renderer software. È stato corretto il controllo DPR che poteva invalidare ripetutamente il rendering; l’adattamento ora avviene una sola volta. Il browser viene isolato per viewport. La Home viene catturata componendo la pagina con il fotogramma reale della scena WebGL, salvato anche separatamente, per evitare artefatti del compositore software. L’assestamento iniziale di luci e ombre è atteso prima di confrontare i fotogrammi ridotti.

Screenshot realmente esaminati: hero desktop/mobile, impianto in rame desktop/mobile, prima card chiusa/aperta, miscelatore e collettore mobile, pagine Chi siamo, Realizzazioni e Contatti complete. Le ulteriori catture desktop e i risultati pubblici sono registrati nei rispettivi file QA e nell’esito finale sotto.

## Limiti e dati

Chromium con SwiftShader: non è una prova su dispositivi fisici o un benchmark Lighthouse. Il 3D rimane un modulo consistente perché richiesto esplicitamente; non viene caricato sulle pagine Realizzazioni e Contatti. Nessuna nuova verifica live delle recensioni: conservati 5,0/5, 32 e data del brief. Dati commerciali, categorie servizi e logo richiedono approvazione del titolare prima del lancio ufficiale. Nessun modulo fittizio o testimonianza inventata.

Repository e servizio Render esistenti; nessun nuovo servizio o piano a pagamento. Deploy autorizzato soltanto dopo il collaudo. Commit e stato effettivo del rilascio sono riportati nell’esito finale.

## Esito locale definitivo

Matrice completa superata sulla build /assets/index-Pq_znEg2.js: 20 combinazioni, cinque pagine a 390/768/1440/1920 px, zero overflow e zero pageerror. Risultati in QA/copper-local/results.json. Esaminati anche hero tablet/desktop grande, Home desktop con scena tecnica, griglia dei sei servizi e card attiva.

Superati lint, TypeScript, build client/SSR, test statici e HTTP locale su sette percorsi e tredici risorse. Test dedicato superato sulla build finale: sei card con Space/Escape, fotogrammi diversi per tutti i tre modelli in movimento, fotogrammi stabili con movimento ridotto dopo assestamento, ritorno al fallback in caso di perdita WebGL. Nessun pageerror nel test.
