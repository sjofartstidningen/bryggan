import { theme, ax } from '../';

describe('styles.ax', () => {
  test('should access props in theme', () => {
    const props = { theme };
    expect(ax('color.black')(props)).toEqual(theme.color.black);
    expect(ax('font.sansSerif')(props)).toEqual(theme.font.sansSerif);
  });
});