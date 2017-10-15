/* eslint-disable no-undef */
// @flow

declare type AxiosResponse<T> = Promise<{
  data: T,
  status: number,
  statusText: string,
  headers: { [key: string]: string },
  config: { [key: string]: mixed },
  request: { [key: string]: mixed },
}>;
