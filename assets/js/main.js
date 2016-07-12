
initializeView = function(client) {
    
  options.appType = appType;
  options.image = null;

  //var checkoutControllerInstance = new CheckoutController(options);
  cardPaymentViewIntance =  cardPaymentViewIntance ? cardPaymentViewIntance : new CardPaymentView(options) ;
  console.log("show--");
  $(".overlayView").show();
  if (client.image) $("#image-logo").attr("src", client.image);
  if (appType.isMobile()) {
    $("#payAmount").html("<span class='iconA'></span>Pay ₱" + client.amount +  "<span class='iconB'></span>");
    $("header .close").hide();
  } else {
    $("#payAmount").html("Pay ₱" + client.amount);
  }
  
  $("#checkoutName").html(client.name);
  $("#checkoutDescription").html(client.description);
  
  if (appType.isMobile()) { // if mobile
    // window.open("http://localhost:1337/mobile.html");
    //var targetWindow = window.open("http://localhost:1337/checkout.html");
    //targetWindow.postMessage("open_iframe_new_window", "*");
  } else {
    if (helpers.isInsideFrame()) {
      window.parent.postMessage("open_iframe", "*");
    }
    $(".overlayView").show();
    $(".stripeInFrame .overlayView").removeClass("unactive");
    $(".stripeInFrame .overlayView").addClass("active");
  }
};

init = function(client) {

  this.client = client;
  appBootstrap();
  initializeView(client);

  $('#email').on("change", function(e) {
    var valid = validateEmail($('.paymentView #email').val());
    if (valid) {
      var email = $('.paymentView #email').val();
      Checkout.remember(email)
        .then(function(data) {
          if (data.customer && data.customer.sources.length > 0) {
            //accountLogin(email);
            // card = data;
            verifyCodeView();
            codeInputInstance = new CodeInput({});
            getVerificationCode();
            //cardPaymentViewIntance.setCard(card.customer.sources[0]);
          }
        }).catch(function(error) {
          console.log(error);
        });
    }
  });

  $('.buttonsView').on("click", "#payAmount", function(e) {
    e.preventDefault();
    if ($(".profileSetting").css("display") == "block") {
      Magpie.close();
      window.parent.postMessage({card: card}, "*");
    } else if (validateForm('.paymentView')) {
      var key = "pk_test_aBTnnTX5QaO2AblZ5wNq2A" || client.key;
      var email = $('.paymentView #email').val();
      var cardNumber = $('.paymentView #card-number').val();
      var cvv = $('.paymentView #cc-csc').val();
      var expiry = $('.paymentView #card-exp').val();
      
      if ($(".checkbox-remember-me").hasClass("checked")) {
        var msisdn = $('.paymentView #msisdn').val().replace("+", "").replace(/ /g, "");
      }
      Checkout.getToken(key, email, cardNumber, cvv, expiry, msisdn)
        .then(function(token) {
          if (appType.isMobile() || this.client.session_type == "window") {
            window.opener.postMessage(token, "*");
            window.close();
          } else {
            window.parent.postMessage(token, "*");
            Magpie.close();
          }
        }).catch(function(error) {
          console.log(error);
        });
    }
  });

  $(".checkoutView .close").on("click", function() {
    Magpie.close();
  });

}

logoutSession = function(session) {
  Checkout.logout($('.paymentView #email').val())
    .then(function(data) {
      accountLogout();
      cardPaymentViewIntance.clear();
    }).catch(function(error) {
      console.log(error);
    });
}

getVerificationCode = function() {
  Checkout.getVcode($('.paymentView #email').val())
    .then(function(data) {
      request_reference_num = data.request_reference_num;
    }).catch(function(error) {
      console.log(error);
    });
}

verifyVerificationCode = function(vcode) {
  Checkout.verifyVcode(request_reference_num, vcode)
    .then(function(data) {
      card = data;
      backVerifyCode();
      accountLogin($('.paymentView #email').val());
      cardPaymentViewIntance.setCard(data.card);
    }).catch(function(error) {
      console.log(error);
    });
}

// Listen to message from child window
// eventer(messageEvent, function(e) {
//     var key = e.message ? "message" : "data";
//     var data = JSON.parse(e[key]);
//     updateClientDetails();
//     //saveClientDetails(data);
//     //loadClientDetails({details: data});
// }, false);

