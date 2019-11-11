import { camelCaseKeys } from '../object';

describe('object.camelCaseKeys()', () => {
  it('transforms an objects keys to camelCase', () => {
    expect(camelCaseKeys({ foo_bar: 'foo' })).toEqual({ fooBar: 'foo' });
    expect(
      camelCaseKeys({
        snake_case: 1,
        KebabCase: 1,
      }),
    ).toEqual({
      snakeCase: 1,
      kebabCase: 1,
    });
  });
});
