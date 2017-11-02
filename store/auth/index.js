import * as constants from './constants';

const initialState = {
  signedIn: false,
  user: null,
  tokens: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SIGN_IN:
      console.log(constants.SIGN_IN);
      console.log(action);
      return {
        ...state,
        signedIn: true,
      };

    case constants.SIGN_OUT:
      console.log(constants.SIGN_OUT);
      console.log(action);
      return initialState;

    case constants.ADD_TOKEN:
      console.log(constants.ADD_TOKEN);
      console.log(action);
      return {
        ...state,
        tokens: {
          ...state.tokens,
          [action.payload.token]: action.payload.value,
        },
      };

    case constants.UPDATE_USER:
      console.log(constants.UPDATE_USER);
      console.log(action);
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

export default reducer;
