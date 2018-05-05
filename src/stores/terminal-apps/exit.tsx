import i18n from '@i18n';

import TerminalApp from './terminal-app';

export default class Exit extends TerminalApp {
  description = i18n.exitDescription;
  name = 'exit';
  exec() {
    if (history) {
      history.back();
    }
  }
}
