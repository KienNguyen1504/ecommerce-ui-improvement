$(function(){
 $('.panel').on('mouseover',function(){$('#message').text('Mouse entered panel');})
 .on('mousemove',function(e){$('#message').text('Coordinates: '+e.pageX+', '+e.pageY);})
 .on('mouseout',function(){$('#message').text('Mouse left panel');})
 .on('click',function(){$('#message').text('You clicked in the panel');$('.panel').off('mousemove');});
});
