import { execSync } from 'child_process';
import { cyan, green, red, yellow } from 'cli-color';
import { existsSync, statSync } from 'fs';
import { copySync, removeSync } from 'fs-extra';
import { resolve } from 'path';
import { BlogConfig, getConfig } from './utils/blog-config';
import { blogDb } from './utils/blog-db';
import workspace from './utils/workspace';

export interface ThemeDetail {
  root: string;
  version: string;
  filelist: string[];
}

export class Theme {
  config: BlogConfig = getConfig();
  update() {
    const themeName = this.config.theme;
    const lastTheme = blogDb.get<ThemeDetail & { name: string }>('theme');

    if (themeName === '--NONE--') {
      console.log(yellow(`WARN: YOU SET DOT'T UPDATE THEME`));
      return;
    }
    const currentTheme = loadTheme(themeName);
    if (!currentTheme) {
      console.log(red(`can't load theme: ${themeName}`));
      return;
    }
    if (lastTheme) {
      if (
        lastTheme.name === themeName &&
        lastTheme.version === currentTheme.version
      ) {
        // don't need update
        return;
      } else {
        // clear previous theme files
        for (const file of lastTheme.filelist) {
          try {
            removeSync(file);
          } catch {
            // nothing todo
          }
        }
      }
    }
    console.log(cyan(`update theme ...`));
    for (const file of currentTheme.filelist) {
      const src = resolve(currentTheme.root, file);
      const dest = workspace.resolveWorkPath(file);
      copySync(src, dest);
      console.log(`${src} => ${dest}`);
    }
    console.log(green(`current theme: ${themeName}(${currentTheme.version})`));
    blogDb.set('theme', {
      name: themeName,
      ...currentTheme
    });
  }
}

export default {
  Theme
};

function loadTheme(themeName: string): ThemeDetail | undefined {
  let themeDetail!: ThemeDetail;
  const themePackagePaths = [
    // current dir modules
    themeName,
    // global npm modules
    resolve(
      execSync('npm root -g')
        .toString()
        .trim(),
      themeName
    ),
    // reltive path of current dir
    resolve(workspace.workDir, themeName)
  ];

  for (const packagePath of themePackagePaths) {
    try {
      themeDetail = require(packagePath).default;
      const checkResult = checkTheme(themeDetail);
      if (checkResult.ok) {
        return themeDetail;
      } else {
        console.log(red(checkResult.message));
        return;
      }
    } catch {
      // nothing todo
    }
  }
  return;
}

function checkTheme(theme: ThemeDetail) {
  if (!theme) {
    return {
      ok: false,
      message: `theme not found.`
    };
  }
  if (typeof theme.root !== 'string') {
    return {
      ok: false,
      message: `theme package error: 'root' field not a string.`
    };
  }
  if (!existsSync(theme.root)) {
    return {
      ok: false,
      message: `theme package error: 'root' field not exists.`
    };
  }
  if (!statSync(theme.root).isDirectory()) {
    return {
      ok: false,
      message: `theme package error: 'root' field not a dir.`
    };
  }
  if (typeof theme.version !== 'string') {
    return {
      ok: false,
      message: `theme package error: 'verison' field not a string.`
    };
  }
  if (!Array.isArray(theme.filelist)) {
    return {
      ok: false,
      message: `theme package error: 'filelist' field not a array.`
    };
  }
  for (const file of theme.filelist) {
    const fullpath = resolve(theme.root, file);
    if (!existsSync(fullpath)) {
      return {
        ok: false,
        message: `theme package error: file "${fullpath}" don't exists.`
      };
    }
    if (!statSync(fullpath).isFile()) {
      return {
        ok: false,
        message: `theme package error: path "${fullpath}" not a file.`
      };
    }
  }
  return {
    ok: true,
    message: ''
  };
}
