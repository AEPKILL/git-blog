import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

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
  htmlInject: string[];
  extra?: T;
}

export type UserBlogConfig<T> = Partial<BlogConfig<T>>;

const configFileNames = ['.git-blog', 'git-blog.json'];

const defaultConfig: BlogConfig = {
  title: 'GIT-BLOG',
  pageSize: 10,
  description: 'a fast, simple static blog framework',
  autor: 'AEPKILL',
  language: 'zh-cn',
  rootDir: '.',
  postDir: 'post',
  metaDir: 'meta',
  theme: 'default',
  htmlInject: ['404.html', 'index.html']
};

const workDir = process.cwd();
const configPaths = configFileNames.map(name => join(workDir, name));
const existsConfigPaths = configPaths.filter(path => existsSync(path));
const configPath = existsConfigPaths[0];
let userConfig: BlogConfig;

if (existsConfigPaths.length) {
  userConfig = JSON.parse(readFileSync(configPath).toString()) as BlogConfig;
} else {
  throw new Error(
    `Can't load GIT-BLOG config file: ${configPaths.join(' , ')}.`
  );
}

const config = {
  ...defaultConfig,
  ...userConfig
};

export default config;
