import autoprefixer from 'autoprefixer';
import cleanPlugin from 'clean-webpack-plugin';
import miniCssExtractPlugin from 'mini-css-extract-plugin';
import uglifyPlugin from 'uglifyjs-webpack-plugin';
import { Configuration } from 'webpack';
import merge from 'webpack-merge';

import chunkInlineHtmlPlugin from './webpack-chunk-inline-html-plugin';
import baseConfig from './webpack.config.base';

const config: Configuration = {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new cleanPlugin(['dist/**/*'], { root: baseConfig.context }),
    new miniCssExtractPlugin({
      filename: 'assets/css/[name].[hash:8].css'
    }),
    new chunkInlineHtmlPlugin({
      inlineChunks: ['bootstrap', 'runtime']
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [
      new uglifyPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            warnings: false
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -20
        }
      }
    }
  },
  output: {
    filename: 'assets/js/[name].[contenthash:8].js',
    chunkFilename: 'assets/js/[name].[contenthash:8].js'
  }
};

export default merge({}, baseConfig, config);
