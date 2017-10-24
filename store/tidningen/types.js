// @flow

/**
 * Entity types
 */
export type Year = {
  +id: string,
  +name: string,
  +path: string,
};

export type Issue = {
  +id: string,
  +name: string,
  +year: string,
  +path: string,
  +coverSrc: string,
};

export type Page = {
  +id: string,
  +name: string,
  +path: string,
  +updated_at: string,
  +updated_by: string,
  +coverSrc: string,
};

export type ZoomLevel = number;

export type FetchError = {
  +message: string,
};

/**
 * Global state
 */
export type State = {
  +years: Year[],
  +issues: {
    +[x: string]: Issue[],
  },
  +pages: ?{
    +year: string,
    +issue: string,
    +pages: Page[],
  },
  +zoom: ZoomLevel,
  +error: ?FetchError,
};

/**
 * Action types
 */
export type ActionAddYears = { type: 'ADD_YEARS', payload: { years: Year[] } };

export type ActionAddIssues = {
  type: 'ADD_ISSUES',
  payload: { year: string, issues: Issue[] },
};

export type ActionAddPages = {
  type: 'ADD_PAGES',
  payload: { year: string, issue: string, pages: Page[] },
};

export type ActionIncZoom = {
  type: 'INC_ZOOM',
};

export type ActionDecZoom = {
  type: 'DEC_ZOOM',
};

export type ActionFetchError = {
  type: 'FETCH_ERROR',
  payload: FetchError,
};

export type Action =
  | ActionAddYears
  | ActionAddIssues
  | ActionAddPages
  | ActionFetchError
  | ActionIncZoom
  | ActionDecZoom;

/**
 * Dispatch type
 */
// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
