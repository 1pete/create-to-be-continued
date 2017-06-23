const path = require('path')
const webpack = require('webpack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const root = path.resolve()
const dist = path.resolve('dist')

module.exports = (env) => {
  const isDev = env !== 'prod'

  const config = {
    context: root,
    entry: [
      'core-js/shim',
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
            ? ['style-loader', 'css-loader', 'sass-loader']
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
      new ExtractTextPlugin('styles.css'),
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
