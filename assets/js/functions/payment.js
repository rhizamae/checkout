

$(document).ready(function() {
  
  $("#card-exp").payment('formatCardExpiry');
  $("#cc-csc").payment('formatCardCVC');
  $("#card-number").payment('formatCardNumber');

  
  // console.log(appType);
  // var tick = new Tick({
  //   appType: appType
  // });
  //setSuccess(true, tick);
});