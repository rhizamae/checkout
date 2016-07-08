var TAG = "[TokenController]";
var req = require("rekuire");
var _TokenController = req("_TokenController");

module.exports = {

  create: function(req, res) {
    var ACTION = "[create]";
    Logger.log("debug", TAG + ACTION + " request body ", req.body);

    var _token = new _TokenController(req);
    
    async.auto({
      createToken     :  _token.createToken.bind(_token),
      createCustomer  : _token.createCustomer.bind(_token),
      rememberMe      : [ "createCustomer", _token.rememberMe.bind(_token)],
      updateCustomer  : [ "createCustomer", "createToken", _token.updateCustomer.bind(_token)],
      createSession   : [ "updateCustomer", _token.createSession.bind(_token)],
    }, function(err, results) {
      if (err) return res.error(err);
      console.log(results);
      var response = results.createToken;
      if (results.updateCustomer && results.updateCustomer.customer.sources.length > 0) {
        response = { card: results.updateCustomer.customer.sources[0] };
      }
      res.ok(response);
    });
  },

}