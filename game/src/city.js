import * as T from 'three';
import {CITY} from './config.js';
const palette=[0xd48d65,0xe7cf9d,0x78a6a0,0xd9a6a1,0x8da5be,0xe2b953,0xaaa184];
function mat(c,rough=.9){return new T.MeshStandardMaterial({color:c,roughness:rough})}
export function createCity(scene){
 const ground=mat(0xc9b78f),road=mat(0x3e4a4a),line=mat(0xe6d7a8),sand=mat(0xe9cb8b),sea=mat(0x228ba7,.32);
 function box(x,y,z,w,h,d,m,sh=true){const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y+h/2,z);o.castShadow=sh;o.receiveShadow=true;scene.add(o);return o}
 const floor=new T.Mesh(new T.PlaneGeometry(500,500),ground);floor.rotation.x=-Math.PI/2;floor.position.y=-.12;floor.receiveShadow=true;scene.add(floor);
 for(let i=-5;i<=5;i++){const p=i*CITY.block;box(p,-.02,0,CITY.road,.08,250,road,false);box(0,-.02,p,250,.08,CITY.road,road,false);for(let s=-100;s<110;s+=8){box(p,.03,s,.16,.015,3,line,false);box(s,.03,p,3,.015,.16,line,false)}}
 box(0,-.03,111,500,.1,30,sand,false);const ocean=new T.Mesh(new T.PlaneGeometry(500,200),sea);ocean.rotation.x=-Math.PI/2;ocean.position.set(0,-.04,220);scene.add(ocean);
 for(let gx=-4;gx<=4;gx++)for(let gz=-4;gz<=4;gz++){if(Math.abs(gx)<1&&Math.abs(gz)<1)continue;let x=gx*36+18,z=gz*36+18;if(z>90)continue;let w=22+((gx*7+gz*3+81)%10),d=22+((gx*5-gz*9+93)%10),h=8+((gx*13+gz*17+131)%37);let m=mat(palette[Math.abs(gx*3+gz*5)%palette.length]);box(x,h*.02,z,w,h,d,m);box(x,h+.12,z,w+.4,.25,d+.4,mat(0xc8b892),false);for(let yy=2.5;yy<h-1;yy+=3)for(let xx=-w/2+2;xx<w/2-1;xx+=4)box(x+xx,yy,z-d/2-.035,1.25,1.05,.08,mat(0x8ed2d0,.4),false)}
 for(let x=-190;x<=190;x+=25){if(x%50===0)continue;const trunk=mat(0x8c6343),leaf=mat(0x297e66);box(x,1,98,.55,7,.55,trunk);for(let a=0;a<6;a++){let ang=a*Math.PI/3;let l=new T.Mesh(new T.ConeGeometry(.55,5,5),leaf);l.position.set(x+Math.cos(ang)*1.4,7.4,98+Math.sin(ang)*1.4);l.rotation.z=Math.PI/2-Math.atan2(Math.sin(ang),Math.cos(ang));scene.add(l)}}
 const marker=new T.Group();const ring=new T.Mesh(new T.TorusGeometry(2,.16,8,40),new T.MeshStandardMaterial({color:0xffd05a,emissive:0x9f5f09}));ring.rotation.x=Math.PI/2;marker.add(ring);const beam=new T.Mesh(new T.CylinderGeometry(.08,.75,4,12,1,true),new T.MeshBasicMaterial({color:0xffd05a,transparent:true,opacity:.22,side:T.DoubleSide}));beam.position.y=2;marker.add(beam);marker.position.set(20,0,5);scene.add(marker);
 return {box,marker,mat,ground,road};
}
