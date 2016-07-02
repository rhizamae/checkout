var error_messages = {
  required: 'Required.'
};

function validateForm(form) {
  var valid = true;
  //$(form + " input[type=text], "+ form + " input[type=password], " + form + " select, " + form + " textarea").each(function() {
  $(form + " input, "+ form + " select, " + form + " textarea").each(function() {
    if ($(this).css('display') != 'none' && $(this).css('visibility') != 'hidden' && !$(this).hasClass('optional')) {
      if (!$.trim($(this).val()).length) {
        setInvalid(this, true);
        valid = valid && false;
      } else {
        setInvalid(this, false);
      }
    }
  });
  return valid;
}

function setInvalid(element, invalid) {
  if (invalid) {
    $(element).addClass("invalid");
  } else {
    $(element).removeClass("invalid");
  }
  // this.$el.toggleClass("invalid", invalid);
  // this.$input.toggleClass("invalid", invalid);
  // return this.setErrorIconVisible(invalid)
}