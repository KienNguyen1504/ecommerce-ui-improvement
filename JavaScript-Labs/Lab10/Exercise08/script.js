$(function(){
 $('#commandLine button').on('click',function(){
  $('#box').stop(true,true).css({left:0,top:0,opacity:.8,height:'70px',width:'70px'})
   .animate({left:Math.min(495,Math.max(140,$('#box').parent().width()-90)),opacity:1,height:'50px'},550)
   .animate({top:'300px',opacity:.2},650).animate({height:'175px'},800);
 });
});
