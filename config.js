const backendUrl = process.env.BACKEND_URL || 'http://back.frank-dev1.frank.ly'
const publicUrl = process.env.PUBLIC_URL || ''

module.exports = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 33307,
  backendUrl,
  publicUrl,
  widgetPublicBackendUrl: backendUrl,
  widgetScriptUrl:
    process.env.WIDGET_SCRIPT_PATH || 'http://localhost:8082/assets/main.js',
  graphqlEndpointPath: '',
  apiEndpointPath: '/api',
  authCookieName: process.env.AUTHENTICATION_COOKIE || 'at',
}
