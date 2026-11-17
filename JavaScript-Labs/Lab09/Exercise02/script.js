// Chỉ tô màu element node, không tô text node; in thứ tự node ra Console.
const stories=document.getElementById('stories');
const lines=[];
Array.from(stories.childNodes).forEach((node,index)=>{
 const row=`child ${index}: nodeType=${node.nodeType}, name=${node.nodeName}`;
 console.log(row); lines.push(row);
 if(node.nodeType===Node.ELEMENT_NODE)node.style.backgroundColor='#e1f5e8';
});
document.getElementById('nodeResults').textContent=lines.join('\n');
