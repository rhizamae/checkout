$(document).ready(function() {

  var cardPaymentView = new CardPaymentView();
  
  // cardNumberInputSetVal(this.valueFromCard(this.numberInput, this.card), {
  //     prefill: true,
  //     type: this.card.type || this.card.brand
  // });

  // var cardPaymentView = new CardPaymentView();
  // //console.log(cardPaymentView);
  var card = {
    brand : "Visa",
    country : "US",
    cvc_check : "unchecked",
    exp_month : 12,
    exp_year : 2019,
    funding : "",
    id : "card_MTQ2NjNlZjE5Mzcy",
    issuing_bank : "Jpmorgan Chase Bank, N.A.",
    last4 : "1111",
    name : "rhiza.talavera@gmail.com",
    object : "card"
  };
  //console.log(cardPaymentView);
  cardPaymentView.setCard(card);

  $("#card-exp").payment('formatCardExpiry');
  //$("#cc-csc").payment('formatCardCVC');
  //$("#card-number").payment('formatCardNumber');

  $(".telInput input").mobilePhoneNumber();
  $(".telInput input").mobilePhoneNumber("country");

  $(".telInput input").mobilePhoneNumber({
      defaultPrefix: "+63"
  });

  $(".telInput input").val("+63");

  $(".checkbox-remember-me").on("click", function(e) {
    $(this).toggleClass("checked");
    //setExpandedVisible(true);
    setRememberMeDetails($(this).hasClass("checked"));
  });


});


// Function that does subclassing
// var __extends = function(child, parent) {
//   for (var key in parent) {
//     //console.log(key);
//     if (Object.prototype.hasOwnProperty.call(parent, key)) {
//       //console.log("-------" + key);
//       child[key] = parent[key];
//       //console.log(child[key]);
//     }
//   }
//   //console.log(child);
//   function ctor() { this.constructor = child; }
//   ctor.prototype = parent.prototype;
//   child.prototype = new ctor;
//   child.__super__ = parent.prototype;
//   //console.log(child.prototype);
//   //console.log("extends----");
//   //console.log(parent);
//   return child;
// };

// var Test, TestChild, instance;

// Test = function(id) { 
//   alert(id); 
// };
// Test2 = function(id) { 
//   return {color,};
// };

// var Temp = {
//   color: "red"
// };

// TestChild = function() {
//   // console.log("superrr");
//   // console.log(TestChild);
//   //console.log(TestChild.__super__);
//   console.log("----------");
//   console.log(this);
//   console.log(arguments);
//   //TestChild.__super__ = {};
//   TestChild.__super__.constructor.apply(this, arguments);
// }; 

// __extends(TestChild, Test);
// //__extends(TestChild, {color: "red"});
// //__extends(TestChild, Temp);

// TestChild.prototype.sound = function() {
//   console.log("Rawr");
// }

// instance = new TestChild('hi');
// instance.sound();



