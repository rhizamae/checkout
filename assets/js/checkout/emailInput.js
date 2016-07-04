var emailDomains = ["gmail.com", "hotmail.com", "yahoo.com", "live.com", "aol.com", "hotmail.co.uk", "mail.ru", "naver.com", "me.com", "comcast.net", "outlook.com", "yandex.ru", "msn.com", "hotmail.fr", "yahoo.co.uk", "googlemail.com", "live.co.uk", "ymail.com", "mac.com", "icloud.com", "sbcglobal.net", "live.dk", "seznam.cz", "btinternet.com"];

// var EmailInput, Input, SvgSpinner, emailDomains, i18n, support, svgPaths, validation, variants, __bind = function(fn, me) {
//       return function() {
//           return fn.apply(me, arguments)
//       }
//   },
//   __hasProp = {}.hasOwnProperty,
//   __extends = function(child, parent) {
//       for (var key in parent) {
//           if (__hasProp.call(parent, key)) child[key] = parent[key]
//       }

//       function ctor() {
//           this.constructor = child
//       }
//       ctor.prototype = parent.prototype;
//       child.prototype = new ctor;
//       child.__super__ = parent.prototype;
//       return child
//   };
// Input = require("inner/views/inputs/input");
// svgPaths = require("inner/lib/svgPaths");
// SvgSpinner = require("inner/views/svg/svgSpinner");
// validation = require("lib/validation");
// i18n = require("lib/i18n");
// support = require("lib/support");
// emailDomains = require("inner/lib/emailDomains");
// variants = require("lib/variants");
// EmailInput = function(_super) {
//   __extends(EmailInput, _super);
//   EmailInput.prototype.className = "emailInput";
//   EmailInput.prototype.inputId = "email";
//   EmailInput.prototype.inputType = "email";
//   EmailInput.prototype.inputAutocomplete = "email";
//   EmailInput.prototype.fieldName = "email";

//   function EmailInput() {
//       this.setSpinnerVisibility = __bind(this.setSpinnerVisibility, this);
//       this.validateFormat = __bind(this.validateFormat, this);
//       this.render = __bind(this.render, this);
//       EmailInput.__super__.constructor.apply(this, arguments);
//       this.setIcon(svgPaths.getIcon("email", this.options.appType));
//       this.setLabel(i18n.loc("input.email")(), i18n.loc("input.email.abbr")());
//       this.setPlaceholder(i18n.loc("input.email.placeholder")());
//       if (this.options.email) {
//           this.val(this.options.email)
//       }
//   }
//   EmailInput.prototype.render = function() {
//       EmailInput.__super__.render.apply(this, arguments);
//       this.$spinnerContainer = $("<span>").addClass("spinnerContainer");
//       this.spinner = new SvgSpinner({
//           size: !this.options.appType.isTablet() ? 14 : 18,
//           color: "#000",
//           shadowColor: "#fff"
//       });
//       this.$spinnerContainer.hide();
//       this.$spinnerContainer.append(this.spinner.$el);
//       return this.$el.append(this.$spinnerContainer)
//   };
//   EmailInput.prototype.validateFormat = function() {
//       return validation.validateEmail(this.val())
//   };
//   EmailInput.prototype.setSpinnerVisibility = function(visible) {
//       if (this.spinnerVisible === visible) {
//           return
//       }
//       this.spinnerVisible = visible;
//       if (this.spinnerVisible) {
//           this.$spinnerContainer.show();
//           return this.spinner.startAnimating()
//       } else {
//           this.$spinnerContainer.hide();
//           return this.spinner.stopAnimating()
//       }
//   };
//   return EmailInput
// }(Input);
// module.exports = EmailInput

            