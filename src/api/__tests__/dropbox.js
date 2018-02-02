/**
 * @jest-environment node
 */
import nock from 'nock';
import dropbox from '../dropbox';

jest.unmock('axios');

beforeAll(() => {
  nock('https://api.dropboxapi.com')
    .post('/2/files/list_folder')
    .reply(500, 'Internal server error');
});

afterAll(() => {
  nock.restore();
  nock.cleanAll();
});

test('should intercept responses', async () => {
  try {
    await dropbox.filesListFolder({ folder: '' });
  } catch (err) {
    expect(err.status).toBe(500);
  }
});
