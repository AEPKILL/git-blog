import axios from 'axios';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'ts-mobx-react';
import App from './app';
import stores from './stores/index';

function bootStrap() {
  const root = document.getElementById('app');
  render(
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    root
  );
}

setTimeout(() => {
  if (sharkBlog.onAppLoaded) {
    sharkBlog.onAppLoaded();
  }
}, 0);

sharkBlog.onBootstrap = bootStrap;
axios.defaults.baseURL = BLOG_INFO.BLOG_INFO.publicPath;
