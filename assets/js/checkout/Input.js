// var Input, Svg, View, helpers, popoverManager, svgPaths, __bind = function(fn, me) {
//   return function() {
//       return fn.apply(me, arguments)
//   }
// },
// __hasProp = {}.hasOwnProperty,
// __extends = function(child, parent) {
//   for (var key in parent) {
//       if (__hasProp.call(parent, key)) child[key] = parent[key]
//   }

//   function ctor() {
//       this.constructor = child
//   }
//   ctor.prototype = parent.prototype;
//   child.prototype = new ctor;
//   child.__super__ = parent.prototype;
//   return child
// };
// View = require("lib/view");
// Svg = require("inner/views/svg/svg");
// helpers = require("lib/helpers");
// svgPaths = require("inner/lib/svgPaths");
// popoverManager = require("inner/lib/popoverManager");
// Input = function(_super) {
// __extends(Input, _super);
// Input.prototype.className = "input";
// Input.prototype.inputTagName = "input";
// Input.prototype.inputType = "text";

// function Input() {
//   this.onInputValueDidChange = __bind(this.onInputValueDidChange, this);
//   this.onKeyInput = __bind(this.onKeyInput, this);
//   this.onKeyPress = __bind(this.onKeyPress, this);
//   this.onKeyDown = __bind(this.onKeyDown, this);
//   this.onKeyUp = __bind(this.onKeyUp, this);
//   this.onBlur = __bind(this.onBlur, this);
//   this.onFocus = __bind(this.onFocus, this);
//   this.onCheckForChange = __bind(this.onCheckForChange, this);
//   this.setErrorIconVisible = __bind(this.setErrorIconVisible, this);
//   this.openPopover = __bind(this.openPopover, this);
//   this.setAutocompletingStyle = __bind(this.setAutocompletingStyle, this);
//   this.setStyle = __bind(this.setStyle, this);
//   this.setIcon = __bind(this.setIcon, this);
//   this.setLabel = __bind(this.setLabel, this);
//   this.setPlaceholder = __bind(this.setPlaceholder, this);
//   this.setInvalid = __bind(this.setInvalid, this);
//   this.setDisabled = __bind(this.setDisabled, this);
//   this.validate = __bind(this.validate, this);
//   this.isEmpty = __bind(this.isEmpty, this);
//   this.val = __bind(this.val, this);
//   this.setVal = __bind(this.setVal, this);
//   this.clear = __bind(this.clear, this);
//   this.blur = __bind(this.blur, this);
//   this.isFocused = __bind(this.isFocused, this);
//   this.focus = __bind(this.focus, this);
//   this.setInputId = __bind(this.setInputId, this);
//   this.onPaste = __bind(this.onPaste, this);
//   this.bindEvents = __bind(this.bindEvents, this);
//   this.render = __bind(this.render, this);
//   var _base;
//   Input.__super__.constructor.apply(this, arguments);
//   if ((_base = this.options).icon == null) {
//       _base.icon = true
//   }
//   this.manuallyEdited = false;
//   this.pasted = false;
//   this.render();
//   this.bindEvents()
// }
// Input.prototype.render = function() {
//   this.$input = $("<" + this.inputTagName + ">");
//   this.$input.attr("tabindex", "1");
//   this.$input.addClass("control");
//   if (this.inputId != null) {
//       this.$input.attr("id", this.inputId)
//   }
//   if (this.inputTagName === "input") {
//       this.$input.attr("type", this.inputType)
//   }
//   if (this.inputMaxLength != null) {
//       this.$input.attr("maxlength", this.inputMaxLength)
//   }
//   if (this.options.placeholder != null) {
//       this.$input.attr("placeholder", this.options.placeholder)
//   }
//   if (this.inputAutocomplete != null) {
//       helpers.setAutocomplete(this.$input.get(0), this.inputAutocomplete)
//   }
//   this.$el.append(this.$input);
//   if (this.options.label) {
//       this.setLabel(this.options.label)
//   }
//   if (this.options.appType.isMobile()) {
//       this.$errorIconContainer = $("<div>").addClass("errorIconContainer");
//       this.errorIcon = new Svg($.extend({}, svgPaths.getIcon("error", this.options.appType), {
//           color: "red",
//           className: "errorIcon"
//       }));
//       this.errorIcon.$el.transform({
//           opacity: 0,
//           translateX: 20
//       });
//       return this.$errorIconContainer.append(this.errorIcon.$el)
//   }
// };
// Input.prototype.bindEvents = function() {
//   this.$input.on("focus", this.onFocus);
//   this.$input.on("blur", this.onBlur);
//   this.$input.on("change", function(_this) {
//       return function() {
//           return _this.onCheckForChange("change")
//       }
//   }(this));
//   this.$input.on("keyup", function(_this) {
//       return function() {
//           return _this.onCheckForChange("keyup")
//       }
//   }(this));
//   this.$input.on("keydown", function(_this) {
//       return function() {
//           return _this.onCheckForChange("keydown")
//       }
//   }(this));
//   this.$input.on("keyup", this.onKeyUp);
//   this.$input.on("keydown", this.onKeyDown);
//   this.$input.on("keypress", this.onKeyPress);
//   this.$input.on("input", this.onKeyInput);
//   this.$input.on("paste", this.onPaste);
//   this.$input.on("blur", function(_this) {
//       return function() {
//           return setTimeout(_this.onCheckForChange, 20)
//       }
//   }(this));
//   return this.on("valueDidChange", this.onInputValueDidChange)
// };
// Input.prototype.onPaste = function(e) {
//   return this.pasted = true
// };
// Input.prototype.setInputId = function(id) {
//   return this.$input.attr("id", id)
// };
// Input.prototype.focus = function() {
//   this.$input.focus();
//   return true
// };
// Input.prototype.isFocused = function() {
//   return this.$input.is(":focus")
// };
// Input.prototype.blur = function() {
//   return this.$input.blur()
// };
// Input.prototype.clear = function() {
//   return this.$input.val("")
// };
// Input.prototype.setVal = function(val, valid) {
//   if (valid == null) {
//       valid = true
//   }
//   if (valid) {
//       this.$input.removeClass("invalid")
//   }
//   return this.$input.val(val)
// };
// Input.prototype.val = function() {
//   return this.$input.val()
// };
// Input.prototype.isEmpty = function() {
//   return this.val().length === 0
// };
// Input.prototype.validate = function() {
//   if (!this.$input.val().length) {
//       this.setInvalid(true);
//       return [{
//           input: this,
//           name: this.fieldName,
//           reason: "required"
//       }]
//   } else if (this.validateFormat != null && !this.validateFormat()) {
//       this.setInvalid(true);
//       return [{
//           input: this,
//           name: this.fieldName,
//           reason: "format"
//       }]
//   } else {
//       this.setInvalid(false);
//       return []
//   }
// };
// Input.prototype.setDisabled = function(disabled) {
//   return this.$input.attr("disabled", disabled)
// };
// Input.prototype.setInvalid = function(invalid) {
//   this.$el.toggleClass("invalid", invalid);
//   this.$input.toggleClass("invalid", invalid);
//   return this.setErrorIconVisible(invalid)
// };
// Input.prototype.setPlaceholder = function(placeholder) {
//   if (this.label && (this.options.appType.isDesktop() || this.options.appType.isTablet())) {
//       return
//   }
//   return this.$input.setPlaceholder(placeholder)
// };
// Input.prototype.setLabel = function(label, abbreviatedLabel) {
//   this.label = label;
//   if (this.options.appType.isDesktop() || this.options.appType.isTablet()) {
//       this.$input.setPlaceholder(label);
//       return
//   }
//   if (this.options.label != null && !this.options.label) {
//       return
//   }
//   if (!this.$label) {
//       this.$label = $("<label>");
//       this.$el.append(this.$label)
//   }
//   return this.$label.text(abbreviatedLabel != null ? abbreviatedLabel : label)
// };
// Input.prototype.setIcon = function(icon) {
//   var _ref;
//   if (!this.options.icon) {
//       return
//   }
//   if ((_ref = this.icon) != null) {
//       _ref.remove()
//   }
//   if (icon != null) {
//       this.icon = new Svg($.extend({}, icon, {
//           color: this.options.color.css(),
//           fillRule: "evenodd",
//           className: "icon"
//       }));
//       return this.addSubview(this.icon)
//   }
// };
// Input.prototype.setStyle = function(style) {
//   this.$el.removeClass("left right top middle bottom");
//   return this.$el.addClass(style)
// };
// Input.prototype.setAutocompletingStyle = function(autocompleting) {
//   return this.$el.toggleClass("autocompleting", autocompleting)
// };
// Input.prototype.openPopover = function(text) {
//   return this.popover = popoverManager.openPopover(this, text)
// };
// Input.prototype.setErrorIconVisible = function(visible) {
//   if (this.errorIcon == null) {
//       return
//   }
//   if (visible) {
//       this.$el.append(this.$errorIconContainer);
//       this.errorIcon.redraw();
//       return this.errorIcon.$el.gfx({
//           opacity: 1,
//           translateX: -7
//       }, {
//           duration: 250,
//           easing: "ease-in-out",
//           complete: function(_this) {
//               return function() {
//                   return _this.errorIcon.$el.addClass("animated")
//               }
//           }(this)
//       })
//   } else {
//       this.errorIcon.$el.removeClass("animated");
//       return this.errorIcon.$el.gfx({
//           opacity: 0,
//           translateX: 20
//       }, {
//           duration: 250,
//           easing: "ease-in-out",
//           complete: function(_this) {
//               return function() {
//                   return _this.$errorIconContainer.detach()
//               }
//           }(this)
//       })
//   }
// };
// Input.prototype.onCheckForChange = function(eventName) {
//   var currentVal;
//   currentVal = this.val();
//   if (this.lastVal !== currentVal) {
//       this.trigger("valueDidChange", currentVal);
//       if (eventName === "keyup" || eventName === "keydown") {
//           this.manuallyEdited = true
//       }
//   }
//   return this.lastVal = currentVal
// };
// Input.prototype.onFocus = function(e) {
//   if (!this.isInDOM()) {
//       return
//   }
//   this.$el.addClass("focus");
//   return this.$input.addClass("focus")
// };
// Input.prototype.onBlur = function(e) {
//   this.trigger("blur", e);
//   this.$el.removeClass("focus");
//   return this.$input.removeClass("focus")
// };
// Input.prototype.onKeyUp = function(e) {
//   return this.trigger("keyUp", e)
// };
// Input.prototype.onKeyDown = function(e) {
//   return this.trigger("keyDown", e)
// };
// Input.prototype.onKeyPress = function(e) {
//   return this.trigger("keyPress", e)
// };
// Input.prototype.onKeyInput = function(e) {
//   return this.trigger("keyInput", e)
// };
// Input.prototype.onInputValueDidChange = function() {
//   this.setErrorIconVisible(false);
//   if (this.popover) {
//       popoverManager.closePopover(this.popover);
//       return this.popover = null
//   }
// };
// return Input
// }(View);
// module.exports = Input

//             