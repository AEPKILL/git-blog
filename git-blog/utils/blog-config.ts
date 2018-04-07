import { readJSONSync } from 'fs-extra';
import { configFileNames, getConfigFilePath } from './config-file-path';

// tslint:disable-next-line:no-any
export interface BlogConfig<T = any> {
  title: string;
  pageSize: number;
  description: string;
  autor: string;
  language: string;
  postDir: string;
  metaDir: string;
  rootDir: string;
  theme: string;
  publicPath: string;
  htmlInject: string[];
  keep: string[];
  extra?: T;
}

export type UserBlogConfig<T> = Partial<BlogConfig<T>>;

const defaultConfig: BlogConfig = {
  title: 'GIT-BLOG',
  pageSize: 10,
  description: 'a fast, simple static blog framework.',
  autor: 'AEPKILL',
  language: 'zh-cn',
  rootDir: '.',
  postDir: 'post',
  metaDir: 'meta',
  theme: 'git-blog',
  publicPath: '',
  htmlInject: ['404.html', 'index.html'],
  keep: []
};

let config!: BlogConfig;

export function getConfig() {
  if (config) {
    return config;
  }
  const configFilePath = getConfigFilePath();

  if (!configFilePath) {
    throw new Error(
      `Can't find GIT-BLOG config file: ${configFileNames.join(' , ')}.`
    );
  }
  const userConfig: BlogConfig = readJSONSync(configFilePath);

  config = {
    ...defaultConfig,
    ...userConfig
  };

  if (config.keep.indexOf(config.postDir) === -1) {
    config.keep.push(config.postDir);
  }
  config.theme = config.theme.trim();
  return config;
}

export default {
  getConfig
};
