import { join } from 'path';
import { PostMetadata } from '../utils/post';
import Updater from '../utils/updater';

// 存放 post meta 的 dir 目录名称
const postDirName = 'post';
export default function addPostFiles(posts: PostMetadata[], updater: Updater) {
  const { config } = updater;
  updater.htmlAdditions.POST_INFO = {
    count: posts.length,
    path: join(config.metaDir, postDirName)
  };
  updater.pages[postDirName] = posts;
}
