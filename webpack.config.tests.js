const path = require('path')
const baseConfig = require('./webpack.config.server')
const merge = require('lodash/merge')

module.exports = merge({}, baseConfig, {
  resolve: {
    alias: {
      test: path.resolve(__dirname, './test'),
    },
  },
})
