var CodeVerificationView, PhoneCodeVerificationView, __bind = function(fn, me) {
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
//CodeVerificationView = require("inner/views/form/codeVerificationView");
// PhoneCodeVerificationView = function(_super) {
//     __extends(PhoneCodeVerificationView, _super);

    function PhoneCodeVerificationView() {
        this.setButtonVisible = __bind(this.setButtonVisible, this);
        return PhoneCodeVerificationView.__super__.constructor.apply(this, arguments)
    }
    PhoneCodeVerificationView.prototype.className = "phoneCodeVerificationView codeVerificationView";
    PhoneCodeVerificationView.prototype.setButtonVisible = function() {
        return this.$el.addClass("withButton")
    };
//    return PhoneCodeVerificationView
// }(CodeVerificationView);
// module.exports = PhoneCodeVerificationView