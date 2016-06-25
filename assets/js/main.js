// required data

var Magpie = window.parent.Magpie;

var vault = Checkout.getToken;

$('#submit-checkout').val("Pay Php"+client.amount_to_pay);
$('h2#client-name').text(client.name);

$("#test-text").html("rhizamae");
$("#test-text").text("rhiza");

$('form#checkout').on("submit", function(e) {
  e.preventDefault();

  // get values of card info
  var email = $('#email').val();
  var cardNumber = $('#card-number').val();
  var expiry = $('#expiry').val();
  var cvc = $('#cvc').val();

  console.log("------------------------------");
  console.log(email);
  console.log("------------------------------");

  // request to magpie api
  vault(email, cardNumber, cvc, expiry, merchant.token, merchant.id)
    .then(function(token) {
      // invoke callback
      if (config.getTokenCallback) config.getTokenCallback(token);
    }).catch(function(error) {

      // display alert error
      alert(error);

    });


  // update UI eg. loading

});