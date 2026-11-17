$(function(){
 const panel=$('.panel');
 const src='../reference/images/art/thumbs/13030.jpg';
 function insert(method){$('.inserted').remove();const img=$('<img class="inserted" alt="Artwork 13030">').attr('src',src).css({width:'140px',margin:'12px',borderRadius:'10px'});
  if(method==='before')panel.before(img);else if(method==='after')panel.after(img);else if(method==='prepend')panel.prepend(img);else panel.append(img);
  $('#insertStatus').text('Phần tử ảnh được chèn bằng '+method+'().');
 }
 $('[data-method]').on('click',function(){insert($(this).data('method'));});insert('after');
});
