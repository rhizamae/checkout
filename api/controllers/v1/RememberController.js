var TAG = "[RememberController]";
var req = require("rekuire");
var _RememberController = req("_RememberController");

module.exports = {

  email: function(req, res) {
    var ACTION = "[create]";
    Logger.log("debug", TAG + ACTION + " request params ", req.params);
    //res.ok({email: "sample email"});
    var _remember = new _RememberController(req);
    
    async.auto({
      findEmail     : _remember.findEmail.bind(_remember),
      getCustomer   : [ "findEmail", _remember.getCustomer.bind(_remember)],
      createSession : [ "getCustomer", _remember.createSession.bind(_remember)],
    }, function(err, results) {
      if (err) return res.error(err);
      res.ok(results.getCustomer);
    });
  }

}