import * as React from 'react';

export interface BlogPageState {
  name?: string;
}

export default class BlogPage extends React.Component<{}, BlogPageState> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  render() {
    return <div>blog page</div>;
  }
}
