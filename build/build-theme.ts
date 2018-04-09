import { existsSync } from 'fs';
import { copySync, ensureDirSync, removeSync } from 'fs-extra';
import { normalize, resolve } from 'path';

function inDir(dir: string, test: string) {
  return normalize(test).indexOf(normalize(dir)) === 0;
}

function buildTheme() {
  if (existsSync('./theme')) {
    removeSync('./theme');
  }

  copySync('./dist', './theme', {
    filter(src: string) {
      return !inDir(resolve(process.cwd(), 'dist/assets/meta'), src);
    }
  });

  ensureDirSync('./src/assets/post');
  copySync('./src/assets/post', './theme/post');
}

buildTheme();
