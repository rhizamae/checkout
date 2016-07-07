var TAG = "[VcodeController]";
var req = require("rekuire");
var _VcodeController = req("_VcodeController");

module.exports = {

  create: function(req, res) {
    var ACTION = "[create]";
    Logger.log("debug", TAG + ACTION + " request body ", req.body);

    var _vcode = new _VcodeController(req);
    
    async.auto({
      findEmail       : _vcode.findEmail.bind(_vcode),
      generateCode    : [ "findEmail", _vcode.generateCode.bind(_vcode)],
      saveVcode       : [ "generateCode", _vcode.saveVcode.bind(_vcode)],
      sendVcode       : [ "generateCode", _vcode.sendVcode.bind(_vcode)],
    }, function(err, results) {
      if (err) return res.error(err);
      var response = {
        request_reference_num: results.saveVcode.id
      };
      res.ok(response);
    });
  },

  verify: function(req, res) {
    var ACTION = "[create]";
    Logger.log("debug", TAG + ACTION + " request body ", req.body);

    var _vcode = new _VcodeController(req);
    
    async.auto({
      verifyCode       : _vcode.verifyCode.bind(_vcode),
      getCustomerCard  : [ "verifyCode", _vcode.getCustomerCard.bind(_vcode)],
    }, function(err, results) {
      if (err) return res.error(err);
      res.ok(results.getCustomerCard);
    });
  },

}