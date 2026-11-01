import {useEffect,useMemo,useRef,useState} from 'react';
import type {ReactNode} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {useReducedMotion} from 'motion/react';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
export type TechnicalModel='installation';
const copper={color:'#b87850',metalness:.91,roughness:.3};
const brass={color:'#98734b',metalness:.88,roughness:.29};
const chrome={color:'#dde1e4',metalness:1,roughness:.17};
const dark={color:'#253541',metalness:.6,roughness:.37};
type Point=[number,number,number];
function Pipe({points,radius=.075,finish='copper'}:{points:Point[];radius?:number;finish?:'copper'|'chrome'|'brass'}){
 const geometry=useMemo(()=>{const vectors=points.map(p=>new THREE.Vector3(...p));return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(vectors,false,'centripetal'),Math.max(32,points.length*10),radius,12,false)},[points,radius]);
 useEffect(()=>()=>geometry.dispose(),[geometry]);return <mesh geometry={geometry} castShadow receiveShadow><meshStandardMaterial {...(finish==='chrome'?chrome:finish==='brass'?brass:copper)}/></mesh>;
}
function Collar({position,axis='y',radius=.106,length=.14}:{position:Point;axis?:'x'|'y';radius?:number;length?:number}){return <mesh position={position} rotation={axis==='x'?[0,0,Math.PI/2]:[0,0,0]} castShadow><cylinderGeometry args={[radius,radius,length,20]}/><meshStandardMaterial {...copper}/></mesh>;}
function Valve({position,axis='y'}:{position:Point;axis?:'x'|'y'}){return <group position={position} rotation={axis==='x'?[0,0,Math.PI/2]:[0,0,0]}><mesh castShadow><cylinderGeometry args={[.14,.14,.28,6]}/><meshStandardMaterial {...brass}/></mesh><mesh position={[0,0,.14]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.055,.055,.22,16]}/><meshStandardMaterial {...chrome}/></mesh><mesh position={[.1,.03,.27]} rotation={[0,0,-.3]} castShadow><boxGeometry args={[.38,.075,.065]}/><meshStandardMaterial {...dark}/></mesh><mesh position={[0,0,.29]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.065,.065,.03,6]}/><meshStandardMaterial {...chrome}/></mesh></group>;}
function Mount({position}:{position:Point}){return <group position={position}><mesh position={[0,0,-.17]}><boxGeometry args={[.32,.15,.14]}/><meshStandardMaterial {...dark}/></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.085,.018,8,24]}/><meshStandardMaterial {...chrome}/></mesh></group>;}
function Installation(){const branches=[-1.05,0,1.05];return <group rotation={[0,-.15,0]}>
 <mesh position={[0,0,-.39]} receiveShadow><boxGeometry args={[3.65,3.5,.14]}/><meshStandardMaterial color="#a5a7a2" roughness={.85}/></mesh>
 <Pipe points={[[-1.5,1.22,0],[1.5,1.22,0]]}/><Pipe points={[[-1.5,-1.23,0],[1.5,-1.23,0]]}/>
 {[-1.5,1.5].map(x=><group key={x}><Collar position={[x,1.22,0]} axis="x"/><Collar position={[x,-1.23,0]} axis="x"/></group>)}
 {branches.map((x,i)=><group key={x}>
  <Pipe points={[[x,1.22,0],[x,1.02,0],[x,.25,0],[x,-.48,0],[x+.18,-.71,0],[x+.32,-.78,0],[x+.42,-.94,0],[x+.42,-1.23,0]]}/>
  <Collar position={[x,.95,0]}/><Collar position={[x,-.35,0]}/><Collar position={[x+.42,-1.07,0]}/><Valve position={[x,.5,0]}/><Mount position={[x,-.05,0]}/>
  <mesh position={[x,1.22,.05]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.11,.11,.15,20]}/><meshStandardMaterial {...brass}/></mesh>
  {i===1&&<group position={[x,-.17,.1]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.19,.19,.12,32]}/><meshStandardMaterial {...chrome}/></mesh><mesh position={[0,0,.07]}><circleGeometry args={[.156,32]}/><meshStandardMaterial color="#f6f4ed" roughness={.5}/></mesh><mesh position={[.035,.035,.075]} rotation={[0,0,-.7]}><boxGeometry args={[.015,.12,.01]}/><meshStandardMaterial color="#263b46"/></mesh></group>}
 </group>)}
 {[-1.35,1.35].map(x=><group key={x}><Mount position={[x,1.22,0]}/><Mount position={[x,-1.23,0]}/></group>)}
 <mesh position={[0,-1.82,0]} receiveShadow><boxGeometry args={[4.2,.12,1.4]}/><meshStandardMaterial color="#626d72" roughness={.65}/></mesh>
 </group>;}
function Studio(){const {gl}=useThree();const environment=useMemo(()=>{const generator=new THREE.PMREMGenerator(gl);const room=new RoomEnvironment();const target=generator.fromScene(room,.04);room.dispose();generator.dispose();return target},[gl]);useEffect(()=>()=>environment.dispose(),[environment]);return <><primitive object={environment.texture} attach="environment"/><ambientLight intensity={.45}/><spotLight position={[3,6,5]} intensity={75} angle={.55} penumbra={1} castShadow shadow-mapSize={[512,512]} shadow-bias={-.001}/><pointLight position={[-4,2,3]} intensity={25} color="#d6e2ef"/><pointLight position={[2,0,-1]} intensity={15} color="#e5b18b"/></>;}
function Artwork({still}:{still:boolean}){const group=useRef<THREE.Group>(null);useFrame(({clock,pointer},delta)=>{if(still||!group.current)return;group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,Math.sin(clock.elapsedTime*.15)*.1+pointer.x*.1,2,delta);group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,pointer.y*.035,2,delta)});return <group ref={group}><Installation/></group>;}
function Monitor({onLost}:{onLost:()=>void}){const {gl,setDpr}=useThree();const lowered=useRef(false);useEffect(()=>{const loss=(event:Event)=>{event.preventDefault();onLost()};gl.domElement.addEventListener('webglcontextlost',loss);return()=>gl.domElement.removeEventListener('webglcontextlost',loss)},[gl,onLost]);useFrame((_,delta)=>{if(delta>.06&&!lowered.current){lowered.current=true;setDpr(1)}});return null;}
export default function TechnicalScene({active,fallback,model}:{active:boolean;fallback:ReactNode;model:TechnicalModel}){const reduced=useReducedMotion();const [lost,setLost]=useState(false);if(lost)return fallback;return <Canvas className="technical-canvas" data-model={model} shadows dpr={[1,1.4]} frameloop={!active||reduced?'demand':'always'} camera={{position:[3.1,1.8,6.9],fov:37}} fallback={fallback} gl={{alpha:true,antialias:true,powerPreference:'low-power'}} onCreated={({gl})=>{gl.setClearColor(0x0e1c29,0);gl.domElement.setAttribute('data-renderer','three-webgl')}}><Studio/><Artwork still={!!reduced}/><Monitor onLost={()=>setLost(true)}/></Canvas>;}
