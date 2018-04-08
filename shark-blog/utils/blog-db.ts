import { existsSync } from 'fs';
import { readJSONSync, writeJSONSync } from 'fs-extra';
import workspace from './workspace';

function getBDFilePath() {
  return workspace.resolveWorkPath('shark-blog.db.json');
}

export default {
  set<T>(key: string, value: T) {
    const file = getBDFilePath();
    if (!existsSync(file)) {
      writeJSONSync(file, {});
    }
    const content = readJSONSync(file);
    content[key] = value;
    writeJSONSync(file, content);
  },
  get<T>(key: string): T | undefined {
    const file = getBDFilePath();
    if (!existsSync(file)) {
      return;
    }
    const content = readJSONSync(file);
    return content[key];
  }
};
