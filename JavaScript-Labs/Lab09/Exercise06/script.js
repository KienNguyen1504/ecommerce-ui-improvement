const img=document.getElementById('mainImage');const testButton=document.getElementById('testButton');
function debugHover(event){console.log('Event target:',event.target,'type:',event.type,'position:',event.clientX,event.clientY);
 document.getElementById('debugMsg').textContent='Hover: '+event.type+' / '+event.target.tagName+' ('+event.clientX+', '+event.clientY+')';}
img.addEventListener('mouseover',debugHover);img.addEventListener('mousemove',debugHover);
testButton.addEventListener('click',(event)=>{console.log('Button click:',event);document.getElementById('debugMsg').textContent='Click vào nút đã kích hoạt handler';});
