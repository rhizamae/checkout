var request_reference_num, email, msisdn, client;
var vault = Checkout.getToken;
var remember = Checkout.remember;

var init = function init(data) {

  client = data.client;
  initializeCheckoutView(client);
  cardPaymentViewIntance = new CardPaymentView();

  $('#email').on("change", function(e) {
    var email = $('.paymentView #email').val();
    Checkout.remember(email)
      .then(function(card) {
        if (card.customer && card.customer.sources.length > 0) {
          // console.log(card);
          //accountLogin(email);
          codeInputInstance = new CodeInput({});
          verifyCodeView();
          getVerificationCode();
          //cardPaymentViewIntance.setCard(card.customer.sources[0]);
        }
      }).catch(function(error) {
        console.log(error);
      });
  });

  $('#payAmount').on("click", function(e) {
    e.preventDefault();
    var valid_form = validateForm('.paymentView');
    if (valid_form) {
      var key = client.key;
      var email = $('.paymentView #email').val();
      var cardNumber = $('.paymentView #card-number').val();
      var cvv = $('.paymentView #cc-csc').val();
      var expiry = $('.paymentView #card-exp').val();
      
      if ($(".checkbox-remember-me").hasClass("checked")) {
        var msisdn = $('.paymentView #msisdn').val();
      }
      Checkout.getToken(key, email, cardNumber, cvv, expiry, msisdn)
        .then(function(token) {
          Magpie.closeFrameView();
          window.parent.postMessage(token, "*");
        }).catch(function(error) {
          console.log(error);
        });
    }
  });

  $(".checkoutView .close").on("click", function() {
    Magpie.closeFrameView();
  });

}

initializeCheckoutView = function(client) {
  $("#payAmount").html("Pay ₱"+client.amount);
  $("#checkoutName").html(client.name);
  $("#checkoutDescription").html(client.description);
};

getVerificationCode = function() {
  Checkout.getVcode($('.paymentView #email').val())
    .then(function(data) {
      request_reference_num = data.request_reference_num;
      console.log(data);
    }).catch(function(error) {
      console.log(error);
    });
}

verifyVerificationCode = function(vcode) {
  Checkout.verifyVcode(request_reference_num, vcode)
    .then(function(data) {
      console.log(data);
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

