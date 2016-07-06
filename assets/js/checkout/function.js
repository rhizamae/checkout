setSpinnerVisibility = function(visible) {
    if (this.spinnerVisible === visible) {
        return
    }
    this.spinnerVisible = visible;
    if (this.spinnerVisible) {
        this.$spinnerContainer.show();
        return this.spinner.startAnimating()
    } else {
        this.$spinnerContainer.hide();
        return this.spinner.stopAnimating()
    }
};

luhnCheck = function(num) {
  var digit, digits, odd, sum, _i, _len;
  odd = true;
  sum = 0;
  digits = (num + "").split("").reverse();
  for (_i = 0, _len = digits.length; _i < _len; _i++) {
      digit = digits[_i];
      digit = parseInt(digit, 10);
      if (odd = !odd) {
          digit *= 2
      }
      if (digit > 9) {
          digit -= 9
      }
      sum += digit
  }
  return sum % 10 === 0
};

restrictNumeric = function(e) {
  // console.log("------ restrict: " + e.which);
  var input;
  if(e.metaKey || e.ctrlKey) {
      return true
  }
  if(e.which === 32) {
      return false
  }
  if(e.which === 0) {
      return true
  }
  if(e.which < 33) {
      return true
  }
  input = String.fromCharCode(e.which);
  return!!/[\d\s]/.test(input)
};

patchAutofill = function(element) {
  $el = element;
  var $option, hiddenFieldStyles, month, months, year, years, _i, _j, _len, _len1;
  months = [ 
  { name: "January", value: "01"},{ name: "February", value: "02" },
  { name: "March", value: "03"}, { name: "April", value: "04"},
  { name: "May", value: "05"}, { name: "June", value: "06"},
  { name: "July", value: "07"}, { name: "August", value: "08"},
  { name: "September", value: "09"}, { name: "October", value: "10"},
  { name: "November", value: "11"}, { name: "December", value: "12" }
  ];
  years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  hiddenFieldStyles = {
      position: "absolute", overflow: "hidden", clip: "rect(0 0 0 0)", height: "1px", width: "1px", margin: "-1px", padding: 0, border: 0
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
  for ( _i = 0, _len = months.length; _i < _len; _i++) {
      month = months[_i];
      $option = $("<option>");
      $option.val(month.value);
      $option.text(month.name);
      this.$expMonth.append($option)
  }
  this.$expYear = $("<select>");
  this.$expYear.attr("id", "cc-exp-year");
  //helpers.setAutocomplete(this.$expYear.get(0), "cc-exp-year");
  this.$expYear.attr("tabindex", "-1");
  this.$expYear.css(hiddenFieldStyles);
  $option = $("<option>");
  $option.text("Year");
  this.$expYear.append($option);
  for ( _j = 0, _len1 = years.length; _j < _len1; _j++) {
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
                  return;
              }
              if (year.length === 4) {
                  year = year.slice(2)
              }
              value = month + " / " + year;
              //console.log("check value: " + value);
              if (value !== lastValue) {
                  lastValue = value;
                  return setTimeout(function() {
                      return _this.$input.val(value)
                  },1e3)
              }
          };
          setInterval(check, 1e3);
          _this.$expYear.on("change", check);
          return _this.$expMonth.on("change", check)
      }
  }(this)();
};

hasTextSelected = function($target) {
  var _ref;
  if ($target.prop("selectionStart") != null && $target.prop("selectionStart") !== $target.prop("selectionEnd")) {
    return true;
  }
  if ((typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? _ref.createRange : void 0 : void 0) != null) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
}

safeVal = function(value, $target) {
  var currPair, cursor, digit, error, last, prevPair;
  try {
    cursor = $target.prop("selectionStart");
  } catch (_error) {
    error = _error;
    cursor = null
  }
  last = $target.val();
  $target.val(value);
  
  if (cursor !== null && $target.is(":focus")) {
    if (cursor === last.length) {
      cursor = value.length;
    }
    if (last !== value) {
      prevPair = last.slice(cursor - 1, +cursor+1 || 9e9);
      currPair = value.slice(cursor - 1, +cursor+1 || 9e9);
      digit = value[cursor];
      if (/\d/.test(digit) && prevPair === "" + digit + " " && currPair === " " + digit) {
        cursor = cursor + 1;
      }
    }
    $target.prop("selectionStart", cursor);
    return $target.prop("selectionEnd", cursor);
  }
}

replaceFullWidthChars = function(str) {
  var chars, chr, fullWidth, halfWidth, idx, value, _i, _len;
  if (str == null) {
    str = "";
  }
  fullWidth="０１２３４５６７８９";
  halfWidth="0123456789";
  value = "";
  chars = str.split("");
  for (_i = 0, _len = chars.length; _i < _len; _i++) {
      chr = chars[_i];
      idx = fullWidth.indexOf(chr);
      if (idx > -1) {
          chr = halfWidth[idx];
      }
      value += chr;
  }
  return value;
};