import * as array from '../array';

describe('array.keepFirst()', () => {
  it('should keep the first unique values in an array', () => {
    expect(array.keepFirst([1, 2, 3, 1])).toEqual([1, 2, 3]);

    const obj = { a: 1 };
    expect(array.keepFirst([obj, obj])).toEqual([obj]);
  });

  it('should use provided optional comparison function', () => {
    expect(array.keepFirst([1, 2, 3, 1], (a, b) => a === b)).toEqual([1, 2, 3]);
    expect(
      array.keepFirst(
        [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }],
        (a, b) => a.a === b.a,
      ),
    ).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
  });

  it('should not mutate original array', () => {
    const arr = [1, 2, 3, 1];
    array.keepFirst(arr);
    expect(arr).toEqual([1, 2, 3, 1]);
  });
});
