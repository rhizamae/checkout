
var CheckoutController, i18n, __bind = function(fn, me) {
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

// NavigationController = require("inner/controllers/navigationController");
// AddressStepController = require("inner/controllers/addressStepController");
// PaymentStepController = require("inner/controllers/paymentStepController");
// LoggedBarController = require("inner/controllers/loggedBarController");
// AccountLookupStepController = require("inner/controllers/accountLookupStepController");
// CloseStepController = require("inner/controllers/closeStepController");
// OverlayView = require("inner/views/overlayView");
// CheckoutView = require("inner/views/checkoutView");
// LayoutView = require("inner/views/layoutView");
// HeaderView = require("inner/views/headerView");
// ButtonsView = require("inner/views/buttonsView");
// _ = require("vendor/lodash");
// Account = require("lib/account");
// support = require("lib/support");
// tracker = require("lib/tracker");
// validation = require("lib/validation");
// navigationAnimationHelper = require("inner/lib/animation/navigationAnimationHelper");
// rowsAnimationHelper = require("inner/lib/animation/rowsAnimationHelper");
// easingCurves = require("inner/lib/easingCurves");
// i18n = require("lib/i18n");
// popoverManager = require("inner/lib/popoverManager");

// CheckoutController = function(_super) {
//     __extends(CheckoutController, _super);

    function CheckoutController(options) {
        this.options = options;
        this.onDidClickCancel = __bind(this.onDidClickCancel, this);
        this.onAuthorizingAccountChanged = __bind(this.onAuthorizingAccountChanged, this);
        this.onSharedAccountChanged = __bind(this.onSharedAccountChanged, this);
        this.onLoggedBarVisibleChanged = __bind(this.onLoggedBarVisibleChanged, this);
        this.onEscape = __bind(this.onEscape, this);
        this.onBack = __bind(this.onBack, this);
        this.onClose = __bind(this.onClose, this);
        this.onDisplayLegalLinks = __bind(this.onDisplayLegalLinks, this);
        this.onFooterViewChanged = __bind(this.onFooterViewChanged, this);
        this.onButtonsChanged = __bind(this.onButtonsChanged, this);
        this.onSuccess = __bind(this.onSuccess, this);
        this.onError = __bind(this.onError, this);
        this.onInvalid = __bind(this.onInvalid, this);
        this.onSubmit = __bind(this.onSubmit, this);
        this.onCurrentChanged = __bind(this.onCurrentChanged, this);
        this.onStackSizeChanged = __bind(this.onStackSizeChanged, this);
        this.animationOptionsDelegate = __bind(this.animationOptionsDelegate, this);
        this.updateFooterView = __bind(this.updateFooterView, this);
        this.setButtonsVisible = __bind(this.setButtonsVisible, this);
        this.updateButtons = __bind(this.updateButtons, this);
        this.closed = __bind(this.closed, this);
        this.close = __bind(this.close, this);
        this.open = __bind(this.open, this);
        this.bindEvents = __bind(this.bindEvents, this);
        this.initViews = __bind(this.initViews, this);
        //CheckoutController.__super__.constructor.apply(this, arguments);
        this.options.shouldHideEmailInput = this.options.email && validation.validateEmail(this.options.email);
        // if (this.options.billingAddress || this.options.shippingAddress) {
        //     this.firstController = new AddressStepController(this.options)
        // } else {
        //     this.firstController = new PaymentStepController(this.options)
        // }
        // this.loggedBarController = new LoggedBarController(this.options);
        this.initViews();
        //this.bindEvents();
        //this.push(this.firstController)
    }
    CheckoutController.prototype.initViews = function() {
        this.view = new OverlayView(this.options);
        this.checkoutView = new CheckoutView(this.options);
        // console.log(this.checkoutView);
        // this.contentView = new LayoutView({
        //     className: "contentView",
        //     animationOptionsDelegate: this.animationOptionsDelegate
        // });
        // this.checkoutView.setContentView(this.contentView);
        // this.headerView = new HeaderView(this.options);
        // this.buttonsView = new ButtonsView(this.options);
        // this.view.addSubview(this.checkoutView);
        // this.contentView.addSubview(this.headerView);
        // this.contentView.setZIndexForSubview(this.headerView, 100);
        // this.contentView.addSubview(this.loggedBarController.view, this.loggedBarController.visible);
        // if (this.options.appType.isMobile()) {
        //     return this.checkoutView.addSubview(this.buttonsView)
        // } else {
        //     this.contentView.addSubview(this.buttonsView);
        //     return this.contentView.setZIndexForSubview(this.buttonsView, 100)
        //}
    };
    CheckoutController.prototype.bindEvents = function() {
        this.on("stackSizeChanged", this.onStackSizeChanged);
        this.on("currentChanged", this.onCurrentChanged);
        this.on("invalid", this.onInvalid);
        this.on("error", this.onError);
        this.on("success", this.onSuccess);
        this.on("buttonsChanged", this.onButtonsChanged);
        this.on("footerViewChanged", this.onFooterViewChanged);
        this.on("displayLegalLinks", this.onDisplayLegalLinks);
        this.on("submit", function(_this) {
            return function(options) {
                return _this.onSubmit($.extend({
                    pending: false
                }, options))
            }
        }(this));
        this.loggedBarController.on("visibleChanged", this.onLoggedBarVisibleChanged);
        this.checkoutView.on("escape", this.onEscape);
        this.checkoutView.on("submit", this.onSubmit);
        this.headerView.on("close", this.onClose);
        this.headerView.on("back", this.onBack);
        this.buttonsView.on("didClickCancel", this.onDidClickCancel);
        Account.on("sharedAccountChanged", this.onSharedAccountChanged);
        return Account.on("authorizingAccountChanged", this.onAuthorizingAccountChanged)
    };
    CheckoutController.prototype.open = function() {
        var buttonDelay, formDelay, formViews, loggedBarDelay, showButton, showLoggedBar, showPanel, showView, _ref, _ref1;
        showView = function(_this) {
            return function() {
                _this.view.show();
                return _this.headerView.show()
            }
        }(this);
        showPanel = function(_this) {
            return function() {
                _this.checkoutView.show();
                if (Account.sharedAccount() != null) {
                    return _this.trigger("displayLegalLinks")
                }
            }
        }(this);
        showLoggedBar = function(_this) {
            return function() {
                return _this.loggedBarController.view.show()
            }
        }(this);
        showButton = function(_this) {
            return function() {
                return _this.buttonsView.show({
                    initial: true
                })
            }
        }(this);
        if (this.options.appType.isMobile()) {
            formViews = ((_ref = this.current) != null ? (_ref1 = _ref.view) != null ? _ref1.animatableViews() : void 0 : void 0) || [];
            rowsAnimationHelper.hide(formViews);
            loggedBarDelay = this.loggedBarController.visible ? 500 : 0;
            formDelay = loggedBarDelay + 380;
            buttonDelay = formDelay + (formViews.length * 50 + 50);
            setTimeout(showView, 0);
            setTimeout(showPanel, 0);
            setTimeout(showLoggedBar, loggedBarDelay);
            setTimeout(function() {
                return rowsAnimationHelper.show(formViews)
            }, formDelay);
            return setTimeout(showButton, buttonDelay)
        } else {
            showView();
            showLoggedBar();
            showButton();
            return setTimeout(showPanel, 300)
        }
    };
    CheckoutController.prototype.close = function(options) {
        if (options == null) {
            options = {}
        }
        this.trigger("closing");
        return this.checkoutView.hide($.extend({}, options, {
            complete: function(_this) {
                return function() {
                    return _this.view.hide($.extend({}, options, {
                        complete: function() {
                            return _this.trigger("closed")
                        }
                    }))
                }
            }(this)
        }))
    };
    CheckoutController.prototype.closed = function() {
        if (this.options.appType.isMobile()) {
            return this.push(new CloseStepController(this.options), {
                clearStack: true
            })
        }
    };
    CheckoutController.prototype.updateButtons = function(options) {
        var button, buttons, k;
        if (options == null) {
            options = {}
        }
        buttons = this.buttons();
        this.setButtonsVisible(buttons != null);
        if (buttons != null) {
            for (k in buttons) {
                button = buttons[k];
                buttons[k] = $.extend({}, button, options)
            }
            return this.buttonsView.setButtons(buttons)
        }
    };
    CheckoutController.prototype.setButtonsVisible = function(visible) {
        if (this.options.appType.isMobile()) {
            if (visible) {
                return this.buttonsView.show()
            } else {
                return this.buttonsView.hide()
            }
        } else {
            return this.contentView.setSubviewAsVisible(this.buttonsView, visible)
        }
    };
    CheckoutController.prototype.updateFooterView = function() {
        var footerView;
        footerView = this.footerView();
        if (this.currentFooterView === footerView) {
            return
        }
        if (this.currentFooterView != null) {
            this.contentView.removeSubview(this.currentFooterView)
        }
        this.currentFooterView = footerView;
        if (this.currentFooterView != null) {
            this.contentView.addSubview(this.currentFooterView, false);
            return this.contentView.setSubviewAsVisible(this.currentFooterView, true)
        }
    };
    CheckoutController.prototype.setViewVisible = function(view, visible) {
        if (visible) {
            view.show()
        }
        return view.$el.gfx({
            opacity: visible ? 1 : 0
        }, {
            complete: function() {
                if (!visible) {
                    return view.hide()
                }
            }
        })
    };
    CheckoutController.prototype.animationOptionsDelegate = function(subview, state, toState, options) {
        if (options == null) {
            options = {}
        }
        if (subview === this.buttonsView) {
            options.duration = 400;
            options.easing = easingCurves.BOUNCING;
            if (state.y > toState.y) {
                options.delay = 200
            }
        }
        return options
    };
    CheckoutController.prototype.onStackSizeChanged = function() {
        return this.headerView.setBackButtonVisible(this.stackSize() > 1)
    };
    CheckoutController.prototype.onCurrentChanged = function(options) {
        var oldView, _base, _base1, _ref, _ref1;
        if (options == null) {
            options = {}
        }
        if (options.modal) {
            oldView = options.old.view;
            if (this.options.appType.isMobile()) {
                this.checkoutView.addSubview(this.current.view);
                if (typeof(_base = this.current).modalWillAppear === "function") {
                    _base.modalWillAppear()
                }
            } else {
                this.contentView.addSubviewOnTop(this.current.view, oldView);
                if (typeof(_base1 = this.current).modalWillAppear === "function") {
                    _base1.modalWillAppear()
                }
                this.setViewVisible(oldView, false)
            }
        } else if ((_ref = this.currentOptions) != null ? _ref.modal : void 0) {
            if (!this.options.appType.isMobile()) {
                this.setViewVisible(this.current.view, true)
            }
            if (options.old.modalWillDisappear != null) {
                options.old.modalWillDisappear(options.old.view.detach)
            } else {
                options.old.view.detach()
            }
        } else {
            if (options.old != null) {
                oldView = options.old.view;
                this.contentView.removeSubview(oldView, {
                    detach: false
                })
            }
            if (this.options.appType.isMobile()) {
                window.scrollTo(0, 0);
                if ((_ref1 = document.activeElement) != null) {
                    _ref1.blur()
                }
            }
            this.current.view.$el.transform({
                opacity: 0
            });
            this.contentView.insertSubviewBefore(this.current.view, this.buttonsView);
            if (options.old != null) {
                navigationAnimationHelper.animate(options.old.view, this.current.view, {
                    animated: true,
                    transition: "shortSlide",
                    duration: 300,
                    easing: "ease-in-out",
                    direction: options.type,
                    complete: function(_this) {
                        return function() {
                            options.old.view.parent().detach();
                            return _this.checkoutView.shown(_this.current.focus)
                        }
                    }(this)
                })
            } else {
                navigationAnimationHelper.animate(null, this.current.view, {
                    animated: false,
                    transition: "shortSlide",
                    complete: function(_this) {
                        return function() {
                            return _this.checkoutView.shown(_this.current.focus)
                        }
                    }(this)
                })
            }
        }
        return this.currentOptions = options
    };
    CheckoutController.prototype.onSubmit = function(options) {
        var _ref;
        if (options == null) {
            options = {}
        }
        if (options.pending == null) {
            options.pending = true
        }
        if (options.pending) {
            this.buttonsView.setPending(true)
        }
        if (this.popoverView) {
            popoverManager.closePopover(this.popoverView)
        }
        options.timeOpened = this.options.timeOpened;
        options.timeLoaded = this.options.timeLoaded;
        if ((_ref = document.activeElement) != null) {
            _ref.blur()
        }
        return this.submit(options)
    };
    CheckoutController.prototype.onInvalid = function(invalidFields) {
        var fields, _ref;
        if (invalidFields != null) {
            fields = _.map(invalidFields, function(invalidField) {
                var parts;
                parts = [];
                if (invalidField.name) {
                    parts.push(invalidField.name)
                }
                if (invalidField.reason) {
                    parts.push(invalidField.reason)
                }
                return parts.join(".")
            });
            tracker.track.invalid({
                fields: fields
            });
            if (invalidFields.length > 0 && support.automaticallyGiveFocus()) {
                if ((_ref = invalidFields[0].input) != null) {
                    if (typeof _ref.focus === "function") {
                        _ref.focus()
                    }
                }
            }
        }
        this.buttonsView.setPending(false);
        return this.checkoutView.shake()
    };
    CheckoutController.prototype.onError = function(err) {
        var message;
        tracker.track.invalid({
            err: err || "no_error_provided"
        });
        this.buttonsView.setPending(false);
        this.checkoutView.shake();
        if (!this.handleError(err || {}) && err != null) {
            message = err.message || i18n.loc("error.unexpected")();
            return this.popoverView = popoverManager.openPopover(this.buttonsView.$el, message)
        }
    };
    CheckoutController.prototype.onSuccess = function(token) {
        this.buttonsView.setSuccess(true);
        return this.close({
            success: true
        })
    };
    CheckoutController.prototype.onButtonsChanged = function(options) {
        if (options == null) {
            options = {}
        }
        this.buttonsView.setPending(false);
        return this.updateButtons({
            direction: options.type
        })
    };
    CheckoutController.prototype.onFooterViewChanged = function() {
        return this.updateFooterView()
    };
    CheckoutController.prototype.onDisplayLegalLinks = function(visible) {
        return this.checkoutView.setLegalLinksVisible(visible != null ? visible : true)
    };
    CheckoutController.prototype.onClose = function() {
        var _ref;
        if ((_ref = document.activeElement) != null) {
            _ref.blur()
        }
        return this.close()
    };
    CheckoutController.prototype.onBack = function() {
        return this.pop()
    };
    CheckoutController.prototype.onEscape = function() {
        if (!this.pop()) {
            return this.close()
        }
    };
    CheckoutController.prototype.onLoggedBarVisibleChanged = function() {
        this.contentView.setSubviewAsVisible(this.loggedBarController.view, this.loggedBarController.visible);
        if (!this.loggedBarController.visible) {
            return this.checkoutView.setLegalLinksVisible(false)
        }
    };
    CheckoutController.prototype.onSharedAccountChanged = function(account) {
        return this.push(this.firstController, {
            clearStack: true
        })
    };
    CheckoutController.prototype.onAuthorizingAccountChanged = function(account) {
        return this.push(new AccountLookupStepController($.extend({}, {
            account: account
        }, this.options)))
    };
    CheckoutController.prototype.onDidClickCancel = function() {
        return this.cancel()
    };
//     return CheckoutController
// }(NavigationController);