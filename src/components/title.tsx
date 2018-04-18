import * as React from 'react';

export interface TitleProps {
  title: string;
}

export default class Title extends React.Component<TitleProps, {}> {
  preTitle: string;
  constructor(props: TitleProps) {
    super(props);
    this.preTitle = document.title;
  }
  componentDidMount() {
    document.title = this.props.title;
  }
  componentWillUnmount() {
    document.title = this.preTitle;
  }
  render() {
    return null;
  }
}
