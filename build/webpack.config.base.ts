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
        oneOf: [
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true
            },
            exclude: /node_modules/
          }
        ]
      }
    ]
  },
  plugins: [
    new copyPlugin([
      {
        from: './src/assets',
        to: 'assets',
        toType: 'dir',
        ignore: ['index.html', '404.html']
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
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  }
};

export default baseConfig;
