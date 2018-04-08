import { execSync } from 'child_process';
import { cyan, green, red } from 'cli-color';
import { Command, command, param } from 'clime';
import { ensureDirSync, existsSync, writeJSONSync } from 'fs-extra';
import { resolve } from 'path';
import { defaultConfig } from '../utils/blog-config';

@command({
  description: 'create a blog.'
})
export default class extends Command {
  execute(
    @param({
      required: true,
      description: 'blog name.'
    })
    name: string
  ) {
    const workdir = process.cwd();
    const fullPath = resolve(workdir, name);
    if (existsSync(fullPath)) {
      return red(`error: dir "${fullPath}" existes.`);
    }
    console.log(cyan(`working...`));
    try {
      ensureDirSync(fullPath);
      writeJSONSync(resolve(fullPath, 'git-blog.json'), defaultConfig, {
        spaces: 2
      });
      execSync(`cd ${name}&&blog update --theme&&blog update`);
      return green(`create blog success: ${name}.`);
    } catch (e) {
      return red(`create blog failed: ${e.message}.`);
    }
  }
}
