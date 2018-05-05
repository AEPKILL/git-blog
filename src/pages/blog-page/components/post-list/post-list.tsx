import DelayShow from '@components/delay-show/delay-show';
import Error from '@components/error/error';
import Loading from '@components/loading/loading';
import Pagination from '@components/pagination/pagination';
import i18n from '@i18n/index';
import PostPagingFetchServices from '@services/post-paging-fetch';
import AsyncData, { ASYNC_STATUS } from '@stores/utils/async-data';
import classnames from '@utils/classnames';

import PropTypes from 'prop-types';
import * as React from 'react';
import { Link, RouterChildContext } from 'react-router-dom';
import { inject, observer } from 'ts-mobx-react';
import join from 'url-join';

import './post-list.scss';

export interface PostListProps {
  title?: string;
  className?: string;
  page?: string;
  api: string;
  basePath: string;
  total: number;
}

@observer
export default class PostList extends React.Component<PostListProps, {}> {
  @inject('postList') postLit!: AsyncData<PostPagesMeta>;
  context!: RouterChildContext<{}>;

  constructor(props: PostListProps) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  updateData() {
    const { api, page } = this.props;
    const postPaging = new PostPagingFetchServices(api);
    this.postLit.waitData(postPaging.get(page || 0));
  }
  handlePageChange(page: number) {
    this.context.router.history.push(join('/', this.props.basePath, `${page}`));
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
    const { error, data, asyncStstus } = this.postLit;
    const { page = 0 } = this.props;
    if (page > this.props.total) {
      return (
        <Error
          error={new RangeError(i18n.exceededMaxPage)}
          retryText={<Link to="/blog">{i18n.back}</Link>}
        />
      );
    }
    switch (asyncStstus) {
      case ASYNC_STATUS.LOADING: {
        return (
          <DelayShow delay={500}>
            <Loading />
          </DelayShow>
        );
      }
      case ASYNC_STATUS.ERROR: {
        return <Error error={error!} retry={this.updateData} />;
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
          current={+page}
          pageSize={BLOG_INFO.BLOG_INFO.pageSize}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
  render() {
    const title = this.props.title ? (
      <h1 className="title">{this.props.title}</h1>
    ) : null;
    return (
      <div className={classnames(this.props.className, 'blog-view post-list')}>
        {title}
        {this.asyncRender()}
      </div>
    );
  }
  static contextTypes = {
    router: PropTypes.object
  };
}
