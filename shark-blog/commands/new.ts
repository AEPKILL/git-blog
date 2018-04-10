import { green, red } from 'cli-color';
import { Command, command, param } from 'clime';
import createNewPost from '../utils/create-new-post';

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
    try {
      return green(createNewPost(name));
    } catch (e) {
      return red(e.message);
    }
  }
}
