saveMobileNumber = function() {
    msisdn = $("#msisdn").val();
    $("#save-msisdn").attr("id", "payAmount");
    viewRememberMeDetails(false);
}

updateRememberCheckbox = function(toggle) {
    var element = $(".checkbox-remember-me");
    if (toggle) {
        element.toggleClass("checked");
    }
    if (appType.isMobile()) {
        if (element.hasClass("checked")) {
            $(".switchControl .blueTrack").css("opacity", "1");
            $(".switchControl .blueTrack .right span").css("transform", "translateX(0px)");
            $(".switchControl .switch").css("transform", "translateX(25px)");
            $("#payAmount").attr("id", "save-msisdn");
        } else {
            msisdn = undefined;
            $(".switchControl .blueTrack").css("opacity", "0");
            $(".switchControl .blueTrack .right span").css("transform", "translateX(0)");
            $(".switchControl .switch").css("transform", "translateX(0)");
            $("#save-msisdn").attr("id", "payAmount");
        }
    }
    viewRememberMeDetails(element.hasClass("checked"));

}

viewRememberMeDetails = function (set) {
  if (set) {
    if (appType.isMobile()) {
        $("#save-msisdn").removeClass("iconTick");
        $("#save-msisdn").html("<span class='iconA'></span>Save<span class='iconB'></span>");
  
        $(".rememberMe").addClass("withExpand");
        $(".paymentView .emailInput").hide();
        $(".rememberMe.withExpand .labelWithCheckbox").css("transform", "translateY(-138px)");

        $(".rememberMe.withExpand .separatorLineView").css("opacity", "1");
        $(".rememberMe.withExpand .separatorLineView").css("transform", "translateY(-138px)");
        $(".rememberMe.withExpand .separatorLineView").show();

        $(".rememberMe.withExpand .expanded").show();
        $(".rememberMe.withExpand .expanded").css("opacity", "1");
        $(".rememberMe.withExpand .expanded").css("transform", "rotateX(0deg)");

        $(".rememberMe.withExpand .expanded p").show();
        $(".rememberMe.withExpand .expanded p").css("opacity", "1");
        $(".rememberMe.withExpand .expanded p").css("transform", "translateY(-138px)");

        $(".rememberMe.withExpand .expanded .telInput").show();
        $(".rememberMe.withExpand .expanded .telInput").css("opacity", "1");
        $(".rememberMe.withExpand .expanded .telInput").css("transform", "translateY(-138px)");

        $(".cardPaymentView .input").hide();
        $(".cardPaymentView .separatorLineView").hide();
    
        $(".cardView .layoutSubview.separator").hide();
        $(".cancelButton").show();
        $(".submitButton").css("left", "50%");
    } else {
        $(".backgroundBottom div").css("transform", "translateY(-381px)");
        $(".payButton").css("transform", "translateY(447px)");
        $(".expanded").css("opacity", "1");
        $(".expanded").css("transform", "rotateX(0deg)");
        $(".expanded").css("transition", "none");
        $(".expanded").css("display", "block");
    }
    
  } else {
    if (appType.isMobile()) {
        $("#payAmount").addClass("iconTick");
        $("#payAmount").html("<span class='iconA'></span>Pay ₱" + client.amount + "<span class='iconB'></span>");
        $(".paymentView .emailInput").show();
        $(".rememberMe.withExpand .labelWithCheckbox").css("transform", "translateY(0)");

        $(".rememberMe.withExpand .separatorLineView").css("opacity", "0");
        $(".rememberMe.withExpand .separatorLineView").css("transform", "translateY(0)");
        $(".rememberMe.withExpand .separatorLineView").hide();

        $(".rememberMe.withExpand .expanded").hide();
        $(".rememberMe.withExpand .expanded").css("opacity", "0");
        $(".rememberMe.withExpand .expanded").css("transform", "rotateX(-60deg)");

        $(".rememberMe.withExpand .expanded p").hide();
        $(".rememberMe.withExpand .expanded p").css("opacity", "0");
        $(".rememberMe.withExpand .expanded p").css("transform", "translateY(0)");

        $(".rememberMe.withExpand .expanded .telInput").hide();
        $(".rememberMe.withExpand .expanded .telInput").css("opacity", "0");
        $(".rememberMe.withExpand .expanded .telInput").css("transform", "translateY(0)");

        $(".cardPaymentView .input").show();
        $(".cardPaymentView .separatorLineView").show();

        $(".cardView .layoutSubview.separator").show();

        $(".rememberMe").removeClass("withExpand");

        $(".cancelButton").hide();
        $(".submitButton").css("left", "0");
    } else {
        $(".backgroundBottom div").css("transform", "");
        $(".payButton").css("transform", "");
        $(".expanded").css("display", "none");
    }
  }
  
}

expand = function() {
    $(".rememberMe.withExpand").css("transform", "translateY(-138px)");
    $(".rememberMe.withExpand .line1").css("opacity", "1");
    $(".rememberMe.withExpand .line1").css("transform", "translateY(-138px)");

    $(".rememberMe.withExpand .line2").css("opacity", "1");
    $(".rememberMe.withExpand .line2").css("transform", "translateY(-138px)");
   
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


