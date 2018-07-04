const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.config.common')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

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
  resolve: {
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
      'redux-form-actions/immutable$': path.join(
        __dirname,
        'node_modules',
        'redux-form-actions',
        'lib',
        'immutable.js'
      ),
      'react-jss$': path.join(__dirname, 'node_modules', 'react-jss', 'lib'),
      jss$: path.join(__dirname, 'node_modules', 'jss', 'lib'),
    },
  },
})
