import highlightJs from 'highlight.js';
import marked from 'marked';
import React from 'react';

const { Renderer } = marked;

const Post: React.SFC<{ content: string }> = props => {
  const html = {
    __html: marked.parse(props.content)
  };
  return <div dangerouslySetInnerHTML={html} />;
};

console.log(marked.Renderer, Renderer);

marked.setOptions({
  renderer: new Renderer(),
  highlight(code: string) {
    return highlightJs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

export default Post;
