const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css',
});

module.exports = {
  entry: [
    'babel-polyfill',
    './src/js/index.js',
    './src/scss/main.scss',
    './src/vendors/mdb/scss/mdb.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: [/node_modules/, /vendors/],
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js?$/,
        exclude: [/node_modules/, /vendors/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'stage-0'],
            },
          },
        ],
      },
      {
        test: /\.scss?$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      // Font-awesome 4.7.X
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/vendors/, /img/],
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      // MDB
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/node_modules/, /img/],
        loader: 'file-loader?name=font/roboto/[name].[ext]',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
        },
      },
    ],
  },
  plugins: [
    extractPlugin,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Waves: 'node-waves',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: 'src/pdp.html',
      inject: 'body',
      filename: 'pdp.html',
    }),
    new HtmlWebpackPlugin({
      template: 'src/contact-us.html',
      inject: 'body',
      filename: 'contactus.html',
    }),
    new HtmlWebpackPlugin({
      template: 'src/error.html',
      inject: 'body',
      filename: 'error.html',
    }),
    new CleanWebpackPlugin(['dist']),
  ],
  devtool: 'source-map',
  target: 'web',
};
