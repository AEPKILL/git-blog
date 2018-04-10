import * as React from 'react';

export interface AboutPageState {
  name?: string;
}

export default class AboutPage extends React.Component<{}, AboutPageState> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  render() {
    return <div />;
  }
}
