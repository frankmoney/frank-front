const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config.common')

const sourcePath = resolve(__dirname, './src')
const buildPath = resolve(__dirname, 'build', 'client')
const widgetsPath = resolve(sourcePath, 'widgets')

const config = {
  name: 'client',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    widget: [resolve(widgetsPath, 'main.jsx')],
    loader: [resolve(widgetsPath, 'loader.js')],
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
    new HtmlWebpackPlugin({
      title: 'Widgets demo',
      template: resolve(widgetsPath, 'static', 'index.html'),
      chunks: ['loader'],
    }),
  ],
}

module.exports = config
