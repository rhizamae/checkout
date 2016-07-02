var TAG = "[TokenController]";

module.exports = {

  create: function(req, res) {
    var ACTION = "[create]";
    Logger.log('debug', TAG + ACTION + ' request body ', req.body);

    var authorization = new Buffer(req.body.key + ":").toString('base64');
  
    var obj = {
      authorization: authorization,
      body: {
        card: req.body.card
      }
    };
    Magpie.getToken(obj, function(err, data) {
      if (err) {
        Logger.log('error', TAG + ACTION, err);
        return res.error(err);
      }
      res.ok(data);
    });
    
    //res.ok({token: "sampletoken"});
  }

}