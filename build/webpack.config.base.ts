import copyPlugin from 'copy-webpack-plugin';
import htmlPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { buildComment } from './build-comment';

const htmlMiniOptions = {
  removeComments: false,
  minifyJS: false,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyURLs: true
};

const baseConfig: Configuration = {
  entry: {
    main: './src/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  context: resolve(__dirname, '..'),
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/images/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new copyPlugin([
      {
        from: './src/assets',
        to: 'assets',
        toType: 'dir',
        ignore: ['index.html']
      }
    ]),
    new htmlPlugin({
      template: './src/assets/index.html',
      filename: 'index.html',
      minify: htmlMiniOptions,
      buildComment
    }),
    new htmlPlugin({
      template: './src/assets/index.html',
      filename: '404.html',
      minify: htmlMiniOptions,
      buildComment
    })
  ],
  output: {
    filename: 'assets/js/[name].[contenthash:8].js',
    chunkFilename: 'assets/js/[name].[contenthash:8].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  }
};

export default baseConfig;
