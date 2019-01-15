const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.config.widget.common')

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin([common.output.path]),
    // use special module ids for caching
    new webpack.HashedModuleIdsPlugin(),
    new UglifyJsPlugin({
      extractComments: true,
      parallel: true,
      cache: true,
    }),
  ],
  resolve: {
    alias: {
      // somehow webpack bundles multiple react instances. specifiyng fixed path
      react: path.join(
        __dirname,
        'node_modules',
        'react',
        'cjs',
        'react.production.min.js'
      ),
      'react-dom$': path.join(
        __dirname,
        'node_modules',
        'react-dom',
        'cjs',
        'react-dom.production.min.js'
      ),
    },
  },
})
