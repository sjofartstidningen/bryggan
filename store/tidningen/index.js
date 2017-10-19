// @flow
import type { Reducer } from 'redux';
import type { State, Action } from './types';

import * as constants from './constants';

const initialState = {
  years: [],
  issues: {},
  pages: null,
  error: null,
};

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_YEARS:
      return { ...state, years: action.payload.years };

    case constants.ADD_ISSUES:
      return {
        ...state,
        issues: {
          ...state.issues,
          [action.payload.year]: action.payload.issues,
        },
      };

    case constants.ADD_PAGES:
      return {
        ...state,
        pages: {
          year: action.payload.year,
          issue: action.payload.issue,
          pages: action.payload.pages,
        },
      };

    case constants.FETCH_ERROR:
      return {
        ...state,
        error: { message: action.payload.message },
      };

    default:
      (action: empty); // eslint-disable-line
      return state;
  }
};

export default reducer;
