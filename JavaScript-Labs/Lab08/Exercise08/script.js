const boxClass='movingDiv';
function outputBox(num){return `<div class="${boxClass}" id="div${num}">This is div ${num}</div>`;}
for(let count=1;count<6;count++){document.getElementById('boxes').insertAdjacentHTML('beforeend',outputBox(count));}
