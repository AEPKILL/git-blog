import { TerminalStore } from '@stores/terminal';

export default abstract class TerminalApp {
  description: string = '';
  abstract name: string | string[];
  abstract exec(args: string[], terminal: TerminalStore): void;
  help(): JSX.Element | string {
    return this.description;
  }
  onKill() {
    console.log(`force kill`);
  }
}
