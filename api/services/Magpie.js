var TAG = '[Magpie]';

module.exports = {

  request: function(options, cb) {
    var ACTION = '[request]';
    var _this = this;
    var ref_num = Utility.getRefNum();
    options.json = true,
    options.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + options.authorization
    };

    var requestclient = new RequestClient();
    requestclient.request.bind(requestclient);
    requestclient.request('MAGPIE', options, ref_num, function(err, result) {
      if (err) {
        cb(_this.parseError(err, ref_num));
      } else {
        cb(null, result);
      }
    });
  },

  getToken: function(options, cb) {
    var ACTION = '[getToken]';
    var _this = this;
    var ref_num = Utility.getRefNum();
    options.url = sails.config.magpie.url + '/v1/tokens';
    options.method = 'POST';
    options.json = true,
    options.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + options.authorization
    };

    var requestclient = new RequestClient();
    requestclient.request.bind(requestclient);
    requestclient.request('MAGPIE', options, ref_num, function(err, result) {
      if (err) {
        cb(_this.parseError(err, ref_num));
      } else {
        cb(null, result);
      }
    });
  },

  createCustomer: function(options, cb) {
    var ACTION = '[createCustomer]';
    var _this = this;
    var ref_num = Utility.getRefNum();
    options.url = sails.config.magpie.url + '/v1/customers';
    options.method = 'POST';
    options.json = true,
    options.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + options.authorization
    };

    var requestclient = new RequestClient();
    requestclient.request.bind(requestclient);
    requestclient.request('MAGPIE', options, ref_num, function(err, result) {
      if (err) {
        cb(_this.parseError(err, ref_num));
      } else {
        cb(null, result);
      }
    });
  },

  getCustomer: function(options, cb) {
    var ACTION = '[getCustomer]';
    var _this = this;
    var ref_num = Utility.getRefNum();
    options.url = sails.config.magpie.url + '/v1/customers/' + options.customer_id;
    options.method = 'GET';
    options.json = true,
    options.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + options.authorization
    };

    var requestclient = new RequestClient();
    requestclient.request.bind(requestclient);
    requestclient.request('MAGPIE', options, ref_num, function(err, result) {
      if (err) {
        cb(_this.parseError(err, ref_num));
      } else {
        cb(null, result);
      }
    });
  },

  updateCustomer: function(options, cb) {
    var ACTION = '[updateCustomer]';
    var _this = this;
    var ref_num = Utility.getRefNum();
    options.url = sails.config.magpie.url + '/v1/customers/' + options.customer_id;
    options.method = 'PUT';
    options.json = true,
    options.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + options.authorization
    };

    var requestclient = new RequestClient();
    requestclient.request.bind(requestclient);
    requestclient.request('MAGPIE', options, ref_num, function(err, result) {
      if (err) {
        cb(_this.parseError(err, ref_num));
      } else {
        cb(null, result);
      }
    });
  },

  parseError: function(error, ref_num) {
    var err_obj = Errors.raise('MAGPIE_SERVICE_ERROR');
    if (error.error && error.error.code) {
      if (error.error && error.error.code == Errors.raise('MAGPIE_SERVER_ERROR').error.code) {
        return error;
      }
      switch (error.error.code) {
        default:
          err_obj.error.details = {
            response_code: error.error.code || 'xxx',
            response_desc: error.error.msg || 'xxx',
            request_reference_no: ref_num || 'xxx'
          };
      }
    }
    return err_obj;
  },

}