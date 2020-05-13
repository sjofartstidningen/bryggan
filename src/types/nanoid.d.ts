/**
 * Due to some changes that happend in v3 of nanoid it can't be used with the
 * current version of CRA. But changes are coming and we will soon be able to
 * migrate to the latest version of CRA and nanoid.
 *
 * This declaration is here until all is merged and fixed.
 *
 * @link https://github.com/ai/nanoid/releases/tag/3.0.0
 * @link https://github.com/facebook/create-react-app/pull/8768
 */
declare module 'nanoid' {
  declare function nanoid(size?: number): string;
  export = nanoid;
}
