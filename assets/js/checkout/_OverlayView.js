var BrandingLogoView, OverlayView, variants, __bind = function(fn, me) {
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
// helpers = require("lib/helpers");
// support = require("lib/support");
// variants = require("lib/variants");
// BrandingLogoView = require("inner/views/brandingLogoView");

// OverlayView = function(_super) {
// __extends(OverlayView, _super);
OverlayView.prototype.className = "overlayView";

function OverlayView(options) {
    this.options = options;
    this.$el = $(".overlayView");
    this.onScroll = __bind(this.onScroll, this);
    this.hide = __bind(this.hide, this);
    this.show = __bind(this.show, this);
    this.bindEvents = __bind(this.bindEvents, this);
    this.render = __bind(this.render, this);
    //OverlayView.__super__.constructor.apply(this, arguments);
    this.render();
    this.bindEvents();
}
OverlayView.prototype.render = function() {
    if (this.options.appType.isMobile()) {
        return;
    }
    if (this.options.appType.isTablet() && !helpers.isInsideFrame()) {
        this.$el.css("backgroundColor", this.options.color.css())
    }
    if (helpers.ieVersion() === 8) {
        this.$el.append($("<div />").addClass("overlayView-ie8"))
    }
    //this.addSubview(new BrandingLogoView);
    if (!this.options.livemode) {
        if (this.$testModeLink == null) {
            this.$testModeLink = $('<a class="testMode" href="/-/test-mode" target="_blank" tabindex="-1">TEST MODE</a>')
        }
        return this.$el.append(this.$testModeLink)
    }
};
OverlayView.prototype.bindEvents = function() {
    this.$el.scroll(this.onScroll);
    if (helpers.isiOS()) {
        return this.$el.on("touchstart", function() {})
    }
};
OverlayView.prototype.show = function() {
    var $tmpInput;
    if (support.automaticallyGiveFocus()) {
        $tmpInput = $("<input>");
        this.$el.append($tmpInput);
        $tmpInput.focus();
        $tmpInput.detach()
    }
    this.$el.redraw();
    return this.$el.removeClass("unactive").addClass("active")
};
OverlayView.prototype.hide = function(options) {
    if (options == null) {
        options = {}
    }
    if (this.options.appType.isMobile()) {
        setTimeout(options.complete, options.success ? 1500 : 0);
        return
    }
    this.$el.removeClass("active").addClass("unactive");
    return setTimeout(function() {
        return typeof options.complete === "function" ? options.complete() : void 0
    }, support.transitions() ? 400 : 0)
};
OverlayView.prototype.onScroll = function() {
    var bottom;
    if (this.$poweredStripeLink == null) {
        return
    }
    bottom = 14 - this.$el.scrollTop() + "px";
    return this.$poweredStripeLink.css("bottom", bottom)
};
// return OverlayView
// };

