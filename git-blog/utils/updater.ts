import { BlogConfig } from './blog-config';
import { inject } from './inject-object-to-html';
import { makePageInfoFile } from './make-page-info-file';

export class Updater {
  // tslint:disable-next-line:no-any
  htmlAdditions: { [key: string]: any } = {};
  // tslint:disable-next-line:no-any
  pages: { [key: string]: any[] } = {};
  readonly config: BlogConfig;
  constructor(config: BlogConfig) {
    this.config = config;
  }
  emitFile() {
    for (const key of Object.keys(this.pages)) {
      makePageInfoFile(this.pages[key], key, this.config);
    }
    inject(this.htmlAdditions, this.config);
  }
}
