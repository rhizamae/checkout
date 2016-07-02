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