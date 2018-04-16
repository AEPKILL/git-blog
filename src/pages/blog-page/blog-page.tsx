import MenuButton from '@components/menu-button/menu-button';
import i18n from '@i18n/index';
import CoverPage from '@pages/cover-page/cover-page';
import classnames from '@utils/classnames';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from './components/footer/footer';
import PostList from './components/post-list/post-list';
import PostView from './components/post-view/post-view';

import './blog-page.scss';

export interface BlogPageState {
  showLeftSide: boolean;
}

export default class BlogPage extends React.Component<{}, BlogPageState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showLeftSide: false
    };
    this.onClickSwitchSide = this.onClickSwitchSide.bind(this);
  }
  onClickSwitchSide() {
    this.setState({
      showLeftSide: !this.state.showLeftSide
    });
  }
  render() {
    return (
      <div className="blog">
        <aside
          className={classnames({ show: this.state.showLeftSide }, 'left-side')}
        >
          <MenuButton
            className="side-switch"
            closed={!this.state.showLeftSide}
            onClick={this.onClickSwitchSide}
          />
          <CoverPage />
        </aside>
        <main
          className={classnames(
            { 'show-left-side': this.state.showLeftSide },
            'content-side'
          )}
        >
          <Switch>
            <Route
              exact
              path="/blog/:page(\d+)?"
              render={props => (
                <PostList
                  api={BLOG_INFO.POST_INFO.path}
                  basePath="blog"
                  page={props.match.params.page}
                  total={BLOG_INFO.POST_INFO.count}
                />
              )}
            />
            <Route
              exact
              path="/blog/tag/:name/:page(\d+)?"
              render={props =>
                postListAdapter(
                  BLOG_INFO.TAGS_INFO,
                  `/blog/tag/${props.match.params.name}`,
                  props.match.params.name,
                  props.match.params.page,
                  i18n.tag
                )
              }
            />
            <Route
              exact
              path="/blog/categories/:name/:page(\d+)?"
              render={props =>
                postListAdapter(
                  BLOG_INFO.CATEGORIES_INFO,
                  `/blog/categories/${props.match.params.name}`,
                  props.match.params.name,
                  props.match.params.page,
                  i18n.categories
                )
              }
            />
            <Route path="/blog/post/:path*" component={PostView} />
            <Route
              path="/blog/*"
              render={() => <Redirect to="/404NotFound" />}
            />}/>
          </Switch>
          <Footer />
        </main>
      </div>
    );
  }
}

function postListAdapter(
  pathsMeta: PagesMetaPath[],
  basePath: string,
  name: string,
  page: string,
  title: string
) {
  const matchMeta = pathsMeta.filter(meta => meta.name === name)[0];
  console.log(matchMeta);
  if (matchMeta) {
    return (
      <PostList
        api={matchMeta.path}
        basePath={basePath}
        page={page}
        title={`${title}: ${name}`}
        total={matchMeta.count}
      />
    );
  } else {
    return (
      <h1 className="title">
        {title} &lt;{name}&gt; {i18n.notExist}
      </h1>
    );
  }
}
