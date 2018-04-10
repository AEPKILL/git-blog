// tslint:disable-next-line:no-reference
/// <reference path="../../../bin/web-declare.d.ts" />
import * as React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';

import './cover-page.scss';

export interface CoverPageState {
  name?: string;
}

export default class CoverPage extends React.Component<{}, CoverPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="panel-cover">
        <div className="panel-main">
          <div className="panel-main__inner panel-inverted">
            <div className="panel-main__content">
              <h1 className="panel-cover__title panel-title">
                <Link to="/">{BLOG_INFO.BLOG_INFO.title}</Link>
              </h1>
              <hr className="panel-cover__divider" />
              <p className="panel-cover__description">
                {BLOG_INFO.BLOG_INFO.description}
              </p>
              <hr className="panel-cover__divider panel-cover__divider--secondary" />
              <div className="navigation-wrapper">
                <nav className="cover-navigation cover-navigation--primary">
                  <ul className="navigation">
                    <li className="navigation__item">
                      <Link to="/blog" className="button">
                        {i18n.index}
                      </Link>
                    </li>
                    <li className="navigation__item">
                      <Link to="/about" className="button">
                        {i18n.about}
                      </Link>
                    </li>
                    <li className="navigation__item">
                      <Link to="/categories" className="button">
                        {i18n.tags}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="panel-cover--overlay" />
        </div>
      </div>
    );
  }
}
