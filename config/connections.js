module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  postgresql: {
    adapter: 'sails-postgresql',
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'checkout_development'
  },

  redis: {
    adapter: 'sails-redis',
    host: 'localhost',
    port: 6379,
    prefix: 'waterline:vcode:id:',
    ttl: 60 * 60, // in seconds
    database: 0
  },

};
