var event_method = window.addEventListener ? "addEventListener" : "attachEvent";
var message_event = event_method == "attachEvent" ? "onmessage" : "message";
var iframe = document.createElement('iframe');
var options, iframeOnload, types, distinct_id;
var appType = {types: []}

var checkout_url = "http://localhost:1337";
//var checkout_url = "http://54.179.132.181:8081";

appType.setTypes = function(types) {
    return appType.types = types
};
appType.isDesktop = function() {
    return appType.types.indexOf("desktop") !== -1
};
appType.isTablet = function() {
    return appType.types.indexOf("tablet") !== -1
};
appType.isMobile = function() {
    return appType.types.indexOf("mobile") !== -1
};
appType.isiOSNative = function() {
    return appType.types.indexOf("iOSNative") !== -1
};
appType.toString = function() {
    return appType.types.join(",")
};

uaVersionFn = function(re) {
  return function() {
    var uaMatch;
    uaMatch = helpers.userAgent.match(re);
    return uaMatch && parseInt(uaMatch[1])
  }
};
delurkWinPhone = function(fn) {
    return function() {
        return fn() && !helpers.isWindowsPhone()
    }
};

var helpers = {
    userAgent: window.navigator.userAgent,
    escape: function(value) {
      return value && ("" + value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;")
    },
    iOSVersion: uaVersionFn(/(?:iPhone OS |iPad; CPU OS )(\d+)_\d+/),
    iOSMinorVersion: uaVersionFn(/(?:iPhone OS |iPad; CPU OS )\d+_(\d+)/),
    iOSBuildVersion: uaVersionFn(/(?:iPhone OS |iPad; CPU OS )\d+_\d+_(\d+)/),
    androidWebkitVersion: uaVersionFn(/Mozilla\/5\.0.*Android.*AppleWebKit\/([\d]+)/),
    androidVersion: uaVersionFn(/Android (\d+)\.\d+/),
    firefoxVersion: uaVersionFn(/Firefox\/(\d+)\.\d+/),
    chromeVersion: uaVersionFn(/Chrome\/(\d+)\.\d+/),
    safariVersion: uaVersionFn(/Version\/(\d+)\.\d+ Safari/),
    iOSChromeVersion: uaVersionFn(/CriOS\/(\d+)\.\d+/),
    iOSNativeVersion: uaVersionFn(/Stripe\/(\d+)\.\d+/),
    ieVersion: uaVersionFn(/(?:MSIE |Trident\/.*rv:)(\d{1,2})\./),
    isiOSChrome: function() {
        return /CriOS/.test(helpers.userAgent)
    },
    isiOSWebView: function() {
        return /(iPhone|iPod|iPad).*AppleWebKit((?!.*Safari)|(.*\([^)]*like[^)]*Safari[^)]*\)))/i.test(helpers.userAgent)
    },
    isiOS: delurkWinPhone(function() {
        return /(iPhone|iPad|iPod)/i.test(helpers.userAgent)
    }),
    isiOSNative: function() {
        return this.isiOS() && this.iOSNativeVersion() >= 3
    },
    isiPad: function() {
        return /(iPad)/i.test(helpers.userAgent)
    },
    isMac: delurkWinPhone(function() {
        return /mac/i.test(helpers.userAgent)
    }),
    isWindowsPhone: function() {
        return /(Windows\sPhone|IEMobile)/i.test(helpers.userAgent)
    },
    isWindowsOS: function() {
        return /(Windows NT \d\.\d)/i.test(helpers.userAgent)
    },
    isIE: function() {
        return /(MSIE ([0-9]{1,}[\.0-9]{0,})|Trident\/)/i.test(helpers.userAgent)
    },
    isChrome: function() {
        return "chrome" in window
    },
    isSafari: delurkWinPhone(function() {
        var userAgent;
        userAgent = helpers.userAgent;
        return /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)
    }),
    isFirefox: delurkWinPhone(function() {
        return helpers.firefoxVersion() != null
    }),
    isAndroidBrowser: function() {
        var version;
        version = helpers.androidWebkitVersion();
        return version && version < 537
    },
    isAndroidChrome: function() {
        var version;
        version = helpers.androidWebkitVersion();
        return version && version >= 537
    },
    isAndroidDevice: delurkWinPhone(function() {
        return /Android/.test(helpers.userAgent)
    }),
    isAndroidWebView: function() {
        return helpers.isAndroidChrome() && /Version\/\d+\.\d+/.test(helpers.userAgent)
    },
    isNativeWebContainer: function() {
        return window.cordova != null || /GSA\/\d+\.\d+/.test(helpers.userAgent)
    },
    isSupportedMobileOS: function() {
        return helpers.isiOS() || helpers.isAndroidDevice();
    },
    isAndroidWebapp: function() {
        var metaTag;
        if (!helpers.isAndroidChrome()) {
            return false
        }
        metaTag = document.getElementsByName("apple-mobile-web-app-capable")[0] || document.getElementsByName("mobile-web-app-capable")[0];
        return metaTag && metaTag.content === "yes"
    },
    isInsideFrame: function() {
        return window.top !== window.self
    },
    isSmallScreen: function() {
        return Math.min(window.screen.availHeight, window.screen.availWidth) <= 640 || /FakeCheckoutMobile/.test(helpers.userAgent)
    },
    pad: function(number, width, padding) {
        var leading;
        if (width == null) {
            width = 2
        }
        if (padding == null) {
            padding = "0"
        }
        number = number + "";
        if (number.length > width) {
            return number
        }
        leading = new Array(width - number.length + 1).join(padding);
        return leading + number
    }
};

appBootstrap = function() {
  types = [];
  if (helpers.isSupportedMobileOS()) {
    if (helpers.isiOSNative()) {
      types.push("iOSNative")
    }
    if (!helpers.isiPad() && !helpers.isInsideFrame()) {
      types.push("mobile")
    } else {
      types.push("tablet");
      if (helpers.isSmallScreen()) {
        types.push("smallScreen")
      }
    }
  } else {
    types.push("desktop")
  }
  appType.setTypes(types);
};

guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

var Magpie = Magpie || {

  configure: function(options) {
    appBootstrap();
    distinct_id = guid();
    this.options = options;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.seamless = true;
    iframe.frameBorder = 0;
    iframe.setAttribute("id", "magpie-checkout-app");
    iframe.setAttribute("style", "position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;display:none;");
    iframe.setAttribute("name", Date.now());
    iframe.setAttribute("src", checkout_url);
    
     window[event_method](message_event,function(e) {
      var key = e.message ? "message" : "data";
      var data = e[key];
      if (data == "close_iframe") {
        $("iframe#magpie-checkout-app").hide();
      } else if (data == "open_iframe") {
        $("iframe#magpie-checkout-app").show();
      } else {
        options.token(data);
      }
    }, false);
  },

  open: function(options) {
    var obj = this.concat(this.options, options);
    if (appType.isMobile()) {
      obj.session_type = "window";
      obj = {details: obj};
      obj.distinct_id = distinct_id;

      $.post(checkout_url + "/v1/sessions", obj)
      .done(function( data ) {
        window.open(checkout_url + "/checkout.html?distinct_id=" + distinct_id, "_magpie");
      });
    } else {
      obj.session_type = "iframe";
      document.body.appendChild(iframe);
      if (iframeOnload) {
        iframe.contentWindow.postMessage(JSON.stringify(obj), "*");
      }
      iframe.onload = function() {
        iframeOnload = true;
        iframe.contentWindow.postMessage(JSON.stringify(obj), "*");
      }
    }
  },

  close: function() {
    $(".overlayView").hide();
    $(".stripeInFrame .overlayView").removeClass("active");
    $(".stripeInFrame .overlayView").addClass("unactive");
    console.log("postmessage");
    window.parent.postMessage("close_iframe", "*");
  },

  concat: function(o1, o2) {
    for (var key in o2) { o1[key] = o2[key]; }
    return o1;
  },

};

