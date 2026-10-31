import {useState} from 'react';
import {Camera} from 'lucide-react';
import type {CSSProperties} from 'react';
import type {SlotVariant} from './data/siteImages';
import {DecorativeFrame,LuxuryFlourish,Medallion} from './Ornaments';
export interface PremiumImageSlotProps{id:string;description:string;imageSrc?:string|null;ratio?:string;variant?:SlotVariant;alt:string;onImageError?:()=>void}
export default function BaroquePhotoPlaceholder({id,description,imageSrc=null,ratio='4 / 3',variant='graphite',alt,onImageError}:PremiumImageSlotProps){
 const [failed,setFailed]=useState<string|null>(null);const real=!!imageSrc&&failed!==imageSrc;const style=variant==='ivory'?'ivory':ratio==='3 / 2'||ratio==='5 / 4'?'panoramic':variant==='ink'?'dark':'editorial';
 return <div className={`premium-slot baroque-photo photo-${style} ${real?'has-photograph':'is-placeholder'}`} style={{'--slot-ratio':ratio} as CSSProperties} data-slot-id={id} data-placeholder-variant={style}>{real?<img src={imageSrc!} alt={alt} loading="lazy" decoding="async" onError={()=>{setFailed(imageSrc);onImageError?.()}}/>:<DecorativeFrame><span className="slot-sheen"/><LuxuryFlourish className="photo-crown"/><div className="slot-center"><Medallion><Camera size={24} strokeWidth={1}/></Medallion><span className="slot-eyebrow">FOTOGRAFIA DA INSERIRE</span><q>{description}</q><LuxuryFlourish compact className="photo-signature"/></div><span className="photo-engraving" aria-hidden="true">IDRO COSTRUZIONI · SASSUOLO</span></DecorativeFrame>}</div>;
}
