import Terminal from '@components/terminal/terminal';
import Title from '@components/title';
import i18n from '@i18n';

import * as React from 'react';

import './terminal-page.scss';

export interface TerminalPageState {}

export default class TerminalPage extends React.Component<
  {},
  TerminalPageState
> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="panel-cover about-page">
        <Title title={`${i18n.terminal} - ${BLOG_INFO.BLOG_INFO.title}`} />
        <div className="panel-cover--overlay" />
        <Terminal />
      </div>
    );
  }
}
