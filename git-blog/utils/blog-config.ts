import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// tslint:disable-next-line:no-any
export interface BlogConfig<T = any> {
  title: string;
  pageSize?: number;
  description?: string;
  autor?: string;
  language?: string;
  postDir?: string;
  metaDir?: string;
  rootDir?: string;
  theme?: string;
  htmlInject?: string[];
  extra?: T;
}

const configFileNames = ['.git-blog', 'git-blog.json'];
const defaultConfig: BlogConfig<undefined> = {
  title: 'GIT-BLOG',
  pageSize: 10,
  description: 'a fast, simple static blog framework',
  autor: 'AEPKILL',
  rootDir: '.',
  postDir: 'post',
  metaDir: 'meta',
  theme: 'default',
  htmlInject: ['404.html', 'index.html']
};

const workDir = process.cwd();

export default function getBlogConfig<T>(): BlogConfig<T> {
  const configPaths = configFileNames.map(name => join(workDir, name));
  const existsConfigPaths = configPaths.filter(path => existsSync(path));
  const configPath = existsConfigPaths[0];

  if (existsConfigPaths.length) {
    const userConfig = JSON.parse(
      readFileSync(configPath).toString()
    ) as BlogConfig<T>;
    return {
      ...defaultConfig,
      ...userConfig
    };
  }

  throw new Error(
    `Can't load GIT-BLOG config file: ${configPaths.join(' , ')}.`
  );
}
