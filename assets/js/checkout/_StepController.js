var StepController, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    },
    __hasProp = {}.hasOwnProperty,
    __extendsStepController = function(child, parent) {
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
    },
    __slice = [].slice;
// Controller = require("lib/controller");
StepController = (function(_super) {
    __extendsStepController(StepController, _super);

    function StepController() {
        this.setCurrent = __bind(this.setCurrent, this);
        this.data = __bind(this.data, this);
        this.pop = __bind(this.pop, this);
        this.stackSize = __bind(this.stackSize, this);
        this.handleError = __bind(this.handleError, this);
        this.focus = __bind(this.focus, this);
        this.submit = __bind(this.submit, this);
        this.cancel = __bind(this.cancel, this);
        this.footerView = __bind(this.footerView, this);
        this.buttons = __bind(this.buttons, this);
        var e, _base, _fn, _i, _len, _ref;
        StepController.__super__.constructor.apply(this, arguments);
        this.bubblingEventFns = {};
        _ref = this.bubblingEvents();
        _fn = function(_this) {
            return function(e) {
                var fn;
                return _this.bubblingEventFns[e] = fn = function() {
                    var args;
                    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                    return _this.trigger.apply(_this, [e].concat(__slice.call(args)))
                }
            }
        }(this);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
            _fn(e)
        }
        if ((_base = this.options).data == null) {
            _base.data = {}
        }
    }
    StepController.prototype.buttons = function() {
        var _ref, _ref1;
        return (_ref = this.current) != null ? (_ref1 = _ref.buttons) != null ? _ref1.apply(this, arguments) : void 0 : void 0
    };
    StepController.prototype.footerView = function() {
        var _ref, _ref1;
        return (_ref = this.current) != null ? (_ref1 = _ref.footerView) != null ? _ref1.apply(this, arguments) : void 0 : void 0
    };
    StepController.prototype.cancel = function() {
        var _ref, _ref1, _ref2;
        return (_ref = (_ref1 = this.current) != null ? (_ref2 = _ref1.cancel) != null ? _ref2.apply(this, arguments) : void 0 : void 0) != null ? _ref : false
    };
    StepController.prototype.submit = function() {
        var _ref, _ref1;
        return (_ref = this.current) != null ? (_ref1 = _ref.submit) != null ? _ref1.apply(this, arguments) : void 0 : void 0
    };
    StepController.prototype.focus = function() {
        var _ref, _ref1, _ref2;
        return (_ref = (_ref1 = this.current) != null ? (_ref2 = _ref1.focus) != null ? _ref2.apply(this, arguments) : void 0 : void 0) != null ? _ref : false
    };
    StepController.prototype.handleError = function() {
        var _ref, _ref1, _ref2;
        return (_ref = (_ref1 = this.current) != null ? (_ref2 = _ref1.handleError) != null ? _ref2.apply(this, arguments) : void 0 : void 0) != null ? _ref : false
    };
    StepController.prototype.stackSize = function() {
        var _ref;
        return ((_ref = this.current) != null ? _ref.stackSize() : void 0) || 1
    };
    StepController.prototype.pop = function() {
        var _ref, _ref1;
        return (_ref = (_ref1 = this.current) != null ? _ref1.pop() : void 0) != null ? _ref : false
    };
    StepController.prototype.data = function(data) {
        data = $.extend({}, this.options.data, data);
        return data
    };
    StepController.prototype.setCurrent = function(controller, options) {
        var e, fn, old, _base, _base1, _ref, _ref1, _results;
        if (options == null) {
            options = {}
        }
        if (this.current != null) {
            _ref = this.bubblingEventFns;
            for (e in _ref) {
                fn = _ref[e];
                this.current.off(e, fn)
            }
            if (typeof(_base = this.current).willDisappear === "function") {
                _base.willDisappear()
            }
        }
        old = this.current;
        this.current = controller;
        this.trigger("currentChanged", $.extend({}, options, {
            old: old
        }));
        this.trigger("buttonsChanged", {
            type: options.type
        });
        this.trigger("footerViewChanged");
        this.trigger("stackSizeChanged");
        if (typeof(_base1 = this.current).willAppear === "function") {
            _base1.willAppear()
        }
        _ref1 = this.bubblingEventFns;
        _results = [];
        for (e in _ref1) {
            fn = _ref1[e];
            _results.push(this.current.on(e, fn))
        }
        return _results
    };
    StepController.prototype.bubblingEvents = function() {
        return ["push", "pop", "submit", "success", "invalid", "error", "buttonsChanged", "displayLegalLinks", "stackSizeChanged", "token"]
    };
    return StepController
})(Controller);

