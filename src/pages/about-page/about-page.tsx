import * as React from 'react';

import './about-page.scss';

export interface AboutPageState {
  name?: string;
}

export default class AboutPage extends React.Component<{}, AboutPageState> {
  constructor(props: {}) {
    super(props);

    this.state = {};

  }

  render() {
    return <div>about page</div>;
  }
}
