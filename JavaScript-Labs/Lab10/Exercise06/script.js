$(function(){
 $('#btnFadeIn').on('click',()=>$('figure').fadeIn(550));
 $('#btnFadeOut').on('click',()=>$('figure').fadeOut(550));
 $('#btnFade').on('click',()=>$('figure').fadeToggle(450));
 $('#btnSlideUp').on('click',()=>$('figure').slideUp(650));
 $('#btnSlideDown').on('click',()=>$('figure').slideDown(650));
 $('#btnSlide').on('click',()=>$('figure').slideToggle(650));
});
