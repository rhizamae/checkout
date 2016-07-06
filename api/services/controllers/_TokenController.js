var TAG = "[_TokenController]";

function _TokenController(req) {
  this.secret_key = new Buffer(sails.config.magpie.secret_key + ":").toString('base64');
  this.public_key = new Buffer(req.body.key + ":").toString('base64');
  this.req = req;
}

_TokenController.prototype.findEmail = function(cb, result) {
  var ACTION = "[findEmail]";
  Remember.findOne({email: this.req.body.email}, function(err, data) {
    if (err) {
      Logger.log('error', TAG + ACTION, err);
      return cb(Errors.raise('DB_ERROR'));
    }
    console.log("findEmail---------");
    console.log(data);
    cb(null, data);
  });
}

_TokenController.prototype.getCustomer = function(cb, result) {
  var ACTION = "[getCustomer]";
  if (!result.findEmail) return cb();
  var obj = {
    authorization: this.secret_key,
    url: sails.config.magpie.url + '/v1/customers/' + result.findEmail.customer_id,
    method: "GET"
  };
  Magpie.request(obj, function(err, data) {
    return cb(err, data);
  });
}

_TokenController.prototype.createCustomer = function(cb, result) {
  var ACTION = "[createCustomer]";
  console.log("createCustomer--------");
  if (!this.req.body.msisdn) return cb();
  if (result.findEmail) return cb();
  var obj = {
    authorization: this.secret_key,
    body: {
      email: this.req.body.email,
      description: "Customer account created from Checkout."
    }
  };
  Magpie.createCustomer(obj, function(err, data) {
    return cb(err, data);
  });
}

_TokenController.prototype.rememberMe = function(cb, result) {
  var ACTION = "[rememberMe]";
  var _this = this;
  if (!this.req.body.msisdn) return cb();
  if (result.findEmail) return cb();
  Remember.create({
    msisdn: _this.req.body.msisdn,
    email: _this.req.body.card.name,
    customer_id: result.createCustomer.customer.id
  }, function(err, data) {
    if (err) {
      Logger.log('error', TAG + ACTION, err);
      return cb(Errors.raise('DB_ERROR'));
    }
    cb(null, data);
  });
}

_TokenController.prototype.createToken = function(cb, result) {
  var ACTION = "[createToken]";
  console.log("createToken-------");
  if (result.findEmail) return cb();
  var obj = {
    authorization: this.public_key,
    body: { card: this.req.body.card }
  };
  Magpie.getToken(obj, function(err, data) {
    return cb(err, data);
  });
}

_TokenController.prototype.updateCustomer = function(cb, result) {
  var ACTION = "[updateCustomer]";
  console.log("updateCustomer--------");
  if (!this.req.body.msisdn) return cb();
  if (result.findEmail) return cb();
  var obj = {
    authorization: this.secret_key,
    customer_id: result.createCustomer.customer.id,
    body: { source: result.createToken.token.id }
  };
  Magpie.updateCustomer(obj, function(err, data) {
    return cb(err, data);
  });
}

module.exports = _TokenController;