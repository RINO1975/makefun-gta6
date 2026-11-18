export function createInput(){
 const keys=new Set(),pressed=new Set();let dx=0,dy=0,locked=false;
 addEventListener('keydown',e=>{keys.add(e.code);if(!e.repeat)pressed.add(e.code);if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault()});
 addEventListener('keyup',e=>keys.delete(e.code));addEventListener('blur',()=>keys.clear());
 document.addEventListener('pointerlockchange',()=>locked=document.pointerLockElement===document.body);
 document.addEventListener('mousemove',e=>{if(locked){dx+=e.movementX;dy+=e.movementY}});
 document.querySelector('#view').addEventListener('click',()=>{if(!locked&&document.querySelector('#menu').classList.contains('hide'))document.body.requestPointerLock?.()});
 return {down:k=>keys.has('Key'+k)||keys.has(k),take:k=>{const v=pressed.has('Key'+k)||pressed.has(k);pressed.delete('Key'+k);pressed.delete(k);return v},look:()=>{const v=[dx,dy];dx=dy=0;return v},unlock:()=>{if(document.pointerLockElement)document.exitPointerLock()}};
}
