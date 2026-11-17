let isCanadian=true;
function calculateTax(amount,tax){return amount*tax();}
function calculateTotal(price,quantity){const amount=price*quantity;return amount+calculateTax(amount,function(){return isCanadian?.05:0;});}
function render(){isCanadian=document.getElementById('region').value==='ca';document.getElementById('tax').textContent='15 × 2 = $30.00; thuế '+(isCanadian?'5%':'0%')+'; Total = $'+calculateTotal(15,2).toFixed(2);}
document.getElementById('region').addEventListener('change',render);render();
