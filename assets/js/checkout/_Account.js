// localStorage.setItem("lastname", "Smith");
// saveClientDetails = function(client) {
//   init(client);
//   var obj = {
//     session_tab: tab_id,
//     distinct_id: helpers.getQueryParameterByName("distinct_id"),
//     details: client
//   };
//   console.log(obj);
//   $.post("/v1/sessions", obj)
//   .done(function( data ) {
//     //location.reload();
//     console.log(data);
//   });
// }

updateClientDetails = function() {
  var obj = {
    tab_id: tab_id,
    distinct_id: helpers.getQueryParameterByName("distinct_id")
  };
  console.log(obj);
  $.ajax({
    type: "PUT",
    url: "/v1/sessions",
    data: obj,
    dataType: "json",
    success: function (data) {
      console.log(data);
      data = data.tab_id ? data.tab_id : "none";
      loadClientDetails(data);
    },
    error: function(error) {
      console.log("Error");
      console.log(error);
      loadClientDetails("none");
    }
  });
}

loadClientDetails = function(client) {
  console.log("loadSession: " + tab_id);
  console.log(client);
  if (client != "none" && !client.tab_id) {
    updateClientDetails();
  } else if (tab_id == client.tab_id) {
    $(".stripeErrorMessage").hide();
    init(client.details);
  } else {
    $(".overlayView").hide();
    $(".stripeErrorMessage").show();
    console.log("problem loading checkout page!");
  }
}

loginSession = function(session) {
  if (session != "none") {
    card = session.card;
    cardPaymentViewIntance =  new CardPaymentView();
    accountLogin(session.email);
    cardPaymentViewIntance.setCard(session.card);
  }
}

accountCheckCode = function(vcode) {
  //backVerifyCode();
  verifyVerificationCode(vcode);
  return;
}

accountLogin = function(email) {
  $(".profileSetting .logout").css("display", "inline");
  $(".profileSetting").show();
  $(".rememberDetails").hide();
  $(".inputEmail").hide();
  $(".profileSetting").css("opacity", "1");
  $(".profileSetting .loggedIn span").html(email);
  $(".backgroundBottom div").css("transform", "translateY(-565px)");
  $(".payButton").css("transform", "translateY(263px)");
  $(".inputCardNumber").css("transform", "translateY(25px)");

  if (appType.isMobile()) {
    $(".paymentView .layoutSubview.separatorPayment").hide();
    $(".inputPayment").css("transform", "translateY(181px)");
    $(".inputCardNumber").css("transform", "translateY(0)");
  } else {

  }
}

accountLogout = function() {
  $(".profileSetting").hide();
  $(".rememberDetails").show();
  $(".inputEmail").show();
  $(".profileSetting").css("opacity", "0");
  $(".backgroundBottom div").css("transform", "translateY(-470px)");
  $(".payButton").css("transform", "translateY(358px)");
  $(".inputCardNumber").css("transform", "translateY(55px)");
  $(".inputEmail #email").val("");

  if (appType.isMobile()) {
    $(".paymentView .layoutSubview.separatorPayment").show();
    $(".inputPayment").css("transform", "translateY(136px)");
    $(".inputCardNumber").css("transform", "translateY(46px)");
  } else {
    
  }
}

verifyCodeView = function() {
  //translateY(-527px) --- sending vcode
  //translateY(-475px)
  $(".codeInput .container").detach();
  $(".codeInput .dash").detach();

  $("header .back").show();
  $("header .back").css("opacity", "1");
  
  if (appType.isMobile()) {
    $(".paymentView").hide();
    $(".codeVerificationView").show();
    $(".buttonsView").hide();
  } else {
    $("header .close").hide();
    $(".inputPayment").hide();
    $(".codeVerification").show();
    $(".payButton").hide();
    $(".backgroundBottom div").css("transform", "translateY(-527px)");
  }
  
}

backVerifyCode = function() {
   
  $("header .back").hide();
  $("header .back").css("opacity", "0");

  if (appType.isMobile()) {
    $(".paymentView").show();
    $(".codeVerificationView").hide();
    $(".buttonsView").show();
  } else {
    $("header .close").show();
    $(".inputPayment").show();
    $(".codeVerification").hide();
    $(".payButton").show();
    $(".backgroundBottom div").css("transform", "translateY(-470px)");
  }
}

// var API, Account, EventDispatcher, VerificatorStatus, addressHelper, currentVerification, newAccountToken, newStripeJSToken, pixel, sharedAccount, tracker, translateAccountResponse, zipCode, _;
//     API = require("lib/api");
//     EventDispatcher = require("lib/eventDispatcher");
//     addressHelper = require("lib/addressHelper");
//     zipCode = require("lib/zipCode");
//     tracker = require("lib/tracker");
//     pixel = require("lib/pixel");
//     _ = require("vendor/lodash");
//     VerificatorStatus = require("vendor/verificator_status");
//     sharedAccount = null;
//     currentVerification = null;
//     Account = new EventDispatcher;
//     Account.sharedAccount = function() {
//         return sharedAccount
//     };
//     Account.setSharedAccount = function(account) {
//         var previousSharedAccount;
//         previousSharedAccount = sharedAccount;
//         sharedAccount = translateAccountResponse(account);
//         if (sharedAccount !== previousSharedAccount) {
//             return Account.trigger("sharedAccountChanged", account)
//         }
//     };
//     Account.clearSharedAccount = function() {
//         return Account.setSharedAccount(null)
//     };
//     Account.setAuthorizingAccount = function(account) {
//         return Account.trigger("authorizingAccountChanged", account)
//     };
//     Account.lookup = function(email) {
//         var params, promise;
//         params = {
//             email: email,
//             send: false
//         };
//         promise = API.request({
//             url: "/account/lookup",
//             data: params,
//             type: "GET",
//             dataType: "json"
//         }).then(function(resp) {
//             if ((resp != null ? resp.account : void 0) != null) {
//                 return translateAccountResponse(resp.account)
//             } else {
//                 return resp
//             }
//         });
//         return promise
//     };
//     Account.createAuthorization = function(email, merchant_name) {
//         var defer, params, promise, verificatorStatus;
//         defer = $.Deferred();
//         verificatorStatus = null;
//         params = {
//             email: email
//         };
//         if (merchant_name) {
//             params.merchant_name = merchant_name
//         }
//         API.request({
//             url: "/account/verifications",
//             data: params,
//             type: "POST",
//             dataType: "json"
//         }).done(function(resp) {
//             currentVerification = resp.id;
//             verificatorStatus = VerificatorStatus(resp.status_url);
//             return verificatorStatus.done(defer.resolve).fail(defer.reject)
//         }).fail(defer.reject);
//         promise = defer.promise();
//         promise.cancel = function() {
//             return verificatorStatus != null ? verificatorStatus.cancel() : void 0
//         };
//         return promise
//     };
//     Account.authorize = function(code) {
//         if (!currentVerification) {
//             return $.Deferred().reject("Failed to authorize account").promise()
//         }
//         return API.request({
//             url: "/account/verifications/" + currentVerification,
//             data: {
//                 code: code
//             },
//             type: "PUT",
//             dataType: "json"
//         }).then(function(response) {
//             var account;
//             account = response.account;
//             if (!account) {
//                 throw new Error("Failed to authorize account")
//             }
//             account.isNotRemembered = true;
//             tracker.state.setLoggedIn(true);
//             Account.setSharedAccount(account);
//             return sharedAccount
//         })
//     };
//     Account.newToken = function(params) {
//         var accountParams, promise, tokenParams, _ref;
//         if (!params.email) {
//             throw new Error("Email is not provided")
//         }
//         if (!(params.card || params.account)) {
//             throw new Error("Card is not provided")
//         }
//         tokenParams = {
//             email: params.email,
//             amount: params.amount,
//             currency: params.currency,
//             validation_type: params.phoneVerification ? "none" : "card",
//             payment_user_agent: "Stripe Checkout v3",
//             user_agent: navigator.userAgent,
//             device_id: pixel.getCookieID(),
//             referrer: params.referrer,
//             phone_verification: params.phoneVerification,
//             verification_allowed: params.verificationAllowed,
//             pasted_fields: (_ref = params.pastedFields) != null ? _ref.join(",") : void 0,
//             time_checkout_opened: params.timeOpened != null ? params.timeOpened : void 0,
//             time_checkout_loaded: params.timeLoaded != null ? params.timeLoaded : void 0,
//             force_address_verification: params.forceAddressVerification
//         };
//         tokenParams = _.pick(tokenParams, _.identity);
//         accountParams = $.extend({
//             remember_me: params.rememberAccount,
//             merchant_name: params.merchantName
//         }, tokenParams);
//         addressHelper.applyPrefix("billing", params.billingAddress, accountParams);
//         if (params.card) {
//             if (!API.hasValidCSRFToken()) {
//                 params.saveAccount = false;
//                 params.account = null
//             }
//             if (params.saveAccount || params.account) {
//                 API.useConnectStripeKey()
//             } else {
//                 API.useMerchantStripeKey()
//             }
//             promise = newStripeJSToken(tokenParams, params.card, params.billingAddress)
//         } else {
//             promise = newAccountToken(accountParams, params.billingAddress)
//         }
//         if (params.card && (params.saveAccount || params.account)) {
//             promise = promise.then(function(token) {
//                 var method;
//                 accountParams.token = token.id;
//                 if (params.account) {
//                     method = "PUT"
//                 } else {
//                     if (!params.phone) {
//                         throw new Error("Phone is not provided")
//                     }
//                     accountParams.phone = params.phone;
//                     method = "POST"
//                 }
//                 return API.request({
//                     url: "/account",
//                     data: accountParams,
//                     type: method,
//                     dataType: "json",
//                     timeout: 4e4
//                 }).then(function(resp) {
//                     tracker.state.setAccountCreated(true);
//                     tracker.track.accountCreateSuccess();
//                     if ((resp != null ? resp.token : void 0) != null) {
//                         return resp.token
//                     } else {
//                         return token
//                     }
//                 }).fail(function() {
//                     return tracker.track.accountCreateFail()
//                 })
//             })
//         }
//         return promise.then(function(token) {
//             var args;
//             args = {};
//             addressHelper.applyPrefix("billing", params.billingAddress, args, true);
//             addressHelper.applyPrefix("shipping", params.shippingAddress, args, true);
//             return {
//                 token: token,
//                 args: args
//             }
//         })
//     };
//     Account.logout = function(params) {
//         var promise;
//         if (params == null) {
//             params = {}
//         }
//         tracker.state.setLoggedIn(false);
//         Account.clearSharedAccount();
//         promise = API.request({
//             url: "/account/logout",
//             data: params,
//             type: "POST",
//             dataType: "json",
//             timeout: 4e4
//         });
//         return promise
//     };
//     newStripeJSToken = function(params, card, billingAddress) {
//         var defer, e, k, _i, _len, _ref;
//         defer = $.Deferred();
//         card = $.extend({}, card);
//         card.name = (billingAddress != null ? billingAddress.name : void 0) || params.email;
//         if (billingAddress != null) {
//             _ref = ["line1", "line2", "city", "state", "zip", "country"];
//             for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//                 k = _ref[_i];
//                 if (billingAddress[k]) {
//                     card["address_" + k] = billingAddress[k]
//                 }
//             }
//             addressHelper.normalizeLine1("", card)
//         }
//         try {
//             Stripe.createToken(card, params, function(status, response) {
//                 if (response.error) {
//                     return defer.reject(response.error)
//                 } else {
//                     return defer.resolve(response)
//                 }
//             })
//         } catch (_error) {
//             e = _error;
//             tracker.track.tokenError(e.message);
//             defer.reject({
//                 message: e.message
//             })
//         }
//         return defer.promise()
//     };
//     newAccountToken = function(params) {
//         var promise;
//         promise = API.request({
//             url: "/account/tokens",
//             data: params,
//             type: "POST",
//             dataType: "json",
//             timeout: 4e4
//         }).then(function(resp) {
//             if ((resp != null ? resp.token : void 0) != null) {
//                 return resp.token
//             } else {
//                 return resp
//             }
//         });
//         return promise
//     };
//     translateAccountResponse = function(acct) {
//         var addr, _ref;
//         if ((acct != null ? (_ref = acct.card) != null ? _ref.billing_address : void 0 : void 0) != null) {
//             addr = acct.card.billing_address;
//             delete acct.card.billing_address;
//             addressHelper.applyPrefix("billing", addr, acct)
//         }
//         return acct
//     };
//     module.exports = Account
// }).call(this)

