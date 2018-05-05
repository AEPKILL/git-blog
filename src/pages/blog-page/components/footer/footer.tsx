// tslint:disable-next-line:no-reference
/// <reference path="../../../../../bin/web-declare.d.ts" />

import * as React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer: React.SFC = () => {
  return (
    <footer className="footer">
      <span className="footer__copyright">
        © 2016-2020. | <Link to="/">{BLOG_INFO.BLOG_INFO.site}</Link> | Power
        By: <a href="https://github.com/AEPKILL/shark-blog">SHARK-BLOG</a>
      </span>
    </footer>
  );
};

export default Footer;
