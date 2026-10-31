import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Pipe({points,color='#bd784c',radius=.13}:{points:number[][];color?:string;radius?:number}) {
 const geometry=useMemo(()=>new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'catmullrom',.12),80,radius,16,false),[points,radius]);
 return <mesh geometry={geometry} castShadow><meshStandardMaterial color={color} metalness={.86} roughness={.25}/></mesh>;
}
function Ring({position,rotation=[0,0,Math.PI/2]}:{position:[number,number,number];rotation?:[number,number,number]}){return <mesh position={position} rotation={rotation}><cylinderGeometry args={[.19,.19,.17,24]}/><meshStandardMaterial color="#c0c8cb" metalness={.95} roughness={.19}/></mesh>}
function Assembly({reduced}:{reduced:boolean}){
 const group=useRef<THREE.Group>(null);
 useFrame(({clock,pointer})=>{if(group.current&&!reduced){group.current.rotation.y= -.25+Math.sin(clock.elapsedTime*.18)*.13+pointer.x*.07;group.current.rotation.x=pointer.y*.035;}});
 return <group ref={group} rotation={[0,-.25,-.08]}>
  <Pipe points={[[-2,-1,0],[-1.5,-1,0],[-1.3,-.8,0],[-1.3,1,0],[-1.1,1.2,0],[.4,1.2,0],[.65,1,0],[.65,-.1,0],[.85,-.3,0],[2,-.3,0]]}/>
  <Pipe color="#aeb9c3" points={[[-2,.15,.4],[-.65,.15,.4],[-.4,-.1,.4],[-.4,-1.25,.4],[-.15,-1.5,.4],[1.45,-1.5,.4],[1.7,-1.25,.4],[1.7,1.1,.4]]}/>
  <Pipe points={[[-.2,1.2,0],[-.2,1.8,0]]} radius={.085}/>
  {[-.9,-.2,.4,1.6].map((x,i)=><Ring key={i} position={[x,i<3?1.2:-.3,0]}/>)}
  <Ring position={[-1.3,-.3,0]} rotation={[0,0,0]}/><Ring position={[1.7,.5,.4]} rotation={[0,0,0]}/>
  <group position={[-.2,1.88,.05]} rotation={[Math.PI/2,0,0]}><mesh><cylinderGeometry args={[.39,.39,.16,48]}/><meshStandardMaterial color="#c3cbd1" metalness={.9} roughness={.2}/></mesh><mesh position={[0,.09,0]}><cylinderGeometry args={[.335,.335,.012,48]}/><meshStandardMaterial color="#f5f1e5"/></mesh><mesh position={[0,.105,0]} rotation={[0,-.6,0]}><boxGeometry args={[.018,.015,.49]}/><meshStandardMaterial color="#172c40"/></mesh>{Array.from({length:11},(_,i)=><mesh key={i} position={[Math.sin(i*.46-2.3)*.28,.107,Math.cos(i*.46-2.3)*.28]} rotation={[0,i*.46-2.3,0]}><boxGeometry args={[.014,.012,.045]}/><meshBasicMaterial color="#172c40"/></mesh>)}</group>
  <group position={[.65,.45,0]}><mesh><sphereGeometry args={[.22,24,16]}/><meshStandardMaterial color="#b88a41" metalness={.8} roughness={.27}/></mesh><mesh position={[0,0,.24]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.065,.065,.4,16]}/><meshStandardMaterial color="#c8d0d2" metalness={.9}/></mesh><mesh position={[.19,0,.46]} rotation={[0,0,-.15]}><boxGeometry args={[.66,.12,.08]}/><meshStandardMaterial color="#249cc9" metalness={.3} roughness={.32}/></mesh></group>
 </group>;
}
export default function PipeScene(){const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;return <Canvas dpr={[1,1.5]} camera={{position:[4,2.8,7],fov:40}} gl={{antialias:true,alpha:true,powerPreference:'low-power'}} frameloop={reduced?'demand':'always'} onCreated={({gl})=>{gl.domElement.setAttribute('aria-label','Composizione illustrativa 3D di tubi in rame e acciaio, valvola e manometro');gl.domElement.setAttribute('role','img');}}><ambientLight intensity={1.4}/><directionalLight position={[3,5,4]} intensity={4}/><pointLight position={[-4,1,2]} color="#8bd5f2" intensity={35}/><pointLight position={[2,-3,3]} color="#ffbd7e" intensity={18}/><Assembly reduced={reduced}/></Canvas>}
