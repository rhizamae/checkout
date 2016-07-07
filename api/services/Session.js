var TAG = '[Session]';

module.exports = {

  create: function(req, obj) {
    var ACTION = "[create]";
    req.session.authenticated = {
      email: obj.email,
      card: obj.card
    };
    console.log(req.session.authenticated);
    Logger.log("debug", TAG + ACTION + " session created ", {email: obj.email});
    return true;
  },
 
}
