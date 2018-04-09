import * as React from 'react';
import { hot } from 'react-hot-loader';
import Counter from './Counter';
import './x.scss';

const App = () => (
  <h1>
    <span>you</span>
    Hello super, world.<br />
    <Counter />
  </h1>
);

export default hot(module)(App);
