import { readdirSync, readJSONSync, statSync } from 'fs-extra';
import { join, resolve } from 'path';
import { ThemeDetail } from './theme';

const themeRoot = resolve(__dirname, '../theme');

const theme: ThemeDetail = {
  version: readJSONSync(resolve(__dirname, '../package.json')).version,
  root: themeRoot,
  filelist: readThemeDirFiles(themeRoot)
};

export default theme;

function readThemeDirFiles(path: string, re = '') {
  const files = readdirSync(path);
  let result: string[] = [];
  for (const file of files) {
    const fileFullPath = resolve(path, file);
    const relativePath = join(re, file);
    if (statSync(fileFullPath).isDirectory()) {
      result = result.concat(readThemeDirFiles(fileFullPath, relativePath));
    } else {
      result.push(relativePath);
    }
  }
  return result;
}
