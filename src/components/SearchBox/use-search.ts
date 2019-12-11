import { useEffect, useCallback, useRef, useReducer } from 'react';
import Axios, { AxiosError } from 'axios';
import { useDebounce } from '@fransvilhelm/hooks';
import { SearchV2Result } from '../../types/dropbox';
import { Page } from '../../types/bryggan';
import { filterFileMetadata, mapMetadata } from '../../utils/files';
import { keepFirst } from '../../utils/array';
import { api } from '../../api/dropbox';

export enum SearchStage {
  idle,
  searching,
  success,
  error,
  searchingMore,
}

export enum SearchActionType {
  setIdle,
  setSearching,
  setSuccess,
  setError,
  setSearchMore,
}

type SearchState =
  | { stage: SearchStage.idle }
  | { stage: SearchStage.searching }
  | { stage: SearchStage.success; pages: Page[]; cursor?: string }
  | { stage: SearchStage.error; error: string }
  | { stage: SearchStage.searchingMore; pages: Page[]; cursor?: string };

type SearchAction =
  | { type: SearchActionType.setIdle }
  | { type: SearchActionType.setSearching }
  | {
      type: SearchActionType.setSuccess;
      payload: { pages: Page[]; cursor?: string };
    }
  | { type: SearchActionType.setError; payload: { error: string } }
  | { type: SearchActionType.setSearchMore };

const searchReducer: React.Reducer<SearchState, SearchAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case SearchActionType.setIdle:
      return { stage: SearchStage.idle };

    case SearchActionType.setSearching:
      return { stage: SearchStage.searching };

    case SearchActionType.setSuccess:
      return {
        stage: SearchStage.success,
        pages: keepFirst(
          [
            ...(state.stage === SearchStage.searchingMore ? state.pages : []),
            ...action.payload.pages,
          ],
          (a, b) => a.id === b.id,
        ),
        cursor: action.payload.cursor,
      };

    case SearchActionType.setError:
      return {
        stage: SearchStage.error,
        error: action.payload.error,
      };

    case SearchActionType.setSearchMore:
      return {
        stage: SearchStage.searchingMore,
        pages: state.stage === SearchStage.success ? state.pages : [],
        cursor: state.stage === SearchStage.success ? state.cursor : undefined,
      };

    default:
      return state;
  }
};

export const useSearch = (
  query: string,
): [SearchState, () => Promise<void>] => {
  const [state, dispatch] = useReducer(searchReducer, {
    stage: SearchStage.idle,
  });

  const delayedQuery = useDebounce(query, 500);

  const cancelTokenRef = useRef(Axios.CancelToken.source());

  const searchMore = useCallback(async () => {
    if (
      state.stage !== SearchStage.success &&
      state.stage !== SearchStage.searchingMore
    ) {
      return;
    }

    cancelTokenRef.current = Axios.CancelToken.source();
    dispatch({ type: SearchActionType.setSearchMore });

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

    dispatch({ type: SearchActionType.setSearching });

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
    type: SearchActionType.setSuccess,
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
      message = 'An unknown error occurred';
    }
  } else {
    message = 'An unknown error occurred';
  }

  dispatch({ type: SearchActionType.setError, payload: { error: message } });
};
