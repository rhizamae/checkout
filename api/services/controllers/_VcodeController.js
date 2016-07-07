var TAG = "[_VcodeController]";

function _VcodeController(req) {
  this.secret_key = new Buffer(sails.config.magpie.secret_key + ":").toString('base64');
  this.req = req;
}

_VcodeController.prototype.findEmail = function(cb, result) {
  var ACTION = "[findEmail]";
  Remember.findOne({email: this.req.body.email}, function(err, data) {
    if (err) {
      Logger.log('error', TAG + ACTION, err);
      return cb(Errors.raise('DB_ERROR'));
    }
    if (!data) return cb(Errors.raise('GENERIC_NOT_FOUND'));
    cb(null, data);
  });
}

_VcodeController.prototype.generateCode = function(cb, result) {
  var ACTION = "[generateCode]";
  var vcode = VCodeHelper.generate(sails.config.vcode.mode, sails.config.vcode.length);
  cb(null, vcode);
}

_VcodeController.prototype.saveVcode = function(cb, result) {
  var ACTION = "[saveVcode]";
  var obj = {
    id: Utility.getRefNum(),
    msisdn: result.findEmail.msisdn,
    vcode: result.generateCode,
    details: JSON.parse(JSON.stringify(result.findEmail))
  };
  delete obj.details.id;
  delete obj.details.created_at;
  delete obj.details.updated_at;
  console.log(obj);
  VCodeHelper.saveCode(obj, function(err, data) {
    return cb(err, data);
  });
}

_VcodeController.prototype.sendVcode = function(cb, result) {
  var ACTION = "[sendVcode]";
  var msg = result.generateCode;
  SMS.send(msg, result.findEmail.msisdn, function(err, data) {
    cb();
  });
}

_VcodeController.prototype.verifyCode = function(cb, result) {
  var ACTION = "[verifyCode]";
  var obj = {
    request_reference_num: this.req.body.request_reference_num,
    vcode: this.req.body.vcode
  };
  VCodeHelper.verifyCode(obj, function(err, data) {
    console.log(data);
    return cb(err, data);
  });
}

_VcodeController.prototype.getCustomer = function(cb, result) {
  var ACTION = "[getCustomer]";
  var obj = {
    authorization: this.secret_key,
    url: sails.config.magpie.url + '/v1/customers/' + result.verifyCode.details.customer_id,
    method: "GET"
  };
  Magpie.request(obj, function(err, data) {
    if (err) return cb(err); 
    if (data.customer && data.customer.sources.length > 0) {
      //return cb(null, {card: data.customer.sources[0]});
      return cb(null, data);
    }
    cb(Errors.raise('INTERNAL_SERVER_ERROR'));
  });
}

_VcodeController.prototype.createSession = function(cb, result) {
  var ACTION = "[createSession]";
  var obj = {
    email: result.getCustomer.customer.email, 
    card: result.getCustomer.customer.sources[0]
  };
  Session.create(this.req, obj);
  cb();
}


module.exports = _VcodeController;