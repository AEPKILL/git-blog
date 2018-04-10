import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

function bootStrap() {
  const root = document.getElementById('app');
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  );
}

sharkBlog.onBootstrap = bootStrap;

setTimeout(() => {
  if (sharkBlog.onAppLoaded) {
    sharkBlog.onAppLoaded();
  }
}, 0);
