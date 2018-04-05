import { green } from 'cli-color';
import { Command, command, metadata } from 'clime';
import { join } from 'path';
import addTagsFiles from '../utils/add-tags-files';
import getBlogConfig from '../utils/blog-config';
import collectPostsMetadata from '../utils/posts-metadata';
import { Updater } from '../utils/updater';

@command({
  description: 'Update blog info.'
})
export default class extends Command {
  @metadata
  async execute() {
    const config = getBlogConfig();
    const updater = new Updater(config);
    const postsMetadata = await collectPostsMetadata(config);
    updater.htmlAdditions.POST_INFO = {
      count: postsMetadata.length,
      path: join(config.metaDir!, config.postDir!)
    };
    updater.pages[config.postDir!] = postsMetadata;
    addTagsFiles(postsMetadata, updater);
    updater.emitFile();
    return green(`update blog success`);
  }
}
