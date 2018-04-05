import { Command, command, param } from 'clime';

@command({
  description: 'Create a new post.'
})
export default class extends Command {
  execute(
    @param({
      required: true,
      description: 'Your post name.'
    })
    name: string
  ) {
    return `create post success ${name}`;
  }
}
