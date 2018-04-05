import { Command, command, param } from 'clime';

@command({
  description: 'Start the server for live preview.'
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
