 function setLabelOpacity(opacity) {
  var _ref;
  return (_ref = this.$label) != null ? _ref.gfx({
      opacity: opacity
  }, {
      duration: 150,
      easing: "ease-in-out"
  }) : void 0
};

function setPending(pending, options) {
  if (pending == null) {
      pending = true
  }
  if (options == null) {
      options = {}
  }
  if (options.labelOpacity == null) {
      options.labelOpacity = true
  }
  this.isPending = pending;
  if (this.pendingTimeout != null) {
      clearTimeout(this.pendingTimeout)
  }
  this.$button.prop("disabled", pending);
  return this.pendingTimeout = setTimeout(function(_this) {
      return function() {
          _this.pendingTimeout = null;
          _this.$el.toggleClass("animated pending", pending);
          if (pending) {
              // _this.$spinnerContainer.show();
              // _this.$spinnerContainer.redraw();
              // _this.$spinnerContainer.gfx({
              //     opacity: 1
              // }, {
              //     duration: 150,
              //     easing: "ease-in-out"
              // });
              _this.spinner.startAnimating();
              if (options.labelOpacity) {
                  return _this.setLabelOpacity(0)
              }
          } else {
              // _this.$spinnerContainer.gfx({
              //     opacity: 0
              // }, {
              //     duration: 150,
              //     easing: "ease-in-out",
              //     complete: function() {
              //         return _this.$spinnerContainer.hide()
              //     }
              // });
              // _this.spinner.stopAnimating();
              if (options.labelOpacity) {
                  return _this.setLabelOpacity(1)
              }
          }
      }
  }(this), 100)
};

function setSuccess(success) {
  this.$el = $(".buttonsView .button");
  this.$button = $(".buttonsView #pay-button");
  this.$inner = $(".buttonsView .inner");

  // this.tick = new Tick({
  //   appType: appType
  // });

  if (success == null) {
    success = true
  }
  // setPending(false, {
  //     labelOpacity: false
  // });
  // this.setPending(false, {
  //     labelOpacity: false
  // });
  this.$button.prop("disabled", success);
  this.$el.toggleClass("animated success", success);
  if (success) {
    return;
    this.setLabelOpacity(0);
    // this.$inner.append(this.tick.$el);
    // return tickShow();
    //return this.tick.show()
  } else {
    return;
    this.setLabelOpacity(1);
    //return this.tick.hide(function(_this) {
    // return tickHide(function(_this) {
    //     return function() {
    //         return _this.tick.$el.detach();
    //     }
    // }(this));
  }
};

function setEnabled(enabled) {
  if (enabled == null) {
      enabled = true
  }
  if (this.enabled === enabled) {
      return
  }
  this.enabled = enabled;
  this.$el.toggleClass("animated disabled", !enabled);
  return this.$button.prop("disabled", !enabled)
};