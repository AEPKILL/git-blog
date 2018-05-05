import { DragPosition } from '@components/drag-able';
import cloneRealDomElement from '@utils/clone-real-dom-element';

import * as React from 'react';
import ReactDOM from 'react-dom';

export interface ResizeAbleProps {
  minWidth?: number;
  minHeight?: number;
}

export interface ResizeAbleState {}

enum Direction {
  TOP,
  LEFT,
  BOTTOM,
  RIGHT,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT
}

export default class ResizeAble extends React.Component<
  ResizeAbleProps,
  ResizeAbleState
> {
  direction = Direction.TOP;
  startCursorPos?: DragPosition;
  elementRect?: ClientRect;
  preCursor?: string | null;
  constructor(props: ResizeAbleProps) {
    super(props);
    this.state = {};
    this.handleTop = this.handleTop.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleBottom = this.handleBottom.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleTopLeft = this.handleTopLeft.bind(this);
    this.handleTopRight = this.handleTopRight.bind(this);
    this.handleBottomLeft = this.handleBottomLeft.bind(this);
    this.handleBottomRight = this.handleBottomRight.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  handleMouseMove(event: MouseEvent) {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
    const offset = {
      x: event.clientX - this.startCursorPos!.x,
      y: event.clientY - this.startCursorPos!.y
    };
    const direction = this.direction;
    const orginTop = this.elementRect!.top;
    const orginLeft = this.elementRect!.left;
    const orginWidth = this.elementRect!.width;
    const orginHeight = this.elementRect!.height;

    if (
      direction == Direction.TOP ||
      direction == Direction.TOP_LEFT ||
      direction == Direction.TOP_RIGHT
    ) {
      if (orginTop + offset.y < 0) {
        offset.y = -orginTop;
      }
      if (orginHeight - offset.y < this.props.minHeight!) {
        offset.y = orginHeight - this.props.minHeight!;
      }
      element.style.height = `${orginHeight - offset.y}px`;
      element.style.top = `${orginTop + offset.y}px`;
    }
    if (
      direction == Direction.BOTTOM ||
      direction == Direction.BOTTOM_LEFT ||
      direction == Direction.BOTTOM_RIGHT
    ) {
      if (orginTop + orginHeight + offset.y > window.innerHeight) {
        offset.y = window.innerHeight - orginTop - orginHeight;
      }
      if (orginHeight + offset.y < this.props.minHeight!) {
        offset.y = this.props.minHeight! - orginHeight;
      }
      element.style.height = `${orginHeight + offset.y}px`;
    }
    if (
      direction == Direction.LEFT ||
      direction == Direction.TOP_LEFT ||
      direction == Direction.BOTTOM_LEFT
    ) {
      if (orginLeft + offset.x < 0) {
        offset.x = -orginLeft;
      }
      if (orginWidth - offset.x < this.props.minWidth!) {
        offset.x = orginWidth - this.props.minWidth!;
      }
      element.style.width = `${orginWidth - offset.x}px`;
      element.style.left = `${orginLeft + offset.x}px`;
    }
    if (
      direction == Direction.RIGHT ||
      direction == Direction.TOP_RIGHT ||
      direction == Direction.BOTTOM_RIGHT
    ) {
      if (orginLeft + orginWidth + offset.x > window.innerWidth) {
        offset.x = window.innerWidth - orginLeft - orginWidth;
      }
      if (orginWidth + offset.x < this.props.minWidth!) {
        offset.x = this.props.minWidth! - orginWidth;
      }
      element.style.width = `${orginWidth + offset.x}px`;
    }
  }
  handleMouseUp() {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
    if (element.classList.contains('resize-start')) {
      element.classList.remove('resize-start');
    }
    document.documentElement.style.cursor = this.preCursor!;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }
  handleMouseDown(event: React.MouseEvent<HTMLElement>) {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
    this.preCursor = getComputedStyle(document.documentElement).cursor;
    document.documentElement.style.cursor = getComputedStyle(
      event.target as Element
    ).cursor;

    if (element.classList.contains('max')) {
      return;
    }
    if (!element.classList.contains('resize-start')) {
      element.classList.add('resize-start');
    }
    event.preventDefault();
    event.stopPropagation();
    this.startCursorPos = {
      y: event.clientY,
      x: event.clientX
    };
    this.elementRect = element.getBoundingClientRect();
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }
  handleTop(event: React.MouseEvent<HTMLElement>) {
    this.direction = Direction.TOP;
    this.handleMouseDown(event);
  }
  handleLeft(event: React.MouseEvent<HTMLElement>) {
    this.direction = Direction.LEFT;
    this.handleMouseDown(event);
  }
  handleBottom(event: React.MouseEvent<HTMLElement>) {
    this.direction = Direction.BOTTOM;
    this.handleMouseDown(event);
  }
  handleRight(event: React.MouseEvent<HTMLElement>) {
    this.direction = Direction.RIGHT;
    this.handleMouseDown(event);
  }
  handleTopLeft(event: React.MouseEvent<HTMLElement>) {
    this.direction = Direction.TOP_LEFT;
    this.handleMouseDown(event);
  }
  handleTopRight(event: React.MouseEvent<HTMLElement>) {
    this.direction = Direction.TOP_RIGHT;
    this.handleMouseDown(event);
  }
  handleBottomLeft(event: React.MouseEvent<HTMLElement>) {
    this.direction = Direction.BOTTOM_LEFT;
    this.handleMouseDown(event);
  }
  handleBottomRight(event: React.MouseEvent<HTMLElement>) {
    this.direction = Direction.BOTTOM_RIGHT;
    this.handleMouseDown(event);
  }
  render() {
    return cloneRealDomElement(
      React.Children.only(this.props.children),
      {},
      <div className="border border-top" onMouseDown={this.handleTop} />,
      <div className="border border-bottom" onMouseDown={this.handleBottom} />,
      <div className="border border-left" onMouseDown={this.handleLeft} />,
      <div className="border border-right" onMouseDown={this.handleRight} />,
      <div
        className="border border-top border-left"
        onMouseDown={this.handleTopLeft}
      />,
      <div
        className="border border-top border-right"
        onMouseDown={this.handleTopRight}
      />,
      <div
        className="border border-bottom border-right"
        onMouseDown={this.handleBottomRight}
      />,
      <div
        className="border border-bottom border-left"
        onMouseDown={this.handleBottomLeft}
      />
    );
  }
  static defaultProps: ResizeAbleProps = {
    minWidth: 600,
    minHeight: 300
  };
}
