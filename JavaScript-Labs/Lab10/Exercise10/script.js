$(function(){
 $('.animLoading').hide();
 function load(url){$('#results ul').empty();$('.animLoading').show();$('#state').text('Đang gửi GET...');
  return $.get(url).done(function(data){
   $.each(data,function(_,city){$('<li></li>').text(city.name).appendTo('#results ul');});
   $('#state').text('done(): nhận dữ liệu thành công');
  }).fail(function(xhr,status,error){ $('#state').text('fail(): '+status+' / '+(error||xhr.status));})
   .always(function(){$('.animLoading').fadeOut('slow');$('#state').text($('#state').text()+' | always(): đã kết thúc');});
 }
 $('#consume').on('click',()=>load('../assets/cities.json'));
 $('#failRequest').on('click',()=>load('../assets/missing-cities.json'));
});
