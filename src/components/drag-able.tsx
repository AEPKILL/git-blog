import * as React from 'react';
import ReactDOM from 'react-dom';

export interface DragPosition {
  x: number;
  y: number;
}

export interface DragAbleProps {
  overOutViewport?: boolean;
  onDragEnd?(pos: DragPosition): void;
  onDragMove?(pos: DragPosition): void;
}

export default class DragAble extends React.Component<DragAbleProps, {}> {
  startCursorPos?: DragPosition;
  elementOffset?: DragPosition;
  elementRect?: ClientRect;
  constructor(props: DragAbleProps) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  handleMouseDown(event: React.MouseEvent<HTMLElement>) {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
    if (!element.classList.contains('drag-start')) {
      element.classList.add('drag-start');
    }
    this.startCursorPos = {
      y: event.clientY,
      x: event.clientX
    };
    this.elementRect = element.getBoundingClientRect();
    this.elementOffset = {
      x: parseInt(element.style.left || '', 10) || this.elementRect.left,
      y: parseInt(element.style.top || '', 10) || this.elementRect.top
    };
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }
  handleMouseUp() {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
    if (element.classList.contains('drag-start')) {
      element.classList.remove('drag-start');
    }
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }
  handleMouseMove(event: MouseEvent) {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
    const elementRect = this.elementRect!;

    if (element) {
      let offsetX = event.clientX - this.startCursorPos!.x;
      let offsetY = event.clientY - this.startCursorPos!.y;
      if (this.props.overOutViewport !== true) {
        if (elementRect.left + offsetX < 0) {
          offsetX = -elementRect.left;
        }
        if (
          elementRect.left + elementRect.width + offsetX >
          window.innerWidth
        ) {
          offsetX = window.innerWidth - (elementRect.left + elementRect.width);
        }
        if (elementRect.top + offsetY < 0) {
          offsetY = -elementRect.top;
        }
        if (
          elementRect.top + elementRect.height + offsetY >
          window.innerHeight
        ) {
          offsetY = window.innerHeight - (elementRect.top + elementRect.height);
        }
      }
      element.style.left = `${offsetX + this.elementOffset!.x}px`;
      element.style.top = `${offsetY + this.elementOffset!.y}px`;
    }
  }
  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp
    });
  }
}
