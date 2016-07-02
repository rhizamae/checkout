$(document).ready(function() {
  
  $("#card-exp").payment('formatCardExpiry');
  $("#cc-csc").payment('formatCardCVC');
  $("#card-number").payment('formatCardNumber');

});