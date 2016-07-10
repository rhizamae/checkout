var config, isEventNameExisting, mixpanel, stateParameters, trace, traceSerialize, track, tracker, __indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i
    }
    return -1
};
// uuid = require("lib/uuid");
// pixel = require("lib/pixel");
// base64 = require("vendor/base64");
// helpers = require("lib/helpers");
config = {
    enabled: false,
    tracingEnabled: false,
    eventNamePrefix: "checkout.",
    distinctId: uuid.generate(),
    mixpanelKey: null
};
stateParameters = {};
tracker = {};
tracker.setEnabled = function(enabled) {
    return config.enabled = enabled
};
tracker.setTracingEnabled = function(enabled) {
    return config.tracingEnabled = enabled
};
tracker.setDistinctID = function(value) {
    if (value) {
        return config.distinctId = value
    }
};
tracker.getDistinctID = function() {
    return config.distinctId
};
tracker.setMixpanelKey = function(mixpanelKey) {
    return config.mixpanelKey = mixpanelKey
};
tracker.track = {
    outerOpen: function(parameters) {
        var requiredKeys;
        requiredKeys = ["key"];
        return track("outer.open", parameters, requiredKeys, {
            appendStateParameters: false
        })
    },
    manhattanStatusSet: function(isEnabled) {
        return track("outer.manhattanStatus", {
            isEnabled: isEnabled
        })
    },
    viewport: function(viewport) {
        return track("outer.viewport", {
            viewport: viewport
        })
    },
    iOSWebViewType: function() {
        var type;
        type = helpers.getiOSWebViewType();
        if (type) {
            return track("inner.iOSWebViewType", {
                type: type
            })
        }
    },
    open: function(options) {
        var k, v;
        for (k in options) {
            v = options[k];
            stateParameters["option-" + k] = v
        }
        return track("open")
    },
    close: function(parameters) {
        return track("close", parameters, ["withToken"])
    },
    configSummary: function(parameters) {
        return track("config.summary", parameters, ["optchecker-origin", "optchecker-numErrors", "optchecker-numWarnings"])
    },
    configError: function(parameters) {
        return track("config.error", parameters, ["optchecker-origin", "optchecker-result"])
    },
    configWarning: function(parameters) {
        return track("config.warning", parameters, ["optchecker-origin", "optchecker-result"])
    },
    keyOverride: function(values) {
        return track("config.keyOverride", values, ["configure", "open"])
    },
    localeOverride: function(values) {
        return track("config.localeOverride", values, ["configure", "open"])
    },
    imageOverride: function(values) {
        return track("config.imageOverride", values, ["configure", "open"])
    },
    rememberMe: function(parameters) {
        return track("checkbox.rememberMe", parameters, ["checked"])
    },
    authorizeAccount: function() {
        return track("account.authorize")
    },
    login: function() {
        return track("account.authorize.success")
    },
    wrongVerificationCode: function() {
        return track("account.authorize.fail")
    },
    keepMeLoggedIn: function(parameters) {
        return track("checkbox.keepMeLoggedIn", parameters, ["checked"])
    },
    logout: function() {
        return track("account.logout")
    },
    submit: function() {
        return track("submit")
    },
    invalid: function(parameters) {
        if (parameters["err"] == null && parameters["fields"] == null) {
            throw new Error("Cannot track invalid because err or fields should be provided")
        }
        return track("invalid", parameters)
    },
    tokenError: function(msg) {
        return track("token.error", {
            message: msg,
            type: "exception"
        })
    },
    moreInfo: function() {
        return track("moreInfoLink.click")
    },
    accountCreateSuccess: function() {
        return track("account.create.success")
    },
    accountCreateFail: function() {
        return track("account.create.fail")
    },
    addressAutocompleteShow: function() {
        return track("addressAutoComplete.show")
    },
    addressAutocompleteResultSelected: function() {
        return track("addressAutocomplete.result.selected")
    },
    back: function(parameters) {
        return track("back", parameters, ["from_step", "to_step"])
    },
    token: function(parameters) {
        return track("token", parameters, ["stripe_token"])
    },
    i18nLocKeyMissing: function(key) {
        return track("i18n.loc.missingKey", {
            template_key: key
        })
    },
    i18nLocPartiallyReplacedTemplate: function(key, value) {
        return track("i18n.loc.partiallyReplacedTemplate", {
            template_key: key,
            template_value: value
        })
    },
    i18nFormatLocaleMissing: function(locale) {
        return track("i18n.format.localeMissing", {
            locale: locale
        })
    },
    phoneVerificationShow: function() {
        return track("phoneVerification.show")
    },
    phoneVerificationCreate: function(parameters) {
        return track("phoneVerification.create", parameters, ["use_sms"])
    },
    phoneVerificationAuthorize: function(parameters) {
        return track("fraudCodeVerification.authorize", parameters, ["valid"])
    },
    addressVerificationShow: function() {
        return track("addressVerification.show")
    },
    alert: function(parameters) {
        return track("alert", parameters)
    }
};
tracker.trace = {
    trigger: function(eventName, args) {
        var EXCLUDED_EVENTS;
        EXCLUDED_EVENTS = ["didResize", "viewAddedToDOM", "valueDidChange", "checkedDidChange", "keyUp", "keyDown", "keyPress", "keyInput", "click", "blur"];
        eventName = eventName.split(".");
        if (eventName[eventName.length - 1] === "checkout") {
            eventName.pop()
        }
        eventName = eventName.join(".");
        if (__indexOf.call(EXCLUDED_EVENTS, eventName) < 0) {
            if (this._triggerQueue == null) {
                this._triggerQueue = {}
            }
            this._triggerQueue[eventName] = traceSerialize(args);
            return this._triggerTimeout != null ? this._triggerTimeout : this._triggerTimeout = setTimeout(function(_this) {
                return function() {
                    var _ref;
                    _ref = _this._triggerQueue;
                    for (eventName in _ref) {
                        args = _ref[eventName];
                        trace("trigger." + eventName, {
                            args: args
                        })
                    }
                    _this._triggerQueue = {};
                    return _this._triggerTimeout = null
                }
            }(this), 0)
        }
    },
    rpcInvoke: function(method) {
        return trace("rpc.invoke." + method)
    },
    rpcPostMessage: function(method, args, id) {
        return trace("rpc.postMessage." + method, {
            id: id,
            args: traceSerialize(args)
        })
    }
};
tracker.state = {
    setUIType: function(type) {
        return stateParameters["st-ui-type"] = type
    },
    setUIIntegration: function(integration) {
        return stateParameters["st-ui-integration"] = integration
    },
    setAccountsEnabled: function(bool) {
        return stateParameters["st-accounts-enabled"] = bool
    },
    setRememberMeEnabled: function(bool) {
        return stateParameters["st-remember-me-enabled"] = bool
    },
    setRememberMeChecked: function(bool) {
        return stateParameters["st-remember-me-checked"] = bool
    },
    setAccountCreated: function(bool) {
        return stateParameters["st-account-created"] = bool
    },
    setLoggedIn: function(bool) {
        return stateParameters["st-logged-in"] = bool
    },
    setVariants: function(variants) {
        var k, v, _results;
        _results = [];
        for (k in variants) {
            v = variants[k];
            _results.push(stateParameters["st-variant-" + k] = v)
        }
        return _results
    },
    setPhoneVerificationShown: function(bool) {
        return stateParameters["st-phone-verification-shown"] = bool
    },
    setAddressVerificationShown: function(bool) {
        return stateParameters["st-address-verification-shown"] = bool
    },
    setAlipayShouldDisplay: function(bool) {
        return stateParameters["st-alipay-should-display"] = bool
    },
    setRequestedLocale: function(locale) {
        return stateParameters["st-locale"] = locale
    }
};
tracker.dontTrack = function(fn) {
    var enabled;
    enabled = config.enabled;
    config.enabled = false;
    fn();
    return config.enabled = enabled
};
isEventNameExisting = function(eventName) {
    var exists, k, v, _ref;
    exists = false;
    _ref = tracker.events;
    for (k in _ref) {
        v = _ref[k];
        if (v === eventName) {
            exists = true;
            break
        }
    }
    return exists
};
trace = function(eventName, parameters, requiredKeys, options) {
    if (parameters == null) {
        parameters = {}
    }
    if (requiredKeys == null) {
        requiredKeys = []
    }
    if (options == null) {
        options = {}
    }
    if (!config.tracingEnabled) {
        return
    }
    eventName = "trace." + eventName;
    options.excludeMixpanel = true;
    return track.apply(this, arguments)
};
track = function(eventName, parameters, requiredKeys, options) {
    var fullEventName, k, key, missingKeys, v, _i, _len;
    if (parameters == null) {
        parameters = {}
    }
    if (requiredKeys == null) {
        requiredKeys = []
    }
    if (options == null) {
        options = {}
    }
    if (!config.enabled) {
        return
    }
    missingKeys = function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = requiredKeys.length; _i < _len; _i++) {
            key = requiredKeys[_i];
            if (!(key in parameters)) {
                _results.push(key)
            }
        }
        return _results
    }();
    if (missingKeys.length > 0) {
        throw new Error("Missing required data (" + missingKeys.join(", ") + ") for tracking " + eventName + ".")
    }
    parameters.distinct_id = config.distinctId;
    parameters.eventId = uuid.generate();
    if (options.appendStateParameters == null) {
        options.appendStateParameters = true
    }
    if (options.appendStateParameters) {
        for (k in stateParameters) {
            v = stateParameters[k];
            parameters[k] = v
        }
    }
    parameters.h = screen.height;
    parameters.w = screen.width;
    for (v = _i = 0, _len = parameters.length; _i < _len; v = ++_i) {
        k = parameters[v];
        if (v instanceof Array) {
            v.sort()
        }
    }
    fullEventName = "" + config.eventNamePrefix + eventName;
    if (!options.excludeMixpanel) {
        mixpanel.track(fullEventName, parameters)
    }
    return pixel.track(fullEventName, parameters)
};
mixpanel = {};
mixpanel.track = function(eventName, options) {
    var dataStr, properties;
    if (options == null) {
        options = {}
    }
    if (!(typeof $ !== "undefined" && $ !== null && config.mixpanelKey != null)) {
        return
    }
    properties = $.extend({
        token: config.mixpanelKey,
        userAgent: window.navigator.userAgent
    }, options);
    delete properties["stripe_token"];
    dataStr = base64.encode(JSON.stringify({
        event: eventName,
        properties: properties
    }));
    return (new Image).src = "https://api.mixpanel.com/track/?ip=1&img=1&data=" + dataStr
};
traceSerialize = function(value) {
    var k, obj, v;
    if (value instanceof Array) {
        return JSON.stringify(function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = value.length; _i < _len; _i++) {
                v = value[_i];
                _results.push(traceSerialize(v))
            }
            return _results
        }())
    } else if (value != null && value.target != null && value.type != null) {
        return traceSerialize({
            type: value.type,
            target_id: value.target.id
        })
    } else if (value instanceof Object) {
        if (value.constructor === Object) {
            obj = {};
            for (k in value) {
                v = value[k];
                obj[k] = traceSerialize(v)
            }
            return JSON.stringify(obj)
        } else {
            return value.toString()
        }
    } else {
        return value
    }
};

