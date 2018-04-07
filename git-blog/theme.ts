import { execSync } from 'child_process';
import { cyan, green, red, yellow } from 'cli-color';
import { existsSync, statSync } from 'fs';
import { copySync, removeSync } from 'fs-extra';
import { resolve } from 'path';
import { BlogConfig, getConfig } from './utils/blog-config';
import { blogDb } from './utils/blog-db';
import workspace from './utils/workspace';

export interface ThemeDetail {
  themePackage?: string;
  root: string;
  version: string;
  filelist: string[];
}

export class Theme {
  config: BlogConfig = getConfig();
  update() {
    const themePackage = this.config.theme;
    const lastTheme = blogDb.get<ThemeDetail>('theme');
    if (themePackage === '--NONE--') {
      console.log(yellow(`WARN: YOU SET DOT'T UPDATE THEME`));
      return;
    }
    const themeDetail = loadThemePackage(themePackage);
    if (!themeDetail) {
      console.log(red(`can't load theme: ${themePackage}`));
      return;
    }
    if (lastTheme) {
      if (
        lastTheme.themePackage === themePackage &&
        lastTheme.version === themeDetail.version
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
    for (const file of themeDetail.filelist) {
      const src = resolve(themeDetail.root, file);
      const dest = resolve(workspace.getWorkspaceDir(), file);
      copySync(src, dest);
      console.log(`${src} => ${dest}`);
    }
    console.log(
      green(`current theme: ${themePackage}(${themeDetail.version})`)
    );
    blogDb.set('theme', {
      themePackage,
      ...themeDetail
    });
  }
}

export default {
  Theme
};

function loadThemePackage(themePackage: string): ThemeDetail | undefined {
  let themeDetail!: ThemeDetail;
  const themePackagePaths = [
    // current dir modules
    themePackage,
    // global npm modules
    resolve(
      execSync('npm root -g')
        .toString()
        .trim(),
      themePackage
    ),
    // reltive path of current dir
    resolve(workspace.workDir, themePackage)
  ];

  for (const packagePath of themePackagePaths) {
    try {
      themeDetail = require(packagePath).default;
      const checkResult = checkThemePackage(themeDetail);
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

function checkThemePackage(themePackage: ThemeDetail) {
  if (!themePackage) {
    return {
      ok: false,
      message: `theme not found.`
    };
  }
  if (typeof themePackage.root !== 'string') {
    return {
      ok: false,
      message: `theme package error: 'root' field not a string.`
    };
  }
  if (!existsSync(themePackage.root)) {
    return {
      ok: false,
      message: `theme package error: 'root' field not exists.`
    };
  }
  if (!statSync(themePackage.root).isDirectory()) {
    return {
      ok: false,
      message: `theme package error: 'root' field not a dir.`
    };
  }
  if (typeof themePackage.version !== 'string') {
    return {
      ok: false,
      message: `theme package error: 'verison' field not a string.`
    };
  }
  if (!Array.isArray(themePackage.filelist)) {
    return {
      ok: false,
      message: `theme package error: 'filelist' field not a array.`
    };
  }
  for (const file of themePackage.filelist) {
    const fullpath = resolve(themePackage.root, file);
    if (!existsSync(fullpath)) {
      return {
        ok: false,
        message: `theme package error: file "${fullpath}" don't exists.`
      };
    }
    if (!statSync(fullpath).isFile()) {
      return {
        ok: false,
        message: `theme package error: root field not a file.`
      };
    }
  }
  return {
    ok: true,
    message: ''
  };
}
