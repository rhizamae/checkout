var errorIconContainer = {}, errorIcon = {};

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

setErrorIconContainer = function(id) {
  errorIconContainer[id] = undefined;
  errorIcon[id] = undefined;

  if (appType.isMobile()) {
      errorIconContainer[id] = $("<div>").addClass("errorIconContainer");
      errorIcon[id] = new Svg($.extend({}, svgPaths.getIcon("error", appType), {
          color: "red",
          className: "errorIcon"
      }));
      errorIcon[id].$el.transform({
          opacity: 0,
          translateX: 20
      });
      return errorIconContainer[id].append(errorIcon[id].$el)
  } else {
    return false;
  }
}

setErrorIconVisible = function(visible, element, id) {
  this.$el = element;
  setErrorIconContainer(id);
  if (!errorIcon[id]) {
      return;
  }
  if (visible) {
      if (this.$el.find(".errorIconContainer").length > 0) {
        return;
      }
      this.$el.append(errorIconContainer[id]);
      errorIcon[id].redraw();
      // console.log("setErrorIconVisible-----------setErrorIconVisible");
      // console.log(errorIcon[id]);
      return errorIcon[id].$el.gfx({
          opacity: 1,
          translateX: -7
      }, {
          duration: 250,
          easing: "ease-in-out",
          complete: function(_this) {
              return function() {
                  return errorIcon[id].$el.addClass("animated")
              }
          }(this)
      })
  } else {
      //console.log("not visibleeee1");
      errorIcon[id].$el.removeClass("animated");
      return errorIcon[id].$el.gfx({
          opacity: 0,
          translateX: 20
      }, {
          duration: 250,
          easing: "ease-in-out",
          complete: function(_this) {
              // console.log("setErrorIconVisible-----------");
              // console.log(errorIcon[id]);
              return function() {
                  return $("#" + id).parent(".input").find(".errorIconContainer").detach();
              }
          }(this)
      });
  }
};

onInputValueDidChange = function(element, visible) {
  // console.log("onInputValueDidChange-----");
  // console.log($(element).parent(".input"));
  // console.log($(element).attr("id"));
  setErrorIconVisible(visible, $(element).parent(".input"), $(element).attr("id"));
  // if (this.popover) {
  //     popoverManager.closePopover(this.popover);
  //     return this.popover = null
  // }
  return true;
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
        valid = valid && !invalid;
        setInvalid(this, invalid);
      }
    }
  });
  if (!valid) shake(); 
  return valid;
}

function setInvalid(element, invalid) {
  //console.log("validateeeeee");
  if (invalid) {
    $(element).addClass("invalid");
    $(element).parent(".input").addClass("invalid");
    setErrorIconVisible(invalid, $(element).parent(".input"), $(element).attr("id"));
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

var validation = {
  validateEmail: function(email) {
    return /^.+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

