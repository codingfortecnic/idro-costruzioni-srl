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
 ['Impianti idraulici','Soluzioni per la distribuzione dell’acqua, studiate in funzione degli spazi e delle esigenze dell’edificio.','Acqua, dove serve.'],
 ['Impianti di riscaldamento','Valutazione e realizzazione di impianti per il comfort termico, con attenzione alla funzionalità e alla gestione quotidiana.','Il comfort prende forma.'],
 ['Climatizzazione','Soluzioni per il raffrescamento e il benessere degli ambienti, da definire attraverso un confronto tecnico.','La temperatura giusta.'],
 ['Manutenzione e riparazioni','Verifica delle anomalie e valutazione degli interventi necessari per ripristinare il funzionamento degli impianti.','Cura, nel tempo.'],
 ['Impianti bagno e cucina','Rifacimento delle reti idrauliche di bagno e cucina, coordinando punti acqua, collegamenti e scarichi.','Spazi da vivere meglio.'],
 ['Impianti idrici e scarichi','Posa e rinnovo delle reti di adduzione e scarico, con attenzione ai percorsi e alle esigenze di manutenzione.','Ogni collegamento conta.'],
];
// Metadati interni: nessuna conferma operativa o abilitazione è dedotta dai visual.
export const serviceApproval = services.map(([name])=>({name,status:'pending-owner-confirmation',commercialApproved:false}));
