/**
 * @jest-environment node
 */
import { Dropbox } from '../dropbox';

jest.unmock('axios');
const testOnCI = process.env.CI ? test : test.skip;

describe('api.dropbox', () => {
  test('should throw early if access token is not provided', async () => {
    expect.assertions(2);
    const api = new Dropbox();
    const spy = jest.spyOn(api, 'rpcEndpoint');

    await expect(api.filesListFolder({ folder: '/' })).rejects.toBeInstanceOf(
      Error,
    );
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('api.dropbox.filesListFolder', () => {
  const api = new Dropbox();
  api.updateAccessToken(process.env.REACT_APP_DROPBOX_TOKEN);
  api.updateRootFolder(process.env.REACT_APP_DROPBOX_ROOT);

  testOnCI('should return a list of content inside a folder', async () => {
    const { data } = await api.filesListFolder({ folder: '/' });
    expect(data).toHaveProperty('entries');
    expect(data).toHaveProperty('cursor');
    expect(data).toHaveProperty('has_more');
  });
});
