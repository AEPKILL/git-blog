import * as React from 'react';
import ReactDOM from 'react-dom';

export interface DragPosition {
  x: number;
  y: number;
}

export interface DragAbleProps {
  onDragEnd?(pos: DragPosition): void;
  onDragMove?(pos: DragPosition): void;
}

export default class DragAble extends React.Component<DragAbleProps, {}> {
  startCursorPos?: DragPosition;
  elementOffset?: DragPosition;
  constructor(props: DragAbleProps) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  handleMouseDown(event: React.MouseEvent<HTMLElement>) {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
    const match = /translate\(((\w|\W)+?)\)/.exec(
      element.style.transform || ''
    );
    this.startCursorPos = {
      y: event.clientY,
      x: event.clientX
    };
    if (match) {
      const value = match[1];
      const [x, y] = value.split(',');
      this.elementOffset = {
        x: parseInt(x, 10),
        y: parseInt(y, 10)
      };
    } else {
      this.elementOffset = {
        x: 0,
        y: 0
      };
    }
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }
  handleMouseUp() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }
  handleMouseMove(event: MouseEvent) {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
    if (element) {
      element.style.transform = `translate(${event.clientX -
        this.startCursorPos!.x +
        this.elementOffset!.x}px,${event.clientY -
        this.startCursorPos!.y +
        this.elementOffset!.y}px)`;
    }
  }
  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp
    });
  }
}
