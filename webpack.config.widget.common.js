const path = require('path')
const url = require('url')
const webpack = require('webpack')
const { widgetPublicBackendUrl } = require('./config')

const sourcePath = path.join(__dirname, 'src')
const widgetSrc = path.join(sourcePath, 'widget')
const buildPath = path.join(__dirname, 'build', 'widget')
const publicPath = process.env.WIDGET_ASSETS_PATH || '/assets'

module.exports = {
  name: 'widget',
  target: 'web',
  context: widgetSrc,
  entry: {
    main: [path.join(widgetSrc, 'client.jsx')],
  },
  output: {
    path: buildPath,
    publicPath,
    // We do not use [chunkhash] in dev environments
    // also it conflicts with dev-middleware https://github.com/webpack/webpack/issues/2393
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devtool: 'source-map',
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
      __API_URL: JSON.stringify(url.resolve(widgetPublicBackendUrl, '/http')),
      __GRAPHQL_URL: JSON.stringify(widgetPublicBackendUrl),
      __SCRIPT_BASE_URL: JSON.stringify(url.resolve(publicPath, '/main.js')),
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
        'react.development.js'
      ),
      'react-dom$': path.join(
        __dirname,
        'node_modules',
        'react-dom',
        'cjs',
        'react-dom.development.js'
      ),
      'react-jss$': path.join(__dirname, 'node_modules', 'react-jss', 'lib'),
      jss$: path.join(__dirname, 'node_modules', 'jss', 'lib'),
    },
  },
}
