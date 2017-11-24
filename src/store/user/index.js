import * as constants from './constants';

const initialState = {
  authState: constants.AUTH_UNAUTHENTICATED,
  user: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.AUTH_UNAUTHENTICATED:
      return initialState;

    case constants.AUTH_IN_PROGRESS:
      return {
        ...state,
        authState: constants.AUTH_IN_PROGRESS,
      };

    case constants.AUTH_SUCCESS:
      return {
        ...state,
        authState: constants.AUTH_SUCCESS,
        user: action.payload.user,
      };

    case constants.AUTH_ERROR:
      return {
        ...state,
        authState: constants.AUTH_ERROR,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export { reducer as default };
