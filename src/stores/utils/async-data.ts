import { action, observable } from 'mobx';

export const enum ASYNC_STATUS {
  INIT,
  LOADING,
  ERROR,
  SUCCESS
}

export default class AsyncData<T, D = {}> {
  @observable asyncStstus: ASYNC_STATUS = ASYNC_STATUS.INIT;
  @observable data: T | null = null;
  @observable error: Error | null = null;
  @observable extra?: D;

  @action
  reset() {
    this.data = null;
    this.error = null;
    this.asyncStstus = ASYNC_STATUS.INIT;
  }
  @action
  waitData(promise: Promise<T>) {
    this.asyncStstus = ASYNC_STATUS.LOADING;
    promise
      .then(data => {
        this.data = data;
        this.asyncStstus = ASYNC_STATUS.SUCCESS;
      })
      .catch(error => {
        this.error = error;
        this.asyncStstus = ASYNC_STATUS.ERROR;
      });
  }
}
