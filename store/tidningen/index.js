// @flow
import type { Reducer } from 'redux';
import type { State, Action } from './types';
import * as constants from './constants';

import clamp from '../../utils/clamp';

const initialState = {
  years: [],
  issues: {},
  pages: null,
  zoom: 4,
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

    case constants.INC_ZOOM:
      return {
        ...state,
        zoom: clamp(1, 8, state.zoom + 1),
      };

    case constants.DEC_ZOOM:
      return {
        ...state,
        zoom: clamp(1, 8, state.zoom - 1),
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
