import * as T from 'three';
export function createPlayer(scene){
 const group=new T.Group();const body=new T.Mesh(new T.CapsuleGeometry(.48,.9,4,8),new T.MeshStandardMaterial({color:0x263e48,roughness:.8}));body.position.y=1.12;body.castShadow=true;group.add(body);
 const shirt=new T.Mesh(new T.BoxGeometry(.8,.52,.45),new T.MeshStandardMaterial({color:0xe5a954}));shirt.position.y=1.35;group.add(shirt);
 const head=new T.Mesh(new T.SphereGeometry(.27,12,10),new T.MeshStandardMaterial({color:0x9c684c}));head.position.y=2;group.add(head);scene.add(group);
 return {group,x:-12,z:8,y:0,vx:0,vz:0,health:100,heading:0,vertical:0,grounded:true,combat:0};
}
export function movePlayer(p,input,dt,cameraYaw){let f=(input.down('W')?1:0)-(input.down('S')?1:0),s=(input.down('D')?1:0)-(input.down('A')?1:0),speed=input.down('ShiftLeft')||input.down('ShiftRight')?13.5:8.2;let a=cameraYaw;let tx=(Math.sin(a)*f+Math.cos(a)*s)*speed,tz=(Math.cos(a)*f-Math.sin(a)*s)*speed;p.vx+=(tx-p.vx)*Math.min(1,dt*8);p.vz+=(tz-p.vz)*Math.min(1,dt*8);p.x+=p.vx*dt;p.z+=p.vz*dt;p.x=Math.max(-106,Math.min(106,p.x));p.z=Math.max(-106,Math.min(105,p.z));if(Math.hypot(p.vx,p.vz)>.4)p.heading=Math.atan2(p.vx,p.vz);if(input.take('Space')&&p.grounded){p.vertical=8;p.grounded=false}p.vertical-=23*dt;p.y+=p.vertical*dt;if(p.y<0){p.y=0;p.vertical=0;p.grounded=true}p.group.position.set(p.x,p.y,p.z);p.group.rotation.y=p.heading;if(p.combat>0)p.combat-=dt}
