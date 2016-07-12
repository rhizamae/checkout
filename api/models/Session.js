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
    tab_id: {
      type: 'string',
      defaultsTo: null
    },
    client: { 
      type: 'json',
      defaultsTo: {}
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
      delete obj.created_at;
      delete obj.updated_at;
      return Utility.filterObject(obj);
    }
  },
  beforeUpdate:function(values,next) {
    values.updated_at = new Date();
    next();
  }
}
