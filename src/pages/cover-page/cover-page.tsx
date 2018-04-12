// tslint:disable-next-line:no-reference
/// <reference path="../../../bin/web-declare.d.ts" />
import * as React from 'react';
import { Link } from 'react-router-dom';
import i18n, { coverI18n } from '../../i18n';

import classnames from '../../utils/classnames';

import './cover-page.scss';

export interface CoverPageProps {
  className?: string;
}

export default class CoverPage extends React.Component<CoverPageProps> {
  constructor(props: CoverPageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={classnames(this.props.className, 'panel-cover')}>
        <div className="panel-main">
          <div className="panel-main__inner panel-inverted">
            <div className="panel-main__content">
              <h1 className="panel-cover__title panel-title">
                <Link to="/">{coverI18n(BLOG_INFO.BLOG_INFO.title)}</Link>
              </h1>
              <hr className="panel-cover__divider" />
              <p className="panel-cover__description">
                {coverI18n(BLOG_INFO.BLOG_INFO.description)}
              </p>
              <hr className="panel-cover__divider panel-cover__divider--secondary" />
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
          <div className="panel-cover--overlay" />
        </div>
      </div>
    );
  }
}
