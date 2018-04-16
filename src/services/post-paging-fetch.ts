// tslint:disable-next-line:no-reference
/// <reference path="./../../bin/web-declare.d.ts" />

import axios from 'axios';
import join from 'url-join';

export default class PostPagingFetchServices {
  private readonly path: string;
  constructor(path: string) {
    this.path = path;
  }
  get(page: number | string) {
    page = `${page}`;
    return axios
      .get<PostPagesMeta>(join('/', this.path, page))
      .then(data => data.data);
  }
}
