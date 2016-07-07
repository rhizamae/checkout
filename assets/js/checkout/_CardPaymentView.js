var CardCVCInput, CardExpiresInput, CardNumberInput, CardPaymentView, SeparatorLineView, View, ZipCodeInput, binRanges, helpers, i18n, popoverManager, support, variants, _, __bind = function(fn, me) {
    return function() {
        return fn.apply(me, arguments)
    }
},
__hasProp = {}.hasOwnProperty,
__extendsCardPaymentView = function(child, parent) {
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


// CardPaymentView = function(_super) {
    //console.log(_super);
    //__extendsCardPaymentView(CardPaymentView, _super);
    CardPaymentView.prototype.className = "cardPaymentView";
    CardPaymentView.editionStates = {
        NORMAL: "normal",
        DISABLED: "disabled",
        BEFORE_CHANGING: "before_changing",
        CHANGING: "changing"
    };
    //CardPaymentView();
    function CardPaymentView() {
        //this.onKeyUp = __bind(this.onKeyUp, this);
        // this.checkAppropriateZipCodeVisibility = __bind(this.checkAppropriateZipCodeVisibility, this);
        // this.hasChanged = __bind(this.hasChanged, this);
        this.valueFromCard = __bind(this.valueFromCard, this);
        // this.animatableViews = __bind(this.animatableViews, this);
        // this.setEditionState = __bind(this.setEditionState, this);
        // this.handleError = __bind(this.handleError, this);
        // this.clear = __bind(this.clear, this);
        this.setCard = __bind(this.setCard, this);
        // this.val = __bind(this.val, this);
        // this.validate = __bind(this.validate, this);
        // this.focus = __bind(this.focus, this);
        // this.bindEvents = __bind(this.bindEvents, this);
        // this.render = __bind(this.render, this);
        //CardPaymentView.__super__.constructor.apply(this, arguments);
        // if (this.options.zipCode) {
        //     binRanges.preload()
        // }
        this.render();
        //this.bindEvents()
    }

    CardPaymentView.prototype.render = function() {
        var view, zipCodePlaceholder, _i, _len, _ref;
        this.numberInput = new CardNumberInput();
        this.expiresInput = new CardExpiresInput();
        this.cvcInput = new CardCVCInput();
        this.views = [this.numberInput];
        this.views.push(this.expiresInput);
        this.views.push(this.cvcInput);
    };

    CardPaymentView.prototype.setCard = function(card) {
        this.card = card;
        this.numberInput.setVal(this.valueFromCard(this.numberInput, this.card), {
            prefill: true,
            type: this.card.type || this.card.brand
        });
        //console.log(this.valueFromCard(this.expiresInput, this.card));
        this.expiresInput.setVal(this.valueFromCard(this.expiresInput, this.card));
        return this.cvcInput.setVal(this.valueFromCard(this.cvcInput, this.card), {
            prefill: true,
            type: this.card.type || this.card.brand
        })
    };

    CardPaymentView.prototype.clear = function() {
        var input, _i, _len, _ref, _results;
        _ref = this.views;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            input = _ref[_i];
            _results.push(typeof input.clear === "function" ? input.clear() : void 0)
        }
        return _results;
    };

    CardPaymentView.prototype.valueFromCard = function(input, card) {
        if (input === this.numberInput) {
            return "" + card.last4.replace(/\ /g, "")
        } else if (input === this.expiresInput) {
            return "" + helpers.pad(card.exp_month, 2) + " / " + card.exp_year.toString().substring(2)
        } else if (input === this.cvcInput) {
            return "    "
        }
    };
//     return CardPaymentView;
// };


var helpers = {
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
    },
}