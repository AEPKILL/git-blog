import i18n from '@i18n';
import { TerminalStore } from '@stores/terminal';

import TerminalApp from './terminal-app';

export default class Cls extends TerminalApp {
  description = i18n.clsDescription;
  name = ['cls', 'clear'];
  exec(_args: string[], terminal: TerminalStore) {
    terminal.clear();
  }
}
