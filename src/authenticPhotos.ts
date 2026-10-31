export type PhotoPlacement = 'home' | 'about' | 'projects' | 'service';
export interface AuthenticPhoto {
 id:string;
 title:string;
 alt:string;
 width:number;
 height:number;
 variants:{src:string;width:number}[];
 placements:PhotoPlacement[];
 serviceIndex:number|null;
 authorizationVerified:true;
}
