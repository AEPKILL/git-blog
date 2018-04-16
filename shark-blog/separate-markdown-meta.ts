const yamlContentReg = /^\s*---\s*(\n((\w|\W)*?)\n|\n)---\s*/;
export default function separateMarkdownMeta(md: string) {
  const mdMeta: PostMeta = {
    title: '',
    description: '',
    date: '',
    source: ''
  };
  let content = '';
  const matchResult = yamlContentReg.exec(md);
  if (matchResult) {
    const [yaml, , yamlContent] = matchResult;
    for (let line of yamlContent.split('\n')) {
      let index = 0;
      let key = '';
      let value = '';
      line = line.trim();
      index = line.indexOf(':');
      if (index === -1) {
        continue;
      }
      key = line.substring(0, index).trim();
      value = line.substring(index + 1).trim();

      // tslint:disable-next-line:prefer-conditional-expression
      if (value[0] === '[' && value[value.length - 1] === ']') {
        // tslint:disable-next-line:no-any
        (mdMeta as any)[key] = arrayString(value);
      } else {
        // tslint:disable-next-line:no-any
        (mdMeta as any)[key] = value;
      }
    }
    content = md.substring(yaml.length);
  } else {
    content = md;
  }
  return {
    content,
    meta: mdMeta
  };
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
