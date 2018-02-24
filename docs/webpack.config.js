const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const appPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const highlight = require('rehype-highlight');

module.exports = {
  entry: appPath,
  mode: 'development',
  output: {
    filename: '[name].js',
    path: distPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.md$/,
        // Use @hugmanrique/react-markdown-loader instead
        use: ['babel-loader', {
          loader: path.resolve(__dirname, '..'),
          options: {
            rehypePlugins: [
              require('rehype-highlight')
            ]
          }
        }]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                minimize: production,
                localIdentName: `[hash:base64:5]${production ? '' : '_[local]'}`
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(appPath, 'style')]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      // Disable on progressive dev builds
      disable: !production
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(appPath, 'template.ejs'),
      minify: production
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        : false
    })
  ]
};
