// Trình duyệt chỉ tìm thấy phần tử sau khi DOM đã được tải.
window.addEventListener('load',function(){
 const node=document.getElementById('div1');
 const out=document.getElementById('loadResult');
 if(out)out.textContent=node ? ('window.load: '+node.innerHTML) : 'Không tìm thấy #div1';
 console.log(out.textContent);
});
