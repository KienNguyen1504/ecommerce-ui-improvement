const btn=document.getElementById('testButton');const content=document.getElementById('content');const img=document.getElementById('mainImage');
btn.addEventListener('click',()=>{
 if(btn.textContent.trim()==='Hide'){
  btn.textContent='Show';content.className='makeItDisappear';
  setTimeout(()=>{if(btn.textContent==='Show')content.style.display='none';},550);
 }else{btn.textContent='Hide';content.style.display='block';setTimeout(()=>content.className='makeItNormal',40);}
});
img.addEventListener('mouseover',()=>img.className='makeItGray');
img.addEventListener('mouseout',()=>img.className='makeItNormal');
