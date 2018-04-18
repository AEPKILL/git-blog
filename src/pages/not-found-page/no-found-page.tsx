import Title from '@components/title';
import i18n from '@i18n/index';

import * as React from 'react';
import { Link } from 'react-router-dom';

import './no-found-page.scss';

export interface NoFoundState {
  name?: string;
}

export default class NoFoundPage extends React.Component<{}, NoFoundState> {
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="not-found-page panel-cover">
        <Title title={`${i18n._404notFound} - ${BLOG_INFO.BLOG_INFO.title}`} />
        <div className="rocket" />
        <div className="panel-main">
          <div className="panel-main__inner panel-inverted">
            <div className="panel-main__content">
              <h3 className="panel-cover__title">{i18n._404notFound}</h3>
              <hr className="panel-cover__divider" />
              <div className="navigation-wrapper">
                <nav className="cover-navigation cover-navigation--primary">
                  <ul className="navigation">
                    <li className="navigation__item">
                      <Link to="/blog" className="button">
                        {i18n.posts}
                      </Link>
                    </li>
                    <li className="navigation__item">
                      <Link to="/about" className="button">
                        {i18n.about}
                      </Link>
                    </li>
                    <li className="navigation__item">
                      <a className="button" href={BLOG_INFO.BLOG_INFO.concat}>
                        {i18n.concat}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-cover--overlay" />
      </div>
    );
  }
}
