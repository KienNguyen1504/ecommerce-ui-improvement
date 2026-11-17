// Exercise 9.1: truy xuất theo ID, tag, class và CSS selector trên HTML Lab 09 gốc.
function applyDomSelection(){
 const msg=document.getElementById('msgArea');
 const title=document.getElementById('pageTitle');
 title.innerHTML='New Title';
 title.innerHTML='Even newer title';
 const first=document.getElementById('first');
 const richContent=first.innerHTML;
 const plainContent=first.innerText;
 const spanNodes=document.getElementsByTagName('span');
 const counts=document.getElementsByClassName('count-number');
 const textareaByTag=document.getElementsByTagName('textarea');
 textareaByTag[0].value='selected by tag name';
 const firstParagraph=document.querySelector('#first p');
 const paragraphs=document.querySelectorAll('#first p');
 const lines=['Đã chọn textarea bằng getElementById: #'+msg.id,
  'Class của textarea: '+msg.getAttribute('class'),
  'Số phần tử span: '+spanNodes.length,
  'Các chỉ số: '+Array.from(counts).map(x=>x.innerText).join(', '),
  'innerHTML có thẻ HTML: '+richContent.includes('<p'),
  'innerText là văn bản thuần: '+plainContent.includes('This is a sample file'),
  'querySelector("#first p"): '+firstParagraph.innerText,
  'querySelectorAll("#first p"): '+paragraphs.length+' phần tử'];
 msg.setAttribute('class','form-control');
 msg.value=lines.join('\n');
 document.getElementById('features').style.backgroundColor='#bde9d2';
 document.getElementById('auditMsg').textContent='14 bước chọn DOM được đối chiếu; tiêu đề, textarea và vùng thống kê đã cập nhật.';
}
document.getElementById('redo').addEventListener('click',applyDomSelection);
document.getElementById('toggleTextarea').addEventListener('click',()=>{const area=document.getElementById('msgArea');area.setAttribute('class',area.className.includes('hidden-lab')?'form-control':'form-control hidden-lab');});
applyDomSelection();
