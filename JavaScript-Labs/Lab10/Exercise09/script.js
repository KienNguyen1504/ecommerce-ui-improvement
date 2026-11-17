$(function(){
 $('#consume').on('click',function(){
  $('#results').text('Đang tải dữ liệu...');
  $.get('../assets/cities.json',function(data,status){
   const list=$('<ul></ul>');$.each(data,function(_,city){$('<li></li>').text(city.name).appendTo(list);});
   $('#results').empty().append($('<p></p>').text('HTTP GET: '+status)).append(list);
  }).fail(function(){ $('#results').text('GET thất bại – hãy mở website bằng Live Server hoặc GitHub Pages.');});
 });
});
