/**
 * @jest-environment node
 */
import { Dropbox } from '../dropbox';

jest.unmock('axios');
jest.unmock('../dropbox');
const testOnCI = process.env.CI ? test : test.skip;

describe('api.dropbox', () => {
  test('should throw early if access token is not provided', async () => {
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

describe('api.dropbox.generatePreviewsFromPath', () => {
  const api = new Dropbox();
  api.updateAccessToken(process.env.REACT_APP_DROPBOX_TOKEN);
  api.updateRootFolder(process.env.REACT_APP_DROPBOX_ROOT);

  const previewObject = expect.objectContaining(
    Object.keys(api.thumbnailSizes).reduce((acc, key) => {
      const { w } = api.thumbnailSizes[key];
      return {
        ...acc,
        [w.toString()]: expect.any(String),
      };
    }, {}),
  );

  expect(api.generatePreviewsFromPath('/root/2015/01/2015-01-001.pdf')).toEqual(
    previewObject,
  );
  expect(
    api.generatePreviewsFromPath('/root/2015/01/2015-01 ello world-001.pdf'),
  ).toEqual(previewObject);
});
