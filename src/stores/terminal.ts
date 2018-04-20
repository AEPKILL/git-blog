import { action, computed, observable } from 'mobx';

export class TerminalStore {
  @observable suspended = false;
  @observable private _path: string;
  @observable private _history: string[] = [];
  @observable private _output: string[] = [];

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
  constructor(path = '/') {
    this._path = path;
  }

  @action
  exec(command: string) {
    if (this.suspended) {
      return;
    }
    this.history.push(command);
  }
  @action
  clear() {
    this._output = [];
  }
  @action
  print(...lines: string[]) {
    this._output.push(...lines);
  }
}

export default new TerminalStore();

// function analysisCommand(command: string) {
//   const commands = command.split(' ').filter(c => c.length);
//   const name = commands[0];
//   const args = commands.slice(1);
//   return {
//     name,
//     args
//   };
// }
