import { cyan } from 'cli-color';
import { deferred } from 'deferred-factory';
import { createReadStream, statSync } from 'fs';
import { basename, join } from 'path';
import { createInterface } from 'readline';
import { getConfig } from './blog-config';
import { readDirFiles } from './read-dir';
import workspace from './workspace';

export interface PostMetadata {
  title: string;
  description: string;
  source: string;
  date: string;
  tags: string[];
  categories?: string;
  cover?: string;
  author?: string;
}

/**
 * 收集单个文章的元数据
 * 不使用 readFileSync 一次性读取整个文件，仅读取需要的部分
 * 如果文件规模很大可以极高的提高性能
 * 异步读取极大提高生成效率
 *
 * @param path
 * @param relativePath
 */
export function collectPostMetadata(path: string, relativePath: string) {
  const meta: Partial<PostMetadata> = {};
  const defer = deferred<PostMetadata>();
  const read = createInterface({
    input: createReadStream(path)
  });

  let status = READ_STATUS.WAIT_START;
  let content = '';
  let line = 0;

  read.on('line', (input: string) => {
    line++;
    // 跳过文件开始的空白行
    if (status === READ_STATUS.WAIT_START && isWhitespaceLine(input)) {
      return;
    }
    // 读取到 --- 符号
    if (isStartOrEndLine(input)) {
      if (status === READ_STATUS.WAIT_START) {
        status = READ_STATUS.READ_META;
        return;
      } else if (status === READ_STATUS.READ_META) {
        status = READ_STATUS.READ_CONTENT;
        return;
      }
    }

    if (status === READ_STATUS.WAIT_START) {
      status = READ_STATUS.READ_CONTENT;
    }

    if (status === READ_STATUS.READ_META && !isWhitespaceLine(input)) {
      const index = input.indexOf(':');
      let key: string;
      let value: string;

      if (index < 0) {
        defer.reject(new Error(`Illegal line:[line: ${line}](${path})`));
        read.close();
        return;
      }

      key = input.substring(0, index).trim();
      value = input.substring(index + 1).trim();

      if (isKeyOf<PostMetadata>(key)) {
        switch (key) {
          case 'tags': {
            meta[key] = arrayString(value);
            break;
          }
          default: {
            meta[key] = value;
          }
        }
      }
    } else if (
      status === READ_STATUS.READ_CONTENT &&
      !/^#{1,6}\s*/.test(input) // 标题不计入内容
    ) {
      content += input;
    }
    if (content.length > POST_PREVIEW_LEN) {
      read.close();
    }
  });

  read.on('close', () => {
    if (status === READ_STATUS.READ_META) {
      defer.reject(new Error(`read post metadata termination`));
      return;
    }
    if (!meta.title) {
      meta.title = basename(path, '.md');
    }
    if (!meta.description) {
      meta.description = content.substr(0, 160);
      if (content.length > POST_PREVIEW_LEN) {
        meta.description += '...';
      }
    }
    if (!meta.date) {
      meta.date = statSync(path).birthtime.toISOString();
    }
    meta.source = relativePath;
    defer.resolve(meta as PostMetadata);
  });

  return defer.promise;
}

/**
 * 收集所有文章的元数据
 *
 * @export
 * @returns
 */
export async function collectAllPostMetadata() {
  const postPaths = readDirFiles(workspace.getPostDir(), /.md$/i);
  const config = getConfig();

  const posts: PostMetadata[] = (await Promise.all(
    postPaths.map(path =>
      collectPostMetadata(
        workspace.resolvePostPath(path),
        join(config.postDir, path)
      )
    )
  )).sort((a, b) => +new Date(b.date) - +new Date(a.date));

  console.log(
    cyan(`in dir "${workspace.getPostDir()}", ${postPaths.length} post find.`)
  );

  return posts;
}

export default {
  collectPostMetadata,
  collectAllPostMetadata
};

const POST_METADATA_KEYS = [
  'title',
  'description',
  'date',
  'tags',
  'categories',
  'cover',
  'author'
];

const POST_PREVIEW_LEN = 260;

const enum READ_STATUS {
  WAIT_START,
  READ_META,
  READ_CONTENT,
  DONE
}

function isStartOrEndLine(content: string) {
  return /^---\s*$/.test(content);
}

function isWhitespaceLine(content: string) {
  return /^\s*$/.test(content);
}

// [xxxx,yyyy,zzzz] => ['xxxx','yyyy','zzzz']
function arrayString(content: string) {
  if (content[0] === '[') {
    content = content.substring(1);
  }
  if (content[content.length - 1] === ']') {
    content = content.substring(0, content.length - 1);
  }
  return content
    .split(',')
    .map(value => value.trim())
    .filter(value => value.length);
}

function isKeyOf<T, K = keyof T>(key: string | K): key is K {
  return POST_METADATA_KEYS.indexOf(key as string) !== -1;
}
