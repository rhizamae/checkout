var TAG = "[_RememberController]";

function _RememberController(req) {
  this.secret_key = new Buffer(sails.config.magpie.secret_key + ":").toString('base64');
  this.req = req;
}

_RememberController.prototype.findEmail = function(cb, result) {
  var ACTION = "[findEmail]";
  Remember.findOne({email: this.req.params.email}, function(err, data) {
    if (err) {
      Logger.log('error', TAG + ACTION, err);
      return cb(Errors.raise('DB_ERROR'));
    }
    cb(null, data);
  });
}

_RememberController.prototype.getCustomer = function(cb, result) {
  var ACTION = "[getCustomer]";
  if (!result.findEmail) return cb(null, {});
  var obj = {
    authorization: this.secret_key,
    url: sails.config.magpie.url + '/v1/customers/' + result.findEmail.customer_id,
    method: "GET"
  };
  Magpie.request(obj, function(err, data) {
    return cb(err, data);
  });
}

_RememberController.prototype.createSession = function(cb, result) {
  var ACTION = "[createSession]";
  if (!result.findEmail) return cb(null, {});
  var obj = {
    email: this.req.params.email, 
    card: result.getCustomer.customer.sources[0]
  };
  SessionHelper.rememberMe(this.req, obj);
  cb();
}


module.exports = _RememberController;