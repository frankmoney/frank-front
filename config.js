const backendUrl = process.env.BACKEND_URL || 'http://back.frank-dev1.frank.ly'

module.exports = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 33307,
  backendUrl,
  graphqlEndpointPath: '',
  apiEndpointPath: '/api',
  authCookieName: process.env.AUTHENTICATION_COOKIE || 'at',
}
