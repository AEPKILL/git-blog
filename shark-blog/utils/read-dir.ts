import { readdirSync, statSync } from 'fs-extra';
import { join, resolve } from 'path';

export function readDirFiles(path: string, re = '') {
  const files = readdirSync(path);
  let result: string[] = [];
  for (const file of files) {
    const fileFullPath = resolve(path, file);
    const relativePath = join(re, file);
    if (statSync(fileFullPath).isDirectory()) {
      result = result.concat(readDirFiles(fileFullPath, relativePath));
    } else {
      result.push(relativePath);
    }
  }
  return result;
}

export default {
  readDirFiles
};
