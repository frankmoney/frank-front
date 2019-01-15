const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built

const sourcePath = path.join(__dirname, './src')
const buildPath = path.join(__dirname, './build')

const publicPath = process.env.WEBAPP_ASSETS_PATH || '/assets/'
const nodeExternals = require('webpack-node-externals')

module.exports = {
  name: 'server',
  context: sourcePath,
  entry: './server/ssr.jsx',
  output: {
    path: buildPath,
    libraryTarget: 'commonjs2',
    filename: 'ssr.js',
    publicPath,
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|jss)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            envName: 'server',
          },
        },
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
  resolve: {
    extensions: [
      '.webpack-loader.js',
      '.web-loader.js',
      '.loader.js',
      '.js',
      '.jsx',
    ],
    alias: {
      'redux-form': path.resolve(
        __dirname,
        'node_modules',
        'redux-form',
        'lib'
      ),
      constants: path.join(sourcePath, 'constants.js'),
    },
    modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
  },
  externals: nodeExternals({
    whitelist: [
      '@frankmoney/components-csr',
      '@frankmoney/webapp',
      '@frankmoney/fonts',
    ],
  }),
  devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new WriteFilePlugin(),
    new webpack.DefinePlugin({
      __PUBLIC_PATH: JSON.stringify(publicPath),
    }),
  ],
}
