const daysOfWeek=new Array('Mon','Tues','Wed','Thur','Fri');daysOfWeek.push('Sat');daysOfWeek.unshift('Sun');
document.getElementById('arrayList').textContent=daysOfWeek.join(' · ');
let html='<table class="calendar"><thead><tr>'+daysOfWeek.map(day=>'<th>'+(day.length>3?'<em>'+day+'</em>':day)+'</th>').join('')+'</tr></thead><tbody>';
let currentDay=1;for(let week=0;week<5;week++){html+='<tr>';for(let d=0;d<7;d++){html+='<td>'+(currentDay<=30?currentDay++:'')+'</td>';}html+='</tr>';}html+='</tbody></table>';
document.getElementById('calendar').innerHTML=html;
