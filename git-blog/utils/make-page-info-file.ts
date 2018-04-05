import { ensureDirSync, removeSync, writeJSONSync } from 'fs-extra';
import { join } from 'path';
import { BlogConfig } from '../utils/blog-config';
import getBlogConfig from './blog-config';
import * as workspace from './workspace';

export function makePageInfoFile<T>(
  items: T[],
  path: string,
  config: BlogConfig<T> = getBlogConfig(),
  clean = true
) {
  const pageSize = config.pageSize || 10;
  const rootPath = join(
    workspace.resolve(join(config.metaDir || 'meta'), config),
    path
  );
  let page = 0;
  if (clean) {
    removeSync(rootPath);
  }
  ensureDirSync(rootPath);
  while (page * pageSize < items.length) {
    const list = items.slice(page * pageSize, (page + 1) * pageSize);
    const info = {
      page,
      count: items.length,
      pageSize,
      pre: page > 0,
      next: (page + 1) * pageSize < items.length,
      items: list
    };
    const infoPath = join(rootPath, `${page}`);
    writeJSONSync(infoPath, info);
    page++;
  }
}
