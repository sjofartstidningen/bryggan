import { useEffect, useCallback, useRef, useReducer } from 'react';
import Axios, { AxiosError } from 'axios';
import { useDebounce } from '@fransvilhelm/hooks';
import { SearchV2Result } from '../../types/dropbox';
import { Page } from '../../types/bryggan';
import { filterFileMetadata, mapMetadata } from '../../utils/files';
import { keepFirst } from '../../utils/array';
import { api } from '../../api/dropbox';

type SearchState =
  | { state: 'idle' }
  | { state: 'searching' }
  | { state: 'success'; pages: Page[]; cursor?: string }
  | { state: 'error'; error: string }
  | { state: 'searching-more'; pages: Page[]; cursor?: string };

type SearchAction =
  | { type: 'SET_IDLE' }
  | { type: 'SET_SEARCHING' }
  | { type: 'SET_SUCCESS'; payload: { pages: Page[]; cursor?: string } }
  | { type: 'SET_ERROR'; payload: { error: string } }
  | { type: 'SET_SEARCH_MORE' };

const searchReducer: React.Reducer<SearchState, SearchAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'SET_IDLE':
      return { state: 'idle' };

    case 'SET_SEARCHING':
      return { state: 'searching' };

    case 'SET_SUCCESS':
      return {
        state: 'success',
        pages: keepFirst(
          [
            ...(state.state === 'searching-more' ? state.pages : []),
            ...action.payload.pages,
          ],
          (a, b) => a.id === b.id,
        ),
        cursor: action.payload.cursor,
      };

    case 'SET_ERROR':
      return {
        state: 'error',
        error: action.payload.error,
      };

    case 'SET_SEARCH_MORE':
      return {
        state: 'searching-more',
        pages: state.state === 'success' ? state.pages : [],
        cursor: state.state === 'success' ? state.cursor : undefined,
      };

    default:
      return state;
  }
};

export const useSearch = (
  query: string,
): [SearchState, () => Promise<void>] => {
  const [state, dispatch] = useReducer(searchReducer, { state: 'idle' });

  const delayedQuery = useDebounce(query, 500);

  const cancelTokenRef = useRef(Axios.CancelToken.source());

  const searchMore = useCallback(async () => {
    if (state.state !== 'success' && state.state !== 'searching-more') return;

    cancelTokenRef.current = Axios.CancelToken.source();
    dispatch({ type: 'SET_SEARCH_MORE' });

    try {
      const { data } = await api.post<SearchV2Result>(
        '/files/search/continue_v2',
        { cursor: state.cursor },
        { cancelToken: cancelTokenRef.current.token },
      );

      handleSearchResult(data, dispatch);
    } catch (error) {
      handleError(error, dispatch);
    }
  }, [state]);

  useEffect(() => {
    if (delayedQuery.length < 5) return;

    cancelTokenRef.current.cancel();
    cancelTokenRef.current = Axios.CancelToken.source();

    const tokenSource = Axios.CancelToken.source();

    dispatch({ type: 'SET_SEARCHING' });

    (async () => {
      try {
        const { data } = await api.post<SearchV2Result>(
          '/files/search_v2',
          {
            query: delayedQuery,
            options: {
              path: '/bryggan',
              max_results: 10,
              file_status: 'active',
              file_categories: ['pdf'],
            },
          },
          { cancelToken: tokenSource.token },
        );

        handleSearchResult(data, dispatch);
      } catch (error) {
        handleError(error, dispatch);
      }
    })();

    return () => {
      tokenSource.cancel();
    };
  }, [delayedQuery]);

  useEffect(() => {
    return () => {
      cancelTokenRef.current.cancel();
    };
  }, []);

  return [state, searchMore];
};

const handleSearchResult = (
  result: SearchV2Result,
  dispatch: React.Dispatch<SearchAction>,
) => {
  const pages = result.matches
    .map(m => m.metadata.metadata)
    .filter(filterFileMetadata)
    .map(mapMetadata);

  dispatch({
    type: 'SET_SUCCESS',
    payload: { pages, cursor: result.cursor },
  });
};

const handleError = (
  error: Error | AxiosError,
  dispatch: React.Dispatch<SearchAction>,
) => {
  if (Axios.isCancel(error)) return;

  let message: string;

  if ((error as AxiosError).response) {
    const err = error as AxiosError;
    if (err.response && typeof err.response.data === 'string') {
      message = err.response.data;
    } else if (err.response && typeof err.response.data.message === 'string') {
      message = err.response.data.message;
    } else {
      message = 'An unknown error occured';
    }
  } else {
    message = 'An unknown error occured';
  }

  dispatch({ type: 'SET_ERROR', payload: { error: message } });
};
