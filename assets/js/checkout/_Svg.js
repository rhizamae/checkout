var Svg, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    },
    __hasProp = {}.hasOwnProperty,
    __extendsSvg = function(child, parent) {
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
// support = require("lib/support");
Svg = (function(_super) {
    __extendsSvg(Svg, _super);
    Svg.prototype.className = "svg";
    Svg.prototype.xmlns = "http://www.w3.org/2000/svg";

    function Svg(options) {
        this.$el = $(".buttonsView .button");
        var cssSize, ratio, svg;
        if (options == null) {
            options = {}
        }
        this.addClipPath = __bind(this.addClipPath, this);
        this.addPath = __bind(this.addPath, this);
        this.setTranslate = __bind(this.setTranslate, this);
        this.setColor = __bind(this.setColor, this);
        this.setPath = __bind(this.setPath, this);
        Svg.__super__.constructor.apply(this, arguments);
        this.options = $.extend({}, {
            size: {
              width: 10,
              height: 10
            },
            ratio: 1
        }, options);
        if (this.options.size instanceof Array) {
            this.options.size = {
                width: this.options.size[0],
                height: this.options.size[1]
            }
        }
        if (!support.svg()) {
            return
        }
        cssSize = this.options.cssSize || this.options.size;
        ratio = this.options.ratio;
        svg = document.createElementNS(this.xmlns, "svg");
        svg.setAttributeNS(null, "version", "1.1");
        svg.setAttributeNS(null, "viewBox", "0 0 " + this.options.size.width * ratio + " " + this.options.size.height * ratio);
        svg.setAttributeNS(null, "width", cssSize.width);
        svg.setAttributeNS(null, "height", cssSize.height);
        svg.setAttributeNS(null, "focusable", "false");
        this.$svg = $(svg);
        this.$el.css({
            width: cssSize.width,
            height: cssSize.height
        });
        this.group = document.createElementNS(this.xmlns, "g");
        if (this.options.fillRule) {
            this.group.setAttributeNS(null, "fill-rule", this.options.fillRule)
        }
        svg.appendChild(this.group);
        this.path = document.createElementNS(this.xmlns, "path");
        if (this.options.clipped) {
            this.path.setAttributeNS(null, "clip-path", "url(#" + this.options.clipped + ")")
        }
        this.group.appendChild(this.path);
        this.$el.append(this.$svg);
        if (this.options.path) {
            this.setPath(this.options.path)
        }
        if (this.options.color) {
            this.setColor(this.options.color)
        }
        if (this.options.translate) {
            this.setTranslate(this.options.translate)
        }
    }
    Svg.prototype.setPath = function(path) {
        if (!support.svg()) {
            return
        }
        return this.path.setAttributeNS(null, "d", path)
    };
    Svg.prototype.setColor = function(color) {
        if (!support.svg()) {
            return
        }
        return this.path.setAttributeNS(null, "style", "fill:" + color)
    };
    Svg.prototype.setTranslate = function(translate) {
        if (!support.svg()) {
            return
        }
        return this.path.setAttributeNS(null, "transform", "translate(" + translate.join(",") + ")")
    };
    Svg.prototype.addPath = function(path, color, clipped) {
        var p;
        if (clipped == null) {
            clipped = null
        }
        if (!support.svg()) {
            return
        }
        p = document.createElementNS(this.xmlns, "path");
        p.setAttributeNS(null, "d", path);
        p.setAttributeNS(null, "style", "fill:" + color);
        if (clipped) {
            p.setAttributeNS(null, "clip-path", "url(#" + clipped + ")")
        }
        this.group.appendChild(p);
        return $(p)
    };
    Svg.prototype.addClipPath = function(path, name) {
        var c, p;
        if (!support.svg()) {
            return
        }
        c = document.createElementNS(this.xmlns, "clipPath");
        c.setAttributeNS(null, "id", name);
        p = document.createElementNS(this.xmlns, "path");
        p.setAttributeNS(null, "d", path);
        c.appendChild(p);
        this.group.appendChild(c);
        return $(p)
    };
    return Svg
})(View);

