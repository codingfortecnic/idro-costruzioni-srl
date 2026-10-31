export type ImagePage='home'|'chi-siamo'|'servizi'|'realizzazioni';
export interface SiteImage {
 id:string;
 placeholderSrc:string;
 authenticSrc:string|null;
 requiredPhoto:string;
 alt:string;
 status:'placeholder'|'authentic';
 page:ImagePage;
 section:string;
}
const editorialAlt:Record<string,string>={technical:'Visual editoriale generato di un collettore idraulico',kitchen:'Visual editoriale generato di una cucina contemporanea',warmth:'Visual editoriale generato di un soggiorno con radiatore',climate:'Visual editoriale generato di una camera con climatizzatore',hero:'Visual editoriale generato di un bagno in marmo con vasca',detail:'Visual editoriale generato di un lavabo e rubinetteria',shower:'Visual editoriale generato di una doccia in vetro',architecture:'Visual editoriale generato di architettura interna in pietra e legno'};
function slot(id:string,image:string,requiredPhoto:string,page:ImagePage,section:string):SiteImage{return {id,placeholderSrc:`/images/${image}-1536.webp`,authenticSrc:null,requiredPhoto,alt:editorialAlt[image],status:'placeholder',page,section};}
export const siteImages:SiteImage[]=[
 slot('home-impianto','kitchen','impianto idraulico realizzato','home','lavori'),
 slot('home-bagno','shower','bagno completato dall’azienda','home','lavori'),
 slot('home-riscaldamento','warmth','installazione di riscaldamento','home','lavori'),
 slot('azienda-squadra','climate','squadra Idro Costruzioni','chi-siamo','azienda'),
 slot('azienda-lavorazione','technical','tecnici durante una lavorazione','chi-siamo','azienda'),
 slot('azienda-dettaglio','hero','dettaglio di un lavoro completato','chi-siamo','azienda'),
 slot('servizio-idraulica','detail','tubazioni e collegamenti di un impianto realizzato','servizi','servizio-1'),
 slot('servizio-riscaldamento','warmth','caldaia, radiatori o impianto termico installato','servizi','servizio-2'),
 slot('servizio-climatizzazione','climate','climatizzatore installato dall’azienda','servizi','servizio-3'),
 slot('servizio-manutenzione','technical','tecnico durante un intervento','servizi','servizio-4'),
 slot('servizio-bagno-cucina','shower','bagno o cucina con impianti completati','servizi','servizio-5'),
 slot('servizio-reti','architecture','collegamenti idrici e scarichi realizzati','servizi','servizio-6'),
 slot('gallery-bagno','hero','bagno ristrutturato','realizzazioni','galleria'),
 slot('gallery-idraulica','technical','impianto idraulico completo','realizzazioni','galleria'),
 slot('gallery-caldaia','warmth','installazione caldaia','realizzazioni','galleria'),
 slot('gallery-clima','climate','impianto di climatizzazione','realizzazioni','galleria'),
 slot('gallery-cantiere','kitchen','lavorazione in cantiere','realizzazioni','galleria'),
 slot('gallery-dettaglio','detail','dettaglio di installazione completata','realizzazioni','galleria'),
];
export const imagesForPage=(page:ImagePage)=>siteImages.filter(image=>image.page===page);
export const isAuthentic=(image:SiteImage)=>image.status==='authentic'&&!!image.authenticSrc;
export const imageSource=(image:SiteImage)=>isAuthentic(image)?image.authenticSrc!:image.placeholderSrc;
