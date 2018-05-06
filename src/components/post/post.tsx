import highlightJs from 'highlight.js';
import marked from 'marked';
import { dirname } from 'path';
import React from 'react';
import join from 'url-join';

const { Renderer } = marked;

const Post: React.SFC<{ content: string; postPath: string }> = props => {
  let htmlString = marked.parse(props.content);
  if (BLOG_INFO.BLOG_INFO.site) {
    htmlString = redirectImgAndLink(htmlString, props.postPath);
  }
  const html = {
    __html: htmlString
  };
  return <article className="post-content" dangerouslySetInnerHTML={html} />;
};

function redirectImgAndLink(html: string, postPath: string) {
  const div = document.createElement('div');
  const postDir = dirname(postPath);
  div.innerHTML = html;
  const imgs = Array.from(div.querySelectorAll('img'));
  const links = Array.from(div.querySelectorAll('a'));
  const host = document.location.host;
  let site = BLOG_INFO.BLOG_INFO.site;
  const [ip] = host.split(':');
  if (ip === 'localhost' || ip === '127.0.0.1' || ip.indexOf('192.168') == 0) {
    site = host;
  }
  if (!/^(https:|http:)?\/\//.test(site)) {
    site = `//${site}`;
  }
  for (const img of imgs) {
    const src = img.getAttribute('src') || '';
    // http:// | https:// | //
    if (!/^(https:|http:)?\/\//.test(src)) {
      img.src = join(site, postDir, src);
    }
  }
  for (const link of links) {
    const href = link.getAttribute('href') || '';
    if (!/^(https:|http:)?\/\//.test(href)) {
      link.href = join(site, postDir, href);
    }
  }
  return div.innerHTML;
}

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
