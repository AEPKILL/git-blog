import PostPagingFetchServices from '@services/post-paging-fetch';
import AsyncData from '@stores/utils/async-data';
import classnames from '@utils/classnames';
import * as React from 'react';
import { inject, observer } from 'ts-mobx-react';

import './post-list.scss';

export interface PostListProps {
  title?: string;
  classNames?: string;
  page?: string;
  api: string;
  basePath: string;
}

export interface InjectPostListProps {
  postList: AsyncData<PostPagesMeta>;
}

@observer
export default class PostList extends React.Component<PostListProps, {}> {
  @inject('postList') asyncData!: AsyncData<PostPagesMeta>;
  constructor(props: PostListProps) {
    super(props);
  }
  updateData() {
    const { api, page } = this.props;
    const postPaging = new PostPagingFetchServices(api);
    this.asyncData.waitData(postPaging.get(page || 0));
  }
  componentDidUpdate(prePops: PostListProps) {
    if (this.props.page === prePops.page && this.props.api === prePops.api) {
      return;
    }
    this.updateData();
  }
  componentDidMount() {
    this.updateData();
  }
  asyncRender() {
    const { asyncStstus, error, data } = this.asyncData;
    return (
      <div>
        {error && error.message}
        <ul>{data && data!.items.map(item => <li>{item.description}</li>)}</ul>
      </div>
    );
    // todo
  }
  render() {
    const title = this.props.title ? (
      <h1 className="title">{this.props.title}</h1>
    ) : null;
    return (
      <div className={classnames(this.props.classNames, 'post-list')}>
        {title}
        {this.asyncRender()}
      </div>
    );
  }
}
