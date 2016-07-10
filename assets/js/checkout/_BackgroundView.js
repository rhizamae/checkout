var BackgroundView, MAX_HEIGHT, __bind = function(fn, me) {
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
// easingCurves = require("inner/lib/easingCurves");
// fastdom = require("vendor/fastdom");
// support = require("lib/support");
MAX_HEIGHT = 900;
BackgroundView = (function(_super) {
    __extends(BackgroundView, _super);
    BackgroundView.prototype.className = "backgroundView";

    function BackgroundView(options) {
        this.$el = $(".backgroundView");
        this.options = options != null ? options : {};
        this.offset = __bind(this.offset, this);
        this.height = __bind(this.height, this);
        this.updateHeight = __bind(this.updateHeight, this);
        this.setHeight = __bind(this.setHeight, this);
        this.render = __bind(this.render, this);
        BackgroundView.__super__.constructor.apply(this, arguments);
        if (this.options.gradient) {
            this.$el.addClass("gradient")
        }
        this.render()
    }
    BackgroundView.prototype.render = function() {
        this.$top = $("<div>");
        this.$top.addClass("backgroundTop");
        this.$innerTop = $("<div>");
        this.$top.append(this.$innerTop);
        this.$bottom = $("<div>");
        this.$bottom.addClass("backgroundBottom");
        this.$innerBottom = $("<div>");
        this.$bottom.append(this.$innerBottom);
        this.$bottom.css("height", MAX_HEIGHT);
        this.$innerBottom.css("height", MAX_HEIGHT + 50);
        if (!support.transform()) {
            this.$el.css("position", "absolute")
        }
        this.$el.append(this.$top);
        return this.$el.append(this.$bottom)
    };
    BackgroundView.prototype.setHeight = function(height, animated, callback) {
        var offset, oldHeight;
        if (animated == null) {
            animated = false
        }
        if (callback == null) {
            callback = null
        }
        oldHeight = this._height;
        this._height = height;
        offset = support.transform() ? 0 : -this.offset();
        return fastdom.write(function(_this) {
            return function() {
                _this.$innerBottom.gfx({
                    translateY: _this._height - MAX_HEIGHT + offset + "px"
                }, {
                    duration: 400,
                    easing: easingCurves.BOUNCING,
                    animated: animated,
                    transformFallbackKeys: {
                        translateY: "top"
                    },
                    complete: function() {
                        _this.updateHeight();
                        return typeof callback === "function" ? callback() : void 0
                    }
                });
                if (!oldHeight || oldHeight < _this._height) {
                    _this.updateHeight();
                    return typeof callback === "function" ? callback() : void 0
                }
            }
        }(this))
    };
    BackgroundView.prototype.updateHeight = function() {
        return this.$el.css("height", this._height + this.offset())
    };
    BackgroundView.prototype.height = function() {
        return this._height
    };
    BackgroundView.prototype.offset = function() {
        if (this.options.appType.isTablet()) {
            return 10
        } else {
            return 230
        }
    };
    return BackgroundView;
})(View);

