import {Component,lazy,Suspense,useEffect,useRef,useState} from 'react';
import type {ReactNode} from 'react';
import {LuxuryFlourish,Medallion} from './Ornaments';
import {Waves} from 'lucide-react';
const Scene=lazy(()=>import('./SculptureScene'));
function Fallback(){return <div className="sculpture-fallback" data-sculpture-fallback><LuxuryFlourish/><Medallion><Waves size={60} strokeWidth={.7}/></Medallion><LuxuryFlourish/></div>;}
class SceneBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<Fallback/>:this.props.children}}
export default function Sculpture(){const container=useRef<HTMLDivElement>(null);const [active,setActive]=useState(true);return <div ref={container} className="sculpture-stage" role="img" aria-label="Scultura tridimensionale dorata: nastri d’acqua, volute e movimento"><Visibility container={container} onChange={setActive}/><SceneBoundary><Suspense fallback={<Fallback/>}><Scene active={active} fallback={<Fallback/>}/></Suspense></SceneBoundary><span className="sculpture-caption">ACQUA · CALORE · MOVIMENTO</span></div>;}
function Visibility({container,onChange}:{container:React.RefObject<HTMLDivElement|null>;onChange:(value:boolean)=>void}){useEffect(()=>{const observer=new IntersectionObserver(([entry])=>onChange(entry.isIntersecting),{rootMargin:'80px'});if(container.current)observer.observe(container.current);const visibility=()=>onChange(!document.hidden&&!!container.current&&container.current.getBoundingClientRect().bottom>0);document.addEventListener('visibilitychange',visibility);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility)}},[container,onChange]);return null;}
