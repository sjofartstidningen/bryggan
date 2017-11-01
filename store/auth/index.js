const initialState = {
  signedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
      return {
        ...state,
        signedIn: true,
      };

    default:
      return state;
  }
};

export default reducer;
