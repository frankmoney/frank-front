const { resolve } = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config.common')

const sourcePath = resolve(__dirname, './src')
const buildPath = resolve(__dirname, 'build', 'client')
const widgetsPath = resolve(sourcePath, 'demo', 'Widgets', 'static')

const config = {
  name: 'client',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    widget: [resolve(sourcePath, 'widget.js')],
  },
  output: {
    path: buildPath,
    filename: '[name].js',
  },
  devServer: {
    port: 33307,
  },
  context: sourcePath,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: common.module,
  plugins: [
    new CleanWebpackPlugin([buildPath]),
    new HtmlWebpackPlugin({
      title: 'Widgets demo',
      template: resolve(widgetsPath, 'index.html'),
    }),
  ],
}

module.exports = config
