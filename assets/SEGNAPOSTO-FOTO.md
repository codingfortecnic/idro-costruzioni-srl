# Demo con logo e posizioni fotografiche

Aggiornamento successivo: su richiesta dell'utente le 18 anteprime fotografiche sono sostituite da riquadri avorio con bordo ottone e descrizione tra virgolette al centro. Nessun file immagine è caricato nei riquadri. Non sono cliccabili; la lightbox resta disponibile per future fotografie autentiche. Hero e logo trasparente sono conservati. Le note seguenti descrivono anche la precedente impostazione fotografica.

## Configurazione

`src/data/siteImages.ts` contiene 18 posizioni: 3 Home, 3 Chi siamo, 6 Servizi e 6 Realizzazioni. Ogni voce contiene id, placeholderSrc, authenticSrc, requiredPhoto, alt, status, page e section.

Tutte le voci attuali sono `placeholder`, con `authenticSrc: null`. Le immagini restano visual editoriali generati. Nessuna foto di personale, cantiere o lavoro aziendale è stata inventata. `foto-originali` non contiene file utilizzabili al momento dell'intervento.

Per sostituire una posizione:

1. Acquisire fotografia autentica e diritti di utilizzo.
2. Salvare una versione ottimizzata nel progetto, ad esempio `public/images/realizzazioni/bagno-01.webp`, conservando anche l'originale.
3. Aggiornare la voce corrispondente con `authenticSrc`, alt specifico e `status: 'authentic'`. Aggiornare `requiredPhoto` a una descrizione verificata se necessario.
4. Eseguire lint, build, controllo locale e deploy. Il componente sceglie automaticamente il file autentico e nasconde l'etichetta. Nessuna modifica al layout è necessaria.

## Collocazione

- Home: nuova composizione asimmetrica, titolo “La qualità si riconosce nei dettagli”, tre posizioni e collegamento a Realizzazioni. Hero, recensioni e sezioni esistenti conservate.
- Chi siamo: tre posizioni per squadra, tecnici e dettaglio di lavoro. Si usano soltanto interni editoriali: nessuna persona fittizia è mostrata come dipendente.
- Servizi: sei immagini preesistenti con etichetta specifica; titoli e testi conservati.
- Realizzazioni: sei posizioni con lightbox, frecce, Escape, ritorno del focus e nota dimostrativa. Nessun nome di progetto, data o luogo inventato.

Sono usati gli otto visual già disponibili. Non si ripete un'immagine all'interno delle nuove composizioni di tre o sei posizioni. Chi siamo e Realizzazioni usano immagini distinte anche rispetto alle proprie sezioni esistenti. Home dispone di dieci posizioni complessive a fronte di otto asset: due riusi fra sezioni esistenti e nuove sono necessari; non sono state generate ulteriori fotografie solo per riempire il layout.

## Logo

Ricostruzione ad alta risoluzione richiesta dall'utente dopo la verifica di indisponibilità del file originale. Fonte: immagine logo allegata in chat; strumento Imagegen integrato. Sorgente raster e derivati in `assets/brand-source/` e `public/brand/`. Vedi `LOGO-ORIGINALE.md`. Mantiene composizione, scritta e palette del riferimento, ma non è un file vettoriale originale e richiede approvazione di fedeltà da parte del titolare.

## Verifica

Lint, TypeScript e build; controllo delle 18 posizioni, caricamento locale dei file, presenza di due loghi per pagina, asset della hero preservato, sitemap/SEO e routing tramite gli script del progetto. `node scripts/check-photo-slots.mjs` controlla gli HTML di build.

La ricostruzione del logo è stata ispezionata visivamente come immagine. Il servizio browser resta indisponibile. Il tentativo nativo di ripristinare Chrome è stato fermato perché non riesce a determinare affidabilmente l'URL corrente. Non si dichiarano screenshot, controllo visivo desktop/mobile, assenza di sovrapposizioni nel browser o test runtime della lightbox. Questi controlli rimangono da completare quando il browser sarà accessibile.

Nessun nuovo repository, servizio Render o piano a pagamento. Deploy sul servizio esistente; commit ed esito riportati nella consegna.
