import { Command, command, param } from 'clime';

@command({
  description: 'create a new post.'
})
export default class extends Command {
  execute(
    @param({
      required: true,
      description: 'post name.'
    })
    name: string
  ) {
    return `create post success ${name}`;
  }
}
