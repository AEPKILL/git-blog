import { green, red } from 'cli-color';
import { Command, command, param } from 'clime';
import { existsSync, writeFileSync } from 'fs';
import workspace from '../utils/workspace';

@command({
  description: 'create a new post.'
})
export default class extends Command {
  execute(
    @param({
      required: true,
      description: 'post name.'
    })
    name: string
  ) {
    try {
      return green(createNewPost(name));
    } catch (e) {
      return red(e.message);
    }
  }
}

function createNewPost(name: string) {
  const fullPath = workspace.resolvePostPath(`${name}.md`);
  const post: string[] = [
    '---',
    `title: ${name}`,
    `date: ${new Date().toLocaleString()}`,
    `tags: []`,
    `categories: `,
    `description: `,
    '---'
  ];
  if (existsSync(fullPath)) {
    throw new Error(`post "${name}" exists: "${fullPath}".`);
  } else {
    writeFileSync(fullPath, post.join('\n'));
    return `create post "${name}" success: "${fullPath}"`;
  }
}
