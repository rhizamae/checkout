var TAG = "[TokenController]";
var req = require("rekuire");
var _TokenController = req("_TokenController");

module.exports = {

  create: function(req, res) {
    var ACTION = "[create]";
    Logger.log("debug", TAG + ACTION + " request body ", req.body);

    var _token = new _TokenController(req);
    
    async.auto({
      findEmail       : _token.findEmail.bind(_token),
      getCustomer     : [ "findEmail", _token.getCustomer.bind(_token)],
      createToken     : [ "findEmail", _token.createToken.bind(_token)],
      createCustomer  : [ "createToken", _token.createCustomer.bind(_token)],
      rememberMe      : [ "createCustomer", _token.rememberMe.bind(_token)],
      updateCustomer  : [ "createCustomer", "createToken", _token.updateCustomer.bind(_token)],
      createSession   : [ "updateCustomer", _token.createSession.bind(_token)],
    }, function(err, results) {
      if (err) return res.error(err);
      var response = results.getCustomer || results.createToken;
      res.ok(response);
    });
  },

}