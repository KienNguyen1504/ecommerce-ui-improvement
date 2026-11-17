// Các phương thức trong Exercise 10.2 hoạt động trên DOM gốc của Lab 10.
$(function(){
 function apply(){
  $('#msgArea').val('My class is '+$('#msgArea').attr('class'));
  $('#pageTitle').html('New Title – jQuery');
  $('button').css('background-color','#c95a70');
  $('body').css('background-color','ivory');
  $('.center-icons').addClass('selected');
  $('#statusSelectors').text('Đã chạy #id, .val(), .attr(), .html(), .css() và .addClass().');
 }
 $('#rerunSelectors').on('click',apply);apply();
});
