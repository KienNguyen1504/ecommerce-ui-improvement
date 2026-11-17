function setBackground(e){e.target.style.backgroundColor=e.type==='focus'?'#FFE393':'white';}
window.addEventListener('load',()=>{
 const fields=document.querySelectorAll('input[type=text],input[type=password]');
 fields.forEach(field=>{field.addEventListener('focus',setBackground);field.addEventListener('blur',setBackground);});
 const form=document.forms.sampleForm;if(form)form.addEventListener('submit',e=>e.preventDefault());
});
