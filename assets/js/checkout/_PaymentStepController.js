var Account, AlipayNavigationController, BitcoinStepController, CardStepController, ContentSwitcher, EmailInput, LayoutView, PaymentStepController, SegmentedControl, SeparatorLineView, StepController, accountLookupHelper, i18n, popoverManager, support, _, __bind = function(fn, me) {
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
// StepController = require("inner/controllers/stepController");
// CardStepController = require("inner/controllers/cardStepController");
// AlipayNavigationController = require("inner/controllers/alipayNavigationController");
// BitcoinStepController = require("inner/controllers/bitcoinStepController");
// LayoutView = require("inner/views/layoutView");
// SegmentedControl = require("inner/views/controls/segmentedControl");
// EmailInput = require("inner/views/inputs/emailInput");
// SeparatorLineView = require("inner/views/separatorLineView");
// ContentSwitcher = require("inner/views/contentSwitcher");
// Account = require("lib/account");
// accountLookupHelper = require("lib/accountLookupHelper");
// support = require("lib/support");
// i18n = require("lib/i18n");
// popoverManager = require("inner/lib/popoverManager");
// _ = require("vendor/lodash");
PaymentStepController = (function(_super) {
    __extends(PaymentStepController, _super);
    PaymentStepController.prototype.WHITELIST = [];

    function PaymentStepController() {
        this.onScrollToView = __bind(this.onScrollToView, this);
        this.onSelectedIndexDidChange = __bind(this.onSelectedIndexDidChange, this);
        this.onWillSelectIndex = __bind(this.onWillSelectIndex, this);
        this.onSharedAccountChanged = __bind(this.onSharedAccountChanged, this);
        this.onToken = __bind(this.onToken, this);
        this.onCurrentChanged = __bind(this.onCurrentChanged, this);
        this.setUsesAccount = __bind(this.setUsesAccount, this);
        this.isEmailEnabled = __bind(this.isEmailEnabled, this);
        this.emailVal = __bind(this.emailVal, this);
        this.validate = __bind(this.validate, this);
        this.data = __bind(this.data, this);
        this.setFormDisabled = __bind(this.setFormDisabled, this);
        this.focus = __bind(this.focus, this);
        this.submit = __bind(this.submit, this);
        this.bindEvents = __bind(this.bindEvents, this);
        this.resetViews = __bind(this.resetViews, this);
        this.initViews = __bind(this.initViews, this);
        PaymentStepController.__super__.constructor.apply(this, arguments);
        this.view = new LayoutView($.extend({}, {
            className: "paymentView"
        }, this.options));
        this.methods = [{
            label: i18n.loc("paymentMethods.card")(),
            type: "card",
            controller: new CardStepController(this.options)
        }];
        if (this.options.alipay) {
            this.methods.push({
                label: i18n.loc("paymentMethods.alipay")(),
                type: "alipay",
                controller: new AlipayNavigationController(this.options)
            })
        }
        if (this.options.bitcoin) {
            this.methods.push({
                label: i18n.loc("paymentMethods.bitcoin")(),
                type: "bitcoin",
                controller: new BitcoinStepController(this.options)
            })
        }
        this.initViews();
        this.bindEvents();
        this.setUsesAccount(Account.sharedAccount());
        this.setCurrent(this.methods[0].controller);
        accountLookupHelper.observe({
            input: this.emailInput,
            email: this.options.email,
            name: this.options.name
        })
    }
    PaymentStepController.prototype.initViews = function() {
        var method, _i, _len, _ref, _results;
        if (!this.options.shouldHideEmailInput) {
            this.emailInput = new EmailInput({
                color: this.options.color,
                email: this.options.email,
                appType: this.options.appType
            });
            this.view.addSubview(this.emailInput);
            if (this.options.appType.isMobile() && this.methods.length <= 1) {
                this.emailInputSeparatorLine = new SeparatorLineView;
                this.view.addSubview(this.emailInputSeparatorLine)
            }
        }
        if (this.methods.length > 1) {
            this.methodsControl = new SegmentedControl({
                items: this.methods,
                style: SegmentedControl.styles.SMALL,
                className: "paymentMethodsSegmentedControl"
            });
            this.view.addSubview(this.methodsControl)
        }
        this.contentSwitcher = new ContentSwitcher;
        this.view.addSubview(this.contentSwitcher);
        _ref = this.methods;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            method = _ref[_i];
            _results.push(this.contentSwitcher.addSubview(method.controller.view))
        }
        return _results
    };
    PaymentStepController.prototype.resetViews = function() {
        var _ref;
        return (_ref = this.methodsControl) != null ? _ref.selectIndex(0) : void 0
    };
    PaymentStepController.prototype.bindEvents = function() {
        var method, _fn, _i, _len, _ref, _ref1, _ref2;
        _ref = this.methods;
        _fn = function(_this) {
            return function(method) {
                method.controller.on("scrollToView", _this.onScrollToView);
                return method.controller.on("token", function(token, controller) {
                    return _this.onToken(token, controller, method)
                })
            }
        }(this);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            method = _ref[_i];
            _fn(method)
        }
        this.on("currentChanged", this.onCurrentChanged);
        Account.on("sharedAccountChanged", this.onSharedAccountChanged);
        if ((_ref1 = this.methodsControl) != null) {
            _ref1.on("willSelectIndex", this.onWillSelectIndex)
        }
        return (_ref2 = this.methodsControl) != null ? _ref2.on("selectedIndexDidChange", this.onSelectedIndexDidChange) : void 0
    };
    PaymentStepController.prototype.submit = function(options) {
        if (options == null) {
            options = {}
        }
        options.invalid = (options.invalid || []).concat(this.validate());
        options.data = this.data(options.data);
        return PaymentStepController.__super__.submit.call(this, options)
    };
    PaymentStepController.prototype.focus = function() {
        if (this.isEmailEnabled()) {
            if (support.automaticallyGiveFocus()) {
                return this.emailInput.focus()
            }
        } else {
            return PaymentStepController.__super__.focus.apply(this, arguments)
        }
    };
    PaymentStepController.prototype.setFormDisabled = function(disabled) {
        PaymentStepController.__super__.setFormDisabled.apply(this, arguments);
        return this.emailInput.setDisabled(disabled)
    };
    PaymentStepController.prototype.data = function() {
        var data, _ref;
        data = PaymentStepController.__super__.data.apply(this, arguments);
        if (data.email == null) {
            data.email = this.emailVal()
        }
        if (data.pastedFields == null) {
            data.pastedFields = []
        }
        if ((_ref = this.emailInput) != null ? _ref.pasted : void 0) {
            data.pastedFields.push("email")
        }
        return data
    };
    PaymentStepController.prototype.bubblingEvents = function() {
        return _.without(PaymentStepController.__super__.bubblingEvents.apply(this, arguments), "token")
    };
    PaymentStepController.prototype.validate = function() {
        var invalid;
        invalid = [];
        if (this.isEmailEnabled()) {
            invalid = invalid.concat(this.emailInput.validate())
        }
        return invalid
    };
    PaymentStepController.prototype.emailVal = function() {
        var _ref;
        if (this.isEmailEnabled()) {
            return this.emailInput.val()
        } else {
            return this.options.email || ((_ref = Account.sharedAccount()) != null ? _ref.email : void 0)
        }
    };
    PaymentStepController.prototype.isEmailEnabled = function() {
        return this.emailInput != null && this.view.isSubviewVisible(this.emailInput)
    };
    PaymentStepController.prototype.setUsesAccount = function(account, options) {
        var visible;
        if (options == null) {
            options = {}
        }
        if (this.emailInput != null) {
            visible = !account && !this.options.emailBar;
            this.view.setSubviewAsVisible(this.emailInput, visible);
            if (this.emailInputSeparatorLine != null) {
                return this.view.setSubviewAsVisible(this.emailInputSeparatorLine, visible)
            }
        }
    };
    PaymentStepController.prototype.onCurrentChanged = function() {
        return this.contentSwitcher.setSelectedSubview(this.current.view, {
            complete: function(_this) {
                return function() {
                    if (support.automaticallyGiveFocus()) {
                        return _this.current.focus()
                    }
                }
            }(this)
        })
    };
    PaymentStepController.prototype.onToken = function(token, controller, method) {
        var _ref;
        this.trigger("token", token, controller);
        return (_ref = this.methodsControl) != null ? _ref.setSelectedIndex(this.methods.indexOf(method)) : void 0
    };
    PaymentStepController.prototype.onSharedAccountChanged = function(account) {
        return this.setUsesAccount(account)
    };
    PaymentStepController.prototype.onWillSelectIndex = function(evt) {
        var controller, invalid, promise;
        if (this.isLoading) {
            evt.fail();
            return
        }
        controller = this.methods[evt.index].controller;
        if (typeof controller.loadOptions === "function" ? controller.loadOptions().validate : void 0) {
            invalid = this.validate();
            if (invalid.length > 0) {
                if (support.automaticallyGiveFocus()) {
                    this.emailInput.focus()
                }
                this.emailInput.openPopover(i18n.loc("input.email.invalid")());
                this.trigger("invalid", invalid);
                evt.fail();
                return
            }
        }
        popoverManager.closePopover(this.popover);
        this.popover = null;
        if (controller.load == null) {
            return
        }
        this.isLoading = true;
        evt.showLoading();
        promise = controller.load({
            data: this.data(this.options.data)
        });
        promise.done(evt.select);
        promise.fail(function(_this) {
            return function(message) {
                evt.fail();
                if (message != null) {
                    return _this.popover = popoverManager.openPopover(_this.methodsControl, message)
                }
            }
        }(this));
        return promise.always(function(_this) {
            return function() {
                return _this.isLoading = false
            }
        }(this))
    };
    PaymentStepController.prototype.onSelectedIndexDidChange = function(newIndex) {
        return this.setCurrent(this.methods[newIndex].controller)
    };
    PaymentStepController.prototype.onScrollToView = function(toView, viewsToHide) {
        if (viewsToHide == null) {
            viewsToHide = []
        }
        return this.view.scrollTo(toView, viewsToHide)
    };
    return PaymentStepController;
})(StepController);

