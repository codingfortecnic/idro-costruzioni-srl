import {useEffect,useRef,useState} from 'react';
import {ChevronLeft,ChevronRight,X,ArrowUpRight} from 'lucide-react';
import PremiumImageSlot from './PremiumImageSlot';
import {galleryImages} from './data/siteImages';

export default function Gallery(){
 const images=galleryImages();const [invalid,setInvalid]=useState<string[]>([]);const [selected,setSelected]=useState<string|null>(null);const dialog=useRef<HTMLDialogElement>(null);const previousFocus=useRef<HTMLElement|null>(null);
 const real=images.filter(image=>image.imageSrc&&!invalid.includes(image.id));const current=real.find(image=>image.id===selected);
 useEffect(()=>{if(!selected){dialog.current?.close();previousFocus.current?.focus();return}if(!dialog.current?.open){previousFocus.current=document.activeElement as HTMLElement;dialog.current?.showModal()}const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=overflow}},[selected]);
 function broken(id:string){setInvalid(previous=>previous.includes(id)?previous:[...previous,id]);if(id===selected)setSelected(null);}
 function move(delta:number){const index=real.findIndex(image=>image.id===selected);setSelected(real[(index+delta+real.length)%real.length]?.id??null);}
 return <><div className="project-grid">{images.map((image,index)=><div className={`project-cell project-cell-${index+1}`} key={image.id}>
  {image.imageSrc&&!invalid.includes(image.id)?<button type="button" className="real-project" aria-label={`Apri fotografia: ${image.description}`} onClick={()=>setSelected(image.id)}><PremiumImageSlot {...image} onImageError={()=>broken(image.id)}/><span className="project-open"><ArrowUpRight/></span></button>:<PremiumImageSlot {...image} imageSrc={null}/>}
  <span className="project-caption"><span>0{index+1}</span><span>{image.description}</span></span>
 </div>)}</div>{real.length>0&&<dialog ref={dialog} className="photo-lightbox" aria-label="Fotografie delle realizzazioni" onCancel={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget)setSelected(null)}} onKeyDown={event=>{if(event.key==='ArrowLeft')move(-1);if(event.key==='ArrowRight')move(1)}}>{current&&<div className="lightbox-content"><button autoFocus type="button" className="lightbox-close" aria-label="Chiudi fotografia" onClick={()=>setSelected(null)}><X/></button><button type="button" className="lightbox-prev" aria-label="Fotografia precedente" onClick={()=>move(-1)}><ChevronLeft/></button><figure><img src={current.imageSrc!} alt={current.alt} onError={()=>broken(current.id)}/><figcaption>{current.description}</figcaption></figure><button type="button" className="lightbox-next" aria-label="Fotografia successiva" onClick={()=>move(1)}><ChevronRight/></button></div>}</dialog>}</>;
}
