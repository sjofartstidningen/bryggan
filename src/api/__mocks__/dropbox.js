const { Dropbox } = require.requireActual('../dropbox');

class Api extends Dropbox {
  rpcData = {};
  setRpcReturnData = data => {
    this.rpcData = data;
  };

  rpc = jest.fn(() => Promise.resolve({ data: this.rpcData }));
}

const dropbox = new Api();
export default dropbox;
