import { resolve as pathResolve } from 'path';
import getBlogConfig, { BlogConfig } from './blog-config';

const workspace = process.cwd();

// tslint:disable-next-line:no-any
export function resolve(path: string, config: BlogConfig = getBlogConfig()) {
  return pathResolve(workspace, config.rootDir || './', path);
}

export default workspace;
