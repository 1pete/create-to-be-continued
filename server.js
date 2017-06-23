/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const WebpackDevServer = require('webpack-dev-server')

const webpackConfig = require('./webpack.config')()

const port = 3000

webpackConfig.entry.unshift(...[
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server',
])

const compiler = webpack(webpackConfig)
compiler.apply(new DashboardPlugin())

new WebpackDevServer(compiler, {
  noInfo: true,
  quiet: true,
  hot: true,
  contentBase: false,
  historyApiFallback: true,
}).listen(port)
