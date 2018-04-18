import classnames from '@utils/classnames';

import * as React from 'react';
import ReactDOM from 'react-dom';

import './img-preview.scss';

interface ImgPreviewProps {
  src?: string;
  onClose?: () => void;
  origin?: ClientRect;
  natural?: {
    height: number;
    width: number;
  };
}

export default class ImgPreview extends React.Component<
  ImgPreviewProps,
  { style?: Partial<React.CSSProperties> }
> {
  timer?: number;
  constructor(props: ImgPreviewProps) {
    super(props);
    this.state = {};
  }
  setImgToOrigin() {
    const { origin } = this.props;
    this.setState({
      style: {
        top: `${origin!.top}px`,
        left: `${origin!.left}px`,
        width: `${origin!.width}px`,
        height: `${origin!.height}px`
      }
    });
  }
  setImgToPreview() {
    const { natural } = this.props;
    this.setState({
      style: {
        top: `calc(50% - ${natural!.height / 2}px)`,
        left: `calc(50% - ${natural!.width / 2}px)`,
        width: `${natural!.width}px`,
        height: `${natural!.height}px`
      }
    });
  }
  show() {
    this.setImgToOrigin();
    this.timer = window.setTimeout(() => this.setImgToPreview(), 0);
  }
  componentDidUpdate(preProps: ImgPreviewProps) {
    if (this.props.src !== preProps.src) {
      if (this.props.src) {
        this.show();
      }
    }
  }
  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }
  render() {
    const { src, onClose } = this.props;
    const element = (
      <div
        className={classnames('blog-img-preview', {
          show: !!src
        })}
      >
        <img src={src} onClick={onClose} style={this.state.style} />
      </div>
    );
    // tslint:disable-next-line:no-any
    return ReactDOM.createPortal(element, document.body) as any;
  }
}
