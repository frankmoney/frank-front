process.env.BABEL_ENV = 'server'
require('@babel/register')

global.__CLIENT = false
global.__SERVER = true
global.__BACKEND_URL = require('../config').backendUrl

require('../src/server')
