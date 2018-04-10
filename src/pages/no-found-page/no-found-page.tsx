import * as React from 'react';

export interface NoFoundState {
  name?: string;
}

export default class NoFoundPage extends React.Component<{}, NoFoundState> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  render() {
    return <div>404 Not Found</div>;
  }
}
