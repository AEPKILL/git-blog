import { Command, command, param } from 'clime';

@command({
  description: 'Create a new blog.'
})
export default class extends Command {
  execute(
    @param({
      required: true,
      description: 'Your blog name.'
    })
    name: string
  ) {
    return `create blog success ${name}`;
  }
}
