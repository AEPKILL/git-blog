import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import BlogPage from './pages/blog-page/blog-page';
import CoverPage from './pages/cover-page/cover-page';
import NoFoundPage from './pages/no-found-page/no-found-page';

import './style/app.scss';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={CoverPage} />
      <Route exact path="/blog" component={BlogPage} />
      <Route path="*" component={NoFoundPage} />
    </Switch>
  );
}

export default hot(module)(App);
