import { getThumbnailSize } from './dropbox';

test('dropbox.getThumbnailSize', () => {
  expect(getThumbnailSize(960)).toBe('w960h640');
  expect(getThumbnailSize(960, 2)).toBe('w2048h1536');
  expect(getThumbnailSize(368)).toBe('w480h320');
  expect(getThumbnailSize(3000)).toBe('w2048h1536');
});
