var AccountLookup, accountLookupHelper, i18n, popoverManager, __bind = function(fn, me) {
  return function() {
    return fn.apply(me, arguments)
  }
};

AccountLookup = function() {
  function AccountLookup(options) {
      if (options == null) {
          options = {}
      }
      this.checkForExistingAccount = __bind(this.checkForExistingAccount, this);
      this.onEmailValueDidChange = __bind(this.onEmailValueDidChange, this);
      this.options = options;
      this.checkedAccounts = {};
      this.input = options.input;
      if (options.email != null) {
          this.checkForExistingAccount(options.email)
      }
      if (this.input != null) {
          this.input.on("valueDidChange", this.onEmailValueDidChange)
      }
  }
  AccountLookup.prototype.onEmailValueDidChange = function() {
      var email;
      if (!support.accounts()) {
          return
      }
      email = this.input.val();
      if (!validation.validateEmail(email)) {
          this.input.setSpinnerVisibility(false);
          return
      }
      this.input.setSpinnerVisibility(true);
      this.currentEmailValue = email;
      if (this.emailLookupTimeout != null) {
          clearTimeout(this.emailLookupTimeout)
      }
      return this.emailLookupTimeout = setTimeout(function(_this) {
          return function() {
              return _this.checkForExistingAccount(email)
          }
      }(this), 250)
  };
  AccountLookup.prototype.checkForExistingAccount = function(email) {
      var accountLookup, merchantName, _ref;
      if (Account.sharedAccount() || !support.accounts() || this.checkedAccounts[email]) {
          if ((_ref = this.input) != null) {
              _ref.setSpinnerVisibility(false)
          }
          return
      }
      this.checkedAccounts[email] = true;
      merchantName = this.options.name;
      accountLookup = Account.lookup(email, merchantName);
      accountLookup.fail(function(_this) {
          return function() {
              var _ref1;
              return (_ref1 = _this.input) != null ? _ref1.setSpinnerVisibility(false) : void 0
          }
      }(this));
      return accountLookup.done(function(_this) {
          return function(account) {
              var _base, _ref1;
              if (_this.currentEmailValue != null && email !== _this.currentEmailValue) {
                  return
              }
              if ((_ref1 = _this.input) != null) {
                  _ref1.setSpinnerVisibility(false)
              }
              if (!account) {
                  return
              }
              if (typeof(_base = _this.options).callback === "function") {
                  _base.callback(account)
              }
              return tracker.track.authorizeAccount()
          }
      }(this))
  };
  return AccountLookup
}();

accountLookupHelper = {};
  accountLookupHelper.observe = function(options) {
      if (options == null) {
          options = {}
      }
      return new AccountLookup($.extend({}, options, {}, {
          callback: function(account) {
              var popover, str;
              if (options.input == null || options.input.isFocused() || !$("input:focus").val() || appType.isMobile()) {
                  return Account.setAuthorizingAccount(account)
              } else {
                  str = i18n.loc("auth.manualLogin")({
                      link: '<a href="#">' + i18n.loc("auth.manualLogin.link")() + "</a>"
                  });
                  popover = popoverManager.openPopover(options.input, str);
                  return popover != null ? popover.on("linkDidClick", function() {
                      Account.setAuthorizingAccount(account);
                      return popoverManager.closePopover(popover)
                  }) : void 0
              }
          }
      }))
  };

            

