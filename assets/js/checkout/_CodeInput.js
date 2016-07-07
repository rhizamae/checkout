var CodeInput, DIGIT_COUNT, View, helpers, support, __bind = function(fn, me) {
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
DIGIT_COUNT = 6;
// CodeInput = function(_super) {
//     __extends(CodeInput, _super);
    CodeInput.prototype.className = "codeInput";

    function CodeInput(options) {
        var $input, $inputContainer, i, j, k, _i, _j, _k, _ref, _ref1;
        this.$el = $("div.codeInput");
        this.$controlInput = $("input.controlInput");

        this.options = options != null ? options : {};
        this.setInvalid = __bind(this.setInvalid, this);
        this.validate = __bind(this.validate, this);
        this.disable = __bind(this.disable, this);
        this.inputDidFocus = __bind(this.inputDidFocus, this);
        this.controlInputDidKeyUpBackspace = __bind(this.controlInputDidKeyUpBackspace, this);
        this.controlInputDidKeyUp = __bind(this.controlInputDidKeyUp, this);
        this.controlInputDidKeyPress = __bind(this.controlInputDidKeyPress, this);
        this.controlInputDidBlur = __bind(this.controlInputDidBlur, this);
        this.controlInputDidFocus = __bind(this.controlInputDidFocus, this);
        this.codeDidChange = __bind(this.codeDidChange, this);
        this.frameForIndex = __bind(this.frameForIndex, this);
        this.setEditable = __bind(this.setEditable, this);
        this.shake = __bind(this.shake, this);
        this.val = __bind(this.val, this);
        this.focus = __bind(this.focus, this);
        this.clear = __bind(this.clear, this);
        this.layout = __bind(this.layout, this);
        this.render = __bind(this.render, this);
        //CodeInput.__super__.constructor.apply(this, arguments);
        this.focusId = null;
        this.code = "";
        
        // this.$controlInput = $("<input>").addClass("controlInput");
        // this.$controlInput.attr({
        //     type: "tel",
        //     "data-numeric": true,
        //     name: "code-control-input"
        // });
        
        this.$controlInput.payment("restrictNumeric");

        this.$controlInput.on("focus", this.controlInputDidFocus);
        this.$controlInput.on("blur", this.controlInputDidBlur);
        this.$controlInput.on("keypress", this.controlInputDidKeyPress);
        this.$controlInput.on("keyup", this.controlInputDidKeyUp);
        this.$controlInput.on("keyup", this.controlInputDidKeyUpBackspace);
        this.$inputContainers = [];
        this.$inputs = [];
        for (i = _i = 0, _ref = DIGIT_COUNT - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            $input = $("<input>");
            $input.attr({
                type: "tel",
                "data-numeric": true,
                maxlength: "1",
                readonly: true
            });
            $input.addClass("digit digit" + (i + 1));
            $input.on("focus", this.inputDidFocus);
            this.$inputs.push($input)
        }
        j = 0;
        for (i = _j = 0, _ref1 = Math.round(DIGIT_COUNT / 3) - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
            $inputContainer = $("<div>").addClass("container index" + i);
            for (k = _k = 0; _k <= 2; k = ++_k) {
                $input = this.$inputs[j];
                $inputContainer.append($input);
                j += 1
            }
            this.$inputContainers.push($inputContainer)
        }
        this.$dash = $("<span>").addClass("dash");
        this.editable = true;
        this.render();
    }
    CodeInput.prototype.render = function() {
        var $inputContainer, _i, _len, _ref;
        _ref = this.$inputContainers;

        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            $inputContainer = _ref[_i];
            this.$el.append($inputContainer)
        }
        this.$el.append(this.$controlInput);
        return this.$el.append(this.$dash)
    };
    CodeInput.prototype.layout = function() {
        var $input, digit, frame, i, width, _i, _len, _ref;
        i = 0;
        _ref = this.$inputs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            $input = _ref[_i];
            digit = this.code.length > i ? this.code[i] : "";
            $input.val(digit);
            if (i === this.focusId) {
                $input.addClass("focus")
            } else {
                $input.removeClass("focus")
            }
            i++
        }
        if (!this.editable) {
            return this.$controlInput.hide()
        } else if (this.focusId === null) {
            this.$controlInput.show();
            this.$controlInput.css("left", "0px");
            width = parseInt(this.$inputContainers[1].css("marginLeft"), 10) + DIGIT_COUNT * parseInt(this.$inputs[0].css("width"), 10);
            return this.$controlInput.css("width", width + "px")
        } else {
            this.$controlInput.show();
            if (this.code.length >= DIGIT_COUNT) {
                this.$controlInput.css("opacity", 0)
            } else {
                this.$controlInput.css("opacity", 1)
            }
            frame = this.frameForIndex(this.focusId);
            if (helpers.isChrome()) {
                this.$controlInput.transform({
                    translateX: frame.x
                })
            } else {
                this.$controlInput.css("left", frame.x + "px")
            }
            return this.$controlInput.css("width", frame.width + "px")
        }
    };
    CodeInput.prototype.clear = function() {
        this.code = "";
        this.focusId = null;
        return this.layout()
    };
    CodeInput.prototype.focus = function() {
        return this.$controlInput.focus()
    };
    CodeInput.prototype.val = function() {
        return this.code
    };
    CodeInput.prototype.shake = function() {
        this.$el.addClass("shake");
        return setTimeout(function(_this) {
            return function() {
                return _this.$el.removeClass("shake")
            }
        }(this), 450)
    };
    CodeInput.prototype.setEditable = function(editable) {
        var _base;
        this.editable = editable;
        if (!this.editable) {
            if (typeof(_base = document.activeElement).blur === "function") {
                _base.blur()
            }
            this.$controlInput.blur();
            this.focusId = null
        }
        return this.layout()
    };
    CodeInput.prototype.frameForIndex = function(index) {
        var height, width, x;
        width = parseInt(this.$inputs[0].css("width"), 10) + parseInt(this.$inputs[0].css("marginRight"), 10);
        height = parseInt(this.$inputs[0].css("height"), 10);
        x = index * (width + parseInt(this.$inputs[1].css("marginLeft"), 10));
        if (index >= 3) {
            x += 1 + parseInt(this.$inputContainers[1].css("marginLeft"), 10) + parseInt(this.$inputContainers[1].css("paddingLeft"), 10)
        }
        return {
            x: x,
            y: 0,
            width: width,
            height: height
        }
    };
    CodeInput.prototype.codeDidChange = function() {
        if (this.code.length >= DIGIT_COUNT) {
            this.layout();
            return accountCheckCode(this.code);
            //return this.trigger("valueDidChange.checkout")
        } else {
            return this.layout()
        }
    };
    CodeInput.prototype.controlInputDidFocus = function(e) {
        this.focusId = Math.min(this.code.length, DIGIT_COUNT - 1);
        return this.layout()
    };
    CodeInput.prototype.controlInputDidBlur = function(e) {
        this.focusId = null;
        return this.layout()
    };
    CodeInput.prototype.controlInputDidKeyPress = function(e) {
        var char;
        if (this.code.length >= DIGIT_COUNT) {
            return
        }
        char = String.fromCharCode(e.which);
        if (!/[\d]/.test(char)) {
            return
        }
        this.code += char;
        this.focusId = Math.min(this.code.length, DIGIT_COUNT - 1);
        e.preventDefault();
        return this.codeDidChange()
    };
    CodeInput.prototype.controlInputDidKeyUp = function(e) {
        var char;
        if (this.code.length >= DIGIT_COUNT) {
            return this.$controlInput.val("")
        }
        char = this.$controlInput.val();
        if (!/[\d]/.test(char)) {
            return
        }
        this.code += char;
        this.focusId = Math.min(this.code.length, DIGIT_COUNT - 1);
        this.$controlInput.val("");
        e.preventDefault();
        return this.codeDidChange()
    };
    CodeInput.prototype.controlInputDidKeyUpBackspace = function(e) {
        if (e.which !== 8) {
            return
        }
        if (this.code.length > 0) {
            this.code = this.code.substring(0, this.code.length - 1);
            this.focusId = Math.min(this.code.length, DIGIT_COUNT - 1);
            return this.layout()
        }
    };
    CodeInput.prototype.inputDidFocus = function(e) {
        this.$controlInput.focus();
        return $(e.currentTarget).blur()
    };
    CodeInput.prototype.disable = function() {
        var input, _i, _len, _ref, _results;
        _ref = this.$inputs;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            input = _ref[_i];
            _results.push(input.gfx({
                background: "transparent",
                "-webkit-box-shadow": "none",
                "-moz-box-shadow": "none",
                "box-shadow": "none"
            }, {
                duration: 250,
                easing: "ease-in-out"
            }))
        }
        return _results
    };
    CodeInput.prototype.validate = function() {
        this.$el.removeClass("invalid");
        if (this.val().length !== DIGIT_COUNT) {
            this.$el.addClass("invalid");
            return [{
                input: this,
                name: "code-input",
                reason: "invalid"
            }]
        }
        return []
    };
    CodeInput.prototype.setInvalid = function(invalid) {
        if (invalid) {
            return this.$el.addClass("invalid")
        } else {
            return this.$el.removeClass("invalid")
        }
    };
//     return CodeInput
// };