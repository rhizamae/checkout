var CardExpiresInput, Input, helpers, i18n, svgPaths, __bind = function(fn, me) {
      return function() {
          return fn.apply(me, arguments)
      }
  },
  __hasProp = {}.hasOwnProperty,
  __cardExpiresInputExtends = function(child, parent) {
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
// i18n = require("lib/i18n");

CardExpiresInput = (function(_super) {
  __cardExpiresInputExtends(CardExpiresInput, _super);
  CardExpiresInput.prototype.className = "cardExpiresInput";
  CardExpiresInput.prototype.inputId = "cc-exp";
  CardExpiresInput.prototype.inputAutocomplete = "cc-exp";
  CardExpiresInput.prototype.fieldName = "exp";

  function CardExpiresInput() {
      this.$input = $("#card-exp");
      this.$el = $(".cardExpiresInput");
      this.patchAutofill = __bind(this.patchAutofill, this);
      this.validateFormat = __bind(this.validateFormat, this);
      this.val = __bind(this.val, this);
      this.inputType = "tel";
      //CardExpiresInput.__super__.constructor.apply(this, arguments);
      //this.setIcon(svgPaths.getIcon("calendar", this.options.appType));
      // if (this.options.appType.isMobile()) {
      //     this.setLabel(i18n.loc("input.payment.cardExpiry.short")())
      // }
      // this.setPlaceholder(i18n.loc("input.payment.cardExpiry.placeholder")());
      this.$input.payment("formatCardExpiry");
      //this.patchAutofill()
  }
  CardExpiresInput.prototype.clear = function() {
      return this.$input.val("");
  };
  CardExpiresInput.prototype.setVal = function(val, options) {
      return this.$input.val(val);
  };
  CardExpiresInput.prototype.val = function() {
      return this.$input.payment("cardExpiryVal")
  };
  CardExpiresInput.prototype.validateFormat = function() {
      return $.payment.validateCardExpiry(this.val().month, this.val().year)
  };
  CardExpiresInput.prototype.patchAutofill = function() {
      var $option, hiddenFieldStyles, month, months, year, years, _i, _j, _len, _len1;
      months = [{
          name: "January",
          value: "01"
      }, {
          name: "February",
          value: "02"
      }, {
          name: "March",
          value: "03"
      }, {
          name: "April",
          value: "04"
      }, {
          name: "May",
          value: "05"
      }, {
          name: "June",
          value: "06"
      }, {
          name: "July",
          value: "07"
      }, {
          name: "August",
          value: "08"
      }, {
          name: "September",
          value: "09"
      }, {
          name: "October",
          value: "10"
      }, {
          name: "November",
          value: "11"
      }, {
          name: "December",
          value: "12"
      }];
      years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
      hiddenFieldStyles = {
          position: "absolute",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          height: "1px",
          width: "1px",
          margin: "-1px",
          padding: 0,
          border: 0
      };
      this.$expMonth = $("<select>");
      this.$expMonth.attr("id", "cc-exp-month");
      //helpers.setAutocomplete(this.$input.get(0), "off");
      //helpers.setAutocomplete(this.$expMonth.get(0), "cc-exp-month");
      this.$expMonth.attr("tabindex", "-1");
      this.$expMonth.css(hiddenFieldStyles);
      $option = $("<option>");
      $option.text("Month");
      this.$expMonth.append($option);
      for (_i = 0, _len = months.length; _i < _len; _i++) {
          month = months[_i];
          $option = $("<option>");
          $option.val(month.value);
          $option.text(month.name);
          this.$expMonth.append($option)
      }
      this.$expYear = $("<select>");
      this.$expYear.attr("id", "cc-exp-year");
      helpers.setAutocomplete(this.$expYear.get(0), "cc-exp-year");
      this.$expYear.attr("tabindex", "-1");
      this.$expYear.css(hiddenFieldStyles);
      $option = $("<option>");
      $option.text("Year");
      this.$expYear.append($option);
      for (_j = 0, _len1 = years.length; _j < _len1; _j++) {
          year = years[_j];
          $option = $("<option>");
          $option.val(year);
          $option.text(year);
          this.$expYear.append($option)
      }
      this.$el.append(this.$expYear);
      this.$el.append(this.$expMonth);
      return function(_this) {
          return function() {
              var check, lastValue;
              lastValue = "Month / Year";
              check = function() {
                  var value;
                  year = _this.$expYear.val();
                  month = _this.$expMonth.val();
                  if (year === "Year" || month === "Month") {
                      return
                  }
                  if (year.length === 4) {
                      year = year.slice(2)
                  }
                  value = month + " / " + year;
                  if (value !== lastValue) {
                      lastValue = value;
                      return setTimeout(function() {
                          return _this.$input.val(value)
                      }, 1e3)
                  }
              };
              setInterval(check, 1e3);
              _this.$expYear.on("change", check);
              return _this.$expMonth.on("change", check)
          }
      }(this)()
  };
  return CardExpiresInput;
})(Input);

$.payment.fn.formatCardExpiry = function() {
  //console.log("formatCardExpiry---123");
  this.on("keypress", restrictNumeric);
  this.on("keypress", restrictExpiry);
  this.on("keypress", formatExpiry);
  this.on("keypress", formatForwardSlashAndSpace);
  this.on("keypress", formatForwardExpiry);
  this.on("keydown", formatBackExpiry);
  this.on("change", reFormatExpiry);
  this.on("input", reFormatExpiry);
  // this.on("change", onInputValueDidChange);

  return this;
};

$.payment.fn.cardExpiryVal = function() {
  return $.payment.cardExpiryVal($(this).val())
};

$.payment.validateCardExpiry = function(month, year) {
  var currentTime, expiry, _ref;
  if (typeof month === "object" && "month" in month) {
      _ref = month, month = _ref.month, year = _ref.year
  }
  if (!(month && year)) {
      return false
  }
  month = $.trim(month);
  year = $.trim(year);
  if (!/^\d+$/.test(month)) {
      return false
  }
  if (!/^\d+$/.test(year)) {
      return false
  }
  if (!(1 <= month && month <= 12)) {
      return false
  }
  if (year.length === 2) {
      if (year < 70) {
          year = "20" + year
      } else {
          year = "19" + year
      }
  }
  if (year.length !== 4) {
      return false
  }
  expiry = new Date(year, month);
  currentTime = new Date;
  expiry.setMonth(expiry.getMonth() - 1);
  expiry.setMonth(expiry.getMonth() + 1, 1);
  return expiry > currentTime
};

$.payment.cardExpiryVal = function(value) {
  var month, prefix, year, _ref;
  _ref = value.split(/[\s\/]+/, 2), month = _ref[0], year = _ref[1];
  if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year
  }
  month = parseInt(month, 10);
  year = parseInt(year, 10);
  return {
      month: month,
      year: year
  }
};

$.payment.validateCardExpiry = function(month, year) {
  var currentTime, expiry, _ref;
  if (typeof month === "object" && "month" in month) {
      _ref = month, month = _ref.month, year = _ref.year
  }
  if (!(month && year)) {
      return false
  }
  month = $.trim(month);
  year = $.trim(year);
  if (!/^\d+$/.test(month)) {
      return false
  }
  if (!/^\d+$/.test(year)) {
      return false
  }
  if (!(1 <= month && month <= 12)) {
      return false
  }
  if (year.length === 2) {
      if (year < 70) {
          year = "20" + year
      } else {
          year = "19" + year
      }
  }
  if (year.length !== 4) {
      return false
  }
  expiry = new Date(year, month);
  currentTime = new Date;
  expiry.setMonth(expiry.getMonth() - 1);
  expiry.setMonth(expiry.getMonth() + 1, 1);
  return expiry > currentTime
};

$.payment.formatExpiry = function(expiry) {
  var mon, parts, sep, year;
  parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
  if (!parts) {
      return ""
  }
  mon = parts[1] || "";
  sep = parts[2] || "";
  year = parts[3] || "";
  if (year.length > 0) {
      sep = " / "
  } else if (sep === " /") {
      mon = mon.substring(0, 1);
      sep = ""
  } else if (mon.length === 2 || sep.length > 0) {
      sep = " / "
  } else if (mon.length === 1 && (mon !== "0" && mon !== "1")) {
      mon = "0" + mon;
      sep = " / "
  }
  return mon + sep + year
}

validateCardExpiry = function(month, year) {
  var currentTime, expiry, _ref;
  if (typeof month === "object" && "month" in month) {
      _ref = month, month = _ref.month, year = _ref.year
  }
  if (!(month && year)) {
      return false
  }
  month = $.trim(month);
  year = $.trim(year);
  if (!/^\d+$/.test(month)) {
      return false
  }
  if (!/^\d+$/.test(year)) {
      return false
  }
  if (!(1 <= month && month <= 12)) {
      return false
  }
  if (year.length === 2) {
      if (year < 70) {
          year = "20" + year
      } else {
          year = "19" + year
      }
  }
  if (year.length !== 4) {
      return false
  }
  expiry = new Date(year,month);
  currentTime = new Date;
  expiry.setMonth(expiry.getMonth() - 1);
  expiry.setMonth(expiry.getMonth() + 1, 1);
  return expiry > currentTime
};

restrictExpiry = function(e) {
  var $target, digit, value;
  $target = $(e.currentTarget);
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
      return;
  }
  if (hasTextSelected($target)) {
      return;
  }
  value = $target.val() + digit;
  value = value.replace(/\D/g, "");
  if (value.length > 6) {
      return false;
  }
};

reFormatExpiry = function(e) {
    onInputValueDidChange(this);
    var $target;
    $target = $(e.currentTarget);
    return setTimeout(function() {
        var value;
        value = $target.val();
        value = replaceFullWidthChars(value);
        
        value = $.payment.formatExpiry(value);
        //value = formatExpiry(e);
        return safeVal(value, $target)
    });
};

formatExpiry = function(e) {
  var $target, digit, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  $target = $(e.currentTarget);
  val = $target.val()+digit;
  if (/^\d$/.test(val) && (val !== "0" && val !== "1")) {
    e.preventDefault();
    return setTimeout(function() {
      return $target.val("0"+val+" / ");
    });
  } else if(/^\d\d$/.test(val)) {
    e.preventDefault();
    return setTimeout(function() {
      var m1, m2;
      m1 = parseInt(val[0], 10);
      m2 = parseInt(val[1], 10);
      if (m2 > 2 && m1 !== 0) {
        return $target.val("0" + m1 + " / " + m2)
      } else {
        return $target.val("" + val + " / ")
      }
    });
  }
};

formatForwardExpiry=function(e) {
  var $target, digit, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  $target = $(e.currentTarget);
  val = $target.val();
  if (/^\d\d$/.test(val)) {
    return $target.val(""+val+" / ");
  }
};

formatForwardSlashAndSpace=function(e) {
  var $target, val, which;
  which = String.fromCharCode(e.which);
  if (!(which==="/" || which === " ")) {
    return;
  }
  $target = $(e.currentTarget);
  val = $target.val();
  if (/^\d$/.test(val) && val !== "0") {
    return $target.val("0" + val + " / ")
  }
};

formatBackExpiry = function(e) {
  var $target, value;
  $target = $(e.currentTarget);
  value = $target.val();
  //console.log(e);
  if (e.which !== 8) {
    return;
  }
  if ($target.prop("selectionStart") != null && $target.prop("selectionStart") !== value.length) {
    return;
  }
  if (/\d\s\/\s$/.test(value)) {
    e.preventDefault();
    return setTimeout(function() {
      return $target.val(value.replace(/\d\s\/\s$/, ""))
    });
  }
};


