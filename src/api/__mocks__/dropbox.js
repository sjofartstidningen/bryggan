const { default: dropbox } = jest.genMockFromModule('../dropbox');

let rpcData = {};
dropbox.setRpcReturnData = data => {
  rpcData = data;
};

dropbox.filesListFolder = jest.fn(() => Promise.resolve({ data: rpcData }));

export default dropbox;
