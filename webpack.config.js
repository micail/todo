const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.jsx'),
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
  module: {
    rules: [{
      test: /\.(jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
      resolve: { extensions: ['.ts', '.js', '.jsx', '.json'] },
    }, {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(jpg|jpeg|png|gif|mp3|svg|eot|woff|woff2|ttf)$/,
      loaders: ['file-loader'],
    }],
  },
};
