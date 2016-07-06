var error_messages = {
  required: 'Required.'
};

function validate() {
  if (!this.$input.val().length) {
    setInvalid(true);
    return [{
        input: this,
        name: this.fieldName,
        reason: "required"
    }]
  } else if (this.validateFormat != null && !this.validateFormat()) {
    setInvalid(true);
    return [{
        input: this,
        name: this.fieldName,
        reason: "format"
    }]
  } else {
    this.setInvalid(false);
    return [];
  }
};

function shake() {
  this.$el = $(".checkoutView");

  this.$el.removeClass("shake");
  return setTimeout(function(_this) {
      return function() {
          return _this.$el.addClass("shake")
      }
  }(this), 1)
}

function validateForm(form) {
  // TODO: Refactor
  var valid = true;
  var invalid = true;
  //$(form + " input[type=text], "+ form + " input[type=password], " + form + " select, " + form + " textarea").each(function() {
  $(form + " input, "+ form + " select, " + form + " textarea").each(function() {
    if ($(this).css('display') != 'none' && $(this).css('visibility') != 'hidden' && !$(this).hasClass('optional')) {
      invalid = false;
      if (!$.trim($(this).val()).length) {
        setInvalid(this, true);
        valid = valid && false;
      } else {  
        if ($(this).attr("id") == "email") {
          invalid = !validateEmail($(this).val());
        }
        if ($(this).attr("id") == "card-number") {
          invalid = !$.payment.validateCardNumber($(this).val());
        }
        if ($(this).attr("id") == "card-exp") {
          invalid = !$.payment.validateCardExpiry($(this).val().split("/")[0], $(this).val().split("/")[1]);
        }
        if ($(this).attr("id") == "cc-csc") {
          invalid = !$.payment.validateCardCVC($(this).val());
        }
        if ($(this).attr("id") == "msisdn" && $(".checkbox-remember-me").hasClass("checked")) {
          invalid = !$(this).mobilePhoneNumber("validate");
        }
        setInvalid(this, invalid);
      }
    }
  });
  if (!valid) shake(); 
  return valid;
}

function setInvalid(element, invalid) {
  if (invalid) {
    $(element).addClass("invalid");
    $(element).parent(".input").addClass("invalid");
  } else {
    $(element).removeClass("invalid");
    $(element).parent(".input").removeClass("invalid");
  }
  // this.$el.toggleClass("invalid", invalid);
  // this.$input.toggleClass("invalid", invalid);
  // return this.setErrorIconVisible(invalid)
}

function validateEmail(email) {
  return /^.+@[^\s@]+\.[^\s@]+$/.test(email);
}

