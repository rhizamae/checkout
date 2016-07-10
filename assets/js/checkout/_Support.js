var accountsEnabled, persistenceEnabled, support, supportedBrowserForAccounts;

accountsEnabled = true;
supportedBrowserForAccounts = true;
if (helpers.iOSVersion() != null && helpers.iOSVersion() <= 5 || helpers.isAndroidBrowser()) {
  supportedBrowserForAccounts = false
}

support = {
  svg: function() {
      return !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
  },
  cookiesEnabled: function() {
      var cookieKey, value;
      try {
          cookieKey = "cookiesEnabled";
          value = "" + Math.random();
          $.cookie(cookieKey, value);
          return $.cookie(cookieKey) === value
      } catch (_error) {
          return false
      }
  }(),
  localStorageEnabled: function() {
      var e, value;
      try {
          if (!localStorage) {
              return false
          }
          value = "" + Math.random();
          localStorage.setItem("localStorageKey", value);
          return localStorage.getItem("localStorageKey") === value
      } catch (_error) {
          e = _error;
          return false
      }
  }(),
  disableAccounts: function() {
      return accountsEnabled = false
  },
  accounts: function() {
      return persistenceEnabled && accountsEnabled && supportedBrowserForAccounts
  },
  transitions: function() {
      return support.cssProperty("transition")
  },
  transform: function() {
      return support.cssProperty("transform")
  },
  cssProperty: cache.fn(function(property) {
      var k, prefix, prop, propArray, propertyName, _i, _j, _len, _len1, _ref;
      if (document.body.style[property] !== void 0) {
          return true
      }
      propArray = property.split("-");
      propertyName = "";
      for (_i = 0, _len = propArray.length; _i < _len; _i++) {
          prop = propArray[_i];
          propertyName += prop.substring(0, 1).toUpperCase() + prop.substring(1)
      }
      _ref = ["webkit", "Moz", "ms"];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          prefix = _ref[_j];
          k = prefix + propertyName;
          if (document.body.style[k] !== void 0) {
              return true
          }
      }
      return false
  }),
  prefixFor: cache.fn(function(property) {
      var k, prefix, prop, propArray, propertyName, _i, _j, _len, _len1, _ref;
      if (document.body.style[property] !== void 0) {
          return ""
      }
      propArray = property.split("-");
      propertyName = "";
      for (_i = 0, _len = propArray.length; _i < _len; _i++) {
          prop = propArray[_i];
          propertyName += prop.substring(0, 1).toUpperCase() + prop.substring(1)
      }
      _ref = ["webkit", "Moz", "ms"];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          prefix = _ref[_j];
          k = prefix + propertyName;
          if (document.body.style[k] !== void 0) {
              return prefix
          }
      }
      return ""
  })
};

persistenceEnabled = support.cookiesEnabled || support.localStorageEnabled;