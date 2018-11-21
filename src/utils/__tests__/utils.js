import * as utils from '..';

describe('utils.unique', () => {
  test('should filter onlyt unique values', () => {
    expect(utils.unique([1, 1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
  });
});
