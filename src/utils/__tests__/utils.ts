import * as utils from '../index';

describe('untrailingSlash', () => {
  it('should remove trailing slashes in string', () => {
    expect(utils.untrailingSlash('/foo/bar/')).toEqual('/foo/bar');
    expect(utils.untrailingSlash('/foo/bar/a')).toEqual('/foo/bar/a');
    expect(utils.untrailingSlash('foo/bar/')).toEqual('foo/bar');
  });
});

describe('unleadingSlash', () => {
  it('should remove leading slashes in string', () => {
    expect(utils.unleadingSlash('/foo/bar/')).toEqual('foo/bar/');
    expect(utils.unleadingSlash('/foo/bar')).toEqual('foo/bar');
    expect(utils.unleadingSlash('foo/bar/')).toEqual('foo/bar/');
  });
});

describe('trailingSlash', () => {
  it('should ensure string contains trailing slash', () => {
    expect(utils.trailingSlash('/foo/bar')).toEqual('/foo/bar/');
    expect(utils.trailingSlash('/foo/bar/')).toEqual('/foo/bar/');
    expect(utils.trailingSlash('foo/bar/a')).toEqual('foo/bar/a/');
  });
});

describe('leadingSlash', () => {
  it('should ensure string contains leading slash', () => {
    expect(utils.leadingSlash('foo/bar')).toEqual('/foo/bar');
    expect(utils.leadingSlash('/foo/bar/')).toEqual('/foo/bar/');
    expect(utils.leadingSlash('foo/bar/a')).toEqual('/foo/bar/a');
  });
});
