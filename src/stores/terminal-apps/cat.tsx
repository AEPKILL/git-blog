import i18n from '@i18n';
import { TerminalStore } from '@stores/terminal';

import { join } from 'path';

import fileSystem from './file-system';
import TerminalApp from './terminal-app';

export default class Cat extends TerminalApp {
  description = i18n.catDescription;
  name = 'cat';
  exec(args: string[], terminal: TerminalStore) {
    if (args.length) {
      const filename = args[0];
      const fullpath = join(terminal.path, filename);
      try {
        const content = fileSystem.readFile(fullpath);
        terminal.print(content);
      } catch (e) {
        terminal.print(e.message);
      }
    } else {
      terminal.print(`${i18n.useage}: cat <filename>`);
    }
  }
}
