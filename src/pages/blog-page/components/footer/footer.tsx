import * as React from 'react';

import './footer.scss';

const Footer: React.SFC = () => {
  return (
    <footer className="footer">
      <span className="footer__copyright">
        © 2016-2020. | <a href="http://blog.aepkill.com">blog.aepkill.com</a> |
        Power By: <a href="https://github.com/AEPKILL/shark-blog">SHARK-BLOG</a>
      </span>
    </footer>
  );
};

export default Footer;
