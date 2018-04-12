// tslint:disable-next-line:no-reference
/// <reference path="./../../bin/web-declare.d.ts" />
import { join } from '@utils/url';
import axios from 'axios';

export default class PostFetch {
  static get(path: string) {
    return axios
      .get<string>(join(BLOG_INFO.BLOG_INFO.postDir, path))
      .then(data => data.data);
  }
}
