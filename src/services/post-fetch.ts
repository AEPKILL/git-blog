// tslint:disable-next-line:no-reference
/// <reference path="./../../bin/web-declare.d.ts" />
import i18n from '@i18n';

import axios from 'axios';

export default class PostFetchServices {
  static get(path: string) {
    return axios
      .get<string>(path)
      .then(data => data.data)
      .catch(error => {
        if (error.response.status === 404) {
          throw new Error(`${i18n.cantFindPost} "${path}"`);
        }
        throw error;
      });
  }
}
