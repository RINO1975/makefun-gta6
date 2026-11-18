const KEY='sunshore.save.v1';
export function loadSave(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
export function saveGame(state){try{localStorage.setItem(KEY,JSON.stringify({x:state.player.x,z:state.player.z,cash:state.cash,mission:state.mission,wanted:state.wanted,done:state.done}))}catch{}}
