import { join } from 'path';
import axiosMock from 'axios';
import dropbox, { Dropbox } from '../dropbox';

const generate = {
  year: name => ({
    '.tag': 'folder',
    name,
    id: `id:${name}`,
    path_lower: join('/', name),
    path_display: join('/', name),
  }),
  issue: name => ({
    '.tag': 'folder',
    name,
    id: `id:${name}`,
    path_lower: join('/2015', name),
    path_display: join('/2015', name),
  }),
  page: name => ({
    '.tag': 'file',
    name: `2015-01-${name}.pdf`,
    id: `id:2015-01-${name}.pdf`,
    path_lower: join('/2015/01', `2015-01-${name}.pdf`),
    path_display: join('/2015/01', `2015-01-${name}.pdf`),
    client_modified: new Date().toString(),
    server_modified: new Date().toString(),
  }),
};

const Preview = expect.objectContaining({
  '32': expect.any(String),
  '64': expect.any(String),
  '128': expect.any(String),
  '256': expect.any(String),
  '480': expect.any(String),
  '640': expect.any(String),
  '960': expect.any(String),
  '1024': expect.any(String),
  '2048': expect.any(String),
});

describe('api/dropbox.listFolder', () => {
  dropbox.updateAccessToken('abc123');
  dropbox.updateRootFolder('/root');

  test('should list years', async () => {
    axiosMock.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          entries: Array.from({ length: 5 }, (_, i) =>
            generate.year(`200${i + 1}`),
          ),
        },
      }),
    );

    const entries = await dropbox.listFolder('/');

    expect(entries).toHaveLength(5);
    expect(entries[0]).toEqual(
      expect.objectContaining({
        tag: expect.any(String),
        type: 'year',
        id: expect.any(String),
        name: expect.any(String),
        url: expect.any(String),
        preview: Preview,
      }),
    );
  });

  test('should list issues', async () => {
    axiosMock.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          entries: Array.from({ length: 5 }, (_, i) =>
            generate.issue(`0${i + 1}`),
          ),
        },
      }),
    );

    const entries = await dropbox.listFolder('/2018');

    expect(entries).toHaveLength(5);
    expect(entries[0]).toEqual(
      expect.objectContaining({
        tag: expect.any(String),
        type: 'issue',
        id: expect.any(String),
        name: expect.any(String),
        url: expect.any(String),
        preview: Preview,
      }),
    );
  });

  test('should list issues with complex names', async () => {
    axiosMock.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          entries: Array.from({ length: 5 }, (_, i) =>
            generate.issue(`0${i + 1} - Special Edition`),
          ),
        },
      }),
    );

    const entries = await dropbox.listFolder('/2017');

    expect(entries).toHaveLength(5);
    expect(entries[0]).toEqual(
      expect.objectContaining({
        tag: expect.any(String),
        type: 'issue',
        id: expect.any(String),
        name: expect.any(String),
        url: expect.any(String),
        preview: Preview,
      }),
    );
  });

  test('should list pages', async () => {
    axiosMock.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          entries: Array.from({ length: 5 }, (_, i) =>
            generate.page(`00${i + 1}`),
          ),
        },
      }),
    );

    const entries = await dropbox.listFolder('/2017/01');

    expect(entries).toHaveLength(5);
    expect(entries[0]).toEqual(
      expect.objectContaining({
        tag: expect.any(String),
        type: 'page',
        id: expect.any(String),
        name: expect.any(String),
        url: expect.any(String),
        modified: expect.any(String),
        src: expect.any(String),
        preview: Preview,
      }),
    );
  });

  test('should get from cache on next calls', async () => {
    const db = new Dropbox();
    db.updateAccessToken('abc123');
    db.updateRootFolder('/root');

    axiosMock.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          entries: Array.from({ length: 5 }, (_, i) =>
            generate.year(`200${i + 1}`),
          ),
        },
      }),
    );

    const spy = jest.spyOn(db.cache, 'get');

    await db.listFolder('/');
    expect(spy).not.toHaveBeenCalled();

    await db.listFolder('/');
    expect(spy).toHaveBeenCalled();
  });
});
