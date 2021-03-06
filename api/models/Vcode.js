module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  connection: 'redis',
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      required: true,
      unique: true
    },
    msisdn: {
      type: 'string',
      required: true
    },
    vcode: {
      type: 'string',
      required: false
    },
    details: { 
      type: 'json',
      defaultsTo: {}
    },
    incorrect_attempts : {
      type: 'integer',
      defaultsTo: 0
    },
    created_at: {
      type: 'datetime',
      defaultsTo: function() { return new Date(); }
    },
    updated_at: {
      type: 'datetime',
      defaultsTo: function() { return new Date(); }
    },
    toJSON: function() {
      var obj = this.toObject();
      return Utility.filterObject(obj);
    }
  },
  beforeUpdate:function(values,next) {
    values.updated_at = new Date();
    next();
  }
}
