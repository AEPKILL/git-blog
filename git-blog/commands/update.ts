import { green, red } from 'cli-color';
import { Command, command, metadata } from 'clime';
import addPostFiles from '../plugins/add-post-files';
import addTagsAndCategoriesFiles from '../plugins/add-tags-and-categories-files';
import { collectAllPostMetadata } from '../utils/post';
import Updater from '../utils/updater';

@command({
  description: 'Update blog info.'
})
export default class extends Command {
  @metadata
  async execute() {
    try {
      await updateBlogMeta();
      return green(`update blog success`);
    } catch (e) {
      return red(`update failed: ${e.message}`);
    }
  }
}

export async function updateBlogMeta() {
  const updater = new Updater();
  const postsMetadata = await collectAllPostMetadata();
  addPostFiles(postsMetadata, updater);
  addTagsAndCategoriesFiles(postsMetadata, updater);
  updater.emitFile();
}
