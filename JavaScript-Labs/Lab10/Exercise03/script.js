$(function(){
 $(':password').css('background-color','#fff0b6');
 $('form :nth-child(4n)').css('outline','2px solid #e6b15b');
 $('label:contains("word")').css('color','#263c65');
 const status=$('<p class="lab-message">Đã chọn :password, form :nth-child(4n) và label:contains("word").</p>');$('.form-box').after(status);
});
