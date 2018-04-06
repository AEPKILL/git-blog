import * as cheerio from 'cheerio';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { ensureDirSync, removeSync, writeJSONSync } from 'fs-extra';
import { join } from 'path';
import config from './blog-config';
import { resolveMetaPath, resolveWorkPath } from './workspace';

const SCRIPT_ID = 'GIT-BLOG-OBJECT-INJECT-SCRIPT';

/**
 * 一个文件元数据文件更新器
 * 把 htmlAdditions 上的数据注入到 config.injectHTML 配置的 HTML 文件中
 * 把 pages 上的数据写入 meta 文件夹中
 * 这两个属性和 webpack 插件的 compilation.assets 差不多
 *
 * @export
 * @class Updater
 */
export default class FileEmitter {
  // tslint:disable-next-line:no-any
  htmlAdditions: { [key: string]: any } = {};
  // tslint:disable-next-line:no-any
  pages: { [key: string]: any[] } = {};
  config = config;

  emitFile() {
    this.generatePagesMetaFiles();
    this.injectToHtml();
  }
  generatePagesMetaFiles() {
    const pageSize = config.pageSize;
    for (const key of Object.keys(this.pages)) {
      const items = this.pages[key];
      let currentPage = 0;
      let path = key;
      path = resolveMetaPath(path);
      ensureDirSync(path);
      while (currentPage * pageSize < items.length) {
        const list = items.slice(
          currentPage * pageSize,
          (currentPage + 1) * pageSize
        );
        const info = {
          currentPage,
          count: items.length,
          pageSize,
          pre: currentPage > 0,
          next: (currentPage + 1) * pageSize < items.length,
          items: list
        };
        const infoPath = join(path, `${currentPage}`);

        writeJSONSync(infoPath, info);
        currentPage++;
      }
    }
  }
  injectToHtml() {
    const data = this.htmlAdditions;
    for (const file of config.htmlInject) {
      const path = resolveWorkPath(file);
      if (!existsSync(path)) {
        throw new Error(`can't find config.htmlInject: ${path}`);
      }
      const content = readFileSync(path).toString();
      const script = Object.keys(data)
        .map(key => `var ${key}=${JSON.stringify(data[key])};`)
        .join('');
      const $ = cheerio.load(content);
      $(`#${SCRIPT_ID}`).remove();
      $('title').text(config.title);
      $('head').append(`<script id="${SCRIPT_ID}">${script}</script>`);
      writeFileSync(path, $.html());
    }
  }
}
