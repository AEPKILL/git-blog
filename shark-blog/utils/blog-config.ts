import { readJSONSync } from 'fs-extra';
import { configFileNames, getConfigFilePath } from './config-file-path';

// tslint:disable-next-line:no-any
export interface BlogConfig<T = any> {
  title: string;
  description: string;
  site: string;
  pageSize: number;
  author: string;
  language: string;
  postDir: string;
  metaDir: string;
  rootDir: string;
  theme: string;
  concat: string;
  publicPath: string;
  htmlInject: string[];
  extra?: T;
}

export type UserBlogConfig<T> = Partial<BlogConfig<T>>;

export const defaultConfig: BlogConfig = {
  title: 'SHARK-BLOG',
  description: 'a fast, simple static blog framework.',
  site: 'http://blog.aepkill.com',
  pageSize: 10,
  author: 'AEPKILL',
  concat: 'mailto:a@aepkill.com',
  language: 'zh-cn',
  rootDir: '.',
  postDir: 'post',
  metaDir: 'meta',
  theme: 'shark-blog',
  publicPath: '/',
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
