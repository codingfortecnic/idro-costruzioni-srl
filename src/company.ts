export const company = {
 name:'Idro Costruzioni SRL', phone:'+39 338 807 1114', tel:'+393388071114',
 address:'Viale Fabio Filzi 55', city:'41049 Sassuolo (MO)', vat:'04135090365',
 maps:'https://www.google.com/maps/place/?q=place_id:ChIJG9RcTmcwTQcRbgcQHk2tlxA',
 reviews:{score:'5,0',count:32,date:'31 ottobre 2026',verified:false},
 // Demo: richiede conferma del titolare prima di una pubblicazione commerciale.
 commercialApproved:false,
};
// Solo dati societari riscontrati nelle fonti pubbliche: niente recensioni o recapiti non verificati.
export const businessSchema = {'@context':'https://schema.org','@type':'LocalBusiness',name:company.name,taxID:company.vat,address:{'@type':'PostalAddress',streetAddress:company.address,addressLocality:'Sassuolo',addressRegion:'MO',postalCode:'41049',addressCountry:'IT'}};
export const services = [
 ['Impianti idraulici',"Realizzazione e adeguamento di impianti idrici per abitazioni e altri ambienti, con attenzione a tubazioni, collegamenti, distribuzione e funzionalità.",'Acqua, dove serve.'],
 ['Impianti di riscaldamento',"Soluzioni per la distribuzione del calore, installazione e interventi su componenti degli impianti di riscaldamento, secondo le esigenze dell'edificio.",'Il comfort prende forma.'],
 ['Climatizzazione',"Soluzioni per la climatizzazione degli ambienti, con attenzione al posizionamento delle unità, al comfort e all'efficienza di funzionamento.",'La temperatura giusta.'],
 ['Manutenzione e riparazioni','Manutenzione e riparazione di componenti idraulici e termoidraulici, con valutazione delle problematiche e degli interventi necessari.','Cura, nel tempo.'],
 ['Impianti bagno e cucina','Realizzazione e rifacimento degli impianti idraulici per bagni e cucine, predisposizione dei collegamenti e installazione dei componenti previsti.','Spazi da vivere meglio.'],
 ['Impianti idrici e scarichi',"Realizzazione e adeguamento di reti di distribuzione dell'acqua e sistemi di scarico, con attenzione a percorsi, collegamenti e accessibilità.",'Ogni collegamento conta.'],
];
// Metadati interni: nessuna conferma operativa o abilitazione è dedotta dai visual.
export const serviceApproval = services.map(([name])=>({name,status:'pending-owner-confirmation',commercialApproved:false}));
