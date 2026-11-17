let count=2;
function writeMessages(){ console.log('Script running. Count =',count);console.warn('This is a warning for practice');console.error('This is a demonstration error message');const temp=count*7;console.log('temp =',temp);document.getElementById('console-result').textContent='Console: count = '+count+'; temp = '+temp+' (mở F12 để xem thêm).';}
document.getElementById('retest').addEventListener('click',writeMessages);
writeMessages();
