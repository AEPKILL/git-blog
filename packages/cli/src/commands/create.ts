import { Command, command, param } from 'clime';
import { resolve } from 'path';

@command({
  description: 'create a blog.',
})
export default class extends Command {
  execute(
    @param({
      required: true,
      description: 'blog name.',
    })
    name: string
  ) {
    console.log(name);
  }
}
