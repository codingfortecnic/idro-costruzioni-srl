import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Droplets,Flame,Wind,Wrench,Bath,Waves,Plus,X,ArrowUpRight} from 'lucide-react';
import {services} from './company';
const icons=[Droplets,Flame,Wind,Wrench,Bath,Waves];
const details=[
 ['Distribuzione dell’acqua','Punti acqua e collegamenti','Percorsi da valutare sugli spazi'],
 ['Comfort degli ambienti','Impianti e punti di emissione','Configurazione da concordare'],
 ['Raffrescamento e benessere','Posizionamento delle unità','Necessità degli ambienti'],
 ['Valutazione delle anomalie','Ricerca delle cause','Interventi da definire insieme'],
 ['Reti per sanitari e lavelli','Punti acqua e scarichi','Coordinamento dei collegamenti'],
 ['Adduzione e distribuzione','Reti di scarico','Accessibilità per manutenzione'],
];
const short=["Soluzioni per la distribuzione dell'acqua.",'Comfort termico per ogni ambiente.','Benessere in ogni stagione.','Interventi per mantenere efficienti gli impianti.','Funzionalità e cura degli spazi.','Collegamenti progettati per durare.'];
function ServiceCard({index}:{index:number}){
 const [pinned,setPinned]=useState(false),[hovered,setHovered]=useState(false);const open=pinned||hovered;const Icon=icons[index];const [title,copy]=services[index];const panel=`service-detail-${index}`;
 return <article className={`luxury-service-card ${open?'is-open':''}`} onMouseEnter={()=>{if(matchMedia('(hover:hover)').matches)setHovered(true)}} onMouseLeave={()=>setHovered(false)} onKeyDown={event=>{if(event.key==='Escape'){setPinned(false);setHovered(false)}}}>
 <div className="service-card-frame"><div className="service-card-turn">
 <div className="service-card-face service-card-front" aria-hidden={open} inert={open}><span className="service-card-number">SERVIZI / 0{index+1}</span><span className="service-card-icon"><Icon size={42} strokeWidth={1.2}/></span><h3>{title}</h3><p>{short[index]}</p><span className="service-card-invitation">Scopri come possiamo intervenire<ArrowUpRight size={18}/></span></div>
 <div className="service-card-face service-card-back" id={panel} aria-hidden={!open} inert={!open}><span className="service-card-number">IL SERVIZIO / 0{index+1}</span><Icon size={26} strokeWidth={1}/><h3>{title}</h3><p>{copy}</p><ul>{details[index].map(text=><li key={text}>{text}</li>)}</ul><Link className="text-link" to="/contatti">Richiedi informazioni<ArrowUpRight size={17}/></Link></div>
 </div></div><button className="service-card-toggle" aria-controls={panel} aria-expanded={open} aria-label={`${open?'Chiudi':'Scopri'} ${title}`} onClick={()=>{if(open){setPinned(false);setHovered(false)}else setPinned(true)}}>{open?<X size={19}/>:<Plus size={19}/>}</button></article>;
}
export default function ServiceCards({limit=6}:{limit?:number}){return <><div className="luxury-service-grid">{services.slice(0,limit).map((_,index)=><ServiceCard key={index} index={index}/>)}</div><p className="service-interaction-hint">Passa il mouse per esplorare. Tocca + o attivalo con la tastiera per aprire i dettagli.</p></>;}
