const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./webpack.config.js');

const _src = './src';
const _package = require('./package.json');

module.exports = merge(config, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: _package.title + ' ' + _package.version,
      template: _src + '/index.html',
      files: {
        chunks: {
          main: "main.bundle.js",
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      'BUILD': JSON.stringify({
        version: _package.version,
        environment: 'prod'
      })
    }),
    new CopyWebpackPlugin([{
        context: 'src',
        from: 'favicon.ico',
        to: 'favicon.ico',
      },
      {
        context: 'src',
        from: 'apple-touch-icon.png',
        to: 'apple-touch-icon.png',
      },
    ]),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      cache: true,
      parallel: true,
    })],
  },
});