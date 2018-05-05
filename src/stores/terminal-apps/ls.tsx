import i18n from '@i18n';
import { TerminalStore } from '@stores/terminal';
import fileSystem, { FILE_TYPE } from '@stores/terminal-apps/file-system';

import React from 'react';

import TerminalApp from './terminal-app';

export default class Ls extends TerminalApp {
  name = ['ls', 'dir'];
  description = i18n.lsDescription;
  exec(_args: string[], terminal: TerminalStore) {
    const files = fileSystem.readDir(terminal.path);
    for (const file of files) {
      if (file.type === FILE_TYPE.FILE) {
        terminal.print(file.name);
      } else {
        terminal.print(<div className="line green-text">{file.name}</div>);
      }
    }
  }
}
