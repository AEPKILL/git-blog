import i18n from '@i18n';
import { TerminalStore } from '@stores/terminal';

import { join } from 'path';
import React from 'react';

import fileSystem from './file-system';
import TerminalApp from './terminal-app';

export default class Cd extends TerminalApp {
  description = i18n.cdDescription;
  name = 'cd';
  exec(args: string[], terminal: TerminalStore) {
    if (args.length === 1) {
      try {
        const path = join(terminal.path, args[0]);
        fileSystem.readDir(path);
        terminal.changePath(path);
      } catch (e) {
        terminal.print(e.message);
      }
    } else if (args.length > 1) {
      terminal.print(i18n.cannotFindPath);
    }
  }
  help() {
    return (
      <div className="line">
        <div key={1}>{i18n.useage}: cd &lt;dir&gt;</div>
        <div key={2}>{this.description}</div>
      </div>
    );
  }
}
