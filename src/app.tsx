import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';
import AboutPage from './pages/about-page/about-page';
import BlogPage from './pages/blog-page/blog-page';
import CoverPage from './pages/cover-page/cover-page';
import NotFoundPage from './pages/not-found-page/no-found-page';

import './style/app.scss';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={CoverPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/404NotFound" component={NotFoundPage} />
      <Route path="*" render={() => <Redirect to="/404NotFound" />} />
    </Switch>
  );
}

export default hot(module)(App);
