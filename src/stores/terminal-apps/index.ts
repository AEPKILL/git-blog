import Cls from '@stores/terminal-apps/cls';
import Ls from '@stores/terminal-apps/ls';
import WhoIAm from '@stores/terminal-apps/who-i-am';

import Exit from '@stores/terminal-apps/exit';
import { TerminalStore } from '../terminal';
import Cat from './cat';
import Cd from './cd';
import Help from './help';
import Pwd from './pwd';
import TerminalApp from './terminal-app';

const apps: TerminalApp[] = [];

export function registerApp(app: TerminalApp) {
  apps.push(app);
}

export function registerAppToTerminal(terminal: TerminalStore) {
  for (const app of apps) {
    terminal.registerApp(app);
  }
}

export default {
  registerApp,
  registerAppToTerminal
};

registerApp(new Ls());
registerApp(new Cls());
registerApp(new Help());
registerApp(new Pwd());
registerApp(new WhoIAm());
registerApp(new Cd());
registerApp(new Cat());
registerApp(new Exit());
