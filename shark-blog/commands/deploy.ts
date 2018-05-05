import { execSync } from 'child_process';
import { green, red } from 'cli-color';
import { Command, command, param } from 'clime';

@command({
  description: 'deploy blog.'
})
export default class extends Command {
  execute(
    @param({
      required: false,
      description: 'commit message.',
      default: 'update'
    })
    message: string
  ) {
    try {
      execSync(`git add .&&git commit -m "${message}"&&git push`);
      return green(`deploy success: ${message}`);
    } catch (e) {
      return red(e.message);
    }
  }
}
