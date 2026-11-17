const stringOne=new String('Test'),stringTwo='Test',stringThree='Test',stringFour=new String('Test');
function render(){const lines=[
 'typeof stringOne = '+typeof stringOne,
 'typeof stringThree = '+typeof stringThree,
 'stringOne == stringTwo → '+(stringOne==stringTwo),
 'stringOne == stringFour → '+(stringOne==stringFour),
 'stringTwo === stringThree → '+(stringTwo===stringThree),
 'stringOne === stringTwo → '+(stringOne===stringTwo),
 'new Date() = '+new Date().toLocaleString('vi-VN'),
 'Math.PI = '+Math.PI,'Math.sqrt(4) = '+Math.sqrt(4),
 'Math.random() = '+Math.random().toFixed(6)];
 document.getElementById('objects').textContent=lines.join('\n');}
document.getElementById('randomize').addEventListener('click',render);render();
