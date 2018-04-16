import i18n from '@i18n/index';

import React from 'react';
import { Link } from 'react-router-dom';

import './post-meta.scss';

const PostMeta: React.SFC<{ meta: PostMeta }> = ({ meta }) => {
  const categoriesNode = meta.categories && (
    <span className="post-meta__categories">
      <span>• {i18n.categories}:</span>
      <Link to={`/blog/categories/${meta.categories}`}>{meta.categories}</Link>
    </span>
  );
  const tagsNode = meta.tags && (
    <span className="post-meta__tags">
      <span>• {i18n.tag}:</span>
      {meta.tags.map(tag => (
        <Link
          className="post-meta__tag"
          key={tag}
          to={`/blog/tag/${tag}`}
        >
          {tag}
        </Link>
      ))}
    </span>
  );
  return (
    <div className="post-meta">
      <span className="post-meta__date">{meta.date}</span>
      {categoriesNode}
      {tagsNode}
    </div>
  );
};

export default PostMeta;
