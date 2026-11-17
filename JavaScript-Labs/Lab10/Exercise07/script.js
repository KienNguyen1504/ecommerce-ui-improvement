$(function(){
 $('figure img').on('mouseover',function(e){
  const src=$(this).attr('src'),alt=$(this).attr('alt')||'Ảnh du lịch';
  const larger=src.replace('/small/','/medium/');
  const preview=$('<div id="preview"></div>').append($('<img>').attr('src',larger).attr('alt',alt)).append($('<p></p>').text(alt));
  $('body').append(preview);$(this).addClass('gray');
  preview.css({top:Math.min(e.clientY+20,window.innerHeight-300)+'px',left:Math.min(e.clientX+24,window.innerWidth-350)+'px'}).fadeIn(350);
 }).on('mousemove',function(e){$('#preview').css({top:Math.max(8,Math.min(e.clientY+20,window.innerHeight-300))+'px',left:Math.max(8,Math.min(e.clientX+24,window.innerWidth-350))+'px'});})
 .on('mouseout',function(){$(this).removeClass('gray');$('#preview').remove();});
});
