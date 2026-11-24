(() => {
const games=[{key:'froggy',length:24,folder:'Flexbox-Froggy',prefix:'froggy',target:'frogEvidence'},{key:'grid',length:28,folder:'Grid-Garden',prefix:'grid',target:'gridEvidence'},{key:'combat',length:19,folder:'CodeCombat',prefix:'combat',target:'combatEvidence'}];
function read(k){try{return JSON.parse(localStorage.getItem(k))||[];}catch{return [];}}
for(const g of games){const key='gameProgress2026:'+g.key;let done=new Set(read(key));const root=document.getElementById(g.key+'Levels');const status=document.getElementById(g.key+'Status');function update(){status.textContent=done.size+' / '+g.length;try{localStorage.setItem(key,JSON.stringify([...done]));}catch{}}
for(let n=1;n<=g.length;n++){const label=document.createElement('label');const box=document.createElement('input');box.type='checkbox';box.checked=done.has(n);box.setAttribute('aria-label',g.key+' level '+n+' đã chơi');box.addEventListener('change',()=>{if(box.checked)done.add(n);else done.delete(n);update();});const face=document.createElement('span');face.textContent=String(n).padStart(2,'0');label.append(box,face);root.append(label);}update();const gallery=document.getElementById(g.target);let evidence=[];if(g.key==='combat'){evidence=['combat-map.png','combat-victory.png'];}else{evidence=Array.from({length:g.length},(_,i)=>`${g.prefix}-${String(i+1).padStart(2,'0')}.png`);}for(const file of evidence){
 const card=document.createElement('div');card.className='evidence-tile';
 const label=document.createElement('div');label.textContent=file;
 const text=document.createElement('div');text.textContent='Ảnh do sinh viên bổ sung';text.style.cssText='font-size:11px;padding:7px 0;color:#8390a7';
 const link=document.createElement('a');link.href=`evidence/${g.folder}/${file}`;link.target='_blank';link.rel='noopener';link.textContent='Mở ảnh khi đã lưu ↗';link.style.cssText='font-size:11px;font-weight:700;color:#355dbd';
 card.append(label,text,link);gallery.append(card);
 }}
})();