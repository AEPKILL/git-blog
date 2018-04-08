import { red } from 'cli-color';
import { Command, command, metadata } from 'clime';
import Server from '../server';

@command({
  description: 'start the server for live preview.'
})
export default class extends Command {
  @metadata
  execute() {
    return new Server().start().catch(e => red(e.message));
  }
}
