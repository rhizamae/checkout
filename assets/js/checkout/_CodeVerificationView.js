var AuthorizingView, CarouselView, CodeInput, CodeVerificationView, ErrorView, INFO_ANIMATION_OPTIONS, SendingView, SentInfoView, SentView, VerifiedView, counter, i18n, __bind = function(fn, me) {
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
// View = require("lib/view");
// CodeInput = require("inner/views/form/codeInput");
// i18n = require("lib/i18n");
// counter = require("lib/counter");
// SendingView = require("inner/views/form/codeverification/sendingView");
// SentView = require("inner/views/form/codeverification/sentView");
// SentInfoView = require("inner/views/form/codeverification/sentInfoView");
// AuthorizingView = require("inner/views/form/codeverification/authorizingView");
// VerifiedView = require("inner/views/form/codeverification/verifiedView");
// ErrorView = require("inner/views/form/codeverification/errorView");
// CarouselView = require("inner/views/carouselView");
INFO_ANIMATION_OPTIONS = {
duration: 550,
easing: "cubic-bezier(.8,0,.2,1)"
};
CodeVerificationView = function(_super) {
__extends(CodeVerificationView, _super);
CodeVerificationView.prototype.className = "codeVerificationView";

function CodeVerificationView(options) {
    var _base, _base1, _base2, _base3;
    if (options == null) {
        options = {}
    }
    this.setCodeVerifiedSuccess = __bind(this.setCodeVerifiedSuccess, this);
    this.validate = __bind(this.validate, this);
    this.codeInputValueDidChange = __bind(this.codeInputValueDidChange, this);
    this.showCodeNotReceived = __bind(this.showCodeNotReceived, this);
    this.startCodeNotReceivedTimeout = __bind(this.startCodeNotReceivedTimeout, this);
    this.hideCodeNotReceived = __bind(this.hideCodeNotReceived, this);
    this.onDeliveryFailed = __bind(this.onDeliveryFailed, this);
    this.onDelivered = __bind(this.onDelivered, this);
    this.willEnter = __bind(this.willEnter, this);
    this.focus = __bind(this.focus, this);
    this.height = __bind(this.height, this);
    this.val = __bind(this.val, this);
    this.setPhoneNumber = __bind(this.setPhoneNumber, this);
    this.bindEvents = __bind(this.bindEvents, this);
    this.render = __bind(this.render, this);
    CodeVerificationView.__super__.constructor.call(this, options);
    (_base = this.options).phoneSvgRatio || (_base.phoneSvgRatio = 1);
    if ((_base1 = this.options).useSms == null) {
        _base1.useSms = true
    }
    if ((_base2 = this.options).notReceivedMessage == null) {
        _base2.notReceivedMessage = i18n.loc("codeVerification.fillManually")()
    }
    if ((_base3 = this.options).reason == null) {
        _base3.reason = i18n.loc("codeVerification.enterYourCodePaymentReason")()
    }
    this.render();
    this.bindEvents()
}
CodeVerificationView.prototype.render = function() {
    var $mainDescription;
    $mainDescription = $("<p>").addClass("mainDescription");
    $mainDescription.append($("<em>").html(i18n.loc("codeVerification.enterYourCode")({
        reason: "<span>" + this.options.reason + "</span>"
    })));
    this.codeInput = new CodeInput({
        appType: this.options.appType
    });
    this.carouselView = new CarouselView;
    this.$codeNotReceived = $('<a href="#" class="codeNotReceived"></a>');
    this.$codeNotReceived.css("opacity", 0);
    this.$codeNotReceived.hide();
    this.$el.append($mainDescription);
    this.addSubview(this.codeInput);
    this.addSubview(this.carouselView);
    return this.$el.append(this.$codeNotReceived)
};
CodeVerificationView.prototype.bindEvents = function() {
    this.codeInput.on("valueDidChange.checkout", this.codeInputValueDidChange);
    return this.$codeNotReceived.on("click", function(_this) {
        return function() {
            return _this.trigger("cancel.checkout")
        }
    }(this))
};
CodeVerificationView.prototype.setPhoneNumber = function(phone) {
    return this.options.phoneNumber = phone
};
CodeVerificationView.prototype.val = function() {
    return this.codeInput.val()
};
CodeVerificationView.prototype.height = function() {
    return this.$el.outerHeight(true) + (parseInt(this.$el.css("top"), 10) || 0)
};
CodeVerificationView.prototype.focus = function() {
    return this.codeInput.focus()
};
CodeVerificationView.prototype.willEnter = function() {
    var carouselViews;
    this.codeInput.clear();
    carouselViews = [new SendingView(this.options)];
    this.carouselView.animate(carouselViews);
    return this.startCodeNotReceivedTimeout()
};
CodeVerificationView.prototype.onDelivered = function() {
    var carouselViews;
    carouselViews = [];
    if (this.options.useSms) {
        carouselViews.push(new SentView(this.options))
    }
    carouselViews.push(new SentInfoView(this.options));
    this.carouselView.animate(carouselViews);
    this.startCodeNotReceivedTimeout();
    return counter.increment("verification.delivered")
};
CodeVerificationView.prototype.onDeliveryFailed = function() {
    var notReceivedQuestion;
    if (this.options.useSms) {
        notReceivedQuestion = i18n.loc("codeVerification.smsDeliveryFailed")()
    } else {
        notReceivedQuestion = i18n.loc("codeVerification.callFailed")()
    }
    return this.showCodeNotReceived(notReceivedQuestion, this.options.notReceivedMessage)
};
CodeVerificationView.prototype.hideCodeNotReceived = function(animate) {
    var complete;
    if (animate == null) {
        animate = true
    }
    if (this.codeNotReceivedTimeout) {
        clearTimeout(this.codeNotReceivedTimeout)
    }
    complete = function(_this) {
        return function() {
            return _this.$codeNotReceived.hide()
        }
    }(this);
    if (animate) {
        return this.$codeNotReceived.gfx({
            opacity: 0
        }, {
            duration: 250,
            easing: "ease-in-out",
            complete: complete
        })
    } else {
        this.$codeNotReceived.css({
            opacity: 0
        });
        return complete()
    }
};
CodeVerificationView.prototype.startCodeNotReceivedTimeout = function() {
    var duration, notReceivedQuestion;
    if (this.options.useSms) {
        notReceivedQuestion = i18n.loc("codeVerification.smsTimeout")();
        duration = 1e4
    } else {
        notReceivedQuestion = i18n.loc("codeVerification.callTimeout")();
        duration = 15e3
    }
    if (this.codeNotReceivedTimeout) {
        clearTimeout(this.codeNotReceivedTimeout)
    }
    return this.codeNotReceivedTimeout = setTimeout(function(_this) {
        return function() {
            return _this.showCodeNotReceived(notReceivedQuestion, _this.options.notReceivedMessage)
        }
    }(this), duration)
};
CodeVerificationView.prototype.showCodeNotReceived = function(line1, line2) {
    if (this.codeNotReceivedTimeout) {
        clearTimeout(this.codeNotReceivedTimeout)
    }
    this.$codeNotReceived.empty().append($("<span class='verificationStatusIndicator'>").text(line1)).append($("<br>")).append($("<span>").text(line2)).show().gfx({
        opacity: 1
    }, {
        duration: 250,
        easing: "ease-in-out"
    });
    return counter.increment("verification.code_not_received")
};
CodeVerificationView.prototype.setInfoState = function(newState) {};
CodeVerificationView.prototype.codeInputValueDidChange = function() {
    var code, _base;
    this.codeInput.setEditable(false);
    this.hideCodeNotReceived();
    this.carouselView.animate(new AuthorizingView(this.options));
    if (typeof(_base = document.activeElement).blur === "function") {
        _base.blur()
    }
    code = this.val();
    return this.trigger("valueDidChange.checkout", code)
};
CodeVerificationView.prototype.validate = function() {
    if (this.currentState === "verified") {
        return []
    } else {
        return [{
            input: this,
            name: "codeVerification",
            reason: "invalid"
        }]
    }
};
CodeVerificationView.prototype.setCodeVerifiedSuccess = function(success) {
    if (!success) {
        this.codeInput.setEditable(true);
        this.codeInput.clear();
        this.codeInput.shake();
        this.focus();
        return this.carouselView.animate([new ErrorView(this.options), new SentInfoView(this.options)])
    } else if (this.options.showSuccess) {
        this.carouselView.animate(new VerifiedView(this.options));
        return this.codeInput.disable()
    }
};
return CodeVerificationView
};

