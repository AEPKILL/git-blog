import * as React from 'react';

export interface TitleProps {
  title: string;
}

export default class Title extends React.Component<TitleProps, {}> {
  componentDidMount() {
    document.title = this.props.title;
  }
  render() {
    return null;
  }
}
