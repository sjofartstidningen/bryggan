/* eslint-disable no-undef */
// @flow

declare type AxiosResponse<D, H> = Promise<{
  data: D,
  status: number,
  statusText: string,
  headers: H,
  config: { [key: string]: mixed },
  request: { [key: string]: mixed },
}>;
