declare namespace jest {
  /**
   * Unfortunately this declaration is necessary to make the
   * jest-styled-components package work with ts. It worked before but since at
   * least 7.0.0 it doesn't recognize the matchers provided.
   *
   * @link https://github.com/styled-components/jest-styled-components/issues/291
   */
  interface AsymmetricMatcher {
    $$typeof: Symbol;
    sample?: string | RegExp | object | Array<any> | Function;
  }

  type Value = string | number | RegExp | AsymmetricMatcher | undefined;

  interface Options {
    media?: string;
    modifier?: string;
    supports?: string;
  }

  interface Matchers<R, T> {
    toHaveStyleRule(property: string, value?: Value, options?: Options): R;
  }
}
