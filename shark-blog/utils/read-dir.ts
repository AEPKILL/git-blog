import { readdirSync, statSync } from 'fs-extra';
import { join, resolve } from 'path';

export function readDirFiles(
  path: string,
  match: RegExp | null | ((path: string) => boolean) = null,
  re = ''
) {
  const files = readdirSync(path);
  let result: string[] = [];
  for (const file of files) {
    const fileFullPath = resolve(path, file);
    const relativePath = join(re, file);
    if (typeof match === 'function') {
      if (!match(relativePath)) {
        continue;
      }
    } else if (match && !match.test(relativePath)) {
      continue;
    }
    if (statSync(fileFullPath).isDirectory()) {
      result = result.concat(readDirFiles(fileFullPath, match, relativePath));
    } else {
      result.push(relativePath);
    }
  }
  return result;
}

export default {
  readDirFiles
};
