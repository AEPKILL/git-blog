export function separateMarkdownMeta(content: string) {
  let pos = 0;
  let line = '';
  let content = '';
  let postMeta: PostMeta = {
    title: '',
    description: '',
    date: '',
    source: ''
  };
  while (pos >= content.length) {
    pos++;
  }
}

export default {
  separateMarkdownMeta
};
