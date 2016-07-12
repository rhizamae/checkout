var TAG = "[SessionController]";

module.exports = {

  create: function(req, res) {
    var ACTION = "[create]";
    console.log("CREATE SESSION");
    console.log(req.body);
    // req.session[req.body.distinct_id] = req.body;
    // // TODO: save to redis
    // console.log(req.session);
    // res.ok(req.session.client);

    SessionHelper.save(req.body, function(err, data) {
      if (err) {
        Logger.log('error', TAG + ACTION, err);
        //return callback(Errors.raise('DB_ERROR'));
      }
      console.log("CREATE SESSION RESPONSE");
      console.log(data);
      res.ok(data);
    });
  },

  update: function(req, res) {
    var ACTION = "[update]";
    console.log("UPDATE SESSION");
    console.log(req.body);

    Session.update({id: req.body.distinct_id }, {tab_id: req.body.tab_id}, function(err, data) {
      if (err) {
        Logger.log('error', TAG + ACTION, err);
      }
      res.ok(data[0]);
    });
  },

  delete: function(req, res) {
    req.session.destroy();
    res.ok({message: "Sign out successful."});
  }

}