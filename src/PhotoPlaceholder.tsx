import {useState} from 'react';
import {Camera,ArrowUpRight} from 'lucide-react';
import type {CSSProperties} from 'react';
import type {SlotVariant} from './data/siteImages';
export interface PremiumImageSlotProps{id:string;description:string;imageSrc?:string|null;ratio?:string;variant?:SlotVariant;alt:string;onImageError?:()=>void}
export default function PhotoPlaceholder({id,description,imageSrc=null,ratio='4 / 3',variant='graphite',alt,onImageError}:PremiumImageSlotProps){
 const [failed,setFailed]=useState<string|null>(null);const real=!!imageSrc&&failed!==imageSrc;
 return <div className={`premium-slot surface-${variant} ${real?'has-photograph':'is-placeholder'}`} style={{'--slot-ratio':ratio} as CSSProperties} data-slot-id={id}>{real?<img src={imageSrc!} alt={alt} loading="lazy" decoding="async" onError={()=>{setFailed(imageSrc);onImageError?.()}}/>:<><svg className="placeholder-grid" viewBox="0 0 600 600" fill="none" aria-hidden="true"><path d="M-100 600 600-100M-100 800 800-100M0 200H600M200 0V600M400 0V600M0 400H600"/><path d="M95 95H505V505H95Z"/><circle cx="600" cy="600" r="245"/></svg><span className="placeholder-index">IDRO / PROSPETTIVE</span><div className="slot-center"><Camera size={26} strokeWidth={1}/><span className="slot-eyebrow">FOTOGRAFIA DA INSERIRE</span><q>{description}</q><span className="placeholder-rule"/></div><ArrowUpRight className="placeholder-arrow" size={19} strokeWidth={1}/></>}</div>;
}
