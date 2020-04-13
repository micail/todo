const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const _src = './src';
const _dist = './dist';
const config = require('./webpack.config.js');
const _package = require('./package.json');

module.exports = merge(config, {
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devServer: {
    contentBase: _dist,
    writeToDisk: true,
    host: '0.0.0.0',
    port: 3000,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
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
        NODE_ENV: JSON.stringify('production'),
      },
      'BUILD': JSON.stringify({
        version: _package.version,
        environment: 'dev',
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
});
