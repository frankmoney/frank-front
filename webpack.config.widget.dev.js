const path = require('path')
const merge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
const common = require('./webpack.config.widget.common')

module.exports = merge(common, {
  plugins: [
    new SpeedMeasurePlugin(),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(common.context, '/index.html'),
        to: common.output.path,
      },
    ]),
    // new BundleAnalyzerPlugin({ disabled: false, openAnalyzer: true }),
  ],
  devServer: {
    contentBase: common.output.path,
    historyApiFallback: true,
    port: 8082,
    compress: false,
    inline: false,
    hot: false,
    host: '0.0.0.0',
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // famous CORS fonts issue
    },
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
})
