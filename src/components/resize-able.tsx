import * as React from 'react';

export interface ResizeAbleProps {
  onResize?(): void;
}

export default class ResizeAble extends React.Component<ResizeAbleProps, {}> {
  constructor(props: ResizeAbleProps) {
    super(props);

    this.state = {};
  }

  render() {
    return <div />;
  }
}
