# Idro Costruzioni SRL — demo fotografica premium

Versione finale `photographic-copper-v4`, pubblicata sul servizio Render esistente. React, TypeScript, Vite e React Router; sette percorsi prerenderizzati (cinque pagine principali più privacy e note). Demo non ufficiale, noindex.

## Contenuti

- Hero: fotografia reale di Chad Populis, bagno contemporaneo in marmo con doccia in vetro.
- Dodici fotografie autentiche stock, un solo insieme responsive per soggetto; nessuna immagine duplicata nella stessa pagina. Le anteprime dello stesso servizio in Home e Servizi condividono l'asset.
- Le card mantengono hover, tap, Enter/Space ed Escape, con fronti fotografici e overlay leggibile sul retro.
- Un solo modello WebGL: installazione in rame nella Home. Rotazione lenta, pausa fuori viewport, reduced-motion e fallback statico anche in caso di perdita del contesto. Miscelatore e collettore rimossi dal codice.
- Realizzazioni: solo sei segnaposto descrittivi. Per aggiungere le foto aziendali autorizzate modificare `src/data/siteImages.ts` e caricare gli asset locali. Il lightbox esistente si attiva solo sulle foto reali configurate.
- Logo trasparente e dimensioni approvate mantenuti. Recapiti e banner recensioni preservati; rilevazione del brief 31 ottobre 2026, non dato live.

## Fotografie e licenze

`PHOTO-LICENSES.md` documenta autore, fonte e licenza di ogni foto. `src/data/editorialPhotos.json` controlla alt, ritagli e provenienza. Crediti disponibili nelle note editoriali; Tony Webster / CC BY 2.0 è attribuito anche accanto alla foto. Non sono presentati lavori o dipendenti di altre realtà come appartenenti all'azienda. Le fotografie IA precedenti non sono pubblicate.

Gli originali, esclusi dal repository, sono riproducibili con `node scripts/download-stock.mjs`; `node scripts/prepare-stock.mjs` genera i WebP locali 640/1024/1600 px. Nessun hotlink fotografico in produzione. Hero con preload responsive e priorità alta; immagini sotto hero lazy, dimensionate e con alt.

## Sviluppo e collaudo

```sh
npm ci
npm run dev
npm run lint
npm run build
npm test
npm run preview
node scripts/visual-qa.mjs
node scripts/interaction-qa.mjs
```

`QA_WIDTHS=390,1440` limita il collaudo visivo a mobile e desktop. Per produzione passare l'origine come primo argomento agli script QA e smoke. Screenshot in `QA/final-local` e `QA/final-online`; i PNG sono esclusi da Git. Le catture della Home sono composte da screenshot di viewport reali per evitare artefatti del compositore Chromium con WebGL e pagine lunghe.

Render: build `npm ci && npm run build`, directory `dist`. Nessun servizio aggiunto e nessun piano a pagamento. Prima della presentazione commerciale, dati, servizi e disponibilità devono essere confermati dal titolare, come indicato nella demo.
