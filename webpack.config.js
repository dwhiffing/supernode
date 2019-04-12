var webpack = require('webpack')
var path = require('path')
var config = require('dotenv').config()

module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  resolve: {
    modulesDirectories: ['node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __PROCESS__: {
        USERNAME: JSON.stringify(config.parsed.USERNAME),
        PASSWORD: JSON.stringify(config.parsed.PASSWORD),
      },
    }),
  ],
  devtool: 'source-map',
  devServer: {
    port: process.env.PORT || 8080,
    contentBase: path.join(__dirname, 'static'),
  },
  node: {
    fs: 'empty',
  },
}
