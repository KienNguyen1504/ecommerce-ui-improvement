function Order(product,price,quantity){this.product=product;this.price=price;this.quantity=quantity;this.total=function(){return this.price*this.quantity;};this.output=function(){return `<div class="box"><strong>${this.product}</strong><p>Price = ${this.price}<br>Quantity = ${this.quantity}<br>Total = ${this.total()}</p></div>`;};}
const example1=new Order('Self Portrait in a Straw Hat',15,2);const example2=new Order('Untitled #23',10,4);
document.getElementById('orders').innerHTML=example1.output()+example2.output();
