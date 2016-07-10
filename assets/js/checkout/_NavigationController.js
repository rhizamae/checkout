var NavigationController, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    },
    __hasProp = {}.hasOwnProperty,
    __extendsNavigationController = function(child, parent) {
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

// _ = require("vendor/lodash");
NavigationController = (function(_super) {
    __extendsNavigationController(NavigationController, _super);

    function NavigationController() {
        this.triggerStackSizeChanged = __bind(this.triggerStackSizeChanged, this);
        this.setCurrent = __bind(this.setCurrent, this);
        this.handleError = __bind(this.handleError, this);
        this.stackSize = __bind(this.stackSize, this);
        this.pop = __bind(this.pop, this);
        this.push = __bind(this.push, this);
        NavigationController.__super__.constructor.apply(this, arguments);
        this.stack = []
    }
    NavigationController.prototype.push = function(controller, options) {
        var instanceOfWhiteList, white, _i, _len, _ref;
        if (options == null) {
            options = {}
        }
        if (controller === this.current) {
            if (options.clearStack) {
                if (typeof controller.resetViews === "function") {
                    controller.resetViews()
                }
            }
            return
        }
        if (this.WHITELIST != null) {
            instanceOfWhiteList = false;
            _ref = this.WHITELIST;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                white = _ref[_i];
                if (controller instanceof white) {
                    instanceOfWhiteList = true;
                    break
                }
            }
            if (!instanceOfWhiteList) {
                this.trigger("push", controller, options);
                return
            }
        }
        if (options.clearStack) {
            this.stack = []
        }
        this.setCurrent(controller, $.extend({}, options, {
            type: "push"
        }));
        this.stack.push({
            controller: controller
        });
        this.triggerStackSizeChanged();
        return controller.on("stackSizeChanged", this.triggerStackSizeChanged)
    };
    NavigationController.prototype.pop = function() {
        var stacked, _base;
        if (this.current != null && (typeof(_base = this.current).stackSize === "function" ? _base.stackSize() : void 0) > 1) {
            this.current.pop()
        } else {
            if (this.stack.length < 2) {
                return false
            }
            stacked = this.stack.pop();
            stacked.controller.off("stackSizeChanged", this.triggerStackSizeChanged);
            this.setCurrent(this.stack[this.stack.length - 1].controller, {
                type: "pop"
            });
            this.triggerStackSizeChanged()
        }
        return true
    };
    NavigationController.prototype.stackSize = function() {
        var size, stacked, _i, _len, _ref;
        size = 0;
        _ref = this.stack;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            stacked = _ref[_i];
            size += stacked.controller.stackSize()
        }
        return size
    };
    NavigationController.prototype.handleError = function(err) {
        var controller, i, result, _i, _ref;
        if (this.stack.length < 1) {
            return false
        }
        for (i = _i = _ref = this.stack.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
            controller = this.stack[i].controller;
            result = controller.handleError(err);
            if (result) {
                while (this.current !== controller && this.stackSize() > 1) {
                    this.pop()
                }
                return true
            }
        }
        return false
    };
    NavigationController.prototype.setCurrent = function(controller, options) {
        if (options == null) {
            options = {}
        }
        if (this.current != null) {
            this.current.off("push", this.push);
            this.current.off("pop", this.pop)
        }
        NavigationController.__super__.setCurrent.apply(this, arguments);
        this.current.on("push", this.push);
        return this.current.on("pop", this.pop)
    };
    NavigationController.prototype.bubblingEvents = function() {
        return _.without(NavigationController.__super__.bubblingEvents.apply(this, arguments), "push")
    };
    NavigationController.prototype.triggerStackSizeChanged = function() {
        return this.trigger("stackSizeChanged")
    };
    return NavigationController
})(StepController);

