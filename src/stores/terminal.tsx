import i18n from '@i18n/index';
import fileSystem from '@stores/terminal-apps/file-system';
import TerminalApp from '@stores/terminal-apps/terminal-app';

import { action, computed, observable } from 'mobx';
import React from 'react';
import { registerAppToTerminal } from './terminal-apps/index';

export class TerminalStore {
  apps: TerminalApp[] = [];
  @observable suspended = false;
  @observable title = i18n.terminal;
  @observable private _path: string;
  @observable private _history: string[] = [];
  @observable private _output: Array<string | JSX.Element> = [];

  @computed
  get path() {
    return this._path;
  }
  @computed
  get machineName() {
    return 'SHARK-BLOG';
  }
  get userName() {
    return BLOG_INFO.BLOG_INFO.author;
  }
  @computed
  get history() {
    return this._history;
  }
  @computed
  get output() {
    return this._output;
  }
  @computed
  get prefix() {
    const paths = this._path.split('/');
    return `SHARK-BLOG:${paths[paths.length - 1] || ''} ${
      BLOG_INFO.BLOG_INFO.author
    }$`;
  }
  constructor(path = '~') {
    this._path = path;
    registerAppToTerminal(this);
    console.log(this.apps);
  }
  @action
  printCommand(command: string) {
    this.print(
      <div className="line">
        <span className="line-prefix" key={1}>
          {this.prefix}
        </span>
        <span className="line-command" key={2}>
          {command}
        </span>
      </div>
    );
  }
  @action
  changePath(path: string) {
    this._path = path;
  }
  @action
  exec(command: string) {
    if (this.suspended) {
      return;
    }
    const [appName, ...args] = command.trim().split(/\s+/);
    const app = this.getAppInstance(appName);
    this.printCommand(command);
    this.history.push(command);
    if (app) {
      app.exec(args, this);
    } else {
      this.print(`${appName}: ${i18n.commandNotFound}`);
    }
  }
  @action
  killCurrentApp() {
    // kill current app
  }
  @action
  clear() {
    this._output = [];
  }
  @action
  print(...lines: Array<string | JSX.Element>) {
    for (const line of lines) {
      if (typeof line === 'string') {
        this._output.push(<div className="line">{line}</div>);
      } else {
        this._output.push(line);
      }
    }
  }
  @action
  removeLastLine() {
    this._output.pop();
  }
  hint(command: string) {
    const [appName, ...args] = command.trim().split(/\s+/);
    let result: string[] = [];
    if (!args.length && command[command.length - 1] !== ' ') {
      for (const app of this.apps) {
        if (typeof app.name === 'string') {
          if (app.name.toLowerCase().indexOf(appName.toLowerCase()) == 0) {
            result.push(app.name);
          }
        } else {
          for (const name of app.name) {
            if (name.toLowerCase().indexOf(appName.toLowerCase()) == 0) {
              result.push(name);
            }
          }
        }
      }
      if (result.length === 1) {
        return result[0];
      }
    } else if (args.length) {
      const name = args[args.length - 1];
      const files = fileSystem.readDir(this.path);
      result = files
        .filter(
          file => file.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        )
        .map(file => file.name);
      if (result.length === 1) {
        const newArgs = args.slice(0, args.length - 1).concat(result[0]);
        return `${appName} ${newArgs.join(' ')}`;
      }
    }
    if (result.length > 1) {
      this.printCommand(command);
      this.print(result.join(' '));
    }
    return null;
  }
  registerApp(app: TerminalApp) {
    this.apps.push(app);
  }
  getAppInstance(name: string) {
    name = name.toLowerCase();
    for (const app of this.apps) {
      if (typeof app.name === 'string') {
        if (app.name.toLowerCase() === name) {
          return app;
        }
      } else {
        for (const appName of app.name) {
          if (appName.toLowerCase() === name) {
            return app;
          }
        }
      }
    }
    return null;
  }
}

export default new TerminalStore();
