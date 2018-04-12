import DelayShow from '@components/delay-show/delay-show';
import Loading from '@components/loading/loading';
import Post from '@components/post/post';
import i18n from '@i18n/index';
import PostFetchServices from '@services/post-fetch';
import AsyncData, { ASYNC_STATUS } from '@stores/utils/async-data';
import { join } from '@utils/url';

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'ts-mobx-react';

export type PostViewProps = RouteComponentProps<{ path: string }>;

export interface PostViewState {
  content?: string;
}

@observer
export default class PostView extends React.Component<
  PostViewProps,
  PostViewState
> {
  @inject('post') post!: AsyncData<string>;
  constructor(props: PostViewProps) {
    super(props);
    this.state = {};
    this.loadPost = this.loadPost.bind(this);
  }
  loadPost() {
    const { path } = this.props.match.params;
    console.log(join('/', path));
    this.post.waitData(PostFetchServices.get(join('/', path)));
  }
  componentDidMount() {
    this.loadPost();
  }
  asyncRender() {
    const { error, data, asyncStstus } = this.post;
    switch (asyncStstus) {
      case ASYNC_STATUS.LOADING: {
        return (
          <DelayShow delay={500}>
            <Loading />
          </DelayShow>
        );
      }
      case ASYNC_STATUS.ERROR: {
        return (
          <div className="error">
            {error && `${i18n.errorMessage}: ${error.message}`}
            <span className="retry" onClick={this.loadPost}>
              重试
            </span>
          </div>
        );
      }
      case ASYNC_STATUS.INIT: {
        return null;
      }
    }
    return <Post content={data!} />;
  }
  render() {
    return <div className="blog-view">{this.asyncRender()}</div>;
  }
}
