import i18n from '@i18n';
import { TerminalStore } from '@stores/terminal';

import TerminalApp from './terminal-app';

export default class Pwd extends TerminalApp {
  description = i18n.pwdDescription;
  name = 'pwd';
  exec(_args: string[], terminal: TerminalStore) {
    terminal.print(terminal.path);
  }
}
