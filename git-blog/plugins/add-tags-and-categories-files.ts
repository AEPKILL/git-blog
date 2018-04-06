import { join } from 'path';
import { PostMetadata } from '../utils/post';
import Updater from '../utils/updater';

const tagsDirName = 'tags';
const categoriesDirName = 'categories';
export default function addTagsFiles(posts: PostMetadata[], updater: Updater) {
  const tagsInfo = new Map<string, string>();
  const categoriesInfo = new Map<string, string>();

  for (const post of posts) {
    const tags = post.tags || [];
    const categories = post.categories;

    // process tags
    for (const tag of tags) {
      const relativePath = join(tagsDirName, tag);
      if (!updater.pages[relativePath]) {
        updater.pages[relativePath] = [post];
      } else {
        updater.pages[relativePath].push(post);
      }
      tagsInfo.set(tag, join(updater.config.metaDir, tagsDirName, tag));
    }

    // process categories
    if (categories) {
      const relativePath = join(categoriesDirName, categories);
      categoriesInfo.set(
        categories,
        join(updater.config.metaDir, categoriesDirName, categories)
      );
      if (!updater.pages[relativePath]) {
        updater.pages[relativePath] = [post];
      } else {
        updater.pages[relativePath].push(post);
      }
    }
  }
  const tagKeys = [...tagsInfo.keys()];
  const categoriesKeys = [...categoriesInfo.keys()];

  updater.htmlAdditions.TAGS_INFO = tagKeys.map(key => ({
    name: key,
    path: tagsInfo.get(key)
  }));
  updater.htmlAdditions.CATEGORIES_INFO = categoriesKeys.map(key => ({
    name: key,
    path: categoriesInfo.get(key)
  }));
}
