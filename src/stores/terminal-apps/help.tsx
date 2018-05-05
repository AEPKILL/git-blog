import i18n from '@i18n';
import { TerminalStore } from '@stores/terminal';

import React from 'react';

import TerminalApp from './terminal-app';

export default class Help extends TerminalApp {
  description = i18n.helpDescription;
  name = 'help';
  exec(args: string[], terminal: TerminalStore) {
    if (!args.length) {
      for (const app of terminal.apps) {
        terminal.print(
          <div className="line">
            <span className="help-app-name" key={1}>
              {app.name.toString()}
            </span>{' '}
            - {app.description}
          </div>
        );
      }
    } else {
      const appName = args[0];
      const app = terminal.getAppInstance(appName);
      if (app) {
        terminal.print(app.help());
      } else {
        terminal.print(`${appName}: ${i18n.commandNotFound}`);
      }
    }
  }
  help() {
    return (
      <div>
        <div className="line" key={1}>
          {i18n.useage}: help [command]
        </div>
        <div className="line" key={2}>
          {this.description}
        </div>
      </div>
    );
  }
}
