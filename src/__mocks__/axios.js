/* eslint-disable no-underscore-dangle */

module.exports = {
  post: jest.fn(() => Promise.resolve({ data: {} })),
  CancelToken: class CancelToken {
    static source() {
      return {
        token: 'token',
        cancel: () => 'cancel',
      };
    }
  },
};
