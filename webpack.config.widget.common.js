const path = require('path')
const assert = require('assert')
const url = require('url')
const webpack = require('webpack')

const nodeEnv = process.env.NODE_ENV || 'development'
const webappUrl = process.env.WEBAPP_URL
const apiUrl = process.env.API_URL
const publicPath = process.env.ASSETS_PATH
assert(webappUrl, 'env WEBAPP_URL expected')
assert(apiUrl, 'env API_URL expected')
assert(publicPath, 'env ASSETS_PATH expected')

const sourcePath = path.join(__dirname, 'src')
const widgetSrc = path.join(sourcePath, 'widget')
const buildPath = path.join(__dirname, 'build', 'widget')

module.exports = {
  name: 'widget',
  target: 'web',
  context: widgetSrc,
  entry: {
    widget: [path.join(widgetSrc, 'client.jsx')],
    iframe: [path.join(widgetSrc, 'iframeClient.jsx')],
    embed: [path.join(widgetSrc, 'inlineClient.jsx')],
  },
  output: {
    path: buildPath,
    publicPath,
    // We do not use [chunkhash] in dev environments
    // also it conflicts with dev-middleware https://github.com/webpack/webpack/issues/2393
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|jss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: 'browser',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader',
        include: sourcePath,
      },
      {
        // fonts into the font folder,
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        // images into the image folder
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __WEBAPP_BASE_URL: JSON.stringify(webappUrl),
      __API_URL: JSON.stringify(url.resolve(apiUrl, 'http')),
      __GRAPHQL_URL: JSON.stringify(apiUrl),
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  resolve: {
    extensions: [
      '.webpack-loader.js',
      '.web-loader.js',
      '.loader.js',
      '.js',
      '.jsx',
    ],
    alias: {
      // somehow webpack bundles multiple react instances. specifiyng fixed path
      react: path.join(
        __dirname,
        'node_modules',
        'react',
        'cjs',
        nodeEnv === 'production'
          ? 'react.production.min.js'
          : 'react.development.js'
      ),
      'react-dom$': path.join(
        __dirname,
        'node_modules',
        'react-dom',
        'cjs',
        nodeEnv === 'production'
          ? 'react-dom.production.min.js'
          : 'react-dom.development.js'
      ),
      'react-jss$': path.join(__dirname, 'node_modules', 'react-jss', 'lib'),
      jss$: path.join(__dirname, 'node_modules', 'jss', 'lib'),
      // https://github.com/reduxjs/redux/issues/2878
      redux$: path.join(__dirname, 'node_modules', 'redux', 'lib'),
    },
  },
}
