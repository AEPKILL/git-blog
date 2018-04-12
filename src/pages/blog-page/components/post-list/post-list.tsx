import DelayShow from '@components/delay-show/delay-show';
import Loading from '@components/loading/loading';
import Pagination from '@components/pagination/pagination';
import i18n from '@i18n/index';
import PostPagingFetchServices from '@services/post-paging-fetch';
import AsyncData, { ASYNC_STATUS } from '@stores/utils/async-data';
import classnames from '@utils/classnames';
import { join } from '@utils/url';

import PropTypes from 'prop-types';
import * as React from 'react';
import { Link, RouterChildContext } from 'react-router-dom';
import { inject, observer } from 'ts-mobx-react';

import './post-list.scss';

export interface PostListProps {
  title?: string;
  classNames?: string;
  page?: string;
  api: string;
  basePath: string;
  total: number;
}

@observer
export default class PostList extends React.Component<PostListProps, {}> {
  context!: RouterChildContext<{}>;
  @inject('postList') asyncData!: AsyncData<PostPagesMeta>;
  constructor(props: PostListProps) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
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
  onPageChange(page: number) {
    this.context.router.history.push(join('/', this.props.basePath, page));
  }
  asyncRender() {
    const { error, data, asyncStstus } = this.asyncData;
    const { page } = this.props;
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
            <span className="retry" onClick={this.updateData}>
              重试
            </span>
          </div>
        );
      }
      case ASYNC_STATUS.INIT: {
        return null;
      }
    }
    return (
      <div className="list-content">
        <ul className="list">
          {data &&
            data.items.map(item => (
              <li key={item.source} className="list__item">
                <Link to={`/blog/post/${item.source}`}>
                  <h3 className="post-title">{item.title}</h3>
                  <div className="post-date">{item.date}</div>
                  <p className="post-description">{item.description}</p>
                </Link>
              </li>
            ))}
        </ul>
        <Pagination
          total={this.props.total}
          current={(page && +page) || 0}
          pageSize={BLOG_INFO.BLOG_INFO.pageSize}
          onChange={this.onPageChange}
        />
      </div>
    );
  }
  render() {
    const title = this.props.title ? (
      <h1 className="title">{this.props.title}</h1>
    ) : null;
    return (
      <div className={classnames(this.props.classNames, 'blog-view post-list')}>
        {title}
        {this.asyncRender()}
      </div>
    );
  }
  static contextTypes = {
    router: PropTypes.object
  };
}
