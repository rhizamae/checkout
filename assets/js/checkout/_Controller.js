var Controller, __hasProp = {}.hasOwnProperty,
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
        return child;
    };
Controller = (function(_super) {
    __extends(Controller, _super);

    function Controller(options) {
        if (options == null) {
            options = {};
        }
        Controller.__super__.constructor.apply(this, arguments);
        this.options = options;
        this.view = null;
    }
    return Controller;
})(EventDispatcher);