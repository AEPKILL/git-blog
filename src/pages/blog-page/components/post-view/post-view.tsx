import DelayShow from '@components/delay-show/delay-show';
import Error from '@components/error/error';
import Loading from '@components/loading/loading';
import PostMeta from '@components/post-meta/post-meta';
import Post from '@components/post/post';
import PostFetchServices from '@services/post-fetch';
import AsyncData, { ASYNC_STATUS } from '@stores/utils/async-data';
import separateMarkdownMeta from '../../../../../bin/separate-markdown-meta';

import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'ts-mobx-react';
import join from 'url-join';

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
    console.log(join('/', path), path);
    this.post.waitData(PostFetchServices.get(join('/', path)));
  }
  componentDidMount() {
    this.loadPost();
    window.scroll(0, 0);
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
        return <Error error={error!} retry={this.loadPost} />;
      }
      case ASYNC_STATUS.INIT: {
        return null;
      }
    }
    const { meta, content } = separateMarkdownMeta(data!);
    return (
      <>
        <h1>{meta.title}</h1>
        <PostMeta meta={meta} />
        <Post content={content} />
      </>
    );
  }
  render() {
    return <div className="blog-view post-view">{this.asyncRender()}</div>;
  }
}
