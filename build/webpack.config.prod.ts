import autoprefixer from 'autoprefixer';
import cleanPlugin from 'clean-webpack-plugin';
import extractTextPlugin from 'extract-text-webpack-plugin';
import { Configuration } from 'webpack';
import merge from 'webpack-merge';
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
                parser: require('postcss-scss'),
                plugins: () => [
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
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new cleanPlugin(['dist/**/*'], { root: baseConfig.context }),
    new extractTextPlugin({
      filename: 'css/[name].[hash:8].css'
    })
  ],
  optimization: {
    runtimeChunk: 'single'
  }
};

export default merge({}, baseConfig, config);
