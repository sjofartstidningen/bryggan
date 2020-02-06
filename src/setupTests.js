import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import localforage from 'localforage';

jest.mock('@reach/utils', () => ({
  ...jest.requireActual('@reach/utils'),
  checkStyles: jest.fn(),
}));

afterEach(() => {
  if (typeof window !== 'undefined') localforage.clear();
});

/**
 * This is an ugly trick to avoid xstate warning about sending early events...
 */
const warn = console.warn;
console.warn = (...args) => {
  if (
    args.some(
      value =>
        typeof value === 'string' &&
        value.includes(
          'Warning: Event "CHECK" was sent to uninitialized service "auth" and is deferred.',
        ),
    )
  ) {
    return;
  }

  warn(...args);
};
