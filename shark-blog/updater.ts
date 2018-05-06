import chokidar from 'chokidar';
import { cyan, green, red, yellow } from 'cli-color';
import { EventEmitter } from 'events';
import { removeSync } from 'fs-extra';
import { createInterface } from 'readline';
import addPostFiles from './plugins/add-post-files';
import addTagsAndCategoriesFiles from './plugins/add-tags-and-categories-files';
import { Theme } from './theme';
import { getConfig } from './utils/blog-config';
import FileEmitter from './utils/file-emitter';
import { collectAllPostMetadata } from './utils/post';
import workspace from './utils/workspace';

export default class Updater extends EventEmitter {
  private updating = false;
  private needUpdate = false;

  async update() {
    try {
      const fileEmitter = new FileEmitter();
      const postsMetadata = await collectAllPostMetadata();
      const startTime = Date.now();
      fileEmitter.htmlAdditions.BLOG_INFO = getConfig();
      // 清空整个 Meta 目录
      removeSync(workspace.getMetaDir());
      addPostFiles(postsMetadata, fileEmitter);
      addTagsAndCategoriesFiles(postsMetadata, fileEmitter);
      fileEmitter.emitFile();
      console.log(
        green(`update blog metadata success, ${Date.now() - startTime}ms.`)
      );
    } catch (e) {
      console.log(red(`update blog metadata failed: ${e.message}.`));
    }
  }
  updateTheme() {
    new Theme().update();
  }
  watch() {
    console.log(cyan(`watching file change: "${workspace.getPostDir()}".`));
    chokidar
      .watch(workspace.getPostDir(), { ignoreInitial: true })
      .on('all', (_event, path: string) => {
        if (/\.md$/i.test(path)) {
          this.onFileChange(path);
        }
      });
    process.on('SIGINT', this.onWatchStoped.bind(this));
    process.on('SIGTERM', this.onWatchStoped.bind(this));
    if (process.platform === 'win32') {
      createInterface({
        input: process.stdin,
        output: process.stdout
      }).on('SIGINT', () => {
        process.emit('SIGINT');
      });
    }
  }

  private async onFileChange(path: string) {
    this.needUpdate = true;
    console.log(cyan(`\nfile "${path}" changed;`));
    if (this.updating) {
      console.log(yellow(`update pending, wait the last update done.`));
      return;
    }
    this.updating = true;
    while (this.needUpdate) {
      this.needUpdate = false;
      await this.update();
    }
    this.updating = false;
    this.emit('updated');
  }
  private onWatchStoped() {
    console.log(red('watching stoped.'));
    process.exit();
  }
}
