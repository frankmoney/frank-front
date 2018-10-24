const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config.common')
const { graphqlEndpointPath, apiEndpointPath } = require('./config')

const sourcePath = path.join(__dirname, './src')
const buildPath = path.join(__dirname, 'build', 'client')
const widgetsPath = path.join(sourcePath, 'widgets')

const config = {
  name: 'client',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    widget: [path.join(widgetsPath, 'main.jsx')],
    loader: [path.join(widgetsPath, 'loader.js')],
  },
  output: {
    path: buildPath,
    filename: '[name].js',
  },
  devServer: {
    port: 33307,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  context: sourcePath,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: common.module,
  plugins: [
    new webpack.DefinePlugin({
      __API_URL: JSON.stringify(apiEndpointPath),
      __GRAPHQL_URL: JSON.stringify(
        path.join(apiEndpointPath, graphqlEndpointPath)
      ),
    }),
    new HtmlWebpackPlugin({
      title: 'Widgets demo',
      template: path.join(widgetsPath, 'static', 'index.html'),
      chunks: ['loader'],
    }),
  ],
}

module.exports = config
