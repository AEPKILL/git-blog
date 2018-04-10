import autoprefixer from 'autoprefixer';
import cleanPlugin from 'clean-webpack-plugin';
import extractTextPlugin from 'extract-text-webpack-plugin';
import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import ChunkInlineHtmlPlugin from './webpack-chunk-inline-html-plugin';
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
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      }
    ]
  },
  plugins: [
    new cleanPlugin(['dist/**/*'], { root: baseConfig.context }),
    new extractTextPlugin({
      filename: 'assets/css/[name].[hash:8].css'
    }),
    new ChunkInlineHtmlPlugin({
      inlineChunks: ['bootstrap', 'runtime']
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
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
