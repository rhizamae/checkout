$(document).ready(function() {

  $(".telInput input").val("+63");
  $(".telInput input").mobilePhoneNumber({
    defaultPrefix: "+63"
  });
  
  $(".checkbox-remember-me").on("click", function(e) {
    updateRememberCheckbox(true);
  });

  $(".cancelButton").on("click", function() {
    updateRememberCheckbox(true);
  });

  $(".logout").on("click", function() {
    logoutSession();
  });

  $(".back").on("click", function() {
    backVerifyCode();
  });

  $('.buttonsView').on("click", "#save-msisdn", function(e) {
    e.preventDefault();
    var valid = $("#msisdn").mobilePhoneNumber("validate");
    if (valid) {
      saveMobileNumber();
    } else {
      onInputValueDidChange("#msisdn", true);
    }
  });

});
