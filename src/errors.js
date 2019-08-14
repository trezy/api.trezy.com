const errors = {
  'forbidden': {
    detail: 'Forbidden',
    status: 403,
    title: 'User does not have permission to access this resource.',
  },

  'invalid-auth-header': {
    detail: 'Invalid Authorization Header',
    status: 401,
    title: 'Authorization header is invalid',
  },

  'login-required': {
    detail: 'Login Required',
    status: 401,
    title: 'User must be logged in to access this resource.',
  },

  'missing-auth-header': {
    detail: 'Missing Authorization Header',
    status: 401,
    title: 'Authorization header is not present',
  },
}





export default errors
