import cheerio from 'cheerio';
import { readFileSync, writeFileSync } from 'fs';
import { BlogConfig } from './blog-config';
import * as workspace from './workspace';

const SCRIPT_ID = 'GIT-BLOG-INJECT-SCRIPT-ID';
// tslint:disable-next-line:no-any
export function inject(add: { [key: string]: any }, config: BlogConfig) {
  for (const file of config.htmlInject || []) {
    const path = workspace.resolve(file, config);
    const content = readFileSync(path).toString();
    const $ = cheerio.load(content);
    const script = Object.keys(add)
      .map(key => `var ${key}=${JSON.stringify(add[key])};`)
      .join('');
    $(`#${SCRIPT_ID}`).remove();
    $('title').text(config.title);
    $('head').append(`<script id="${SCRIPT_ID}">${script}</script>`);
    writeFileSync(path, $.html());
  }
}
