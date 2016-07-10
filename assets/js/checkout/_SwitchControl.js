var SwitchControl, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    },
    __hasProp = {}.hasOwnProperty,
    __extendsSwitchControl = function(child, parent) {
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
// helpers = require("lib/helpers");
SwitchControl = function(_super) {
    __extendsSwitchControl(SwitchControl, _super);
    SwitchControl.prototype.className = "switchControl";

    function SwitchControl() {
        this.switchTouchEnd = __bind(this.switchTouchEnd, this);
        this.switchTouchMove = __bind(this.switchTouchMove, this);
        this.switchTouchStart = __bind(this.switchTouchStart, this);
        this.setValue = __bind(this.setValue, this);
        this.setChecked = __bind(this.setChecked, this);
        this.setEnabled = __bind(this.setEnabled, this);
        this.invert = __bind(this.invert, this);
        this.render = __bind(this.render, this);
        SwitchControl.__super__.constructor.apply(this, arguments);
        this.checked = this.enabled = false;
        this.$trackingArea = $("<div>");
        this.$trackingArea.addClass("trackingArea");
        this.$inner = $("<div>").addClass("inner");
        this.$trackSpan = $("<span>");
        this.$trackSpan.addClass("track");
        this.$blueTrackSpan = $("<span>");
        this.$blueTrackSpan.addClass("blueTrack");
        this.$blueTrackSpan.append($('<span class="left">'));
        this.$blueRightTrack = $("<span>");
        this.$blueTrackSpan.append($('<span class="right">').append(this.$blueRightTrack));
        this.$switch = $("<span>");
        this.$switch.addClass("switch");
        this.$switch.append($("<span>").addClass("trackingArea"));
        this.render();
        if (helpers.isWindowsPhone()) {
            this.$switch.on("MSPointerDown", this.switchTouchStart);
            this.$switch.on("MSPointerMove", this.switchTouchMove);
            this.$switch.on("MSPointerUp", this.switchTouchEnd)
        }
        this.$switch.on("touchstart", this.switchTouchStart);
        this.$switch.on("touchmove", this.switchTouchMove);
        this.$switch.on("touchend", this.switchTouchEnd);
        this.switchTouchStartEvent = null;
        this.originalSwitchTranslateX = 0;
        this.moved = false
    }
    SwitchControl.prototype.render = function() {
        this.$inner.append(this.$trackSpan);
        this.$inner.append(this.$blueTrackSpan);
        this.$inner.append(this.$switch);
        this.$trackingArea.append(this.$inner);
        return this.$el.append(this.$trackingArea)
    };
    SwitchControl.prototype.height = function() {
        return 25
    };
    SwitchControl.prototype.invert = function() {
        return this.setEnabled(!this.enabled)
    };
    SwitchControl.prototype.setEnabled = function(enabled, eventArgs) {
        if (eventArgs == null) {
            eventArgs = {}
        }
        if (enabled === this.enabled) {
            return
        }
        this.checked = enabled;
        this.enabled = enabled;
        if (this.enabled) {
            this.setValue(1, true);
            this.originalSwitchTranslateX = 25
        } else {
            this.setValue(0, true);
            this.originalSwitchTranslateX = 0
        }
        return this.trigger("didChange", eventArgs)
    };
    SwitchControl.prototype.setChecked = function(checked) {
        return this.setEnabled(checked)
    };
    SwitchControl.prototype.setValue = function(value, animated) {
        var alphaOptions, options, switchTranslateX, trackTranslateX;
        if (animated == null) {
            animated = true
        }
        options = {
            animated: animated,
            duration: 200,
            easing: "ease-in-out"
        };
        alphaOptions = {
            animated: animated,
            duration: 50,
            easing: "ease-in-out"
        };
        switchTranslateX = value * 25;
        trackTranslateX = (1 - value) * -25;
        if (helpers.isWindowsPhone()) {
            this.$switch.css({
                left: 1 + switchTranslateX
            });
            this.$blueRightTrack.css({
                left: trackTranslateX
            });
            if (value === 0) {
                this.$blueTrackSpan.gfx({
                    opacity: 0
                }, alphaOptions)
            }
        } else {
            this.$switch.gfx({
                translateX: switchTranslateX
            }, options);
            this.$blueRightTrack.gfx({
                translateX: trackTranslateX
            }, $.extend({}, options, {
                complete: function(_this) {
                    return function() {
                        if (value === 0) {
                            return _this.$blueTrackSpan.gfx({
                                opacity: 0
                            }, alphaOptions)
                        }
                    }
                }(this)
            }))
        }
        if (value !== 0) {
            return this.$blueTrackSpan.gfx({
                opacity: 1
            }, alphaOptions)
        }
    };
    SwitchControl.prototype.switchTouchStart = function(e) {
        var touchStart;
        e.preventDefault();
        this.switchTouchStartEvent = e;
        if (this.switchTouchStartEvent.originalEvent.touches && this.switchTouchStartEvent.originalEvent.touches.length > 0) {
            touchStart = this.switchTouchStartEvent.originalEvent.touches[0]
        } else {
            touchStart = this.switchTouchStartEvent.originalEvent
        }
        return this.switchTouchStartX = touchStart.pageX
    };
    SwitchControl.prototype.switchTouchMove = function(e) {
        var decalX, touch, value;
        e.preventDefault();
        if (!this.switchTouchStartEvent) {
            return
        }
        if (e.originalEvent.touches && e.originalEvent.touches.length > 0) {
            touch = e.originalEvent.touches[0]
        } else {
            touch = e.originalEvent
        }
        decalX = touch.pageX - this.switchTouchStartX;
        this.moved = this.moved || Math.abs(decalX) > 0;
        this.currentSwitchTranslateX = this.originalSwitchTranslateX + decalX;
        value = this.currentSwitchTranslateX / 25;
        value = Math.max(0, Math.min(1, value));
        return this.setValue(value, false)
    };
    SwitchControl.prototype.switchTouchEnd = function(e) {
        var newEnabled, val;
        if (!this.switchTouchStartEvent) {
            return
        }
        e.preventDefault();
        if (this.currentSwitchTranslateX && this.moved) {
            newEnabled = this.currentSwitchTranslateX + 14 > 25
        } else {
            newEnabled = !this.enabled
        }
        if (newEnabled !== this.enabled) {
            this.setEnabled(newEnabled, {
                userAction: true
            })
        } else {
            if (this.enabled) {
                val = 1
            } else {
                val = 0
            }
            this.setValue(val, true)
        }
        this.switchTouchStartEvent = null;
        return this.moved = false
    };
    return SwitchControl
}(View);
