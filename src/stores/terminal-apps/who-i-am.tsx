import i18n from '@i18n';
import { TerminalStore } from '@stores/terminal';

import React from 'react';

import TerminalApp from './terminal-app';

export default class WhoIAm extends TerminalApp {
  description = i18n.whoIAm;
  name = 'whoiam';
  exec(_args: string[], terminal: TerminalStore) {
    if (BLOG_INFO.BLOG_INFO.extra && BLOG_INFO.BLOG_INFO.extra.whoiam) {
      const whoiam = BLOG_INFO.BLOG_INFO.extra.whoiam as string;
      terminal.print(
        <div className="line">
          {whoiam
            .split('\n')
            .map((content, index) => <div key={index}>{content}</div>)}
        </div>
      );
    } else {
      terminal.print(`It's ${BLOG_INFO.BLOG_INFO.author}`);
    }
  }
}
