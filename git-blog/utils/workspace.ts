import { ensureDirSync } from 'fs-extra';
import { resolve } from 'path';
import config from './blog-config';

export default {
  workDir: process.cwd(),
  resolveMetaPath(path: string) {
    return resolve(this.getMetaDir(), path);
  },
  resolveWorkPath(path: string) {
    return resolve(this.getWorkspaceDir(), path);
  },
  resolvePostPath(path: string) {
    return resolve(this.getPostDir(), path);
  },
  getPostDir() {
    const path = this.resolveWorkPath(config.getConfig().postDir);
    ensureDirSync(path);
    return path;
  },
  getMetaDir() {
    const path = this.resolveWorkPath(config.getConfig().metaDir);
    ensureDirSync(path);
    return path;
  },
  getWorkspaceDir() {
    return resolve(this.workDir, config.getConfig().rootDir);
  }
};
