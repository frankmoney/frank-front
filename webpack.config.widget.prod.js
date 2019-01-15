const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { backendUrl, apiEndpointPath, graphqlEndpointPath } = require('./config')

const sourcePath = path.join(__dirname, 'src')
const widgetSrc = path.join(sourcePath, 'widget')
const buildPath = path.join(__dirname, 'build', 'widget')
const publicPath = process.env.WIDGET_ASSETS_PATH || '/assets'

module.exports = {
  name: 'client',
  target: 'web',
  context: widgetSrc,
  entry: {
    main: [path.join(widgetSrc, 'client.jsx')],
  },
  output: {
    path: buildPath,
    publicPath,
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
      __API_URL: JSON.stringify(`${backendUrl}/http`),
      __GRAPHQL_URL: JSON.stringify(backendUrl),
      __SCRIPT_BASE_URL: JSON.stringify(`${publicPath}/main.js`),
    }),
    new CleanWebpackPlugin([buildPath]),
    // use special module ids for caching
    new webpack.HashedModuleIdsPlugin(),
    new UglifyJsPlugin({
      extractComments: true,
      parallel: true,
      cache: true,
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
