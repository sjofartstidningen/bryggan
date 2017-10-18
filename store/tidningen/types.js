// @flow

export type Year = { +id: string, +name: string, +path: string };
export type Issue = {
  +id: string,
  +name: string,
  +path: string,
  +coverSrc: string,
};
export type FetchError = { +message: string };

export type State = {
  +years: Year[],
  +issues: {
    +[x: string]: Issue[],
  },
  +error: ?FetchError,
};

export type ActionAddYears = { type: 'ADD_YEARS', payload: { years: Year[] } };

export type ActionAddIssues = {
  type: 'ADD_ISSUES',
  payload: { year: string, issues: Issue[] },
};

export type ActionFetchError = {
  type: 'FETCH_ERROR',
  payload: FetchError,
};

export type Action = ActionAddYears | ActionAddIssues | ActionFetchError;

// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
