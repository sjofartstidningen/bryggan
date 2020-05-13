import React from 'react';
import { MockedResponse } from '@apollo/react-testing';
import nanoid from 'nanoid';
import { render, fireEvent } from '../../../utils/test-utils';
import { SEARCH_QUERY } from '../use-search';
import { SearchBox } from '../';
import { Search_search_edges, ThumbnailSize } from '../../../types/graphql';

const generateSearchEdge = (
  year: string,
  issue: string,
  page: string,
): Search_search_edges => ({
  node: {
    name: `${year}-${issue}-${page}.pdf`,
    id: `id:${nanoid(22)}`,
    pathDisplay: `/Bryggan/${year}/${issue}/${year}-${issue}-${page}.pdf`,
    clientModified: '2020-10-01T00:00:00Z',
    serverModified: '2020-10-01T00:00:00Z',
    thumbnail: {
      __typename: 'Thumbnail',
      url: 'https://via.placeholder.com/100x128',
      size: ThumbnailSize.w128h128,
    },
    __typename: 'FileMetadata',
  },
  __typename: 'MetadataEdge',
});

const generatePageInfo = (hasNextPage = false, cursor?: string) => ({
  hasNextPage,
  cursor: hasNextPage ? cursor ?? nanoid() : null,
  __typename: 'PageInfo',
});

it('should search for pdf file content', async () => {
  const mocks: MockedResponse[] = [
    {
      request: { query: SEARCH_QUERY, variables: { query: 'stena line' } },
      result: {
        data: {
          search: {
            pageInfo: generatePageInfo(),
            edges: [
              generateSearchEdge('2020', '01', '001'),
              generateSearchEdge('2020', '01', '002'),
              generateSearchEdge('2020', '01', '003'),
              generateSearchEdge('2020', '01', '004'),
              generateSearchEdge('2020', '01', '005'),
            ],
            __typename: 'MetadataConnection',
          },
        },
      },
    },
  ];

  const { findByText, findByLabelText } = render(<SearchBox />, { mocks });
  const input = await findByLabelText(/search pdf content/i);

  fireEvent.change(input, { target: { value: 'stena line' } });

  const item = await findByText('/Bryggan/2020/01/2020-01-001.pdf');
  expect(item).toBeInTheDocument();
});

it('should search for more when clicking load more', async () => {
  const query = 'stena line';
  const cursor = nanoid();

  const mocks: MockedResponse[] = [
    {
      request: { query: SEARCH_QUERY, variables: { query } },
      result: {
        data: {
          search: {
            pageInfo: generatePageInfo(true, cursor),
            edges: [
              generateSearchEdge('2020', '01', '001'),
              generateSearchEdge('2020', '01', '002'),
              generateSearchEdge('2020', '01', '003'),
              generateSearchEdge('2020', '01', '004'),
              generateSearchEdge('2020', '01', '005'),
            ],
            __typename: 'MetadataConnection',
          },
        },
      },
    },
    {
      request: { query: SEARCH_QUERY, variables: { query, cursor } },
      result: {
        data: {
          search: {
            pageInfo: generatePageInfo(),
            edges: [
              generateSearchEdge('2020', '01', '006'),
              generateSearchEdge('2020', '01', '007'),
              generateSearchEdge('2020', '01', '008'),
              generateSearchEdge('2020', '01', '009'),
              generateSearchEdge('2020', '01', '010'),
            ],
            __typename: 'MetadataConnection',
          },
        },
      },
    },
  ];

  const { findByLabelText, findByText } = render(<SearchBox />, { mocks });
  const input = await findByLabelText(/search pdf content/i);

  fireEvent.change(input, { target: { value: query } });

  const button = await findByText(/load more/i);
  fireEvent.click(button);

  const item = await findByText('/Bryggan/2020/01/2020-01-010.pdf');
  expect(item).toBeInTheDocument();
});

it('should handle a rejected search', async () => {
  const query = 'stena line';
  const message = 'Error: invalid query';
  const mocks: MockedResponse[] = [
    {
      request: { query: SEARCH_QUERY, variables: { query } },
      error: new Error(message),
    },
  ];

  const { findByLabelText, findByText } = render(<SearchBox />, { mocks });
  const input = await findByLabelText(/search pdf content/i);

  fireEvent.change(input, { target: { value: query } });

  const errorMessage = await findByText(message, { exact: false });
  expect(errorMessage).toBeInTheDocument();
});
