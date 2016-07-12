var TAG = '[SessionHelper]';

module.exports = {

  rememberMe: function(req, obj) {
    var ACTION = "[create]";
    req.session.authenticated = {
      email: obj.email,
      card: obj.card
    };
    //console.log(req.session.authenticated);
    Logger.log("debug", TAG + ACTION + " session created ", {email: obj.email});
    return true;
  },

  save: function(options, cb) {
    var TAG = "[save]";
    async.auto({
      find: function(callback, results) {
        Session.findOne({ id: options.distinct_id }, function(err, data) {
          if (err) {
            Logger.log('error', TAG + ACTION, err);
            return callback(Errors.raise('DB_ERROR'));
          }
          callback(null, data);
        });
      },
      create: ['find', function(callback, results) {
        if (results.find) return callback();
        Session.create({
          id: options.distinct_id,
          details: options.details
        }, function(err, data) {
          if (err) {
            Logger.log('error', TAG + ACTION, err);
            return callback(Errors.raise('DB_ERROR'));
          }
          callback(null, data);
        });
      }],
      update: ['find', function(callback, results) {
        if (!results.find) return callback();
        Session.update({ id: options.distinct_id }, {details: options.details}, function(err, data) {
          if (err) {
            Logger.log('error', TAG + ACTION, err);
            return callback(Errors.raise('DB_ERROR'));
          }
          callback(null, data);
        });
      }],
      setExpiry: ['create', 'update', function(callback, results) {
        var session_id = results.create || results.update;
        Session.native(function (err, connection) {
          if (err) {
            Logger.log('error', TAG + ACTION, err);
            return callback(Errors.raise('DB_ERROR'));
          }
          connection.ttl(sails.config.connections['redis'].prefix_session + session_id, function (err, res) {
            if (err) {
              Logger.log('error', TAG + ACTION, err);
              return callback(Errors.raise('DB_ERROR'));
            }
            callback(null, { connection: connection, ttl: res });
          });
        });
      }],
    }, function(err, result) {
      if (err) return cb(err);
      cb(null, options);
    });
  },
 
}
