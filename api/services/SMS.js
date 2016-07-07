var TAG = '[SMS]';
//var twilio = require('twilio')(sails.config.sms.twilio.sid, sails.config.sms.twilio.token);
var twilio = require('twilio');
var client = new twilio.RestClient(sails.config.twilio.sid, sails.config.twilio.token);

module.exports = {

  send: function(message, msisdn, cb) {
    var ACTION = '[send]';
    var payload = {
      body: message,
      to: '+' + msisdn,
      from: sails.config.twilio.sender
    };
    client.messages.create(payload, function (error, body) {
      if (error) {
        Logger.log('error', TAG + ACTION, error);
        return cb(Errors.raise('TWILIO_SERVICE_ERROR'));
      }
      Logger.log('debug', TAG + ACTION, 'sid: ' + body.sid);
      return cb();
    });
  },
 
}
