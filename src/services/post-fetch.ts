// tslint:disable-next-line:no-reference
/// <reference path="./../../bin/web-declare.d.ts" />
import axios from 'axios';

export default class PostFetchServices {
  static get(path: string) {
    return axios
      .get<string>(path)
      .then(data => data.data);
  }
}
