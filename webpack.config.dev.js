const path = require('path')
const merge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const common = require('./webpack.config.common')

module.exports = merge(common, {
  devtool: 'source-map',
  output: {
    // We do not use [chunkhash] in dev environments
    // also it conflicts with dev-middleware https://github.com/webpack/webpack/issues/2393
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new SpeedMeasurePlugin(),
    new WriteFilePlugin(),
    // new BundleAnalyzerPlugin({ disabled: true, openAnalyzer: false }),
  ],
})
