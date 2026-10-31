import {useState} from 'react';
import {Camera} from 'lucide-react';
import type {CSSProperties} from 'react';
import type {SlotVariant} from './data/siteImages';

export interface PremiumImageSlotProps {
 id:string;
 description:string;
 imageSrc?:string|null;
 ratio?:string;
 variant?:SlotVariant;
 alt:string;
 onImageError?:()=>void;
}
export default function PremiumImageSlot({id,description,imageSrc=null,ratio='4 / 3',variant='graphite',alt,onImageError}:PremiumImageSlotProps){
 const [failedSource,setFailedSource]=useState<string|null>(null);
 const real=!!imageSrc&&failedSource!==imageSrc;
 return <div className={`premium-slot slot-${variant} ${real?'has-photograph':'is-placeholder'}`} style={{'--slot-ratio':ratio} as CSSProperties} data-slot-id={id}>
  {real?<img src={imageSrc!} alt={alt} loading="lazy" decoding="async" onError={()=>{setFailedSource(imageSrc);onImageError?.()}}/>:<>
   <svg className="slot-drawing" viewBox="0 0 600 600" fill="none" aria-hidden="true"><path d="M-100 480 480-100M30 700 700 30M-100 240 240-100M270 700 700 270"/><path d="M0 90H600M0 510H600M90 0V600M510 0V600"/><circle cx="600" cy="600" r="225"/><circle cx="600" cy="600" r="300"/></svg>
   <span className="slot-frame" aria-hidden="true"/>
   <span className="slot-sheen" aria-hidden="true"/>
   <div className="slot-center"><span className="slot-icon"><Camera size={21} strokeWidth={1}/></span><span className="slot-eyebrow">FOTOGRAFIA DA INSERIRE</span><q>{description}</q><span className="slot-rule" aria-hidden="true"/></div>
   <span className="slot-corner corner-one" aria-hidden="true"/><span className="slot-corner corner-two" aria-hidden="true"/>
  </>}
 </div>;
}
