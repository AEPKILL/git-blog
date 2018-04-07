import {
  Configuration,
  HotModuleReplacementPlugin,
  NamedModulesPlugin
} from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const config: Configuration = {
  mode: 'development',
  plugins: [new HotModuleReplacementPlugin(), new NamedModulesPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    hot: true
  }
};

export default merge({}, baseConfig, config);
