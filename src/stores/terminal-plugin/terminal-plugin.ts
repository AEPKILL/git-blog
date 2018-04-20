import { TerminalStore } from '@stores/terminal';

export default abstract class TerminalPlugin {
  abstract name: string;
  abstract exec(args: string[], terminal: TerminalStore): void;
}
