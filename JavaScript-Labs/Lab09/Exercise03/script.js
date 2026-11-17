// createTextNode, createElement, appendChild, removeChild trực tiếp trên DOM của Lab.
function modifyDom(){
 const first=document.getElementById('first');
 if(!document.getElementById('generatedNode')){
  const text=document.createTextNode('this is programmatically created');
  const p=document.createElement('p');p.id='generatedNode';p.appendChild(text);first.appendChild(p);
 }
 const icons=document.getElementById('iconList');
 const target=document.getElementById('deleteThisOne');
 if(icons&&target)icons.removeChild(target);
 document.getElementById('domStatus').textContent='Đã thêm <p> vào #first và xóa phần tử #deleteThisOne trong #iconList.';
}
document.getElementById('modify').addEventListener('click',modifyDom);modifyDom();
