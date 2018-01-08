$(document).ready(function(){
  var card = $('.flip-card');

  var active = function(){
    $(this).toggleClass('flipped');
  };  
  
  card.click(active);
});