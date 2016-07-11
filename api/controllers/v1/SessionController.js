var TAG = "[SessionController]";

module.exports = {

  create: function(req, res) {
    console.log("CREATE REQUEST BODY");
    console.log(req.body);
    req.session[req.body.distinct_id] = req.body;
    // TODO: save to redis
    console.log(req.session);
    res.ok(req.session.client);
  },

  delete: function(req, res) {
    req.session.destroy();
    res.ok({message: "Sign out successful."});
  }

}