// tslint:disable-next-line:no-reference
/// <reference path="./../../bin/web-declare.d.ts" />

import { join } from '@utils/url';
import axios from 'axios';

export default class PostPagingFetchServices {
  private readonly path: string;
  constructor(path: string) {
    this.path = path;
  }
  get(page: number | string) {
    return axios
      .get<PostPagesMeta>(join(this.path, page))
      .then(data => data.data);
  }
}
