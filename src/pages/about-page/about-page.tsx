import Terminal from '@components/terminal/terminal';
import Title from '@components/title';
import i18n from '@i18n';

import * as React from 'react';

import './about-page.scss';

export interface AboutPageState {
  name?: string;
}

export default class AboutPage extends React.Component<{}, AboutPageState> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="panel-cover about-page">
        <Title title={`${i18n.about} - ${BLOG_INFO.BLOG_INFO.title}`} />
        <div className="panel-cover--overlay" />
        <Terminal />
      </div>
    );
  }
}
