import classnames from '@utils/classnames';

import * as React from 'react';

export interface BubbleEffectProps {
  className?: string;
  canvas?: HTMLCanvasElement;
}

export default class BubbleEffect extends React.Component<
  BubbleEffectProps,
  {}
> {
  canvasRef = React.createRef();
  get canvas() {
    return this.props.canvas || this.canvasRef.current;
  }
  constructor(props: BubbleEffectProps) {
    super(props);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }
  handleWindowResize() {
    // todo
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
  render() {
    if (this.props.canvas) {
      return null;
    }
    return <canvas className={classnames(this.props.className)} />;
  }
}
