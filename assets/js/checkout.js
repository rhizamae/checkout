var Checkout = Checkout || (function(window, document) {

  var _super = this;

  var apiRequest = function apiRequest(method, url, data, success, error) {
    console.log(arguments);
  }

  var getToken = function getToken(email, cardNumber, cvv, expiryDate, merchantToken, merchantId) {
    
    return new Promise(function getTokenPromise(resolve, reject) {

      // add this to success callback of xhr request
      // resolve("token_12000");

      // add this to error callback of xhr request
      // reject("invalid credentials");

      _super.apirequest("POST", "apiUrl", {}, resolve, reject);

    });
  }

  return {
    getToken: getToken
  }

})(window, document);