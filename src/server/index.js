/* eslint-disable global-require */
import path from 'path'
import Server from '@frankmoney/webapp/es/server/Server'
import config from '../../config'
import initRoutes from './router'

const isProd = process.env.NODE_ENV === 'production'
const findUser = ({ graphqlClient }) =>
  graphqlClient(`{
  me {
    email
  }
  accounts {
  id
  }
}`).then(
    ({ me: user, accounts }) =>
      user && {
        ...user,
        // last account is default
        accountId:
          accounts && accounts.length > 0
            ? accounts[accounts.length - 1].id
            : null,
      }
  )

const server = new Server({
  ...config,
  faviconPath: path.join(__dirname, 'favicon.ico'),
  initRoutes,
  findUser,
})

if (isProd) {
  server.setupProd({
    assetsDir: path.join(__dirname, '..', '..', 'build', 'client'),
    // eslint-disable-next-line global-require
    stats: require('./webpack-assets.json'),
    // eslint-disable-next-line global-require
    ssr: require('../../build/ssr').default,
    ensureHttps: true,
  })
  server.listen()
} else {
  const webpackServerConfig = require('../../webpack.config.server')
  const webpackClientConfig = require('../../webpack.config.dev')
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('webpack')([webpackServerConfig], () => {
    server.setupDev({
      webpackServerConfig,
      webpackClientConfig,
    })
    server.listen()
  })
}
