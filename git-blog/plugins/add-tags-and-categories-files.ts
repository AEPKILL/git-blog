import { join } from 'path';
import FileEmitter from '../utils/file-emitter';
import { PostMetadata } from '../utils/post';

const tagsDirName = 'tags';
const categoriesDirName = 'categories';
export default function addTagsFiles(
  posts: PostMetadata[],
  emiter: FileEmitter
) {
  const tagsInfo = new Map<string, string>();
  const categoriesInfo = new Map<string, string>();

  for (const post of posts) {
    const tags = post.tags || [];
    const categories = post.categories;

    // process tags
    for (const tag of tags) {
      const relativePath = join(tagsDirName, tag);
      if (!emiter.pages[relativePath]) {
        emiter.pages[relativePath] = [post];
      } else {
        emiter.pages[relativePath].push(post);
      }
      tagsInfo.set(tag, join(emiter.config.metaDir, tagsDirName, tag));
    }

    // process categories
    if (categories) {
      const relativePath = join(categoriesDirName, categories);
      categoriesInfo.set(
        categories,
        join(emiter.config.metaDir, categoriesDirName, categories)
      );
      if (!emiter.pages[relativePath]) {
        emiter.pages[relativePath] = [post];
      } else {
        emiter.pages[relativePath].push(post);
      }
    }
  }
  const tagKeys = [...tagsInfo.keys()];
  const categoriesKeys = [...categoriesInfo.keys()];

  emiter.htmlAdditions.TAGS_INFO = tagKeys.map(key => ({
    name: key,
    path: tagsInfo.get(key)
  }));
  emiter.htmlAdditions.CATEGORIES_INFO = categoriesKeys.map(key => ({
    name: key,
    path: categoriesInfo.get(key)
  }));
}
