import { readJSONSync } from 'fs-extra';
import { configFileNames, getConfigFilePath } from './config-file-path';

// tslint:disable-next-line:no-any
export interface BlogConfig<T = any> {
  title: string;
  pageSize: number;
  description: string;
  author: string;
  language: string;
  postDir: string;
  metaDir: string;
  rootDir: string;
  theme: string;
  publicPath: string;
  htmlInject: string[];
  extra?: T;
}

export type UserBlogConfig<T> = Partial<BlogConfig<T>>;

export const defaultConfig: BlogConfig = {
  title: 'SHARK-BLOG',
  pageSize: 10,
  description: 'a fast, simple static blog framework.',
  author: 'AEPKILL',
  language: 'zh-cn',
  rootDir: '.',
  postDir: 'post',
  metaDir: 'meta',
  theme: 'shark-blog',
  publicPath: '',
  htmlInject: ['404.html', 'index.html']
};

let config!: BlogConfig;

export function getConfig() {
  if (config) {
    return config;
  }
  const configFilePath = getConfigFilePath();

  if (!configFilePath) {
    throw new Error(
      `Can't find blog config file: ${configFileNames.join(' , ')}.`
    );
  }
  const userConfig: BlogConfig = readJSONSync(configFilePath);

  config = {
    ...defaultConfig,
    ...userConfig
  };

  config.theme = config.theme.trim();
  return config;
}

export default {
  getConfig
};
