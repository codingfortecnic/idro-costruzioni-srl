# Idro Costruzioni SRL

Demo aziendale React + TypeScript + Vite, cinque pagine, composizione originale Three.js / React Three Fiber. Tutti i file risiedono in questa cartella.

## Sviluppo

Su Windows usare `npm.cmd ci`, `npm.cmd run dev`, `npm.cmd run build`. La build esegue il controllo TypeScript e genera pagine HTML distinte, robots e sitemap. `npm.cmd run preview` serve la build.

## Render

Static Site gratuito, repository `codingfortecnic/idro-costruzioni-srl`, branch `main`, build `npm ci && npm run build`, publish directory `dist`. Auto deploy abilitato. `render.yaml` contiene il rewrite per il router; le cinque pagine hanno anche directory HTML reali per l'accesso diretto.

Impostare `VITE_SITE_URL` all'origine HTTPS assegnata da Render per generare canonical e sitemap con l'URL effettivo.

## Contenuti da approvare

`src/company.ts` centralizza recapiti, recensioni e servizi. Telefono, account WhatsApp, punteggio e conteggio recensioni sono dati forniti nel brief, da confermare. Ragione sociale, sede e partita IVA trovano riscontro in fonti pubbliche secondarie: https://atoka.io/public/it/azienda/idro-costruzioni-srl/4ea3e663d5ec e https://www.ufficiocamerale.it/3450/idro-costruzioni-srl . Occorre conferma del titolare prima dell'uso commerciale.

Nessuna fotografia stock, di concorrenti o copiata da Google Maps. Galleria predisposta senza fotografie. Illustrazioni SVG e 3D create nel codice e dichiarate illustrative. Nessuna testimonianza inventata. Nessun backend o servizio a pagamento. Modulo disabilitato; attivarlo solo con recapito autorizzato e informativa appropriata.

La demo è `noindex,nofollow` e robots Disallow. Il JSON-LD LocalBusiness contiene soltanto nome, sede e partita IVA riscontrati nelle fonti pubbliche; esclude telefono, recensioni e servizi. Prima del lancio commerciale confermare i dati con il titolare, completare privacy, abilitare indicizzazione e sostituire le note di anteprima. Non è presente tracciamento. I font sono richiesti da Google Fonts; i link Google Maps e WhatsApp si attivano solo su click.
