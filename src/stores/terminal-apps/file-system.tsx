import i18n from '@i18n';

import disk from './disk';

export const enum FILE_TYPE {
  FILE,
  DIRECTORY
}

export interface File {
  type: FILE_TYPE;
  name: string;
  date: string;
  content: string | File[];
}

class FileSystem {
  readDir(path: string) {
    const pathSplits = path.split('/');
    let diskPointer = disk;
    if (pathSplits[0] === '~' || pathSplits[0] === '') {
      pathSplits.shift();
    }
    for (const temp of pathSplits) {
      const findFiles = (diskPointer.content as File[]).filter(
        file => file.type === FILE_TYPE.DIRECTORY && file.name === temp
      );
      if (findFiles.length) {
        diskPointer = findFiles[0];
      } else {
        throw new Error(`'${path}': ${i18n.notDirectory}`);
      }
    }
    return diskPointer.content as File[];
  }
  readFile(path: string) {
    const pathSplits = path.split('/');
    let diskPointer = disk;
    if (pathSplits[0] === '~' || pathSplits[0] === '') {
      pathSplits.shift();
    }
    for (let i = 0; i < pathSplits.length; i++) {
      const lookFile = i === pathSplits.length - 1;
      const temp = pathSplits[i];
      const findFiles = (diskPointer.content as File[]).filter(
        file =>
          file.type === (lookFile ? FILE_TYPE.FILE : FILE_TYPE.DIRECTORY) &&
          file.name === temp
      );
      if (findFiles.length) {
        diskPointer = findFiles[0];
      } else {
        if (lookFile) {
          throw new Error(`'${path}': ${i18n.notFile}`);
        } else {
          throw new Error(`'${path}': ${i18n.notDirectory}`);
        }
      }
    }
    return diskPointer.content as string;
  }
}

export default new FileSystem();
