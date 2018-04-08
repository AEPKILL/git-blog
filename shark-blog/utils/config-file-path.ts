import { existsSync } from 'fs-extra';
import { join } from 'path';

export const configFileNames = ['.shark-blog', 'shark-blog.json'];

export function getConfigFilePath() {
  const workDir = process.cwd();
  const configPaths = configFileNames.map(name => join(workDir, name));
  const existsConfigPaths = configPaths.filter(path => existsSync(path));
  if (existsConfigPaths.length) {
    return existsConfigPaths[0];
  }
}

export default {
  getConfigFilePath,
  configFileNames
};
