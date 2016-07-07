var CardNumberInput, Input, easingCurves, helpers, i18n, svgPaths, variants, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    },
    __hasProp = {}.hasOwnProperty,
    __cardNumberInputExtends = function(child, parent) {
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
// CardNumberInput = function(_super) {
//     __cardNumberInputExtends(CardNumberInput, _super);
    CardNumberInput.prototype.className = "cardNumberInput";
    CardNumberInput.prototype.inputId = "card-number";
    CardNumberInput.prototype.inputType = "tel";
    CardNumberInput.prototype.inputAutocomplete = "cc-number";
    CardNumberInput.prototype.fieldName = "number";

    function CardNumberInput() {
        this.$input = $("#card-number");
        this.$el = $(".cardNumberInput");
        this.validateFormat = __bind(this.validateFormat, this);
        this.onCardTypeChanged = __bind(this.onCardTypeChanged, this);
        this.setCardType = __bind(this.setCardType, this);
        this.clear = __bind(this.clear, this);
        this.setVal = __bind(this.setVal, this);
        this.bindEvents = __bind(this.bindEvents, this);
        
        //CardNumberInput.__super__.constructor.apply(this, arguments);
        
        //this.setIcon(svgPaths.getIcon("card", this.options.appType));
        // if (this.options.appType.isMobile()) {
        //     this.setLabel(i18n.loc("input.card")());
        //     this.setPlaceholder("â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢")
        // } else {
        //     this.setLabel(i18n.loc("input.payment.cardNumber")())
        // }
        this.$input.payment("formatCardNumber");
    }
    CardNumberInput.prototype.bindEvents = function() {
        CardNumberInput.__super__.bindEvents.apply(this, arguments);
        return this.$input.on("payment.cardType", this.onCardTypeChanged)
    };
    CardNumberInput.prototype.setVal = function(val, options) {
        var type;
        if (options == null) {
            options = {}
        }
        //CardNumberInput.__super__.setVal.apply(this, arguments);
        this.$input.val(val);
        if (options.type != null) {
            type = cardUtils.extractCardType(options.type);
            this.setCardType(type)
        }
        return this.$el.toggleClass("prefill", options.prefill)
    };
    CardNumberInput.prototype.clear = function() {
        //CardNumberInput.__super__.clear.apply(this, arguments);
        this.$input.val("");
        this.setCardType("unknown");
        return this.$el.removeClass("prefill");
    };
    CardNumberInput.prototype.setCardType = function(type, animated) {
        var $oldCard;
        if (animated == null) {
            animated = true
        }
        if (type === this.currentCardType) {
            return
        }
        this.currentCardType = type;
        if (this.$card) {
            $oldCard = this.$card;
            $oldCard.gfx({
                opacity: 0
            }, {
                duration: 250,
                easing: "ease-in-out",
                animated: animated,
                complete: function() {
                    return $oldCard.detach()
                }
            })
        }
        if (!cardUtils.extractCardType(type)) {
            this.$card = null;
            return
        }
        this.$card = $("<span>").addClass("card").addClass(type);
        this.$card.transform({
            opacity: 0,
            translateX: -35
        });
        this.$el.append(this.$card);
        this.$card.redraw();
        return this.$card.gfx({
            opacity: 1,
            translateX: 0
        }, {
            duration: 300,
            easing: easingCurves.LAZY_BOUNCE,
            animated: animated
        })
    };
    CardNumberInput.prototype.onCardTypeChanged = function(e, type) {
        return this.setCardType(type)
    };
    CardNumberInput.prototype.validateFormat = function() {
        return $.payment.validateCardNumber(this.val())
    };
//     return CardNumberInput()
// };

$.payment.validateCardNumber = function(num) {
  var card, _ref;
  num = (num + "").replace(/\s+|-/g, "");
  if (!/^\d+$/.test(num)) {
      return false
  }
  card = cardFromNumber(num);
  if (!card) {
      return false
  }
  return (_ref = num.length, __indexOf.call(card.length, _ref) >= 0) && (card.luhn === false || luhnCheck(num))
};

$.payment.formatCardNumber = function(num) {
  var card, groups, upperLength, _ref;
  num = num.replace(/\D/g, "");
  card = cardFromNumber(num);
  if (!card) {
    return num
  }
  upperLength = card.length[card.length.length - 1];
  num = num.slice(0, upperLength);
  if (card.format.global) {
    return (_ref = num.match(card.format)) != null ? _ref.join(" ") : void 0
  } else {
    groups = card.format.exec(num);
    if (groups == null) {
        return
    }
    groups.shift();
    groups = $.grep(groups, function(n) {
        return n
    });
    return groups.join(" ");
  }
};

$.payment.cardType = function(num) {
  var _ref;
  if (!num) {
    return null;
  }
  return ((_ref = cardFromNumber(num)) != null ? _ref.type : void 0) || null
};

cardNumberInputSetVal = function(val, options) {
  var type;
  if (options == null) {
      options = {}
  }
  //CardNumberInput.__super__.setVal.apply(this, arguments);
  if (options.type != null) {

      type = cardUtils.extractCardType(options.type);
      this.setCardType(type)
  }
  return this.$el.toggleClass("prefill", options.prefill)
};

cardFromNumber = function(num) {
  var card, p, pattern, _i, _j, _len, _len1, _ref;
  num = (num + "").replace(/\D/g, "");
  for (_i = 0, _len = cards.length; _i < _len; _i++) {
    card = cards[_i];
    _ref = card.patterns;
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      pattern = _ref[_j];
      p = pattern + "";
      if (num.substr(0, p.length) === p) {
        return card;
      }
    }
  }
};

restrictCardNumber = function(e) {
  var $target, card, digit, value;
  $target = $(e.currentTarget);
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return
  }
  if (hasTextSelected($target)) {
    return
  }
  value = ($target.val() + digit).replace(/\D/g, "");
  card = cardFromNumber(value);
  if (card) {
    return value.length <= card.length[card.length.length - 1]
  } else {
    return value.length <= 16
  }
};

reFormatNumeric = function(e) {
  var $target;
  $target = $(e.currentTarget);
  return setTimeout(function() {
      var value;
      value = $target.val();
      value = replaceFullWidthChars(value);
      value = value.replace(/\D/g, "");
      return safeVal(value, $target)
  })
};

formatCardNumber = function(e) {
  var $target, card, digit, length, re, upperLength, value;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
      return
  }
  $target = $(e.currentTarget);
  value = $target.val();
  card = cardFromNumber(value + digit);
  length = (value.replace(/\D/g, "") + digit).length;
  upperLength = 16;
  if (card) {
      upperLength = card.length[card.length.length - 1]
  }
  if (length >= upperLength) {
      return
  }
  if ($target.prop("selectionStart") != null && $target.prop("selectionStart") !== value.length) {
      return
  }
  if (card && card.type === "amex") {
      re = /^(\d{4}|\d{4}\s\d{6})$/
  } else {
      re = /(?:^|\s)(\d{4})$/
  }
  if (re.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
          return $target.val(value + " " + digit)
      })
  } else if (re.test(value + digit)) {
      e.preventDefault();
      return setTimeout(function() {
          return $target.val(value + digit + " ")
      })
  }
};

reFormatCardNumber = function(e) {
  var $target;
  $target = $(e.currentTarget);
  return setTimeout(function() {
    var value;
    value = $target.val();
    value = replaceFullWidthChars(value);
    value = $.payment.formatCardNumber(value);
    return safeVal(value, $target);
  });
};

formatBackCardNumber = function(e) {
  var $target, value;
  $target = $(e.currentTarget);
  value = $target.val();
  if (e.which !== 8) {
    return;
  }
  if ($target.prop("selectionStart") != null && $target.prop("selectionStart") !== value.length) {
    return;
  }
  if (/\d\s$/.test(value)) {
    e.preventDefault();
    return setTimeout(function() {
        return $target.val(value.replace(/\d\s$/, ""))
    });
  } else if (/\s\d?$/.test(value)) {
    e.preventDefault();
    return setTimeout(function() {
        return $target.val(value.replace(/\d$/, ""))
    });
  }
};

setCardType = function(e) {
  var $target, allTypes, card, cardType, val;
  $target = $(e.currentTarget);
  val = $target.val();
  cardType = $.payment.cardType(val) || "unknown";
  if (!$target.hasClass(cardType)) {
    allTypes = function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cards.length; _i < _len; _i++) {
        card = cards[_i];
        _results.push(card.type);
      }
      return _results;
    }();
    $target.removeClass("unknown");
    $target.removeClass(allTypes.join(" "));
    $target.addClass(cardType);
    $target.toggleClass("identified", cardType !== "unknown");

    setCardTypeLogo(cardType);
    return $target.trigger("payment.cardType", cardType);
  }
};

setCardTypeLogo = function(type, animated) {
    this.$el = $(".cardNumberInput");
    var $oldCard;

    if (animated == null) {
        animated = true
    }
    if (type === this.currentCardType) {
        return
    }
    this.currentCardType = type;

    if (this.$card) {
        $oldCard = this.$card;
        $oldCard.gfx({
            opacity: 0
        }, {
            duration: 250,
            easing: "ease-in-out",
            animated: animated,
            complete: function() {
                return $oldCard.detach()
            }
        })
    }
    if (!cardUtils.extractCardType(type)) {
        this.$card = null;
        return
    }
    this.$card = $("<span>").addClass("card").addClass(type);
    
    this.$card.transform({
        opacity: 0,
        translateX: -35
    });
    this.$el.append(this.$card);
    this.$card.redraw();
    return this.$card.gfx({
        opacity: 1,
        translateX: 0
    }, {
        duration: 300,
        easing: easingCurves.LAZY_BOUNCE,
        animated: animated
    })
};

easingCurves = {
  LAZY_BOUNCE: "cubic-bezier(.15,1.45,.55,1)",
  BOUNCING: "cubic-bezier(.41,1.34,.51,1.01)",
  HARD_BOUNCING: "cubic-bezier(.35,1.83,.62,1)",
  FLAG_EASING: "cubic-bezier(.455, .03, .515, .955)",
  CONTROLLER_EASING: "cubic-bezier(.52,0,.27,1.01)"
}

