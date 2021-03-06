const path = require('path')
const webpack = require('webpack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FaviconsPlugin = require('favicons-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const root = path.resolve()
const dist = path.resolve('dist')

module.exports = (env) => {
  const isDev = env !== 'prod'

  const config = {
    context: root,
    entry: [
      'core-js/es6/array',
      'core-js/es6/object',
      'core-js/es6/promise',
      'core-js/es6/string',
      'core-js/es7/array',
      'core-js/es7/object',
      'core-js/es7/string',
      './src/styles/index.scss',
      './src/index',
    ],
    output: {
      path: dist,
      publicPath: '/',
      filename: 'bundle.js',
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
        {
          test: /\.scss$/,
          use:
            isDev
            ? ['style-loader?sourceMap', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            : ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] }),
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [{ loader: 'file-loader', options: { name: 'public/fonts/[name].[ext]' } }],
        },
        {
          test: /\.(png)$/,
          use: ['base64-image-loader'],
        },
      ],
    },
    devtool: isDev ? 'eval-source-map' : 'none',
    recordsOutputPath: path.resolve('records.json'),
    plugins: [
      new HtmlPlugin({ template: './src/index.html' }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
        },
        __DEV__: isDev,
      }),
    ],
  }

  if (isDev) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    )
  } else {
    config.plugins.push(
      new CleanPlugin(['dist'], { root }),
      new CopyPlugin([{ from: 'src/manifest.json' }]),
      new ExtractTextPlugin('styles.css'),
      new FaviconsPlugin({
        logo: path.resolve('src/logo.png'),
        title: 'Create - To Be Continued',
        prefix: 'icons/',
        background: '#F57C00',
      }),
      new OfflinePlugin({
        ServiceWorker: {
          cacheName: 'tbc',
          events: true,
        },
        AppCache: false,
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, screw_ie8: true },
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve('report.html'),
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: path.resolve('stats.json'),
      }),
    )
  }

  return config
}
