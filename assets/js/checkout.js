var Checkout = Checkout || (function(window, document) {

  var _super = this;

  var apiRequest = function apiRequest(method, url, data, response_success, response_error) {
    console.log(arguments); // for debugging only
    
    $.ajax({
      type: method,
      url: url,
      data: data,
      dataType: "json",
      success: function (result) {
        response_success(result);
        // Magpie.closeFrameView();
      },
      error: function(error) {
        response_error(error);
      },
      complete: function() {
      }
    });
  }

  var getToken = function getToken(key, email, cardNumber, cvv, expiry, msisdn) {
    return new Promise(function getTokenPromise(resolve, reject) {
      expiry = expiry.split("/");
      var obj = {
        key: key,
        msisdn: msisdn,
        card: {
          name: email,
          number: cardNumber.replace(/ /g, ''),
          exp_month: expiry[0],
          exp_year: expiry[1],
          cvc: cvv
        }
      };
      apiRequest("POST", "/v1/tokens", obj, resolve, reject);
    });
  }

  var remember = function remember(email) {
    return new Promise(function rememberPromise(resolve, reject) {
      apiRequest("GET", "/v1/remember/" + email, {}, resolve, reject);
    });
  }

  return {
    getToken: getToken,
    remember: remember
  }

})(window, document);