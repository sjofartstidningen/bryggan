/* eslint-disable no-underscore-dangle */
function axios() {
  return Promise.resolve(axios.__return);
}

axios.create = function create() {
  return axios;
};

axios.isCancel = () => false;

axios.defaults = {
  adapter: () => null,
};

axios.__return = {
  data: {
    hello: 'world',
  },
};

axios.__setReturn = ret => {
  axios.__return = ret;
};

export class CancelToken {
  static source() {
    return {
      token: 'token',
      cancel: () => 'cancel',
    };
  }
}

axios.CancelToken = CancelToken;

export default axios;
