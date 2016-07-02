// var config = Magpie.config;
// var merchant = Magpie.merchant;
// var client = Magpie.merchantClient;

var init = function init(data) {

  //var merchant = data.merchant;
  var client = data.client;
  var vault = Checkout.getToken;

  $("#payAmount").html("Pay ₱"+client.amount);
  $("#checkoutName").html(client.name);
  $("#checkoutDescription").html(client.description);

  $('#payAmount').on("click", function(e) {
    e.preventDefault();

    var valid_form = validateForm('.paymentView');
    valid_form = true;
    if (valid_form) {
      // get values of card info
      var key = client.key;
      var email = $('.paymentView #email').val();
      var cardNumber = $('.paymentView #card-number').val();
      var cvv = $('.paymentView #cc-csc').val();
      var expiry = $('.paymentView #card-exp').val();

      // request to magpie api
      vault(key, email, cardNumber, cvv, expiry)
        .then(function(token) {
          // invoke callback
          window.parent.postMessage(token, "*");
        }).catch(function(error) {
          // display alert error
          alert(error);
        });
    }
    // update UI eg. loading
  });

  $(".checkoutView .close").on("click", function() {
    Magpie.closeFrameView();
  });

  $('.loader-box').hide();
  $('.checkout-view').show();

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

    //run function//
}, false);

