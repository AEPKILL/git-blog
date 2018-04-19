import classnames from '@utils/classnames';

import * as React from 'react';

export interface CommentProps {
  className?: string;
}

// interface CommentConfig {
//   name: string;
// }

export default class Comment extends React.Component<CommentProps> {
  iframeRef = React.createRef<HTMLIFrameElement>();
  constructor(props: CommentProps) {
    super(props);
  }
  render() {
    if (BLOG_INFO.BLOG_INFO.extra && BLOG_INFO.BLOG_INFO.extra.comment) {
      return (
        <div className={classnames('comment', this.props.className)}>
          <iframe ref={this.iframeRef} />
        </div>
      );
    }
    return null;
  }
}
