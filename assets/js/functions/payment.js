$(document).ready(function() {

 
  // var cardPaymentView = new CardPaymentView();

  //$("#card-exp").payment('formatCardExpiry');
  //$("#cc-csc").payment('formatCardCVC');
  //$("#card-number").payment('formatCardNumber');

  $(".telInput input").mobilePhoneNumber();
  $(".telInput input").mobilePhoneNumber("country");

  $(".telInput input").mobilePhoneNumber({
      defaultPrefix: "+63"
  });

  $(".telInput input").val("+63");

  $(".checkbox-remember-me").on("click", function(e) {
    $(this).toggleClass("checked");
    //setExpandedVisible(true);
    setRememberMeDetails($(this).hasClass("checked"));
  });

  $(".logout").on("click", function() {
    accountLogout();
    cardPaymentViewIntance.clear();
  });

  $(".back").on("click", function() {
    backVerifyCode();
  });

});
