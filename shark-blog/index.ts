import { readJSONSync } from 'fs-extra';
import { resolve } from 'path';
import { ThemeDetail } from './theme';
import { readDirFiles } from './utils/read-dir';

const themeRoot = resolve(__dirname, '../theme');

const theme: ThemeDetail = {
  version: readJSONSync(resolve(__dirname, '../package.json')).version,
  root: themeRoot,
  filelist: readDirFiles(themeRoot)
};

export default theme;
