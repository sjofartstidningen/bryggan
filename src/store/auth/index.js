import * as constants from './constants';

const initialState = {
  authenticated: constants.AWAIT_AUTHENTICATION,
  signedIn: false,
  user: null,
  tokens: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.AUTHENTICATED:
      return {
        ...state,
        authenticated: constants.AUTHENTICATED,
      };

    case constants.UNAUTHENTICATED:
      return {
        ...state,
        authenticated: constants.UNAUTHENTICATED,
      };

    case constants.SIGN_IN:
      return {
        ...state,
        signedIn: true,
      };

    case constants.SIGN_OUT:
      return initialState;

    case constants.ADD_TOKEN:
      return {
        ...state,
        tokens: {
          ...state.tokens,
          [action.payload.token]: action.payload.value,
        },
      };

    case constants.UPDATE_USER:
      return {
        ...state,
        user: {
          ...(state.user || {}),
          ...action.payload.user,
        },
      };

    default:
      return state;
  }
};

export { reducer as default };
