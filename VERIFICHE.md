# Verifiche e consegna — 31 ottobre 2026

## Risultato

- URL Render: https://idro-costruzioni-srl.onrender.com
- Repository: https://github.com/codingfortecnic/idro-costruzioni-srl (pubblico su autorizzazione esplicita dell'utente).
- Render: Static Site `srv-dbirsj7b9u1s73cbpdg0`, workspace My Workspace, branch main. AutoDeploy impostato su yes, ma il collegamento tramite URL pubblico richiede la connessione del provider Git per funzionare: il push di verifica non ha avviato un deploy.
- Dashboard: https://dashboard.render.com/static/srv-dbirsj7b9u1s73cbpdg0
- Static Site senza backend, database o piani a pagamento attivati.

## Controlli eseguiti

- Installazione dipendenze completata, audit npm: zero vulnerabilità rilevate.
- Controllo TypeScript e build Vite di produzione superati.
- Richieste HTTP locali a home, chi siamo, servizi, realizzazioni, contatti, privacy, robots e sitemap: tutte 200.
- Richieste HTTPS al sito Render sulle stesse pagine: tutte 200; titoli HTML distinti.
- URL pubblico inesistente: 404.
- HTML separati per le pagine: l'apertura diretta non dipende dalla navigazione precedente nella SPA.
- Script ripetibile: `node scripts/smoke.mjs https://idro-costruzioni-srl.onrender.com` controlla pagine, titoli, descrizioni, canonical, CSS, JavaScript, bundle 3D, robots e sitemap.
- Revisione codice: link interni corrispondenti alle route, telefono tel, WhatsApp wa.me, Google Maps con place ID fornito; nessun modulo che simuli l'invio.
- Nessuna fotografia utilizzata: le sole immagini sono favicon, SVG illustrativo e composizione 3D originali nel codice. Nessuna foto duplicata o senza autorizzazione.
- Banner recensioni presente in home e contatti: 5,0 / 32, data 31 ottobre 2026, fonte del dato indicata come brief e verifica pendente.

## Limiti di verifica

Per abilitare gli aggiornamenti automatici, collegare GitHub in Render Account Settings → Git Deployment Credentials → Add credential e autorizzare il repository idro-costruzioni-srl; associare la credenziale al repository nelle impostazioni del sito. Documentazione: https://render.com/docs/git-provider e https://render.com/docs/deploys . Il deploy finale è stato avviato manualmente per pubblicare comunque la demo completa.

Il servizio browser non era disponibile. Il successivo tentativo con Computer Use è stato interrotto perché il sistema non riusciva a determinare l'URL corrente di Chrome con sufficiente affidabilità. Non sono stati eseguiti test visivi desktop/mobile, ispezione console o rete del browser, verifica effettiva del canvas WebGL, interazioni, tastiera e assenza di overflow su dispositivi reali. I breakpoint, il menu accessibile, il caricamento separato del 3D, il DPR limitato, il fallback SVG e la gestione reduced-motion sono implementati, ma questi comportamenti richiedono QA browser.

I collegamenti telefonici/WhatsApp non sono stati attivati per avviare comunicazioni. La destinazione Google Maps è quella fornita nel brief; la lettura diretta della scheda è risultata indisponibile, quindi rating, telefono e foto non sono stati verificati indipendentemente.

## Prima del lancio commerciale

Il titolare deve confermare dati e recapiti, utilizzo di WhatsApp, servizi, orari, recensioni e loro data. Nome, sede e P.IVA coincidono con le fonti pubbliche secondarie citate nel README; questo non sostituisce la conferma del titolare. Non vengono dichiarati anni di esperienza, certificazioni, partner, personale o testimonianze.

Servono file fotografici autentici con autorizzazione. Per attivare il modulo occorrono email autorizzata, configurazione reale dell'invio e informativa completa. La demo resta noindex e robots Disallow. JSON-LD limitato ai dati societari riscontrati, senza aggregateRating, telefono o servizi non confermati.
