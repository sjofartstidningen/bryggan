import {getBestPreviewWidth} from '../dropbox';

test('should return best fitted preview width', () => {
  expect(getBestPreviewWidth(10)).toBe('32');
  expect(getBestPreviewWidth(60)).toBe('64');
  expect(getBestPreviewWidth(120)).toBe('128');
  expect(getBestPreviewWidth(250)).toBe('256');
  expect(getBestPreviewWidth(450)).toBe('480');
  expect(getBestPreviewWidth(600)).toBe('640');
  expect(getBestPreviewWidth(960)).toBe('960');
  expect(getBestPreviewWidth(1000)).toBe('1024');
  expect(getBestPreviewWidth(1050)).toBe('2048');
});

test('take window.devicePixelRatio into account', () => {
  window.devicePixelRatio = 2

  expect(getBestPreviewWidth(10)).toBe('32');
  expect(getBestPreviewWidth(60)).toBe('128');
  expect(getBestPreviewWidth(120)).toBe('256');

  window.devicePixelRatio = undefined;
});
