$.payment.fn.formatCardExpiry = function() {
  this.on("keypress", restrictNumeric);
  this.on("keypress", restrictExpiry);
  this.on("keypress", formatExpiry);
  this.on("keypress", formatForwardSlashAndSpace);
  this.on("keypress", formatForwardExpiry);
  this.on("keydown", formatBackExpiry);
  this.on("change", reFormatExpiry);
  this.on("input", reFormatExpiry);
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
    var $target;
    $target = $(e.currentTarget);
    return setTimeout(function() {
        var value;
        value = $target.val();
        value = replaceFullWidthChars(value);
        
        value = $.payment.formatExpiry(value);
        //value = formatExpiry(e);
        //console.log("reFormatExpiry VALUE------------: " + value);
        return safeVal(value, $target)
    });
};

formatExpiry = function(e) {
  var $target, digit, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  //console.log("formatExpiry: "+ digit);
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


