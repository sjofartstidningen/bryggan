import React from 'react';
import localforage from 'localforage';
import nock from 'nock';
import { render, waitForElement, fireEvent } from '../../../utils/test-utils';
import { LOCALSTORAGE_AUTH_KEY } from '../../../constants';
import searchResponse from '../../../__fixtures__/dropbox/files/search_v2.json';
import moreResponse from '../../../__fixtures__/dropbox/files/search/continue_v2.json';
import { last, first } from '../../../utils/array';
import { SearchBox } from '../index';
import { PersistedAuthSet } from '../../../types/bryggan';

const scope = nock('https://api.dropboxapi.com');

beforeEach(async () => {
  await localforage.setItem<PersistedAuthSet>(LOCALSTORAGE_AUTH_KEY, {
    accessToken: 'abc123',
  });
});

it('should render an input box', async () => {
  const { getByLabelText } = render(<SearchBox />);
  const input = await waitForElement(() =>
    getByLabelText(/search pdf content/i),
  );
  expect(input).toBeInTheDocument();
});

it('should search for pdf file content', async () => {
  scope.post('/2/files/search_v2').reply(200, searchResponse);

  const { getByLabelText, getByText } = render(<SearchBox />);
  const input = await waitForElement(() =>
    getByLabelText(/search pdf content/i),
  );

  fireEvent.change(input, { target: { value: 'stena line' } });

  const fileName = first(searchResponse.matches).metadata.metadata.path_display;

  const item = await waitForElement(() => getByText(fileName));
  expect(item).toBeInTheDocument();
});

it('should search for more when clicking load more', async () => {
  scope.post('/2/files/search_v2').reply(200, searchResponse);
  scope.post('/2/files/search/continue_v2').reply(200, moreResponse);

  const { getByLabelText, getByText } = render(<SearchBox />);
  const input = await waitForElement(() =>
    getByLabelText(/search pdf content/i),
  );

  fireEvent.change(input, { target: { value: 'stena line' } });

  const button = await waitForElement(() => getByText(/load more/i));

  fireEvent.click(button);

  const fileName = last(moreResponse.matches).metadata.metadata.path_display;
  const item = await waitForElement(() => getByText(fileName));

  expect(item).toBeInTheDocument();
});

it('should handle a rejected search', async () => {
  const message = 'Error: invalid query';
  scope.post('/2/files/search_v2').reply(400, message);

  const { getByLabelText, getByText } = render(<SearchBox />);
  const input = await waitForElement(() =>
    getByLabelText(/search pdf content/i),
  );

  fireEvent.change(input, { target: { value: 'stena line' } });

  const errorMessage = await waitForElement(() => getByText(message));
  expect(errorMessage).toBeInTheDocument();
});
