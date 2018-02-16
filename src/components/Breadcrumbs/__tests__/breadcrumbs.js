import { generateCrumbs } from '../';

describe('component.Breadcrumbs', () => {
  test('should return a list of breadcrumbs', () => {
    const routes = [
      { path: '/foo', title: 'Foo' },
      { path: '/foo/:greet', title: 'Greet' },
      { path: '/foo/:greet/:who', title: 'Greeter' },
    ];

    const location = { pathname: '/foo/hello/world' };
    expect(generateCrumbs(routes, location)).toEqual([
      { to: '/foo', title: 'Foo' },
      { to: '/foo/hello', title: 'Greet' },
      { to: '/foo/hello/world', title: 'Greeter' },
    ]);

    const newLocation = { pathname: '/foo/hi' };
    expect(generateCrumbs(routes, newLocation)).toEqual([
      { to: '/foo', title: 'Foo' },
      { to: '/foo/hi', title: 'Greet' },
    ]);
  });

  test('Should be able to use dynamic title', () => {
    const routes = [
      { path: '/foo', title: 'Foo' },
      { path: '/foo/:greet', title: ({ greet }) => greet },
      { path: '/foo/:greet/:who', title: ({ who }) => who },
    ];

    const location = { pathname: '/foo/good-day/fella' };
    expect(generateCrumbs(routes, location)).toEqual([
      { to: '/foo', title: 'Foo' },
      { to: '/foo/good-day', title: 'good-day' },
      { to: '/foo/good-day/fella', title: 'fella' },
    ]);
  });
});
