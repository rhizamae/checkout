var CardCVCInput, __bind = function(fn, me) {
      return function() {
          return fn.apply(me, arguments)
      }
  },
  __hasProp = {}.hasOwnProperty,
  __cardCVCInputExtends = function(child, parent) {
      for (var key in parent) {
          if (__hasProp.call(parent, key)) child[key] = parent[key]
      }

      function ctor() {
          this.constructor = child
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor;
      child.__super__ = parent.prototype;
      return child
  };
// Input = require("inner/views/inputs/input");
// svgPaths = require("inner/lib/svgPaths");
// helpers = require("lib/helpers");
// cardUtils = require("lib/cardUtils");
// i18n = require("lib/i18n");

CardCVCInput = (function(_super) {
  __cardCVCInputExtends(CardCVCInput, _super);
  CardCVCInput.prototype.className = "cardCVCInput";
  CardCVCInput.prototype.inputId = "cc-csc";
  CardCVCInput.prototype.inputAutocomplete = "cc-csc";
  CardCVCInput.prototype.inputType = "tel";
  CardCVCInput.prototype.fieldName = "cvc";

  function CardCVCInput() {
      this.$input = $("#cc-csc");
      this.$el = $(".cardCVCInput");

      this.validateFormat = __bind(this.validateFormat, this);
      this.clear = __bind(this.clear, this);
      this.setVal = __bind(this.setVal, this);
      //CardCVCInput.__super__.constructor.apply(this, arguments);
      //this.setIcon(svgPaths.getIcon("lock", this.options.appType));
      //this.setLabel(i18n.loc("input.payment.cardCVC")());
      //this.setPlaceholder("123");
      this.$input.attr("maxlength", "4");
      //this.$input.payment("restrictNumeric");
      this.$input.payment("formatCardCVC");
  }
  CardCVCInput.prototype.setVal = function(val, options) {
      var toggleClass;
      if (options == null) {
          options = {}
      }
      //CardCVCInput.__super__.setVal.apply(this, arguments);
      this.$input.val(val);
      toggleClass = "three-dots";
      if (cardUtils.getCvcLength(options.type) === 4) {
          toggleClass = "four-dots"
      }
      toggleClass += " prefill";
      return this.$el.toggleClass(toggleClass, options.prefill)
  };
  CardCVCInput.prototype.clear = function() {
      //CardCVCInput.__super__.clear.apply(this, arguments);
      this.$input.val("");
      return this.$el.removeClass("prefill");
  };
  CardCVCInput.prototype.validateFormat = function() {
      return $.payment.validateCardCVC(this.val())
  };
  return CardCVCInput;
})(Input);

$.payment.fn.formatCardCVC = function() {
  this.on("keypress", restrictNumeric);
  this.on("keypress", restrictCVC);
  this.on("paste", reFormatCVC);
  this.on("change", reFormatCVC);
  this.on("input", reFormatCVC);
  return this;
};

$.payment.validateCardCVC = function(cvc, type) {
  var card, _ref;
  cvc = $.trim(cvc);
  if (!/^\d+$/.test(cvc)) {
      return false
  }
  card = cardFromType(type);
  if (card != null) {
      return _ref = cvc.length, __indexOf.call(card.cvcLength, _ref) >= 0
  } else {
      return cvc.length >= 3 && cvc.length <= 4
  }
};

restrictCVC = function(e) {
  var $target, digit, val;
  $target = $(e.currentTarget);
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected($target)) {
    return;
  }
  val = $target.val() + digit;
  return val.length <= 4;
};

reFormatCVC = function(e) {
  onInputValueDidChange(this);
  var $target;
  $target = $(e.currentTarget);
  return setTimeout(function() {
    var value;
    value = $target.val();
    value = replaceFullWidthChars(value);
    value = value.replace(/\D/g, "").slice(0, 4);
    return safeVal(value, $target);
  });
};

cardFromType = function(type) {
  var card, _i, _len;
  for (_i = 0, _len = cards.length; _i < _len; _i++) {
      card = cards[_i];
      if (card.type === type) {
          return card
      }
  }
};