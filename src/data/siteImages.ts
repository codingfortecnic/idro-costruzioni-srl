export type SlotVariant='ink'|'graphite'|'smoke'|'ivory';
export interface SiteImage {
 id:string;
 description:string;
 imageSrc:string|null;
 ratio:string;
 variant:SlotVariant;
 alt:string;
 page:'home'|'chi-siamo'|'servizi'|'realizzazioni';
 section:string;
}
function slot(id:string,description:string,page:SiteImage['page'],section:string,ratio='4 / 3',variant:SlotVariant='graphite'):SiteImage{
 return {id,description,imageSrc:null,ratio,variant,alt:description,page,section};
}
export const siteImages:SiteImage[]=[
 slot('home-squadra','Fotografia della squadra durante un intervento','home','hero','4 / 5','ink'),
 slot('home-lavoro-idraulica','Impianto idraulico realizzato','home','lavori','4 / 5','ink'),
 slot('home-lavoro-bagno','Bagno completato dall’azienda','home','lavori','3 / 2'),
 slot('home-lavoro-calore','Installazione di riscaldamento','home','lavori','3 / 2','smoke'),
 slot('azienda-squadra','Squadra Idro Costruzioni','chi-siamo','squadra','4 / 5','ink'),
 slot('azienda-lavorazione','Tecnici durante una lavorazione','chi-siamo','approccio','3 / 2','ivory'),
 slot('azienda-dettaglio','Dettaglio di un impianto completato','chi-siamo','approccio','4 / 5','smoke'),
 slot('servizio-idraulica','Impianto idraulico realizzato','servizi','servizio-1','5 / 4'),
 slot('servizio-calore','Installazione caldaia o impianto termico','servizi','servizio-2','4 / 5','ink'),
 slot('servizio-clima','Climatizzatore installato dall’azienda','servizi','servizio-3','5 / 4','smoke'),
 slot('servizio-manutenzione','Tecnico durante un intervento','servizi','servizio-4','4 / 5'),
 slot('servizio-bagno','Bagno o cucina completati','servizi','servizio-5','5 / 4','ink'),
 slot('servizio-scarichi','Tubazioni e scarichi realizzati','servizi','servizio-6','4 / 5','smoke'),
 slot('gallery-bagno','Bagno ristrutturato','realizzazioni','galleria','4 / 5','ink'),
 slot('gallery-idraulica','Impianto idraulico completo','realizzazioni','galleria','5 / 4','ivory'),
 slot('gallery-calore','Installazione di riscaldamento','realizzazioni','galleria','5 / 4','smoke'),
 slot('gallery-clima','Impianto di climatizzazione','realizzazioni','galleria','4 / 5','ink'),
 slot('gallery-cantiere','Lavorazione in cantiere','realizzazioni','galleria','4 / 5'),
 slot('gallery-dettaglio','Dettaglio di installazione completata','realizzazioni','galleria','5 / 4','smoke'),
];
export function getSlot(id:string){const found=siteImages.find(image=>image.id===id);if(!found)throw Error('Missing photo configuration: '+id);return found;}
export const galleryImages=()=>siteImages.filter(image=>image.page==='realizzazioni');
