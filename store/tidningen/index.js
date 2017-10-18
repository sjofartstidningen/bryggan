// @flow
import type { Reducer } from 'redux';
import type { State, Action } from './types';

import { ADD_YEARS, ADD_ISSUES, FETCH_ERROR } from './actions';

const initialState = {
  years: [],
  issues: {},
  error: null,
};

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_YEARS:
      return { ...state, years: action.payload.years };

    case ADD_ISSUES:
      return {
        ...state,
        issues: {
          ...state.issues,
          [action.payload.year]: action.payload.issues,
        },
      };

    case FETCH_ERROR:
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
