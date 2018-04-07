import { copySync, removeSync } from 'fs-extra';
import { normalize, resolve } from 'path';

function inDir(dir: string, test: string) {
  return normalize(test).indexOf(normalize(dir)) === 0;
}

function buildTheme() {
  removeSync('./theme');

  copySync('./dist', './theme', {
    filter(src: string) {
      return (
        !inDir(resolve(process.cwd(), 'dist/assets/meta'), src) &&
        !inDir(resolve(process.cwd(), 'dist/assets/post'), src)
      );
    }
  });

  copySync('./src/assets/post', './theme/post');
  copySync('./src/git-blog.json', './theme/git-blog.json');
}

buildTheme();
