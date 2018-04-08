import { Command, command, metadata, option, Options } from 'clime';
import Updater from '../updater';

export class UpdateOptions extends Options {
  @option<boolean>({
    flag: 'w',
    description: `watch post files and trigger re-update on changes.`,
    required: false,
    toggle: true,
    default: false
  })
  readonly watch!: boolean;
  @option<boolean>({
    flag: 't',
    description: `update theme.`,
    required: false,
    toggle: true,
    default: false
  })
  readonly theme!: boolean;
}

// tslint:disable-next-line:max-classes-per-file
@command({
  description: 'update blog info.'
})
export default class extends Command {
  @metadata
  async execute(options: UpdateOptions) {
    const updater = new Updater();
    if (options.theme) {
      updater.updateTheme();
      return;
    }
    await updater.update();
    if (options.watch) {
      updater.watch();
      console.log(`Hit CTRL-C to stop watch.`);
    }
  }
}
