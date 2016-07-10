var session, request_reference_num, email, msisdn, client, card, cardPaymentViewIntance;
var vault = Checkout.getToken;
var remember = Checkout.remember;
var md = new MobileDetect(window.navigator.userAgent);
var init;

initializeView = function(client) {
  
  appBootstrap();
  var options = {};
  options.appType = appType;
  options.image = null;
  //console.log(appType);
  //var checkoutControllerInstance = new CheckoutController(options);

  cardPaymentViewIntance =  cardPaymentViewIntance ? cardPaymentViewIntance : new CardPaymentView(options) ;
  
  if (client.image) $("#image-logo").attr("src", client.image);
  if (appType.isMobile()) {
    $("#payAmount").html("<span class='iconA'></span>Pay ₱650.00<span class='iconB'></span>");
    $("header .close").hide();
  } else {
    $("#payAmount").html("Pay ₱"+client.amount);
  }
  
  $("#checkoutName").html(client.name);
  $("#checkoutDescription").html(client.description);
  
  if (md.mobile() != null) {
    // window.open("http://localhost:1337/mobile.html");
    window.open("http://localhost:1337/checkout.html");
  } else {
    window.parent.postMessage("open_iframe", "*");
    $(".overlayView").show();
    $(".stripeInFrame .overlayView").removeClass("unactive");
    $(".stripeInFrame .overlayView").addClass("active");
  }
};

init = function(client) {
  //console.log(client);
  this.client = client;
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
    //var valid_form = validateForm('.paymentView');
    //console.log("payAmount");
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
          Magpie.close();
          window.parent.postMessage(token, "*");
        }).catch(function(error) {
          console.log(error);
        });
    }
  });

  $(".checkoutView .close").on("click", function() {
    Magpie.close();
  });

}

// CALL INITIALIZE
init({});
// if (md.mobile() != null) { // if not mobile
//   console.log("initializee-------");
//   init({});
// }

login = function(session) {
  card = session.card;
  cardPaymentViewIntance =  new CardPaymentView();
  accountLogin(session.email);
  cardPaymentViewIntance.setCard(session.card);
}

logout = function(session) {
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

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
    var key = e.message ? "message" : "data";
    var data = JSON.parse(e[key]);
    // Checkout.client = data.client;
    // Checkout.merchant = data.merchant;
    init(data);
}, false);

