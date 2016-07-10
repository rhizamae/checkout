appBootstrap = function() {
    var types;
    // if (this.bootstrapPromise) {
    //     return
    // }
    // this.view = new AppView({
    //     el: this.el
    // });
    types = [];
    if (helpers.isSupportedMobileOS()) {
        if (helpers.isiOSNative()) {
            types.push("iOSNative")
        }
        if (!helpers.isiPad() && !helpers.isInsideFrame()) {
            types.push("mobile")
        } else {
            types.push("tablet");
            if (helpers.isSmallScreen()) {
                types.push("smallScreen")
            }
        }
    } else {
        types.push("desktop")
    }
    // console.log("TYPES--------:");
    // console.log(types);
    appType.setTypes(types);
    // this.view.setAppType(appType);
    // return this.bootstrapPromise = API.request({
    //     url: "/bootstrap"
    // }).done(function(_this) {
    //     return function(json) {
    //         if (support.accounts()) {
    //             if (json.account) {
    //                 Account.setSharedAccount(json.account)
    //             }
    //         }
    //         if (json.livemode != null) {
    //             _this.livemode = !!json.livemode
    //         }
    //         variants.setOptions({
    //             livemode: _this.livemode
    //         });
    //         if (variants.isEnabled("country")) {
    //             geolocation.setLocation({
    //                 countryCode: variants.getVariant("country")
    //             })
    //         } else if (json.ipLocation) {
    //             geolocation.setLocation(json.ipLocation)
    //         }
    //         variants.setOptions({
    //             country: geolocation.countryCode
    //         });
    //         if (json.accountsDisabled || geolocation.countryCode === "AU") {
    //             support.disableAccounts()
    //         }
    //         if (json.apiEndpoint && json.apiEndpoint !== "https://api.stripe.com/v1") {
    //             return Stripe.endpoint = json.apiEndpoint
    //         } else {
    //             return Stripe.endpoint = "https://" + helpers.stripeUrlPrefix() + "api.stripe.com/v1"
    //         }
    //     }
    // }(this))
};

