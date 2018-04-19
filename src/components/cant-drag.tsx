import * as React from 'react';

export default class CantDrag extends React.Component {
  render() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(React.Children.only(child), {
        onMouseDown(event: React.MouseEvent<HTMLElement>) {
          event.stopPropagation();
          event.preventDefault();
        }
      })
    );
  }
}
