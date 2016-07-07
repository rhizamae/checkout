var TAG = '[VCode]';

module.exports = {

  generate: function(mode, length) {
    var ACTION = "[generate]";
    var chars, code = '';
    switch(mode) {
      case 0:
        chars = "0123456789"; break;
      case 1:
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; break;
      case 2:
        chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; break;
      default:
        return null;
    }
    for (var i = length; i > 0; --i) {
      code += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return (length === true || code == '') ? null : code;
  },

  saveCode: function(options, cb) {
    var ACTION = "[saveCode]";
    async.auto({
      create: function(callback, results) {
        VCode.create(options, function(db_error, entry) {
          if (db_error) {
            Logger.log('error', TAG + ACTION + "[create]", db_error);
            return callback(Errors.raise('DB_ERROR'));
          }
          callback(null, entry);
        });
      },
      setExpiry: ['create', function(callback, results) {
        VCode.native(function (db_error, connection) {
          if (db_error) {
            Logger.log('error', TAG + ACTION + "[setExpiry]", db_error);
            return callback(Errors.raise('DB_ERROR'));
          }
          connection.ttl(sails.config.connections['redis'].prefix + results.create.id, function (err, res) {
            if (err) {
              Logger.log('error', TAG + ACTION + "[setExpiryTTL]", err);
              return callback(Errors.raise('DB_ERROR'));
            }
            callback();
          });
        });
      }],
    }, function(err, results) {
      cb(err, results.create);
    });
  },

  verifyCode: function(options, cb) {
    var ACTION = "[verifyCode]";
    async.auto({
      getEntry: function(callback, results) {
        VCode.findOne({ id: options.request_reference_num }, function(db_error, entry) {
          if (db_error) {
            callback(Errors.raise('DB_ERROR'));
          } else {
            if (!entry) {
              return callback(Errors.raise('NO_PENDING_CODE'));
            }
            console.log(entry);
            callback(null, entry);
          }
        });
      },
      verifyCode: ['getEntry', function(callback, results) {
        var entry = results.getEntry;
        if (entry.incorrect_attempts < sails.config.vcode.max_incorrect_attempts) {
          var expired = entry.expiry < new Date();
          if (options.vcode == entry.vcode) {
            if (expired) return callback(Errors.raise('EXPIRED_CODE'));
            return callback(null, true);
          } else {
            return callback(null, false);
          }
        } else {
          callback(Errors.raise("MAX_INCORRECT_VCODE"));
        }
      }],
      getExpiry: ['verifyCode', function(callback, results) {
        if (results.verifyCode) {
          callback();
        } else {
          VCode.native(function (err, connection) {
            if (err) {
              Logger.log('error', TAG + ACTION + "[getExpiry]", err);
              return callback(Errors.raise('DB_ERROR'));
            }
            connection.ttl(sails.config.connections['redis'].prefix + results.getEntry.id, function (err, res) {
              if (err) {
                Logger.log('error', TAG + ACTION + "[getExpiryTTL]", err);
                return callback(Errors.raise('DB_ERROR'));
              }
              callback(null, { connection: connection, ttl: res });
            });
          });
        }
      }],
      updateEntry: ['getExpiry', function(callback, results) {
        if (results.verifyCode) return callback();
        var entry = results.getEntry;
        entry.incorrect_attempts += 1;
        entry.save(function(err) {
          if (err) {
            Logger.log('error', TAG + ACTION + "[updateEntry]", err);
            return callback(Errors.raise('DB_ERROR'));
          }
          callback();
        });
      }],
      setExpiry: ['updateEntry', function(callback, results) {
        if (results.verifyCode) return callback();
        results.getExpiry.connection.expire(sails.config.connections['redis'].prefix + results.getEntry.id,
          results.getExpiry.ttl, function (err, res) {
            if (err) {
              Logger.log('error', TAG + ACTION, err);
              return callback(Errors.raise('DB_ERROR'));
            }
            callback(Errors.raise("INCORRECT_CODE"));
        });
      }]
    }, function(err, results) {
      if (err) {
        return cb(err);
      }
      cb(null, results.getEntry);
    });
  },
  
}