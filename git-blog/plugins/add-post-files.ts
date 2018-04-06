import { join } from 'path';
import FileEmitter from '../utils/file-emitter';
import { PostMetadata } from '../utils/post';

// 存放 post meta 的 dir 目录名称
const postDirName = 'post';
export default function addPostFiles(
  posts: PostMetadata[],
  emiter: FileEmitter
) {
  const { config } = emiter;
  emiter.htmlAdditions.POST_INFO = {
    name: 'post',
    count: posts.length,
    path: join(config.metaDir, postDirName)
  };
  if (posts.length) {
    emiter.pages[postDirName] = posts;
  }
}
