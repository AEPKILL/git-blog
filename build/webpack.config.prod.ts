import cleanPlugin from 'clean-webpack-plugin';
import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const config: Configuration = {
  mode: 'production',
  devtool: false,
  plugins: [new cleanPlugin(['dist/**/*'], { root: baseConfig.context })]
};

export default merge({}, baseConfig, config);
