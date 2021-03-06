const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.config.common')

module.exports = merge(common, {
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
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
})
