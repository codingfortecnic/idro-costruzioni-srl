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
 slot('gallery-bagno','Bagno completato dall’azienda','realizzazioni','galleria','4 / 5','ink'),
 slot('gallery-idraulica','Impianto idraulico realizzato','realizzazioni','galleria','5 / 4','ivory'),
 slot('gallery-calore','Installazione di riscaldamento','realizzazioni','galleria','5 / 4','smoke'),
 slot('gallery-clima','Impianto di climatizzazione','realizzazioni','galleria','4 / 5','ink'),
 slot('gallery-cantiere','Tecnici durante una lavorazione','realizzazioni','galleria','4 / 5'),
 slot('gallery-dettaglio','Dettaglio di un impianto completato','realizzazioni','galleria','5 / 4','smoke'),
];
export function getSlot(id:string){const found=siteImages.find(image=>image.id===id);if(!found)throw Error('Missing photo configuration: '+id);return found;}
export const galleryImages=()=>siteImages.filter(image=>image.page==='realizzazioni');
