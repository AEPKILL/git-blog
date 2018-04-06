import { Command, command, param } from 'clime';

@command({
  description: 'create a blog.'
})
export default class extends Command {
  execute(
    @param({
      required: true,
      description: 'blog name.'
    })
    name: string
  ) {
    return `create blog success ${name}.`;
  }
}
