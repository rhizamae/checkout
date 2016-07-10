var Account, Controller, LoggedBarController, LoggedBarView, tracker, validation, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) {
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
// Controller = require("lib/controller");
// LoggedBarView = require("inner/views/loggedBarView");
// Account = require("lib/account");
// validation = require("lib/validation");
// tracker = require("lib/tracker");
LoggedBarController = (function(_super) {
    __extends(LoggedBarController, _super);

    function LoggedBarController() {
        this.onSharedAccountChanged = __bind(this.onSharedAccountChanged, this);
        this.onLogout = __bind(this.onLogout, this);
        this.updateVisibility = __bind(this.updateVisibility, this);
        this.isEmailPrefilled = __bind(this.isEmailPrefilled, this);
        this.bindEvents = __bind(this.bindEvents, this);
        LoggedBarController.__super__.constructor.apply(this, arguments);
        this.view = new LoggedBarView({
            appType: this.options.appType,
            color: this.options.color,
            alternate: !this.options.image || !this.options.name && !this.options.description ? "simple" : void 0
        });
        this.bindEvents();
        this.updateVisibility({
            animated: false
        })
    }
    LoggedBarController.prototype.bindEvents = function() {
        this.view.on("logout", this.onLogout);
        return Account.on("sharedAccountChanged", this.onSharedAccountChanged)
    };
    LoggedBarController.prototype.isEmailPrefilled = function() {
        return this.options.email && validation.validateEmail(this.options.email)
    };
    LoggedBarController.prototype.updateVisibility = function(options) {
        var _ref;
        if (options == null) {
            options = {}
        }
        if (options.animated == null) {
            options.animated = true
        }
        this.visible = true;
        if (this.isEmailPrefilled()) {
            this.view.setEmail(this.options.email)
        } else if (Account.sharedAccount() != null) {
            this.view.setEmail((_ref = Account.sharedAccount()) != null ? _ref.email : void 0)
        } else {
            this.visible = false
        }
        this.view.setLinkVisible(!this.isEmailPrefilled());
        return this.trigger("visibleChanged")
    };
    LoggedBarController.prototype.onLogout = function() {
        Account.logout();
        tracker.track.logout();
        return this.updateVisibility()
    };
    LoggedBarController.prototype.onSharedAccountChanged = function(account) {
        return this.updateVisibility()
    };
    return LoggedBarController
})(Controller);

            
