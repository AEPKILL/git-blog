import * as React from 'react';

export interface DelayShowProps {
  delay: number;
}

export interface DelayShowState {
  element: JSX.Element | null | React.ReactNode;
}

export default class DelayShow extends React.Component<
  DelayShowProps,
  DelayShowState
> {
  private timer: number | null = null;
  constructor(props: DelayShowProps) {
    super(props);
    this.state = {
      element: null
    };
  }
  componentWillUnmount() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  }
  componentDidMount() {
    this.timer = window.setTimeout(() => {
      this.setState({ element: this.props.children });
      this.timer = null;
    }, this.props.delay);
  }
  render() {
    return this.state.element;
  }
}
