setRememberMeDetails = function (set) {

  if (set) {
    //$(".backgroundView").css("height", "749px");
    //$(".backgroundBottom").css("height", "900px");
    //$(".backgroundBottom div").css("height", "950px");
    //$(".backgroundBottom div").css("transition", "none");
    $(".backgroundBottom div").css("transform", "translateY(-381px)");
    $(".payButton").css("transform", "translateY(447px)");
    $(".expanded").css("opacity", "1");
    $(".expanded").css("transform", "rotateX(0deg)");
    $(".expanded").css("transition", "none");
    $(".expanded").css("display", "block");
  } else {
    $(".backgroundBottom div").css("transform", "");
    $(".payButton").css("transform", "");
    $(".expanded").css("display", "none");
  }
  
}

setExpandedVisible = function(visible, animated) {
    var str;
    this.$el = $(".rememberMe");
    this.$expanded = $(".expanded");

    if (animated == null) {
      animated = true
    }

    this.$el.toggleClass("withExpand", visible);
   
    // fastdom.write(function(_this) {
    //     return function() {
    //         _this.$el.toggleClass("withExpand", visible);
    //         return _this.trigger("didResize")
    //     }
    // }(this));
    // if (this.options.appType.isMobile()) {
    //     return;
    // }
    if (visible) {
        // if (popoverManager.supportPopovers()) {
        //     str = i18n.loc("rememberMe.description.popover")({
        //         stripe: "<strong>Stripe</strong>"
        //     });
        //     str += ' <a href="/-/remember-me" target="_blank" tabIndex="-1">' + i18n.loc("rememberMe.description.moreInfo")() + "</a>";
        //     this.popover = popoverManager.openPopover(this, str)
        // }
        console.log("remember----");

        return function() {
            this.labelWithCheckbox.setStyle("top");
            this.$expanded.show().redraw();
            return _this.$expanded.gfx({
                opacity: 1,
                rotateX: 0
            }, {
                duration: 400,
                easing: "cubic-bezier(.41,1.34,.51,1.01)",
                animated: animated,
                complete: function() {
                    if (support.automaticallyGiveFocus()) {
                        return this.phone.focus();
                    }
                }
            })
        }
        console.log("remember----");
        // return fastdom.write(function(_this) {
        //     return function() {
        //         _this.labelWithCheckbox.setStyle("top");
        //         _this.$expanded.show().redraw();
        //         return _this.$expanded.gfx({
        //             opacity: 1,
        //             rotateX: 0
        //         }, {
        //             duration: 400,
        //             easing: "cubic-bezier(.41,1.34,.51,1.01)",
        //             animated: animated,
        //             complete: function() {
        //                 if (support.automaticallyGiveFocus()) {
        //                     return _this.phone.focus()
        //                 }
        //             }
        //         })
        //     }
        // }(this))
    } else {
        //popoverManager.closePopover(this.popover);
        this.popover = null;
        this.phone.blur();
        return fastdom.write(function(_this) {
            return function() {
                _this.labelWithCheckbox.setStyle("");
                return _this.$expanded.gfx({
                    opacity: 0,
                    rotateX: -60
                }, {
                    duration: 200,
                    easing: "ease-in-out",
                    animated: animated,
                    complete: function() {
                        return _this.$expanded.hide()
                    }
                })
            }
        }(this))
    }
};


