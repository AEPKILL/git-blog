import { join } from 'path';
import { PostMetadata } from './post-metadata';
import { Updater } from './updater';

export default function addTagsFiles(posts: PostMetadata[], updater: Updater) {
  const tagsInfo: { [key: string]: string } = {};
  for (const post of posts) {
    const tags = post.tags || [];
    for (const tag of tags) {
      const relativePath = join('tags', tag);
      if (!updater.pages[relativePath]) {
        updater.pages[relativePath] = [post];
      } else {
        updater.pages[relativePath].push(post);
      }
      tagsInfo[tag] = join(updater.config.metaDir || '', 'tags', tag);
    }
  }
  updater.htmlAdditions.TAGS_INFO = Object.keys(tagsInfo).map(key => ({
    tag: key,
    path: tagsInfo[key]
  }));
}
