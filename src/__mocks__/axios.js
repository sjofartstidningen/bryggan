/* eslint-disable no-underscore-dangle */
const axios = jest.fn().mockImplementation(() => Promise.resolve({ data: {} }));

axios.post = jest.fn(() => Promise.resolve({ data: {} }));
axios.create = base =>
  jest.fn(conf =>
    axios({ ...base, ...conf, headers: { ...base.headers, ...conf.headers } }),
  );

class CancelToken {
  static source() {
    return new CancelToken();
  }

  callbacks = [];

  token = {
    on: (_, cb) => {
      this.callbacks.push(cb);
    },
  };

  cancel(reason) {
    this.callbacks.forEach(cb => cb(reason));
  }
}

axios.CancelToken = CancelToken;

axios.isCancel = value => !!(value && value.__CANCEL__);

module.exports = axios;
exports.CancelToken = CancelToken;
