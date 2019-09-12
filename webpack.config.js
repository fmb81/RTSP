const webpack = require('webpack')
const {
  createConfig,
  match,
  babel,
  devServer,
  file,
  uglify,
  addPlugins,
  setEnv,
  entryPoint,
  env,
  setOutput,
  sourceMaps,
  resolve,
} = require('webpack-blocks')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const splitVendor = require('webpack-blocks-split-vendor')
const path = require('path')
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const sourceDir = process.env.SOURCE || 'src'
const publicPath = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')
const sourcePath = path.join(process.cwd(), sourceDir)
const outputPath = path.join(process.cwd(), 'dist')


module.exports = createConfig([
  entryPoint('./src/index.js'),
  setOutput({
    filename: '[name].js',
    path: outputPath,
    publicPath,
  }),
  babel(),
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.webp'], [
    file()
  ]),
  setEnv({
    NODE_ENV: process.env.NODE_ENV
  }),
  resolve({
    modules: [].concat(sourceDir, ['node_modules']),
  }),
  addPlugins([
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public/index.html'),
    }),
  ]),
  env('development', [
    devServer(),
    sourceMaps()
  ]),
  env('production', [
    uglify(),
    addPlugins([new webpack.LoaderOptionsPlugin({ minimize: true })])
  ])
])