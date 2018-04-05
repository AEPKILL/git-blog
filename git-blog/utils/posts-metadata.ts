import { readdirSync } from 'fs';
import { extname, join } from 'path';
import { BlogConfig } from './blog-config';
import getPostMetadata, { PostMetadata } from './post-metadata';
import * as workspace from './workspace';

// 收集所有文章的元数据
export default async function collectPostsMetadata<T>(config: BlogConfig<T>) {
  const postRoot = workspace.resolve(config.postDir!, config);
  const postPaths = readdirSync(postRoot)
    .filter(path => extname(path).toLowerCase() === '.md')
    .map(path => join(config.postDir!, path));
  const posts: PostMetadata[] = (await Promise.all(
    postPaths.map(path =>
      getPostMetadata(workspace.resolve(path, config), path)
    )
  )).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}
