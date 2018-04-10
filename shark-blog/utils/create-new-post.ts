import { existsSync, writeFileSync } from 'fs-extra';
import workspace from './workspace';

export interface NewPostOptions {
  tags?: string[];
  categories?: string;
  description?: string;
  content?: string;
}

export default function createNewPost(
  title: string,
  {
    tags = [],
    categories = '',
    description = '',
    content = ''
  }: NewPostOptions = {}
) {
  const fullPath = workspace.resolvePostPath(`${title}.md`);
  const post: string[] = [
    '---',
    `title: ${title}`,
    `date: ${new Date().toLocaleString()}`,
    `tags: [${tags.join(',')}]`,
    `categories: ${categories}`,
    `description: ${description}`,
    '---',
    '',
    `${content ? content : '# ' + title}`
  ];
  if (existsSync(fullPath)) {
    throw new Error(`post "${title}" exists: "${fullPath}".`);
  } else {
    writeFileSync(fullPath, post.join('\n'));
    return `create post "${title}" success: "${fullPath}"`;
  }
}
