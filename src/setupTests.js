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
