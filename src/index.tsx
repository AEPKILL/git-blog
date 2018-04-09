import * as React from 'react';
import { render } from 'react-dom';
import App from './app';

function bootStrap() {
  const root = document.getElementById('app');
  render(<App />, root);
}

sharkBlog.onBootstrap = bootStrap;

// if (sharkBlog.onAppLoaded) {
//   sharkBlog.onAppLoaded();
// }
