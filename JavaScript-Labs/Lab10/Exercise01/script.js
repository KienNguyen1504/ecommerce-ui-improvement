$(function(){
 const t=$('<div class="lab-message" aria-live="polite"></div>').text('jQuery '+$.fn.jquery+' đã tải thành công từ file cục bộ.');
 $('.container').first().before(t);
 console.log('jQuery:', $.fn.jquery);
});
