// (function() {
var $, View, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    },
    __hasProp = {}.hasOwnProperty,
    __extendsView = function(child, parent) {
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
// EventDispatcher = require("lib/eventDispatcher");
//$ = jQuery;
// try {
//     fastdom = require("vendor/fastdom")
// } catch (_error) {}
View = (function(_super) {
    __extendsView(View, _super);
    View.prototype.tag = "div";

    function View(options) {
        var classNames, ref;
        this.options = options != null ? options : {};
        this.setTopOffset = __bind(this.setTopOffset, this);
        this.forwardDidResize = __bind(this.forwardDidResize, this);
        this.patchJQueryMethod = __bind(this.patchJQueryMethod, this);
        this.patchJQueryMethods = __bind(this.patchJQueryMethods, this);
        this.viewWasHidden = __bind(this.viewWasHidden, this);
        this.viewWasShown = __bind(this.viewWasShown, this);
        this.triggerToSubviews = __bind(this.triggerToSubviews, this);
        this.viewWasRemovedFromDom = __bind(this.viewWasRemovedFromDom, this);
        this.listenForDOMElementVisibleChanged = __bind(this.listenForDOMElementVisibleChanged, this);
        this.topOffset = __bind(this.topOffset, this);
        this.isDOMElementVisible = __bind(this.isDOMElementVisible, this);
        this.inDOM = __bind(this.inDOM, this);
        this.isInDOM = __bind(this.isInDOM, this);
        this.parent = __bind(this.parent, this);
        this.detach = __bind(this.detach, this);
        this.height = __bind(this.height, this);
        this.redraw = __bind(this.redraw, this);
        this.isVisible = __bind(this.isVisible, this);
        this.hide = __bind(this.hide, this);
        this.show = __bind(this.show, this);
        this.animatableViews = __bind(this.animatableViews, this);
        this.removeSubview = __bind(this.removeSubview, this);
        this.addSubviews = __bind(this.addSubviews, this);
        this.insertSubviewBefore = __bind(this.insertSubviewBefore, this);
        this.addSubview = __bind(this.addSubview, this);
        View.__super__.constructor.apply(this, arguments);
        classNames = [];
        ref = this.constructor.prototype;
        while (ref !== View.prototype) {
            classNames.push(ref.className);
            ref = ref.constructor.__super__;
        }
        if (this.options["className"] != null) {
            classNames.push(this.options["className"])
        }
        this.className = classNames.join(" ");
        this.el = this.el || this.options.el || document.createElement(this.options["tag"] || this.tag);
        this.$el = $(this.el);
        this.$el.addClass(this.className);
        this.$el.data("view", this);
        this.patchJQueryMethods();
        this.hidden = false;
        this.subviews = [];
        if (this.layout != null) {
            this.inDOM(function(_this) {
                return function() {
                    return _this.layout({
                        animated: false
                    })
                }
            }(this));
            this.on("DOMElementVisibleChanged", function(_this) {
                return function(visible) {
                    if (visible) {
                        return _this.layout({
                            animated: false
                        })
                    }
                }
            }(this))
        }
        this.listenForDOMElementVisibleChanged();
    }
    View.prototype.$ = function(sel) {
        return $(sel, this.$el)
    };
    View.prototype.focus = function() {
        return false
    };
    View.prototype.addSubview = function(subview) {
        return this.insertSubviewBefore(subview)
    };
    View.prototype.insertSubviewBefore = function(subview, beforeSubview) {
        var index;
        if (beforeSubview == null) {
            beforeSubview = null
        }
        this.$el.append(subview.$el);
        if (this.subviews.indexOf(subview) !== -1) {
            return
        }
        index = this.subviews.indexOf(beforeSubview);
        if (index === -1) {
            index = this.subviews.length
        }
        subview.superview = this;
        //console.log("view------------");
        //console.log(this);
        this.subviews.splice(index, 0, subview);
        return subview.on("didResize", this.forwardDidResize)
    };
    View.prototype.addSubviews = function(subviews) {
        var subview, _i, _len, _results;
        if (subviews == null) {
            subviews = []
        }
        _results = [];
        for (_i = 0, _len = subviews.length; _i < _len; _i++) {
            subview = subviews[_i];
            _results.push(this.addSubview(subview))
        }
        return _results
    };
    View.prototype.removeSubview = function(subview, options) {
        if (options == null) {
            options = {}
        }
        if (options.detach == null) {
            options.detach = true
        }
        subview.superview = null;
        if (options.detach) {
            subview.$el.detach()
        }
        this.subviews = $.grep(this.subviews, function(v) {
            return v !== subview
        });
        return subview.off("didResize", this.forwardDidResize)
    };
    View.prototype.animatableViews = function() {
        return [this]
    };
    View.prototype.show = function() {
        this.hidden = false;
        this.$el.show();
        return this
    };
    View.prototype.hide = function() {
        this.hidden = true;
        this.$el.hide();
        return this
    };
    View.prototype.isVisible = function() {
        return !this.hidden
    };
    View.prototype.redraw = function() {
        this.$el.redraw();
        return this
    };
    View.prototype.height = function() {
        return this.$el.outerHeight(true)
    };
    View.prototype.detach = function() {
        this.$el.detach();
        return this
    };
    View.prototype.parent = function() {
        var _base;
        return typeof(_base = $(this.$el.parent())).data === "function" ? _base.data("view") : void 0
    };
    View.prototype.isInDOM = function() {
        var parent, _ref;
        parent = this.$el.parent();
        while (parent != null && parent.length > 0) {
            if (((_ref = parent.prop("tagName")) != null ? _ref.toUpperCase() : void 0) === "BODY") {
                return true
            }
            parent = parent.parent()
        }
        return false
    };
    View.prototype.inDOM = function(fn) {
        if (this.isInDOM()) {
            return fn()
        } else {
            return this.on("viewAddedToDOM.checkout", fn)
        }
    };
    View.prototype.isDOMElementVisible = function() {
        return this.isInDOM() && this.$el.is(":visible")
    };
    View.prototype.topOffset = function() {
        return this.$el.offset().top
    };
    View.prototype.listenForDOMElementVisibleChanged = function() {
        var cb, currentVisible, goInvisible, goVisible;
        currentVisible = false;
        cb = function(_this) {
            return function() {
                var visible;
                visible = _this.isDOMElementVisible();
                if (visible === currentVisible) {
                    return false
                }
                currentVisible = visible;
                _this.trigger("DOMElementVisibleChanged", visible);
                return true
            }
        }(this);
        goVisible = function() {
            if (!currentVisible) {
                return cb()
            }
        };
        goInvisible = function() {
            if (currentVisible) {
                return cb()
            }
        };
        cb();
        this.on("viewShown.checkout", goVisible);
        this.on("viewAddedToDOM.checkout", goVisible);
        this.on("viewHidden.checkout", goInvisible);
        return this.on("viewRemovedFromDOM.checkout", goInvisible)
    };
    View.prototype.viewWasAddedToElement = function(el) {
        var view, _base;
        view = typeof(_base = $(el)).data === "function" ? _base.data("view") : void 0;
        if (view == null) {
            return
        }
        if (view.isInDOM()) {
            return view.triggerToSubviews("viewAddedToDOM.checkout")
        }
    };
    View.prototype.viewWasRemovedFromDom = function(el) {
        return this.triggerToSubviews("viewRemovedFromDOM.checkout")
    };
    View.prototype.triggerToSubviews = function() {
        var args, eventName, subview, _i, _len, _ref;
        eventName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (this.subviews != null) {
            _ref = this.subviews;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                subview = _ref[_i];
                subview.triggerToSubviews.apply(subview, arguments)
            }
        }
        return this.trigger.apply(this, arguments)
    };
    View.prototype.viewWasShown = function() {
        return this.triggerToSubviews("viewShown.checkout")
    };
    View.prototype.viewWasHidden = function() {
        return this.triggerToSubviews("viewHidden.checkout")
    };
    View.prototype.patchJQueryMethods = function() {
        this.patchJQueryMethod("append", this.viewWasAddedToElement);
        this.patchJQueryMethod("prepend", this.viewWasAddedToElement);
        this.patchJQueryMethod("detach", this.viewWasRemovedFromDom);
        this.patchJQueryMethod("remove", this.viewWasRemovedFromDom);
        this.patchJQueryMethod("show", this.viewWasShown);
        return this.patchJQueryMethod("hide", this.viewWasHidden)
    };
    View.prototype.patchJQueryMethod = function(method, fn) {
        var oldMethod;
        oldMethod = this.$el[method];
        return this.$el[method] = function() {
            var r;
            r = oldMethod.apply(this, arguments);
            fn.apply(this, arguments);
            return r
        }
    };
    View.prototype.forwardDidResize = function() {
        if (this.subviewDidResize == null) {
            return this.trigger("didResize")
        } else {
            return this.subviewDidResize()
        }
    };
    View.prototype.setTopOffset = function(y, options) {
        var fn;
        if (options == null) {
            options = {}
        }
        fn = function(_this) {
            return function() {
                return _this.$el.gfx({
                    translateY: y
                }, $.extend({}, options, {
                    transformFallbackKeys: {
                        translateY: "top"
                    }
                }))
            }
        }(this);
        if (fastdom != null) {
            return fastdom.write(fn)
        } else {
            return fn()
        }
    };
    return View;
})(EventDispatcher);
//}(EventDispatcher);
// module.exports = View
// }).call(this)

