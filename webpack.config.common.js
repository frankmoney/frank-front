const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const publicPath = process.env.WEBAPP_ASSETS_PATH || '/assets'
const sourcePath = path.join(__dirname, './src')
const buildPath = path.join(__dirname, 'build', 'client')

const { graphqlEndpointPath, apiEndpointPath } = require('./config')

module.exports = {
  name: 'client',
  target: 'web',
  context: sourcePath,
  entry: {
    main: [path.join(sourcePath, 'client.jsx')],
  },
  output: {
    path: buildPath,
    publicPath,
  },
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
              name: 'fonts/[name].[ext]',
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
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER: false,
      __CLIENT: true,
      __API_URL: JSON.stringify(apiEndpointPath),
      __GRAPHQL_URL: JSON.stringify(
        path.join(apiEndpointPath, graphqlEndpointPath)
      ),
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    // extract huge libraries out of main file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks(module) {
        return module.context && module.context.includes('node_modules')
      },
    }),
    // extract webpack runtime out of main file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    // we do not want moment localization shit, use only default EN locale
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // persist manifest.json file
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: false,
    }),
    // persist webpack stats to server directory
    new AssetsPlugin({
      path: path.join(sourcePath, 'server'),
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
      // redux-form/SubmissionError requires both from es/ and lib/ folder that caused error
      'redux-form': path.resolve(
        __dirname,
        'node_modules',
        'redux-form',
        'lib'
      ),
      constants: path.join(sourcePath, 'constants.js'),
      // TODO роутим все реквайры с rxjs на одну папку так как во внутренней библиотеке(вебапп)
      // идет extend Observable и он может заэкстендить из своей локальной node_modules
      // see enhanceObservable in @webapp
      rxjs: path.resolve(__dirname, 'node_modules', 'rxjs'),
      'moment-timezone':
        'moment-timezone/builds/moment-timezone-with-data-2012-2022',
    },
  },
}
