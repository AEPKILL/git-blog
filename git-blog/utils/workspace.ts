import { existsSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { resolve } from 'path';
import config from './blog-config';

const workDir = process.cwd();

export const workspaceDir = resolve(workDir, config.rootDir || '.');

export function resolveWorkPath(path: string) {
  return resolve(workspaceDir, path);
}

export const postDir = resolveWorkPath(config.postDir);

export const metaDir = resolveWorkPath(config.metaDir);

export function resolveMetaPath(path: string) {
  return resolve(metaDir, path);
}

export function resolvePostPath(path: string) {
  return resolve(postDir, path);
}

if (!existsSync(postDir)) {
  ensureDirSync(postDir);
}

if (!existsSync(metaDir)) {
  ensureDirSync(metaDir);
}

export default {
  resolveWorkPath,
  resolveMetaPath,
  resolvePostPath,
  postDir,
  metaDir,
  workspaceDir
};
