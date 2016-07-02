module.exports = {
  get: function (tag) {
    var errors = {
      MISSING_INVALID_PARAMS: { status: 400, error: { code: -1, msg: 'Missing/invalid parameters.', 'params': [] }},
      UNAUTHORIZED: { status: 401, error: { code: -2, msg: 'Unauthorized.', spiel: this.getSpiel('UNAUTHORIZED') }},
      ACCOUNT_NOT_FOUND: { status: 404, error: { code: -3, msg: 'Account Not found.', spiel: this.getSpiel('ACCOUNT_NOT_FOUND') }},
      INTERNAL_SERVER_ERROR: { status: 500, error: { code: -4, msg: 'Internal server error.', spiel: this.getSpiel('SERVICE_ERROR') }},
      DB_ERROR: { 
        status: 503, 
        error: { 
          code: -5, 
          msg: 'Database error/unavailable.', 
          spiel: this.getSpiel('SERVICE_UNAVAILABLE') 
        }
      },
      PERMISSION_DENIED: { 
        status: 401, 
        error: { 
          code: -6, 
          msg: 'Permission denied.', 
          spiel: this.getSpiel('PERMISSION_DENIED') 
        }
      },
      MAGPIE_SERVER_ERROR: {
        status: 503,
        error: {
          code: -7, 
          msg: 'Magpie server unreachable.', 
          spiel: this.getSpiel('SERVICE_UNAVAILABLE')
        }
      },
      MAGPIE_SERVICE_ERROR: {
        status: 503,
        error: {
          code: -8,
          msg: 'Magpie service error or unavailable.',
          spiel: this.getSpiel('SERVICE_ERROR')
        }
      },
    };
    return errors[tag];
  },
  raise: function (e) {
    var error = JSON.parse(JSON.stringify(this.get(e)));
    return error;
  },
  getParam: function (tag) {
    var params = {
      id: {
        field: 'id',
        desc: 'Please enter a valid user id.'
      },
    };
    return params[tag];
  },
  getSpiel: function (tag) {
    var spiels = {
      SERVICE_UNAVAILABLE: 'We could not connect you to the service at the moment, please try again in a few minutes.',
      SERVICE_ERROR: 'We had a problem processing your request, please try again in a few minutes.',
      UNAUTHORIZED: 'Your session has expired, please login again.',
      INVALID_LOGIN: 'Username and password does not match. Please try again.',
      PERMISSION_DENIED: 'You are not authorized to access the site.',
      UNAUTHORIZED_INFO: 'You are unauthorized to access this information.',
      ACCOUNT_NOT_FOUND: 'Please register to sign in.'
    };
    return spiels[tag];
  }
};
